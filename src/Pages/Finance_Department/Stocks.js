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
import { TextField, Autocomplete } from '@mui/material'
import Stock_List_Searchable_Paper from '../../components/controls/Stock_List_Searchable_Paper';
import Stock_List_Detail_Searchable_Paper from '../../components/controls/Stock_List_Detail_Searchable_Paper';

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

function Stocks(props) {
  const { addToast } = useToasts();
  const { Post_Request, Api } = props;


  ///this state is for getting the companies and we wil use this state in function getcompanies
  const [stock, setStock] = useState([]);

  //this state is for updata where the use presses the update butting this state will change and
  // will have a function for that called send_record_from_table_to_form 
  const [record_for_update, setRecord_For_Update] = useState(['']);
  const [cookies, setCookie, removeCookie] = useCookies(['Token', "User"])


  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const get_Stock = (address, error_message) => {
    Api.get(address)
      .then(function (response) {

        setStock(response.data.Stock_D);



      })
      .catch(function (error) {
        addToast(error_message, {
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
    get_Stock('Stocks', 'could not get the data');


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
            <Add_Employee_Form Api={Api} Post_Request={Post_Request} cookies={cookies} get_stock={get_Stock} />
          </Paper>
        </Zoom>

        <Zoom in={checked}>

          <Stocks_Modal stock={stock} get_stock={get_Stock} Api={Api} Post_Request={Post_Request} cookies={cookies} />

        </Zoom>
      </ToastProvider>
    </div>
  )
}


const initialFValues = {
  id: 0,
  Stock_Name: "",
  Unit_Ammount: "",
  Unit_Used: "",
  Generated_Dish_ID: "",
  Generated_Ammount: "",
  Created_By: "",
  Deleted_BY: "",
}
function Add_Employee_Form(props) {
  // const { addOrEdit, recordForEdit } = props
  const { addToast } = useToasts();
  const { Api, Post_Request, cookies, get_stock } = props;
  const [updateflag, setUpdateFlag] = useState(false);
  const [postpath, setPostPath] = useState("");
  const [updatepath, setUpdatePath] = useState("");
  const [imageupdateflag, setImageUpdateFlag] = useState(false);
  const [added_flag, setAdded_Flag] = useState(false);
  const [edit_flag, setEdit_Flag] = useState(false);
  const [SelectedFile, setSelectedFile] = useState([]);
  const history = useHistory();
  const [unit, setUnit] = useState([]);
  const [dish, setDish] = useState([]);


  const childRef1 = useRef();
  const childRef2 = useRef();


  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("Stock_Name" in fieldValues)
      temp.Stock_Name = fieldValues.Stock_Name
        ? ""
        : "اسم جنس ضروری است";
    if ("Unit_Ammount" in fieldValues)
      temp.Unit_Ammount = fieldValues.Unit_Ammount
        ? ""
        : "مقدار اندازه  خریداری ضروری است";
    if ("Unit_Used" in fieldValues)
      temp.Unit_Used = fieldValues.Unit_Used
        ? ""
        : "واحد اندازه گیری جنس ضروری است";
    if ("Generated_Ammount" in fieldValues)
      temp.Generated_Ammount = fieldValues.Generated_Ammount
        ? ""
        : "مقدار غذایی که از بعد از پختن بدست میاید ضروری است";
    if ("Generated_Dish_ID" in fieldValues)
      temp.Generated_Dish_ID = fieldValues.Generated_Dish_ID ? "" : "مشخص کردن غذایی که این جنس برای آن خریداری میشود ضروری است";

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
  const get_Unit_and_Dish = (address, error_message) => {
    Api.get(address)
      .then(function (response) {

        if (response.data.message != null) {
          addToast(error_message, {
            appearance: 'error',
            autoDismiss: true,
            zIndex: '1'
          });
        } else {
          setUnit(response.data.Unit);
          setDish(response.data.Dish);
        }


      })
      .catch(function (error) {
        addToast(error_message, {
          appearance: 'error',
          autoDismiss: true,
          zIndex: '1'
        });
      })
      .then(function () {
        // always executed
      });
  }
  useEffect(() => {
    get_Unit_and_Dish('Dish_and_Unit', 'error getting dish and unit');
    setValues({ ...values, Created_By: cookies.User });
  }, []);

  const get_Unit_Used_combo_box_value = (value) => {
    setValues({
      ...values,
      Unit_Used: value.id,
    });
  };
  const get_Generated_Dish_ID_combo_box_value = (value) => {
    setValues({
      ...values,
      Generated_Dish_ID: value.id,

    });
  };


  //Function For Submitting the Form


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
        // setFirst_Step_Val(response);
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

      console.log(values);
      Post_Request('Stocks', values, `${values.Stock_Name} Added Successfully`, `Posting ${values.Stock_Name} Was not Successfull`)
      get_stock('Stocks', 'we Could not get the Stocks');
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
            name="Stock_Name"
            label="اسم جنس"
            value={values.Stock_Name}
            onChange={handleInputChange}
            error={errors.Stock_Name}
          />
          <Controls.Input
            name="Unit_Ammount"
            label="مقدار خرید "
            value={values.Unit_Ammount}
            onChange={handleInputChange}
            error={errors.Unit_Ammount}
          />

          <Controls.ComboBox_Unit_Used
            options={unit}
            error={errors.Unit_Used}
            get_Unit_Used_combo_box_value={get_Unit_Used_combo_box_value}
            ref={childRef1}
          />

        </Grid>
        <Grid item xs={6}>
          <Controls.ComboBox_For_Generated_Dish_ID
            options={dish}
            error={errors.Generated_Dish_ID}
            get_Generated_Dish_ID_combo_box_value={get_Generated_Dish_ID_combo_box_value}
            ref={childRef2}
          />
          <Controls.Input
            label="مقدار غذا فی خوراک"
            name="Generated_Ammount"
            value={values.Generated_Ammount}
            onChange={handleInputChange}
            error={errors.Generated_Ammount}
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
                  text={'Save'}
                  type="submit"
                  letiant="contained"
                  color="primary"
                  startIcon={<SaveAltRounded />}
                />
              )}
              {edit_flag ? null : (
                <Controls.Button
                  // type="submit"
                  onClick={resetForm}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  letiant="contained"
                  color="secondary"
                  startIcon={<CancelRoundedIcon />}
                  text="Cancel"
                />
              )}


            </CardActions>
          </Card>
        </div>
      </Grid>
    </Form >
  );
}



function Stocks_Modal(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [data_for_modal, setData_For_Modal] = React.useState([]);
  // const [prod, setProd] = React.useState([]);
  const [em_name_for_modal, set_EmployeeName_For_Modal] = React.useState();
  const { Api, Post_Request, cookies, refresh_table, stock } = props;

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


  }, []);




  return (
    <div style={{ marginTop: "2%" }}>

      <Stock_List stock={stock} Api={Api} Post_Request={Post_Request} handleOpenModal={handleOpen} />
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
        <Fade in={open}>


          {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p> */}
          <div className="App" style={{ padding: '4%' }}>
            <Stock_List_Detail data={data_for_modal} handleClose={handleClose} />
          </div>

        </Fade>

      </Modal>

    </div>
  );
}





function Stock_List(props) {

  const { stock, Api, Post_Request, handleOpenModal } = props;
  const [input, setInput] = useState('')
  const [list, setList] = useState([]);


  useEffect(() => {
    setList(stock)
  }, [stock])


  const handleInput = (e) => {
    console.log(e.target.value)
    setInput(e.target.value.toLowerCase())
  }


  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        margin: '20 auto',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}>
      <Typography variant='h4' component={'h1'}>لست مواد خام </Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={list.map(item => item.Stock_Name)}

        renderInput={(params) => <TextField {...params}
          label="Search title"
          onSelect={handleInput}
          sx={{
            width: 350,
            margin: '10px auto',
          }} />}
      />


      <Stock_List_Searchable_Paper searchstring={input} list={list} handleOpenModal={handleOpenModal} />
    </Box>
  );
}




function Stock_List_Detail(props) {

  const { data, handleClose } = props;
  const [input, setInput] = useState('')
  const [list, setList] = useState([]);


  useEffect(() => {
    setList(data.import_material)
  }, [data])


  const handleInput = (e) => {
    console.log(e.target.value)
    setInput(e.target.value.toLowerCase())
  }


  return (
    <Box className="App"
      sx={{
        width: '100%',
        height: '100%',
        margin: '20 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      }}>
      <Typography variant='h4' component={'h1'}>{data.StockName} لیست خرید های </Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={list.map(item => item.Company_Name)}

        renderInput={(params) => <TextField {...params}
          label="Search title"
          onSelect={handleInput}
          sx={{
            width: 350,
            margin: '10px auto',
          }} />}
      />


      <Stock_List_Detail_Searchable_Paper searchstring={input} list={list} />
    </Box>
  );
}
export default withRouter(Stocks);