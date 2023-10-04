
import React,{useRef} from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../../App.scoped.css';
import '../../index.css';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ToastProvider } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SaveAltRounded from '@material-ui/icons/SaveAltRounded';
import PropTypes from 'prop-types';
import {  withStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import ReceiptIcon from '@material-ui/icons/Receipt';
import axios from 'axios';
import clsx from 'clsx';
import { withCookies,useCookies } from "react-cookie";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SupervisedUserCircleRounded from '@material-ui/icons/SupervisedUserCircleRounded';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import  { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import {useHistory} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import yellow from "@material-ui/core/colors/yellow";
import { purple } from '@material-ui/core/colors';
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";




import QrReader from 'react-qr-reader';
import MaterialTable from "material-table";
import {Avatar} from '@material-ui/core';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';

import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import {withRouter} from 'react-router-dom'
import ViewColumn from '@material-ui/icons/ViewColumn';
import CenterFocusStrongRoundedIcon from '@material-ui/icons/CenterFocusStrongRounded';

import { Sync } from '@material-ui/icons';
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
    width:"100%"
  },
  container: {
    display: 'flexGrow',
    marginTop:'1%'
    
  },
  paper: {
    margin: theme.spacing(1),
    borderRadius:'20px',
    boxShadow:'0 0 20px var(--spread) var(--text-primary)',

    padding:'3%'
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



const initialFValues = { 
            id: 0,
            Name: '',
            Last_Name:'',
            Tazkira_Number:'',
            Address:'',
            Phone:'',
            Emergency_Phone:'',
            Path: '',
           }
  

export default function Account_Holders_Page(props){
  ///this state is for getting the products and we wil use this state in function getProducts
  const [account_holder,setAccount_Holder]=useState([]);
  const { addToast } = useToasts();
  const { Api,Post_Request } = props;

  //this state is for updata where the use presses the update butting this state will change and
  // will have a function for that called send_record_from_table_to_form 
  const [record_for_update,setRecord_For_Update]=useState();
  const [cookies, setCookie, removeCookie] = useCookies(['Token','User'])


  const get_Account_Holders=async (address,error_message)=>{
    await Api.get(address)
  .then(function (response) {
    // if(name=='company'){
  
    //   // setCompanies(response.data);
    //   setSalesMan(response.data.salesman)
  
    // }else if(name=='products'){
    //   setCustomer(response.datav);
  
    // }else if(name=='accounts'){
    //   setAccounts(response.data);
    // }
      setAccount_Holder(response.data);
      
   
  })
  .catch(function (error) {
    addToast(error_message,{
        appearance: 'error',
        autoDismiss: true,
      });
  })
  .then(function () {
    // always executed
  });
    }
  const send_record_from_table_to_form=(value)=>{
    setRecord_For_Update(value)
  
    
  }
    useEffect(() => {
      // if (recordForEdit != null)
      //     setValues({
      //         ...recordForEdit
      //     })
  // }, [recordForEdit])
  
  // get_data('Companies','company');
  
  get_Account_Holders('User_Accounts');
  },[]);
  
  return (
    <Grid container>
<Grid lg={12} xl={12} md={10} sm={10} xs={10} >
<Customer_Add_Page_With_Zoom user_info={cookies.User} refresh_table={get_Account_Holders} Update_Record_For_Form={record_for_update} send_record_from_table_to_form={send_record_from_table_to_form}/>
</Grid>
<Grid lg={12} xl={12} md={10} sm={10} xs={10} >
<User_With_Accounts_Inside_A_Model user={account_holder} refresh_table={get_Account_Holders} send_record_from_table_to_form={send_record_from_table_to_form}/>
</Grid>
    </Grid>
    
  )
}


function Customer_Add_Page_With_Zoom(props) {
    const {refresh_table,Update_Record_For_Form,user_info,send_record_from_table_to_form}=props;
    const history=useHistory();
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    
    const handleChange = () => {
      setChecked((prev) => !prev);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.container}>
        <Grid container direction="row">
        <Grid item xs={12} lg={12} md={12} xl={12} sm={12}>
          <Zoom in={checked}>
          
            <Paper elevation={4} className={classes.paper}>
              <Account_Holders_Form refresh_table={refresh_table} recordForEdit={Update_Record_For_Form} />
  
            </Paper>
         
  
            
          </Zoom>
          </Grid>
          </Grid>
          
          {/* <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
            <Paper elevation={4} className={classes.paper}>
              
            </Paper>
          </Zoom> */}
        </div>
      </div>
    );
  }
  

function Account_Holders_Form(props) {
    // const { addOrEdit, recordForEdit } = props
    const { addToast } = useToasts();
  
    const { Api,Post_Request,refresh_table,recordForEdit} = props
    const [updateflag,setUpdateFlag]=useState(false);
    const [postpath,setPostPath]=useState('');
    const [updatepath,setUpdatePath]=useState('');
    const [imageupdateflag,setImageUpdateFlag]=useState(false)
    const [SelectedFile,setSelectedFile]=useState([]);   


    const [cookies, setCookie, removeCookie] = useCookies(['Token']);
 
 

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "اسم حتمی میباشد"
        if ('Last_Name' in fieldValues)
            temp.Last_Name = fieldValues.Last_Name ? "" : "تخلص حتمی میباشد"
        if ('Tazkira_Number' in fieldValues)
            temp.Tazkira_Number = fieldValues.Tazkira_Number ? "" : "نمبر تذکره حتمی میباشد"
        if ('Address' in fieldValues)
            temp.Address = fieldValues.Address ? "" : "آدرس حتمی میباشد"
        if ('Phone' in fieldValues)
            temp.Phone = fieldValues.Phone ? "" : "شماره تماس حتمی میباشد"
        if ('Emgergency_Phone' in fieldValues)
            temp.Emgergency_Phone = fieldValues.Emgergency_Phone ? "" : "شماره تماس اضطراری حتمی میباشد"
        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    //Function For Submitting the Form

   
    

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (validate()) {
          // addOrEdit(values, resetForm);
        
          
        
          
      }
    
    }
      // let testObject = { 'one': 1, 'two': 2, 'three': 3 };

      // // Put the object into storage
      // localStorage.setItem('testObject', JSON.stringify(testObject));
      
      // // Retrieve the object from storage
      // let retrievedObject = localStorage.getItem('testObject');
      
      // console.log('retrievedObject: ', JSON.parse(retrievedObject));


    useEffect(() => {
 
        if(recordForEdit!=null){
        
            setValues({...recordForEdit});
            setUpdateFlag(true);
            
            
            
            
    
          }
    },)
    //}, [] ===> on mount Execution
  // }) Excecution in every render
  // return ()=>{
//  the clean up code
  // }
// })
    
    

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs sm xl lg>
                    <Controls.Input
                        name="Last_Name"
                        label="تخلص"
                        value={values.Last_Name}
                        onChange={handleInputChange}
                        error={errors.Last_Name}
                    />

           
                <Controls.Input
                      label="آدرس"
                      name="Address"
                      value={values.Address}
                      onChange={handleInputChange}
                      error={errors.Address}
                  />
                <Controls.Input
                      label="شماره تماس اضطراری"
                      name="Emergency_Phone"
                      value={values.Emergency_Phone}
                      onChange={handleInputChange}
                      error={errors.Emergency_Phone}
                  />

                  
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                              label="اسم"
                              name="Name"
                              value={values.Name}
                              onChange={handleInputChange}
                              error={errors.Name}
                             
                          />
                 
                <Controls.Input
                              label="نمبر تذکره"
                              name="Tazkira_Number"
                              value={values.Tazkira_Number}
                              onChange={handleInputChange}
                              error={errors.Tazkira_Number}
                          />
                 <Controls.Input
                              label="شماره تماس"
                              name="Phone"
                              value={values.Phone}
                              onChange={handleInputChange}
                              error={errors.Phone}
                          />
                <br/>
                    <div class='mb-3 mx-2 col-md-9 col-sm-5 col-xs-5 '>
                      
                      <input type='file' name="Path" id="File" class="form-control" onChange={(e)=>{
                    if(imageupdateflag!=false){
                      setImageUpdateFlag(false);
                      setSelectedFile(e.target.files[0]);setPostPath(URL.createObjectURL(e.target.files[0]))

                    }else{
                      setSelectedFile(e.target.files[0]);setPostPath(URL.createObjectURL(e.target.files[0]))

                    }
                    
                    }}></input>
                    </div>
                    
                    <div style={{display:'flex'}}>
                {imageupdateflag ? <img style={{width:'20%',height:'50%',border:'3px solid yellow',borderRadius:'10px',marginLeft:'40%',marginBottom:'0%',padding:'0px'}} src={'http://localhost:8000/'+SelectedFile}/>:null}
                {postpath ? <img style={{width:'20%',height:'50%',border:'3px solid yellow',borderRadius:'10px',marginLeft:'40%',marginBottom:'0%',padding:'0px'}} src={postpath}/>:null}
                {updatepath ? <img style={{width:'20%',height:'50%',border:'3px solid yellow',borderRadius:'10px',marginLeft:'40%',marginBottom:'0%',padding:'0px'}} src={updatepath}/>:null}

                    </div>

                  
                 
                  
                </Grid>
                
                 <div className='col-md-10 col-sm-12 col-xs-12' style={{marginLeft:'8%',marginRight:'10%',paddingLeft:'10%',paddingRight:'10%'}}>
                 <Card>
                  <CardContent>
                    <Typography letiant="body2">Please be aware that this step cant be undone.</Typography>
                  </CardContent>
                  <CardActions>
                  
                  <Controls.Button
                          
                          onClick={()=>{
                            
                            
                            
                          
                           
                

                          }}
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          text="Next"
                          
                          letiant="contained" color="primary"
                          startIcon={<SaveAltRounded/>}
                           />

                      <Controls.Button
                          // type="submit"
                      
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          letiant="contained" color="secondary"
                          startIcon={<CancelRoundedIcon/>}
                          

                          text="Cancel"
                          
                          
                           />
                       <Controls.Button
                          // type="submit"
                          onClick={()=>{
                              
                            resetForm();
                          }}
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          letiant="contained" color="secondary"
                          startIcon={<CancelRoundedIcon/>}
                          

                          text="Reset"
                          
                          
                           />
                  </CardActions>
            </Card>
                  </div>   
                  
</Grid>
        </Form>
    )
}



function User_With_Accounts_Inside_A_Model(props) {
  
    const {user,send_record_from_table_to_form,refresh_table}=props;
    const [cookies, setCookie, removeCookie,] = useCookies(['Token']);
  
    const [checked, setChecked] = React.useState(true);
    
    const handleChange = () => {
      setChecked((prev) => !prev);
    };
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data_for_modal, setData_For_Modal] = React.useState([]);
    
    const [account_holder_name, set_Account_Holder_Name] = React.useState();
    const [sales_man,setSales_Man]=useState();
      
      const [lookup_value_for_sales_man_id_in_show_bills_of_company,setlookup_value_for_sales_man_id_in_show_bills_of_company]=useState();
    const Api = axios.create({
      baseURL: 'http://localhost:8000/api/Rizq_Halal/',
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+cookies.Token,
      },
    });
   
    const getSale_Man=async (address)=>{
      await Api.get(address)
    .then(function (response) {
      // if(name=='company'){
    
      //   // setCompanies(response.data);
      //   setSalesMan(response.data.salesman)
    
      // }else if(name=='products'){
      //   setProducts(response.data);
    
      // }else if(name=='accounts'){
      //   setAccoupnts(response.data);
      // }
        setSales_Man(response.data);
        ///Making LookUp Value
        
     
    })
    .catch(function (error) {
      alert('we cant get Sales_Man'+error);
    })
    .then(function () {
      // always executed
    });
      }
      useEffect(() => {
        // if (recordForEdit != null)
        //     setValues({
        //         ...recordForEdit
        //     })
    // }, [recordForEdit])
    
    getSale_Man('SalesMan')
    
    
    
   
    console.log(sales_man);
    
    },[]);
    
  
    const handleOpen = (value,) => {
      setOpen(true);
      setData_For_Modal(value);
      set_Account_Holder_Name(value.Account_Holder_Name)
      setlookup_value_for_sales_man_id_in_show_bills_of_company(sales_man.reduce(function(acc,cur,i){
        acc[cur.id]=cur.Sales_Man_Name;
        return acc;
      },{}));
      
    
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <Zoom in={checked}>
      <div>
        
         
          
            <User_Account_List Account_Holders={user} 
        send_record_from_table_to_form={send_record_from_table_to_form} 
        handleOpenModal={handleOpen}
       refresh_table={refresh_table} />
  
         
  
            
          
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
        >
          
          <Fade in={open}>
            <div className={classes.paper}>
              {/* <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p> */}
                
                <Accounts lookup={lookup_value_for_sales_man_id_in_show_bills_of_company}   account_holder_name={account_holder_name} data={data_for_modal} handleClose={handleClose}/>
            </div>
          </Fade>
        </Modal>
      </div>
      </Zoom>
    );
  }
  


  function User_Account_List(props) {
    const {handleOpenModal,Account_Holders,send_record_from_table_to_form,refresh_table}=props;
    const [cookies, setCookie, removeCookie,] = useCookies(['Token'])
    const [qrimage,setQRimage]=useState();
  
    
    const [columns, setColumns] = useState([
      { 
        title: "Name", field: "Company_Name"
      },
      { 
        title: "Phones", field: "Phone_Numbers"
      },
      {
        title: "Total Amount",
        field: "Total_Contract_Amount",
      },
      { 
        title: "Total Paid", field: "Total_Paid"
      },
      { 
        title: "Total Loans", field: "Total_Loans"
      },
      {
        title: "Description",
        field: "Com_Info",
      },
      {
      title: "Photo",
      field: 'Path',
        render:rowData=><Avatar src={'http://localhost:8000/'+rowData.Path}  style={{borderRadius:'50%',border:'1px solid black'}} alt="No Image"/>
      //   // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
  
       }
    ]);
    /// for summing the Available Quantity
   
    
    useEffect(() => {
      // if (recordForEdit != null)
      //     setValues({
      //         ...recordForEdit
      //     })
  // }, [recordForEdit])
  
  // get_data('Companies','company');
  
  
  },[Account_Holders]);
  
  // setCompanies([...products,sum])
  
    //creating api 
    const Api = axios.create({
      baseURL: 'http://localhost:8000/api/Rizq_Halal/',
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+cookies.Token,
      },
    });
    const delete_Companies=(address)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Api.delete(address)
          .then(function (response) {
            // if(name=='company'){
          
            //   // setCompanies(response.data);
            //   setSalesMan(response.data.salesman)
          
            // }else if(name=='products'){
            //   setCompanies(response.data);
          
            // }else if(name=='accounts'){
            //   setAccounts(response.data);
            // }
              // setCompanies(response.data);
              Swal.fire(
                'Product Deleted Successfully!',
                'Pres Enter to Continue!',
                'success'
              )
              refresh_table('Companies');
              
           
          })
          .catch(function (error) {
            Swal.fire(
              'Failed to Delete the product!',
              'Pres Enter to Continue!',
              'error'
            )
          
            
          })
          .then(function () {
            // always executed
          });
        
        }
  
      })
         }
   
  
  
  
    return (
      <div className="App">
        
        <MaterialTable
          icons={tableIcons}
          title="مشتریان"
          columns={columns}
          elevation={4}
          style={{padding:'3%',
          backgroundColor:'var(--transparent-black)',
          border:'3px var(--text-primary) solid',
          borderRadius:'20px',
          fontSize:'15px',
          boxShadow:'0 0 20px var(--spread) var(--text-primary)',
          color:'var(--text-primary)'
        }}
          
        options={{
            headerStyle:{
              backgroundColor:'var(--transparent-black)',
              fontSize:'15px',
              boxShadow:'0 0 20px var(--spread) var(--text-primary)',
              color:'var(--text-primary)'}
        }}
          data={Account_Holders}
          // editable={{
          //   // onRowAdd: (newData) =>
          //   //   new Promise((resolve, reject) => {
          //   //     setTimeout(() => {
          //   //       setCompanies([...products, newData]);
  
          //   //       resolve();
          //   //     }, 1000);
          //   //   }),
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         // const dataUpdate = [...products];
          //         // const index = oldData.tableData.id;
          //         // dataUpdate[index] = newData;
          //         // setCompanies([...dataUpdate]);
          //         handleOpenModal();
          //         resolve();
          //       }, 1000);
          //     }),
          //           }}
          actions={[
            {
              icon:tableIcons.Edit,
              headerStyle:{backgroundColor:'var(--transparent-black)'},
              tooltip:'Update',
              onClick:(event,rowData)=>{
                
                
                
                
                send_record_from_table_to_form(rowData);
              }
  
            },
            {
              icon:tableIcons.Delete,
              headerStyle:{backgroundColor:'var(--transparent-black)'},
              tooltip:'Delete the product',
              onClick:(event,rowData)=>{
               delete_Companies(`Companies/${rowData.id}`);
              }
  
            },
            {
              icon:tableIcons.ShowBells,
              headerStyle:{backgroundColor:'var(--transparent-black)'},
              tooltip:'Show Bills',
              onClick:(event,rowData)=>{
               handleOpenModal(rowData);
               
              }
  
            }
          ]}
    
          
        />
        {qrimage ? (<a href={qrimage} download> <img src={qrimage} alt='no qr code'/></a>):null}
      </div>
    );
  }
  

  const Accounts=(props)=>{
    const { addToast } = useToasts()
    
    const {data,account_holder_name,lookup,handleClose}=props;
    
    const [companies,setCompanies]=useState();
    
    const [cookies, setCookie, removeCookie,] = useCookies(['Token']) 
     
    
      useEffect(() => {
        // if (recordForEdit != null)
        //     setValues({
        //         ...recordForEdit
        //     })
    // }, [recordForEdit])
    
    
    
    
   
    console.log(lookup);
    },[]);
    
    const [columns, setColumns] = useState([
      { 
        title: "Bill Number", field: "Bill_ID"
      },
      {
        title: "Saler",
        field: "Sales_Man_ID",
        lookup: lookup, 
  
      },
      
      {
        title: "Total Money",
        field: 'Total_Money'
        // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
      },
      {
        title: "Paid",
        field: 'Total_Paid'
        // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
      },
      {
        title: "Reminder",
        field: 'Total_reminder'
        // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
      },
      // {
      //   title: "Photo",
      //   field: 'Path',
      //   render:rowData=><img src={'http://localhost:8000/storage/app/public/'+rowData.Path} style={{width:50,borderRadius:'50%'}}/>
      //   // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
      // }
    ]);
    /// for summing the Available Quantity
  
    
   
  
  
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
          title={account_holder_name}
          columns={columns}
          data={data.importedbills}
          style={{padding:'3%',
          backgroundColor:'var(--transparent-black)',
          border:'3px var(--text-primary) solid',
          borderRadius:'20px',
          fontSize:'15px',
          boxShadow:'0 0 20px var(--spread) var(--text-primary)',
          color:'var(--text-primary)'
        }}
          
        options={{
            headerStyle:{
              backgroundColor:'var(--transparent-black)',
              fontSize:'15px',
              boxShadow:'0 0 20px var(--spread) var(--text-primary)',
              color:'var(--text-primary)'}
        }}
          
        />
  
  </ToastProvider>    
        
      </div>
    );
  };