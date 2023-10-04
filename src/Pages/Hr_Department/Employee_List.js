
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import { withCookies, useCookies } from "react-cookie";
import { useForm, Form } from '../../components/useForm';
import Box from "@material-ui/core/Box";
import { forwardRef } from 'react';
import '../../App.scoped.css';
import '../../index.css'


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import ViewColumn from '@material-ui/icons/ViewColumn';
import CustomizedSteppers from './Add_Employee_Page';
import { BorderOuterRounded, CenterFocusStrongRounded, Sync } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications'
import { ToastProvider } from 'react-toast-notifications';
import { AccountBoxRounded, BusinessRounded, DashboardRounded, DnsRounded, GroupAddRounded, ListAltRounded, PostAddRounded } from '@material-ui/icons';

import QRCode from 'qrcode';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Detail: forwardRef((props, ref) => <CenterFocusStrongRounded {...props} ref={ref} />),
  QrCode: forwardRef((props, ref) => <BorderOuterRounded {...props} ref={ref} />),
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
  AddContract: forwardRef((props, ref) => <GroupAddRounded {...props} ref={ref} />),
  ViewContract: forwardRef((props, ref) => <AccountBoxRounded {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({

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

function Employee_List_Zoom(props) {
  const classes = useStyles();
  const { addToast } = useToasts();

  const [checked, setChecked] = React.useState(true);
  const { Api, Post_Request } = props;
  const [general_employee, setGeneral_Employee] = useState([]);
  const [look_up_val_for_expanse, set_Look_up_val_for_expanse] = useState();



  //creating api 
  const GetEmployee = async (address) => {
    await Api.get(address)
      .then(response => {

        setGeneral_Employee(response.data.Employee_Data);
        set_Look_up_val_for_expanse(response.data.Created_By);

      })
      .catch(function (error) {
        addToast('Unable to get Employees!', {
          appearance: 'error',
          autoDismiss: true,
          zIndex: '1'
        });

      })
      .then(function () {
        // always executed
      });
  }



  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
    // }, [recordForEdit])

    // get_data('Companies','company');
    GetEmployee('Employies');

  }, []);


  return (


    <>
      <Zoom in={checked} style={{ marginBottom: '9%' }}>
        <Box>
          <Bills_Modal Api={Api} Post_Request={Post_Request} general_employee={general_employee} look_up_val_for_expanse={look_up_val_for_expanse} />
        </Box>
      </Zoom>
      {/* <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          <Paper elevation={4} className={classes.paper}>
            
          </Paper>
        </Zoom> */}

    </>
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
export default withRouter(Employee_List_Zoom);