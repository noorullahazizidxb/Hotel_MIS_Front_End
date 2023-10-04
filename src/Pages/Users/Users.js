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

export default function Users(props){
  ///this state is for getting the products and we wil use this state in function getProducts
  const [user,setUsers]=useState([]);
  //this state is for updata where the use presses the update butting this state will change and
  // will have a function for that called send_record_from_table_to_form 
  const [record_for_update,setRecord_For_Update]=useState();
  const [cookies, setCookie, removeCookie] = useCookies(['Token','User'])

  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 20000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });

  const getUsers=async (address)=>{
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
      setUsers(response.data);
      
   
  })
  .catch(function (error) {
    alert('we cant get user');
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
  
  getUsers('Users');
  },[]);
  
  return (
    <Grid container>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<User_Add_Page user_info={cookies.User} refresh_table={getUsers} Update_Record_For_Form={record_for_update} send_record_from_table_to_form={send_record_from_table_to_form}/>
</Grid>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<User_List user={user} refresh_table={getUsers} send_record_from_table_to_form={send_record_from_table_to_form}/>
</Grid>
    </Grid>
    
  )
}
function User_Add_Page(props) {
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
      <Grid item xs={6} lg={6} md={6} xl={6} sm={6}>
        <Zoom in={checked}>
        
          <Paper elevation={4} className={classes.paper}>
            <User_Settings_Form refresh_table={refresh_table} recordForEdit={Update_Record_For_Form} />

          </Paper>
       

          
        </Zoom>
        </Grid>
        <Grid item xs={6} lg={6} md={6} xl={6} sm={6}>
        <Zoom in={checked}>
        
          <Paper elevation={4} className={classes.paper} style={{height:'92%'}}>
         <Grid container direction="row">
            <Grid lg={4} xl={4} sm={4} md={4} xs={4} style={{height:'200px',padding:'1%',marginTop:'1%'}}>
            <Avatar src={'http://localhost:8000/'+user_info.Path}  style={{height:'93%',width:'70%',borderRadius:'50%',border:'1px solid black'}} alt="No Image"/>
            </Grid>
            <Grid lg={8} xl={8} sm={8} md={8} xs={8} style={{marginTop:"7%"}} direction="row">
             <h4>Name: {user_info.name}</h4>  
             <hr></hr>
             <h4>Email: {user_info.email}</h4>  
             <Controls.Button
                            // type="submit"
                            onClick={()=>{send_record_from_table_to_form(user_info)}}
                            style={{width:'20%',height:'7%',borderRadius:'10px'}}
                            variant="contained" color="secondary"
                            startIcon={<CancelRoundedIcon/>}
                            

                            text="Edit"
                            
                            
                             />
            </Grid>
         </Grid>
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

const initialFValues = {
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    Path: '',
}

function User_Settings_Form(props) {
    // const { addOrEdit, recordForEdit } = props
    const {recordForEdit,refresh_table} = props;
    
    const [postpath,setPostPath]=useState();
    
    const [updateflag,setUpdateFlag]=useState(false)
    const [updatepath,setUpdatePath]=useState();
    const [SelectedFile,setSelectedFile]=useState();

    const [cookies, setCookie, removeCookie] = useCookies(['Token'],['User']);
    const [imageupdateflag,setImageUpdateFlag]=useState(false)

    // this state will be used if we want to update a record and we want to change the picture so
    // the picture from the table which is being displayed from the table in the form will disapear 
    // and our new image from the input will be displayed
    
    const childRef = useRef();
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : " name   is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : " email is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : " password is required."
        if ('password_confirmation' in fieldValues)
            temp.password_confirmation = fieldValues.password_confirmation ? "" : " Password Doesnt Match."
        
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
      timeout: 2000,
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+cookies.Token,
      },
    });
    //Function For Submitting the Form


    const Post_User=async (address,value,selectedFile)=>{
      
      const formData=new FormData();
          formData.append("Path",selectedFile);
          formData.append("name",value.name);
          formData.append("email",value.email);
          formData.append("password",value.password);
          formData.append("password_confirmation",value.password_confirmation);
          await fetch(address,{
            method:"POST",
            body:formData,
            headers: {
              "Accept":"application/json",
              "Authorization":"Bearer "+cookies.Token,
            },
          })
          .then((result)=>{
            Swal.fire(
              'User Added!',
              'Pres Enter to Continue!',
              'success'
            )
              resetForm();
          })
          .catch((error)=>{
            Swal.fire(
              'Error!',
              'An Unknown Error Occured During the Proccess!',
              'error'
            )
            
          })
      
  
    }
    const Put_User=async (address,value,selectedFile)=>{
      
      const formData=new FormData();
          formData.append("Path",selectedFile);
          formData.append("name",value.name);
          formData.append("email",value.email);
          formData.append("password",value.password);
          formData.append("password_confirmation",value.password_confirmation);
          await fetch(address,{
            method:"POST",
            body:formData,
            headers: {
              "Accept":"application/json",
              "Authorization":"Bearer "+cookies.Token,
            },
          })
          .then((result)=>{
            Swal.fire(
              'User Updated!',
              'Pres Enter to Continue!',
              'success'
            )
              resetForm();
          })
          .catch((error)=>{
            Swal.fire(
              'Error!',
              'Password Confirmation Error!',
              'error'
            )
            
          })
      
  
    }
   

    const handleSubmit =async (e) => {
        e.preventDefault()
        if (validate()) {
            // addOrEdit(values, resetForm);
            if(updateflag!=false){
              if(values.password_confirmation==values.password){
                Put_User(`http://127.0.0.1:8000/api/Rizq_Halal/update_user/${recordForEdit.id}?_method=PATCH`,values,SelectedFile);
                setPostPath(false);
                setUpdateFlag(false);
                setSelectedFile();
                refresh_table('Users');
              }else{
                Swal.fire(
                  'Error!',
                  'Password Confirmation Error!',
                  'error'
                )
              }

             
            }else{
              if(values.password_confirmation==values.password){
                Post_User('http://localhost:8000/api/signup',values,SelectedFile);
                setPostPath(false);
                setSelectedFile();
                refresh_table('Users');
              }else{
                Swal.fire(
                  'Error!',
                  'Password Confirmation Error!',
                  'error'
                )
              }
           
            }
        }

    }
    

    

    useEffect(()=>{
      if(recordForEdit!=null){
        if(postpath!=null){
          setPostPath(null);
        }
        setValues({...recordForEdit});
        setUpdateFlag(true);
        setImageUpdateFlag(true);
        setSelectedFile(recordForEdit.Path);
      }
    },[recordForEdit])
    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              
                <Controls.Input
                        name="name"
                        label="User Name"
                        
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />    
                               
                     <Controls.Input
                        name="email"
                        label="Email"
                        
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
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
                <Controls.Input
                        name="password"
                        label="Password"
                        
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                       <Controls.Input
                        name="password_confirmation"
                        label="Confirm Password"
                        
                        value={values.password_confirmation}
                        onChange={handleInputChange}
                        error={errors.password_confirmation}
                    />           
                    
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
                
               
            </Grid>
        </Form>
    )
}



function User_List(props) {
  const {handleOpenModal,user,send_record_from_table_to_form,refresh_table}=props;
  const [cookies, setCookie, removeCookie,] = useCookies(['Token','User'])
  const [qrimage,setQRimage]=useState();

  
  const [columns, setColumns] = useState([
    { 
      title: "Name", field: "name"
    },
    { 
      title: "Email", field: "email"
    },
    { 
      title: "Total Expanse", field: "Total_Expanse"
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


},[user]);

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
              'Expanse Deleted Successfully!',
              'Pres Enter to Continue!',
              'success'
            )
            refresh_table('Users');
            
         
        })
        .catch(function (error) {
          Swal.fire(
            'Sorry This User Has Some Expanse!',
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
        data={user}
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
            icon:tableIcons.Delete,
            tooltip:'Delete the user',
            onClick:(event,rowData)=>{
              if(rowData.id==cookies.User.id){
                Swal.fire(
            'Sorry But  You  Can  Not  Delete Your Own User!',
            'Pres Enter to Continue!',
            'error'
          )
              }else{
             delete_user(`delete_user/${rowData.id}`);

              }
              
            }
          
          }
        ]}
        
      />
      {qrimage ? (<a href={qrimage} download> <img src={qrimage} alt='no qr code'/></a>):null}
    </div>
  );
}
