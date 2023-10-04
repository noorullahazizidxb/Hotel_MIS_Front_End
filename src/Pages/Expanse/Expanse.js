import React,{useRef} from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ToastProvider } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SaveAltRounded from '@material-ui/icons/SaveAltRounded';

import Swal from 'sweetalert2';
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
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import  { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import {useHistory} from 'react-router-dom'
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
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import {withRouter} from 'react-router-dom'
import ViewColumn from '@material-ui/icons/ViewColumn';
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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
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
export default function Expanse(props){
  ///this state is for getting the products and we wil use this state in function getProducts
  const [expanse,setExpanse]=useState([]);
  //this state is for updata where the use presses the update butting this state will change and
  // will have a function for that called send_record_from_table_to_form 
  const [record_for_update,setRecord_For_Update]=useState();
  const [cookies, setCookie, removeCookie] = useCookies(['Token'])

  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 20000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });
  const getExpanse=async (address)=>{
    await Api.get(address)
  .then(function (response) {
    // if(name=='company'){
  
    //   // setCompanies(response.data);
    //   setSalesMan(response.data.salesman)
  
    // }else if(name=='products'){
    //   setCustomer(response.data);
  
    // }else if(name=='accounts'){
    //   setAccounts(response.data);
    // }
      setExpanse(response.data);
      
   
  })
  .catch(function (error) {
    alert('we cant get Expanse');
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
  
  getExpanse('Expanses');


  },[]);
  
  return (
    <Grid container>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<Expanse_Add_Page refresh_table={getExpanse} Update_Record_For_Form={record_for_update}/>
</Grid>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<Expanse_List expanse={expanse}  refresh_table={getExpanse} send_record_from_table_to_form={send_record_from_table_to_form}/>
</Grid>
    </Grid>
    
  )
}
function Expanse_Add_Page(props) {
  const {refresh_table,Update_Record_For_Form}=props;
  const history=useHistory();
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Zoom in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <Expanse_Settings_Form refresh_table={refresh_table} recordForEdit={Update_Record_For_Form} />
          
          </Paper>
          
        </Zoom>
        {/* <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          <Paper elevation={4} className={classes.paper}>
            
          </Paper>
        </Zoom> */}
      </div>
    </div>
  );
}

const initialFValues = {
    id: 0,
    UserName: '',
    Expanse: '',
    Description: '',
    Acount_Type: ''
}

function Expanse_Settings_Form(props) {
    // const { addOrEdit, recordForEdit } = props
    const {recordForEdit,refresh_table} = props;
    
    const [accounts,setAccounts]=useState([]);
    const [updateflag,setUpdateFlag]=useState(false)

    const [cookies, setCookie, removeCookie] = useCookies(['Token','User'])
    // this state will be used if we want to update a record and we want to change the picture so
    // the picture from the table which is being displayed from the table in the form will disapear 
    // and our new image from the input will be displayed
    
    const childRef = useRef();
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('UserName' in fieldValues)
            temp.UserName = fieldValues.UserName ? "" : " UserID   is required."
        if ('Expanse' in fieldValues)
            temp.Expanse = fieldValues.Expanse ? "" : " Expanse is required."
        if ('Description' in fieldValues)
            temp.Description = fieldValues.Description ? "" : " Description is required."
        if ('Acount_Type' in fieldValues)
            temp.Acount_Type =fieldValues.Acount_Type ? "" : " Account Type  is required."
        
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

    //creating api 
    const Api = axios.create({
      baseURL: 'http://localhost:8000/api/Rizq_Halal/',
      timeout: 10000,
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+cookies.Token,
      },
    });
    //Function For Submitting the Form


    const PostExpanse=async (address,value)=>{
      
      Api.post(address,value)
      .then(function (response) {
        Swal.fire(
          'Expanse  Added Successfully!',
          'Pres Enter to Continue!',
          'success'
        )
        
        resetForm();
        
        
       
      })
      .catch(function (error) {
      
        Swal.fire(
          'we dont have that much money in this account type!',
          'Pres Enter to Continue!',
          'error'
        )
        console.log(error)
      
        
        
      })
      .then(function () {
        // always executed
      });
      
    }
    const Update_Expanse=async (address,value)=>{
      await Api.put(address,value)
      .then(function (response) {
        // if(name=='company'){
            Swal.fire(
                'success!',
                'Your Expanse is updated successfully updated successfully!',
                'success'
              )
              resetForm();
        //   // setAccount_type(response.data);
        //   setAccount_type(response.data.salesman)
      
        // }else if(name=='products'){
        //   setAccount_type(response.data);
      
        // }else if(name=='accounts'){
        //   setAccounts(response.data);
        // }
        
          
       
      })
      .catch(function (error) {
        Swal.fire('we dont have that much money in this account type!', '', 'error')

      })
      .then(function () {
        // always executed
      });
    
  }
   

    const handleSubmit =async (e) => {
              values.UserName=cookies.User.id;
      
        e.preventDefault()
        if (validate()) {

            // addOrEdit(values, resetForm);
            if(updateflag!=false){
              Update_Expanse(`Expanses/${values.id}`,values);
      
          refresh_table('Expanses');
            }else{
    
              PostExpanse('Expanses',values);
              refresh_table('Expanses');
            }
        
        
        }

    }
    
const get_accounts=async (address)=>{
  await Api.get(address)
.then(function (response) {
  // if(name=='company'){

  //   // setCompanies(response.data);
  //   setSalesMan(response.data.salesman)

  // }else if(name=='products'){
  //   setProducts(response.data);

  // }else if(name=='accounts'){
  //   setAccounts(response.data);
  // }
    setAccounts(response.data);
  
 
})
.catch(function (error) {
  alert('we cant get accounts');
})
.then(function () {
  // always executed
});
  }
    

    

    useEffect(()=>{
      if(recordForEdit!=null){
       
        setValues({...recordForEdit});



        setUpdateFlag(true);
        get_accounts('Accounts');

      }
      get_accounts('Accounts');
    },[recordForEdit])
    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              

                        <Controls.Input
                        name="Expanse"
                        label="Enter Your Expanse Here"
                        
                        value={values.Expanse}
                        onChange={handleInputChange}
                        
                        error={errors.Expanse}
                    />         

                        <Controls.Input
                        name="Description"
                        label="Enter the Description"
                        
                        value={values.Description}
                        onChange={handleInputChange}
                        error={errors.Description}
                    />      
                           
                           <div class='row' style={{marginLeft:'20%',marginTop:'0%'}}>
                       {updateflag?<Controls.Button
                            type="submit"
                            // onClick={}
                            style={{width:'30%',height:'100%',borderRadius:'10px'}}
                            text="Update"
                            variant="contained" color="primary"
                            
                            startIcon={<UpdateRoundedIcon />}
                             />:<Controls.Button
                            type="submit"
                            // onClick={}
                            style={{width:'30%',height:'100%',borderRadius:'10px'}}
                            text="Save"
                            
                            variant="contained" color="primary"
                            startIcon={<SaveAltRounded/>}
                             />} 

                        <Controls.Button
                            // type="submit"
                            onClick={resetForm}
                            style={{width:'30%',height:'100%',borderRadius:'10px'}}
                            variant="contained" color="secondary"
                            startIcon={<CancelRoundedIcon/>}
                            

                            text="Cancel"
                            
                            
                             />
                                            
                        </div>
 
                  
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Controls.Select
                        name="Acount_Type"
                        label="Select An Account"
                        value={values.Acount_Type}
                        onChange={handleInputChange}
                        options={accounts}
                        error={errors.Acount_Type}
                    />
                          
                </Grid>
                
               
            </Grid>
        </Form>
    )
}



function Expanse_List(props) {
  const {handleOpenModal,expanse,send_record_from_table_to_form,refresh_table}=props;
  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])
  const [qrimage,setQRimage]=useState();


  
  
  const [columns, setColumns] = useState([
    { 
      title: "User Name", field: "user[name]",
    },
    { 
      title: "Expanse", field: "Expanse"
    },
    { 
      title: "Description", field: "Description"
    },
    { 
      title: "Account", field: "acountype[Acount_Name]"
    },
  ]);
  /// for summing the Available Quantity
 
  
  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
// }, [recordForEdit])

// get_data('Companies','company');


},[]);

// setuser([...customer,sum])

  //creating api 
  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 10000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });
  const delete_user=(address)=>{
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
        
          // }else if(name=='customer'){
          //   setcustomer(response.data);
        
          // }else if(name=='accounts'){
          //   setAccounts(response.data);
          // }
            // setcustomer(response.data);
            Swal.fire(
              'Customer Deleted Successfully!',
              'Pres Enter to Continue!',
              'success'
            )
            refresh_table('Expanses');
            
         
        })
        .catch(function (error) {
          Swal.fire(
            'we couldnt delete the expanse!',
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
        title="users"
        columns={columns}
        style={{padding:'3%',borderRadius:'20px'}}
        elevation={4}
        data={expanse}
        // editable={{
        //   // onRowAdd: (newData) =>
        //   //   new Promise((resolve, reject) => {
        //   //     setTimeout(() => {
        //   //       setcustomer([...customer, newData]);

        //   //       resolve();
        //   //     }, 1000);
        //   //   }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         // const dataUpdate = [...customer];
        //         // const index = oldData.tableData.id;
        //         // dataUpdate[index] = newData;
        //         // setcustomer([...dataUpdate]);
        //         handleOpenModal();
        //         resolve();
        //       }, 1000);
        //     }),
        //           }}
        actions={[
          {
            icon:tableIcons.Edit,
            tooltip:'Update',
            onClick:(event,rowData)=>{
              
              
              
              
              send_record_from_table_to_form(rowData);
            }

          },
          {
            icon:tableIcons.Delete,
            tooltip:'Delete the Expanse',
            onClick:(event,rowData)=>{
             delete_user(`Expanses/${rowData.id}`);
            }

          }
        ]}
        
      />
      {qrimage ? (<a href={qrimage} download> <img src={qrimage} alt='no qr code'/></a>):null}
    </div>
  );
}
