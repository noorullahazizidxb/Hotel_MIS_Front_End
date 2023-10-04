import React,{useRef} from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ToastProvider } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import {  withStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import ReceiptIcon from '@material-ui/icons/Receipt';
import axios from 'axios';
import clsx from 'clsx';
import { withCookies,useCookies } from "react-cookie";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import '../../App.scoped.css';
import '../../index.css';
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
import {withRouter} from 'react-router-dom'

import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import {useHistory} from 'react-router-dom'
import QrReader from 'react-qr-reader';
import { ReceiptRounded } from '@material-ui/icons';


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

export default function Loan_Page(props) {
  const history=useHistory();
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Loan"
      />
      <div className={classes.container}>
        <Zoom in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <Loan_Form />
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
    Bill_Number: '',
    Customer_ID: '',
    Product_ID: '',
    Quantity: '',
    Price:'',
}

function Loan_Form(props) {
    // const { addOrEdit, recordForEdit } = props
    const { handleNext,recordForEdit} = props
    const [customers,setCustomers]=useState([]);
    const [bill_number,setBill_Number]=useState('');
    const [scan_file,setScan_File]=useState('');
    const [scan_cam,setScan_Cam]=useState('');
    const [total_bill_Money,setTotal_Bill_Money]=useState(0);
    const [customer_name,SetCustomer_Name]=useState('');
    const { addToast } = useToasts()
    const [cookies, setCookie, removeCookie] = useCookies(['Token'])
    const childRef = useRef();
    const qrRef = useRef();
    //creating api 
    const Api = axios.create({
      baseURL: 'http://localhost:8000/api/Rizq_Halal/',
      timeout: 2000,
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+cookies.Token,
      },
    });

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Bill_Number' in fieldValues)
            temp.Bill_Number = fieldValues.Bill_Number ? "" : " Bill_Number This field is required."
        if ('Customer_ID' in fieldValues)
            temp.Customer_ID = fieldValues.Customer_ID ? "" : " Customer_ID This field is required."
        
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

    const get_comboBx_value=async (value)=>{
      
        values.Customer_ID=value.id;
        SetCustomer_Name(value.Customer_Name);

        console.log(values);
      
     
    }
    
    //Function For Submitting the Form

    const Post_Loan=async (address,values)=>{
      
      await Api.post(address,values)
  .then(function (response) {
    Swal.fire(
      'Loaned!',
      'Pres Enter to Continue!',
      'success'
    )
  setTotal_Bill_Money(response.data);

  })
  .catch(function (error) {
  
    Swal.fire(
      'Error!',
      'An Unknown Error Occured During the Proccess!',
      'error'
    )
    
  })
  .then(function () {
    // always executed
  });
  
    }
  
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            // addOrEdit(values, resetForm);
          
        
        }

    }
    
const get_data=async (address)=>{
    await Api.get(address)
  .then(function (response) {
  
    setCustomers(response.data);
    
   
  })
  .catch(function (error) {
    addToast('an error occured during geting the products for combo box!',{
      appearance: 'error',
      autoDismiss: true,
    });
  })
  .then(function () {
    // always executed
  });
    }
    
    const get_bill_number=async (address)=>{
        await Api.get(address)
      .then(function (response) {
      
        setBill_Number(response.data);
        values.Bill_Number=response.data;
        
      })
      .catch(function (error) {
        addToast('an error occured during geting the products for combo box!',{
          appearance: 'error',
          autoDismiss: true,
        });
      })
      .then(function () {
        // always executed
      });
        }

    useEffect(async () => {
        // if (recordForEdit != null){
        //   setValues({
        //     ...recordForEdit
        // })
        // childRef.current.getAlert(recordForEdit.Product_ID);

        // }
        get_data('Customers');
        values.Bill_Number=bill_number;


            
            
        



    }, [bill_number])
    
const handleErrorFile=(error)=>{
    console.log(error);
}
const handleErrorCam=(error)=>{
  console.log(error);
}
const handleScanFile=(result)=>{
    if(result){
        setScan_File(result)
        console.log(scan_file);
        
    }
}
const handleScanCam=async (result_Cam)=>{
  if(result_Cam){
    if (validate()) {
      // addOrEdit(values, resetForm);
    
  
  
      result_Cam=JSON.parse(result_Cam);
      setScan_Cam(result_Cam)
      
      
      
      Swal.fire({
        title: 'Do You Want to Buy More Based On This Bill Number?',
        showDenyButton: true,
        confirmButtonText: 'Yes I want to buy',
        denyButtonText: `No Dont Buy`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          values.Product_ID=result_Cam.id;
          values.Quantity=1;
          values.Price=result_Cam.Sale_Price;
        
          Post_Loan('Loans/',values);;
          setValues({...initialFValues,Customer_ID:values.Customer_ID})
          childRef.current.getAlert(customer_name);
        } else if (result.isDenied) {
          
          values.Product_ID=result_Cam.id;
          values.Quantity=1;
          values.Price=result_Cam.Sale_Price;
          Post_Loan('Loans/',values);
          get_bill_number('get_loan_bill_number')
          childRef.current.getAlert('');
          
        }
      })
    }    
  }
}
const onScanFile=()=>{
    qrRef.current.openImageDialog();

}
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              
                <Controls.Input
                        name="Bill_Number"
                        label="Bill Number"
                        style={{width:'40%'}}
                        value={bill_number}
                        disabled
                        onChange={handleInputChange}
                        error={errors.Bill_Number}
                    />
               <Controls.Button
                            // type="submit"
                            onClick={()=>{
                            get_bill_number('get_loan_bill_number')

                            }}
                            text="Generate Bill"
                            style={{borderRadius:'10px',height:'10%'}}

                            variant="outlined" color="primary"
                            startIcon={<ReceiptRounded/>}
                            
                             />

            
                     <Controls.ComboBox_For_Customers
                        options={customers}
                        error={errors.Customer_ID}
                        get_comboBx_value={get_comboBx_value}
                        ref={childRef}
                    />
                 
                    <div style={{paddingTop:'20%',paddingLeft:'5%',width:'100%'}}>
                   <h1>Total Bill Money: {total_bill_Money}</h1> 
                    </div>
                      
                
                     
                  
                </Grid>
                {/* <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                <h1>{scan_file}</h1>

               <QrReader
                   ref={qrRef}
                   delay={300}
                   style={{width:'100%'}}
                   onError={handleErrorFile}
                   onScan={handleScanFile}
                   legacyMode
               />
                    
                </Grid> */}
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                

               <QrReader
                   
                   delay={300}
                   style={{width:'80%'}}
                   onError={handleErrorCam}
                   onScan={handleScanCam}
                   
               />
                  
                 

                    
                </Grid>
                
                <div class='row' style={{marginLeft:'33%'}}>
                        <Controls.Button
                            // type="submit"
                            onClick={onScanFile}
                            text="Browse"
                            variant="outlined" color="primary"
                            
                             />
                                            
                        </div>
            </Grid>
        </Form>
    )
}


