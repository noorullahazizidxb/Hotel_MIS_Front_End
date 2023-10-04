import React, { useRef } from 'react';
import Switch from '@material-ui/core/Switch';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import 'bootstrap/dist/css/bootstrap.min.css';

import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ToastProvider } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReceiptIcon from '@material-ui/icons/Receipt';
import axios from 'axios';
import clsx from 'clsx';
import { withCookies, useCookies } from "react-cookie";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { useHistory } from 'react-router-dom';
import QrReader from 'react-qr-reader';
import MaterialTable from "material-table";
import { Avatar } from '@material-ui/core';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import SaveAltRounded from '@material-ui/icons/SaveAltRounded';
import Search from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom'
import ViewColumn from '@material-ui/icons/ViewColumn';
import CenterFocusStrongRoundedIcon from '@material-ui/icons/CenterFocusStrongRounded';
import { Sync } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications'
import '../../App.scoped.css';
import '../../index.css';
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";

import QRCode from 'qrcode';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  ShowBells: forwardRef((props, ref) => <CenterFocusStrongRoundedIcon {...props} ref={ref} />)
};


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // paper: {
  //   // backgroundColor: theme.palette.background.paper.dark,
  //   border: '2px solid #000',
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 4, 3),
  // },
  container: {
    display: 'flexGrow',
    marginTop: '1%',
  },
  paper: {
    margin: theme.spacing(1),
    borderRadius: '20px',

  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

function Em_Contracts(props) {
  const { addToast } = useToasts();


  ///this state is for getting the companies and we wil use this state in function getcompanies
  const [contracts, setContracts] = useState([]);
  //this state is for updata where the use presses the update butting this state will change and
  // will have a function for that called send_record_from_table_to_form 
  const [record_for_update, setRecord_For_Update] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['Token'])


  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };


  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/HMIS/',

    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + cookies.Token,
    },
  });
  const get_contracts = async (address) => {
    await Api.get(address)
      .then(function (response) {
        // if(name=='company'){

        //   // setCompanies(response.data);
        //   setSalesMan(response.data.salesman)

        // }else if(name=='products'){
        //   setCompanies(response.data);

        // }else if(name=='accounts'){
        //   setAccounts(response.data);
        // }
        setContracts(response.data);


      })
      .catch(function (error) {
        addToast('Unable to get Employee Contracts!', {
          appearance: 'error',
          autoDismiss: true,
          zIndex: '1'
        });
      })
      .then(function () {
        // always executed
      });
  }
  const send_record_from_table_to_form = (value) => {
    setRecord_For_Update(value)


  }
  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
    // }, [recordForEdit])

    // get_data('Companies','company');

    get_contracts('Companies')
  }, []);

  return (



    <div >

      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        // components={{ Toast: snack }}
        // placement="bottom-center"
        placement="top-right"
      >
        <Zoom in={checked}>
          <Paper elevation={6}>
            <Add_Employee_Form />
          </Paper>
        </Zoom>

        <Zoom in={checked}>
          <Paper elevation={6} style={{ marginTop: "10%" }}>
            <Bills_Modal />
          </Paper>
        </Zoom>
      </ToastProvider>
    </div>
  )
}

const initialFValues = {
  id: 0,
  Em_Name: "",
  Current_City: "",
  Email: "",
  Ph_Number: "",
  path: "",
  Created_By: "",
  Deleted_BY: "",
}
function Add_Employee_Form(props) {
  // const { addOrEdit, recordForEdit } = props
  const { addToast } = useToasts();
  const { handleReset, first_Step_Val, setFirst_Step_Val, edit_flag } = props;
  const [updateflag, setUpdateFlag] = useState(false);
  const [postpath, setPostPath] = useState("");
  const [updatepath, setUpdatePath] = useState("");
  const [imageupdateflag, setImageUpdateFlag] = useState(false);
  const [added_flag, setAdded_Flag] = useState(false);
  const [SelectedFile, setSelectedFile] = useState([]);
  const history = useHistory();

  const [cookies, setCookie, removeCookie] = useCookies(["Token", "User"]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("Em_Name" in fieldValues)
      temp.Em_Name = fieldValues.Em_Name
        ? ""
        : " Em_Name This field is required.";
    if ("Current_City" in fieldValues)
      temp.Current_City = fieldValues.Current_City
        ? ""
        : " Current_City`This field is required.";
    if ("Email" in fieldValues)
      temp.Email = fieldValues.Email ? "" : " Email This field is required.";
    if ("Ph_Number" in fieldValues)
      temp.Ph_Number = fieldValues.Ph_Number
        ? ""
        : " Ph_Number This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  //Function For Submitting the Form

  useEffect(() => {

  }, []);

  //Function For Submitting the Form
  const Post_Employee = async (address1, selected_File) => {
    const formData = new FormData();
    formData.append("Path", selected_File);
    formData.append("Em_Name", values.Em_Name);
    formData.append("Email", values.Email);
    formData.append("Current_City", values.Current_City);
    formData.append("Ph_Number", values.Ph_Number);
    formData.append("Created_By", cookies.User);
    formData.append("Deleted_BY", values.Deleted_BY);

    await fetch(address1, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.Token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        addToast(
          `Record with Name: ${response.Em_Name
          }  Saved Successfully and her/his ID is ${response.id}!`,
          {
            appearance: "success",
            autoDismiss: true,
            zIndex: "1",
          }
        );
        setValues(response);
        setFirst_Step_Val(response);
      })
      .catch((error) => {
        addToast("Unable to Post Employees!", {
          appearance: "error",
          autoDismiss: true,
          zIndex: "1",
        });
      });
  };

  //Function For Submitting the Form
  const Update_Employee = async (address1, value, selected_File) => {
    const formData = new FormData();
    formData.append("Path", selected_File);
    formData.append("Em_Name", value.Em_Name);
    formData.append("Email", value.Email);
    formData.append("Current_City", value.Current_City);
    formData.append("Ph_Number", value.Ph_Number);
    formData.append("Created_By", cookies.User);
    formData.append("Deleted_BY", value.Deleted_BY);

    await fetch(address1, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.Token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        addToast(
          `Record with Name: ${response.Em_Name
          }  Updated Successfully and her/his ID is ${response.id}!`,
          {
            appearance: "success",
            autoDismiss: true,
            zIndex: "1",
          }
        );
        setValues(response);
        setFirst_Step_Val(response);
      })
      .catch((error) => {
        addToast("Unable to Update Employee!", {
          appearance: "error",
          autoDismiss: true,
          zIndex: "1",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

    }
  }
  // let testObject = { 'one': 1, 'two': 2, 'three': 3 };

  // // Put the object into storage
  // localStorage.setItem('testObject', JSON.stringify(testObject));

  // // Retrieve the object from storage
  // let retrievedObject = localStorage.getItem('testObject');

  // console.log('retrievedObject: ', JSON.parse(retrievedObject));

  //}, [] ===> on mount Execution
  // }) Excecution in every render
  // return ()=>{
  //  the clean up code
  // }
  // })

  return (
    <Form style={{ padding: '2%' }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="id"
            label="Employee ID"
            hidden
            value={values.id}
            onChange={handleInputChange}
            error={errors.id}
          />
          <Controls.Input
            name="Em_Name"
            label="اسم کارمند"
            value={values.Em_Name}
            onChange={handleInputChange}
            error={errors.Em_Name}
          />

          <Controls.Input
            label="شهر فعلی"
            name="Current_City"
            value={values.Current_City}
            onChange={handleInputChange}
            error={errors.Current_City}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="ایمیل آدرس"
            name="Email"
            type="email"
            value={values.Email}
            onChange={handleInputChange}
            error={errors.Email}
          />

          <Controls.Input
            label="شماره تماس"
            name="Ph_Number"
            value={values.Ph_Number}
            onChange={handleInputChange}
            error={errors.Ph_Number}
          />
          <br />
          <div class="mb-3 mx-2 col-md-9 col-sm-5 col-xs-5 ">
            <input
              type="file"
              name="Path"
              id="File"
              class="form-control"
              onChange={(e) => {
                if (imageupdateflag != false) {
                  setImageUpdateFlag(false);
                  setSelectedFile(e.target.files[0]);
                  setPostPath(URL.createObjectURL(e.target.files[0]));
                } else {
                  setSelectedFile(e.target.files[0]);
                  setPostPath(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>

          <div style={{ display: "flex" }}>
            {imageupdateflag ? (
              <img
                style={{
                  width: "20%",
                  height: "50%",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  marginLeft: "40%",
                  marginBottom: "0%",
                  padding: "0px",
                }}
                src={"http://localhost:8000/" + SelectedFile}
              />
            ) : null}
            {postpath ? (
              <img
                style={{
                  width: "20%",
                  height: "50%",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  marginLeft: "40%",
                  marginBottom: "0%",
                  padding: "0px",
                }}
                src={postpath}
              />
            ) : null}
            {updatepath ? (
              <img
                style={{
                  width: "20%",
                  height: "50%",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  marginLeft: "40%",
                  marginBottom: "0%",
                  padding: "0px",
                }}
                src={updatepath}
              />
            ) : null}
          </div>
        </Grid>

        <div
          className="col-md-10 col-sm-12 col-xs-12"
          style={{
            marginLeft: "8%",
            marginRight: "10%",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}

        >

          <Card>
            <CardContent>
              <Typography letiant="body2">
                Please be aware that this step cant be undone.
              </Typography>
            </CardContent>
            <CardActions>
              {edit_flag ? <Controls.Button
                style={{ width: "50%", height: "100%", borderRadius: "10px", marginLeft: "25%" }}
                text="Update"
                type="submit"
                letiant="contained"
                color="primary"
                startIcon={<SaveAltRounded />}
              /> : (
                <Controls.Button
                  style={{ width: "50%", height: "100%", borderRadius: "10px" }}
                  text={
                    added_flag ? "Update Employee & Next" : "Save Employee & Next"
                  }
                  type="submit"
                  letiant="contained"
                  color="primary"
                  startIcon={<SaveAltRounded />}
                />
              )}
              {edit_flag ? null : (
                <Controls.Button
                  // type="submit"
                  onClick={handleReset}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  letiant="contained"
                  color="secondary"
                  startIcon={<CancelRoundedIcon />}
                  text="Cancel"
                />
              )}
              {edit_flag ? null : (
                <Controls.Button
                  // type="submit"
                  onClick={() => {
                    resetForm();
                  }}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  letiant="contained"
                  color="secondary"
                  startIcon={<CancelRoundedIcon />}
                  text="Reset"
                />
              )}


            </CardActions>
          </Card>
        </div>
      </Grid>
    </Form >
  );
}



function Bills_Modal(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [data_for_modal, setData_For_Modal] = React.useState([]);
  // const [prod, setProd] = React.useState([]);
  const [em_name_for_modal, set_EmployeeName_For_Modal] = React.useState();
  const { Api, Post_Request, general_employee, look_up_val_for_expanse } = props;

  const handleOpen = (value, Em_Name) => {
    setOpen(true);
    setData_For_Modal(value);
    set_EmployeeName_For_Modal(Em_Name);

  };


  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
    // }, [recordForEdit])

    // get_data('Companies','company');


  }, [general_employee]);




  return (
    <div>

      <Employee_List Api={Api} general_employee={general_employee} look_up_val_for_expanse={look_up_val_for_expanse} Post_Request={Post_Request} handleOpenModal={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}

        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          border: '3px var(--text-primary) solid',
          borderRadius: '20px',
        }}
      >
        <Fade in={open} id="modal">


          {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p> */}

          <Employee_List_Detail em_name_for_modal={em_name_for_modal} data={data_for_modal} handleClose={handleClose} />

        </Fade>

      </Modal>

    </div>
  );
}


function Employee_List(props) {
  const { addToast } = useToasts();
  const history = useHistory();
  const { Api, Post_Request, handleOpenModal, general_employee, look_up_val_for_expanse } = props;

  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])
  const [qrimage, setQRimage] = useState();

  const [columns, setColumns] = useState([
    {
      title: "عکس",
      field: 'Path',
      render: rowData => <Avatar src={'http://localhost:8000/' + rowData.Path} style={{ borderRadius: '50%', border: '1px solid black' }} alt="No Image" />
      //   // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
      ,
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }
    },
    {
      title: "درج شده توسط",
      field: 'Created_Name',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

    },
    {
      title: "جمله مصارف",
      field: 'Total_Expanse',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

    },
    {
      title: "شماره تماس",
      field: 'Ph_Number',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

    },
    {
      title: "آدرس ایمیل",
      field: 'Email',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

    },
    {
      title: "سکونت فعلی",
      field: 'Current_City',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

    },
    {
      title: "اسم کارمند",
      field: 'Em_Name',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

    },

  ]);
  /// for summing the Available Quantity
  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
    // }, [recordForEdit])

    // get_data('Companies','company')


  }, []);

  // setProducts([...products,sum])




  return (
    <Box>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        // components={{ Toast: snack }}
        // placement="bottom-center"
        placement="top-right"
      >
        <MaterialTable
          icons={tableIcons}
          title="لست کامندان"
          columns={columns}

          // className='MuiPaper-root'
          style={{
            padding: '3%',
            backgroundColor: 'var(--transparent-black)',
            border: '3px var(--text-primary) solid',
            borderRadius: '20px',
            fontSize: '15px',
            boxShadow: '0 0 20px var(--spread) var(--text-primary)',
            color: 'var(--text-primary)'
          }}

          options={{
            headerStyle: {
              backgroundColor: 'var(--transparent-black)',
              fontSize: '15px',
              boxShadow: '0 0 20px var(--spread) var(--text-primary)',
              color: 'var(--text-primary)'
            }
          }}

          elevation={4}
          data={general_employee}
          // editable={{
          //   // onRowAdd: (newData) =>
          //   //   new Promise((resolve, reject) => {
          //   //     setTimeout(() => {
          //   //       setProducts([...products, newData]);

          //   //       resolve();
          //   //     }, 1000);
          //   //   }),
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         // const dataUpdate = [...products];
          //         // const index = oldData.tableData.id;
          //         // dataUpdate[index] = newData;
          //         // setProducts([...dataUpdate]);
          //         handleOpenModal();
          //         resolve();
          //       }, 1000);
          //     }),
          //           }}
          actions={[
            {
              icon: tableIcons.ViewContract,
              tooltip: 'دیدن قرار داد',
              headerStyle: { backgroundColor: 'var(--transparent-black)' },
              onClick: (event, rowData) => {
                // const contracts=Object.assign({},general_employee.contracts);



                handleOpenModal(rowData.contracts, rowData.contracts.Em_Name);
              }

            },
            {
              icon: tableIcons.Edit,
              tooltip: 'تصیح نمودن',
              onClick: (event, EM_rowData) => {

                // const AllRelation=Object.assign({},products.Available);

                history.push({
                  pathname: '/Add_Employee',
                  state: { EM_rowData }
                })
                console.log(EM_rowData);
                // generateQRCode(products.Available[rowData.tableData.id]);
                // console.log(products.Available[rowData.tableData.id]);
              }

            },
            {
              icon: tableIcons.AddContract,
              tooltip: 'اضافه نمودن قرار داد',
              onClick: (event, add_contract_rowData) => {
                history.push('/Em_Contract');
                // const AllRelation=Object.assign({},products.Available);

                history.push({
                  pathname: '/Add_Employee',
                  state: { add_contract_rowData }
                })
                console.log(add_contract_rowData);
                // generateQRCode(products.Available[rowData.tableData.id]);
                // console.log(products.Available[rowData.tableData.id]);
              }

            }
          ]}

        />
        {qrimage ? (<a href={qrimage} download > <img src={qrimage} alt='no qr code' /></a>) : null}
      </ToastProvider>
    </Box>
  );
}




const Employee_List_Detail = withRouter((props) => {
  const { addToast } = useToasts();
  const history = useHistory();

  const { data, em_name_for_modal, handleClose } = props;




  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])


  const [columns, setColumns] = useState([
    {
      title: "ایجاد شده توسط",
      field: 'Em_Name',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
      title: "مدت قرار داد",
      field: 'Contract_Years',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
      title: "تاریخ ختم قرار داد",
      field: 'contract_End_date',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
      title: "تاریخ شروع قرار داد",
      field: 'contract_start_date',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
      title: "معاش",
      field: 'Monthly_Salery',
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }
    },
    {
      title: "نوع قرار داد",
      field: "Job_Type_Name",
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }

    },
    {
      title: "عنوان بست", field: "Position_Name",
      headerStyle: {
        backgroundColor: 'var(--transparent-black)',
        fontSize: '15px',
        boxShadow: '0 0 20px var(--spread) var(--text-primary)',
        color: 'var(--text-primary)'
      }
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 

    },

  ]);
  /// for summing the Available Quantity




  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
    // }, [recordForEdit])


    // GetEmployee('Product');




  }, []);

  return (


    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        // components={{ Toast: snack }}
        // placement="bottom-center"
        placement="top-right"
      >
        <MaterialTable
          icons={tableIcons}
          title={'nothing'}
          columns={columns}
          data={data}


          style={{
            padding: '3%',
            backgroundColor: 'var(--transparent-black)',
            border: '3px var(--text-primary) solid',
            borderRadius: '20px',
            fontSize: '15px',
            boxShadow: '0 0 20px var(--spread) var(--text-primary)',
            color: 'var(--text-primary)'
          }}

          options={{
            headerStyle: {
              backgroundColor: 'var(--transparent-black)',
              fontSize: '15px',
              boxShadow: '0 0 20px var(--spread) var(--text-primary)',
              color: 'var(--text-primary)'
            }
          }}



          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: 'تصیح قرارداد',
              onClick: (event, rowData) => {

                history.push({
                  pathname: '/Add_Employee',
                  state: { rowData }
                })

              }
            }
          ]}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // setProducts([...products, newData]);

                  resolve();
                }, 1000);
              }),
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       // const dataUpdate = [...products];
            //       const index = oldData.tableData.id;
            //       // dataUpdate[index] = newData;
            //       // setProducts([...dataUpdate]);
            //       handleOpen(data,em_name_for_modal);

            //       resolve();
            //     }, 1000);
            //   }),

          }}

        />

      </ToastProvider>

    </div>
  );
});
export default withRouter(Em_Contracts);