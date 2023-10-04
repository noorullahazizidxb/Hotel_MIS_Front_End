import React,{useRef} from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
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
import Form_ValueApiProvider from "./Form_ValueApi";


const initialFValues = {
    id: 0,
    Em_Name: '',
    Current_City:'',
    Email:'',
    Ph_Number:'',
    path:'',
    Deleted_BY: '',
}
export default function Ahmad(props) {
    // const { addOrEdit, recordForEdit } = props
    const { addToast } = useToasts();
    const { handleNext,recordForEdit,val,handleReset,get_data} = props
    const [updateflag,setUpdateFlag]=useState(false);
    const [postpath,setPostPath]=useState();
    const [updatepath,setUpdatePath]=useState();
    const [imageupdateflag,setImageUpdateFlag]=useState(false)
    const [SelectedFile,setSelectedFile]=useState();   
    
  
    const [cookies, setCookie, removeCookie] = useCookies(['Token']);
 

    
   
 

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Em_Name' in fieldValues)
            temp.Em_Name = fieldValues.Em_Name ? "" : " Em_Name This field is required."
        if ('Current_City' in fieldValues)
            temp.Current_City = fieldValues.Current_City ? "" : " Current_City`This field is required."
        if ('Email' in fieldValues)
            temp.Email = fieldValues.Email ? "" : " Email This field is required."
        if ('Ph_Number' in fieldValues)
            temp.Ph_Number = fieldValues.Ph_Number ? "" : " Ph_Number This field is required."
        
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
      // var testObject = { 'one': 1, 'two': 2, 'three': 3 };

      // // Put the object into storage
      // localStorage.setItem('testObject', JSON.stringify(testObject));
      
      // // Retrieve the object from storage
      // var retrievedObject = localStorage.getItem('testObject');
      
      // console.log('retrievedObject: ', JSON.parse(retrievedObject));
      var form_val_for_transfering = localStorage.getItem('Employee_Record');

    useEffect(() => {
      if(form_val_for_transfering==null)
      {
        localStorage.setItem('Employee_Record', JSON.stringify(values));
      }
      form_val_for_transfering = localStorage.getItem('Employee_Record');

      
      // console.log('retrievedObject: ', JSON.parse(form_val_for_transfering));
      var data=JSON.parse(form_val_for_transfering)
      //  console.log(JSON.parse(localStorage.getItem('Form_Val')));

      // console.log(data);
        if (data != null){
          setValues({
            ...data
        })
       

        }
       
       

    }, [])
    
    

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="Em_Name"
                        label="Employee Name"
                        value={values.Em_Name}
                        onChange={handleInputChange}
                        error={errors.Em_Name}
                    />

           
                <Controls.Input
                      label="Current City"
                      name="Current_City"
                      value={values.Current_City}
                      onChange={handleInputChange}
                      error={errors.Current_City}
                  />

                  
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                              label="Email"
                              name="Email"
                              value={values.Email}
                              onChange={handleInputChange}
                              error={errors.Email}
                          />
                 
                <Controls.Input
                              label="Ph Number"
                              name="Ph_Number"
                              value={values.Ph_Number}
                              onChange={handleInputChange}
                              error={errors.Ph_Number}
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
                    <Typography variant="body2">Please be aware that this step cant be undone.</Typography>
                  </CardContent>
                  <CardActions>
                  
                  <Controls.Button
                          type='submit'
                          onClick={()=>{
                            localStorage.setItem('Employee_Record', JSON.stringify(values));
                            console.log(values)
                          
                            
                           


                          }}
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          text="Next"
                          
                          variant="contained" color="primary"
                          startIcon={<SaveAltRounded/>}
                           />

                      <Controls.Button
                          // type="submit"
                          onClick={resetForm}
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          variant="contained" color="secondary"
                          startIcon={<CancelRoundedIcon/>}
                          

                          text="Cancel"
                          
                          
                           />
                       <Controls.Button
                          // type="submit"
                          onClick={handleReset}
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          variant="contained" color="secondary"
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