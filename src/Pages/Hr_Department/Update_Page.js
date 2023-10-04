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
import {withRouter} from 'react-router-dom';

import Notification from "../../components/Notification";
import { useHistory } from 'react-router-dom';
import { SaveAltRounded } from '@material-ui/icons';
import CancelRounded from '@material-ui/icons/CancelRounded';



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

export default function Update_Page(props) {
  const history=useHistory();
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  // const rowData=props.location.state.rowData;
  const [rowData,setRowData]=React.useState(history.location.state.rowData)
  const [prodname,setProdname]=React.useState(history.location.state.prname)
  const [prod,setProd]=React.useState(history.location.state.prod)
  
  
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="IMPORT"
      />
      <div className={classes.container}>
        <Zoom in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <CustomizedSteppers recordForEdit_Product={rowData} prodname={prodname} prod={prod}/>
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




const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AddShoppingCartIcon />,
    2: <ReceiptIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const StepperStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(4)
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Import Some Products', 'Save The Bill of the Products'];
}

function getStepContent(step,handleNext,reset,recordForEdit_Product,record_for_edit_bill,salesman,com,prodname,prod) {
  switch (step) {
    case 0:
      return 'Noting';
    case 1:
      return <Import_Stocks_Form  handleNext={handleNext} recordForEdit={recordForEdit_Product} prodname={prodname} prod={prod}/>;
    case 2:
      return <Imported_Bill_Form saleman={salesman} com={com} reset={reset} recordForEdit={record_for_edit_bill}/>;
    default:
      return 'Unknown step';
  }
}

function CustomizedSteppers(props) {
  
  const {recordForEdit_Product,prod,prodname}=props;
  const classes = StepperStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const [cookies, setCookie, removeCookie] = useCookies(['Token'])
  const [record_for_edit_bill,setRecord_for_edit_bill]=useState([]);
  const [salesman,setSalesMan]=useState([]);
  const [com,setCom]=useState([]);
  


console.log(recordForEdit_Product);

  const handleNext = (recordForEdit) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    if(recordForEdit!=null)
    setRecord_for_edit_bill(recordForEdit);
    setSalesMan(recordForEdit['salesman']);
    setCom(recordForEdit['companies']);
    
    
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  return (
    <div className={classes.root}>
      
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
         
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep,handleNext,handleReset,recordForEdit_Product,record_for_edit_bill,salesman,com,prodname,prod)}</Typography>
            
          </div>
      
      </div>


    </div>
  );
}








const initialFValues = {
    id:0,
    Bill_ID: '',
    Product_ID: '',
    Quantity: '',
    Total_Price: '',
}

function Import_Stocks_Form(props) {
    // const { addOrEdit, recordForEdit } = props
    const history=useHistory();
    const { handleNext,prodname,recordForEdit,prod} = props
    const [bill_record_for_edit,setBillRecord_FroEdit]=useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    // const [prod,setProd]=useState([]);
    const { addToast } = useToasts()
    const [cookies, setCookie, removeCookie] = useCookies(['Token'])
    const childRef = useRef();
    

    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Bill_ID' in fieldValues)
            temp.Bill_ID = fieldValues.Bill_ID ? "" : " Bill_ID This field is required."
        if ('Product_ID' in fieldValues)
            temp.Product_ID = fieldValues.Product_ID ? "" : " Product_ID This field is required."
        if ('Quantity' in fieldValues)
            temp.Quantity = fieldValues.Quantity ? "" : "Maximum 10 numbers required."
        if ('Total_Price' in fieldValues)
            temp.Total_Price = fieldValues.Total_Price ? "" : "This field is required."
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
    const get_comboBx_value=(value)=>{
      
        setValues({...values,Product_ID:value.id});
        
      
    
     
    }
    //creating api 
    const Api = axios.create({
      baseURL: 'http://localhost:8000/api/Rizq_Halal/',
      timeout: 10000,
      headers: {
        "Authorization":"Bearer "+cookies.Token,
      },
    });
//     //Function For Submitting the Form

//     const Post_Product=(address,values)=>{
    
//       Api.post(address,values)
//   .then(function (response) {
  
//     Swal.fire({
//       title: 'Do You Want to Buy More Based On This Bill Number?',
//       showDenyButton: true,
//       confirmButtonText: 'Yes I want to buy',
//       denyButtonText: `No Dont By`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         Swal.fire('Saved!', '', 'success')
//         setValues({...initialFValues,Bill_ID:values.Bill_ID})
//         childRef.current.getAlert();

        
//       } else if (result.isDenied) {
//         Swal.fire('Saved!', '', 'success')
        
//         handleNext(values.Bill_ID,response.data.Total_Price);
        
//       }
//     })
    
   
//   })
//   .catch(function (error) {
  
//     alert('record not saved dou to some errors'+error)
    
//   })
//   .then(function () {
//     // always executed
//   });
  
//     }
  
    const Update_Product=(address,values)=>{
      Swal.fire({
        title: `Do You Want to Update theis Bill Number ${values.Bill_ID}`,
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
    
          Api.put(address,values)
          .then(function (response) {
            Swal.fire('Updated!', 'your record is successfully updated', 'success')
            //we wil use this response.data['Final_Bill_Table'][0] to find the data becuase the data is an array of array
            //and the back-end has sent bill record for us so we have to pass it to the second form.
            // console.log(response.data['Final_Bill_Table'][0]);
            handleNext(response.data['Final_Bill_Table'][0]);
            
           
          })
          .catch(function (error) {
          
            alert('record not saved dou to some errors'+error)
            
          })
          .then(function () {
            // always executed
          });
        
          
          
        } else if (result.isDenied) {
          
        }
      })
      
    }
    const handleSubmit = e => {
      
        e.preventDefault()
        if (validate()) {

          
          Update_Product(`Import_Product/${values.id}`,values)
        }

    }

    //getting the products

  

    
    useEffect(() => {

      
        
        if (recordForEdit != null){
          console.log(prodname);
          childRef.current.getAlert(prodname);

          setValues({
            id:recordForEdit.id,
            Bill_ID:recordForEdit.Bill_ID,
            Product_ID:recordForEdit.Product_ID,
            Quantity:recordForEdit.Quantity,
            Total_Price:recordForEdit.Total_Price
        })
          

    

        }

              

        
    }, [recordForEdit])
    
    

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
                <Grid item xs={6}>
                    
                     <Controls.ComboBox_For_Product_ID
                        options={prod}
                        error={errors.Product_ID}
                        get_comboBx_value={get_comboBx_value}
                        ref={childRef}
                    />
                     <Controls.Input
                        label="Quantity"
                        name="Quantity"
                        value={values.Quantity}
                        onChange={handleInputChange}
                        error={errors.Quantity}
                        
                    />
                    

                    

                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                        label="Total Price"
                        name="Total_Price"
                        value={values.Total_Price}
                        onChange={handleInputChange}
                        error={errors.Total_Price}
                        
                    />
                    
                  
                </Grid>
                
                <div class='row' style={{marginLeft:'10%',marginTop:'0%'}}>
                      
                      <Controls.Button
                          type="submit"
                          // onClick={}
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
                          startIcon={<CancelRounded/>}
                          

                          text="Cancel"
                          
                          
                           />
                                          
                      </div> 
            </Grid>
        </Form>
    )
}


const initialedValues = {
  id: 0,
  Bill_ID: '',
  Company_ID: '',
  Sales_Man_ID: '',
  Total_Money:'',
  Total_Paid: '',
  Acount_Type:''
  
}
const Imported_Bill_Form=withRouter((props)=>{
  const history=useHistory();
  const { reset,recordForEdit,com,saleman} = props;

  const [products,setProducts]=useState([]);
  const [salesman,setSalesMan]=useState([]);
  const [companies,setCompanies]=useState([]);
  const [accounts,setAccounts]=useState([]);
  const [bid,setBid]=useState([]);
  
  const { addToast } = useToasts()
  const [cookies, setCookie, removeCookie] = useCookies(['Token'])
  const childRefCompanies = useRef();
  const childRefSalesMan = useRef();
  

  const validate = (fieldValues = values) => {
      let temp = { ...errors }
      if ('Total_Paid' in fieldValues)
          temp.Total_Paid = fieldValues.Total_Paid<=values.Total_Money ? "" : "you should pay less then then total price!"
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
  } = useForm(initialedValues, true, validate);



  const get_company_combo_box_value=(value)=>{
      setValues({...values,Company_ID:value.id});
      setSalesMan(value.salesman);
      
     
  }

  const get_salesman_combobox_value=(value)=>{
    setValues({...values,Sales_Man_ID:value.id});
    
  }
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

  const Update_Bill=(address,values)=>{
  
    Api.put(address,values)
.then(function (response) {
  Swal.fire('Form Submitted!', 'form is updated successfully ', 'success')
  
  reset();
  history.push('/Product_List');


  
 
})
.catch(function (error) {
  console.log(error)
  

  
  
})
.then(function () {
  // always executed
});

  }


  const handleSubmit = e => {
      e.preventDefault()
      if (validate()) {
          // addOrEdit(values, resetForm);
          console.log(values)
          Update_Bill(`Imported_Bills/${values.id}`,values);
          
          
          
         

      }

  }



  




const get_accounts=(address)=>{
  Api.get(address)
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

  const get_companies=(address)=>{
    Api.get(address)
  .then(function (response) {
  
      setCompanies(response.data);
     
      
    
   
  })
  .catch(function (error) {
  alert('we cant get companies');
  console.log(error)
    
  })
  .then(function () {
    // always executed
  });
    }
  
  useEffect(() => {
      if (recordForEdit != null)
      {
        setValues({
          id:recordForEdit.id,
          Bill_ID:recordForEdit.Bill_ID,
          Company_ID:recordForEdit.Company_ID,
          Sales_Man_ID:recordForEdit.Sales_Man_ID,
          Total_Money:recordForEdit.Total_Money,
          Total_Paid:recordForEdit.Total_Paid,
          Acount_Type:recordForEdit.Acount_Type
      })
      
          
      childRefSalesMan.current.getAlert(saleman.Sales_Man_Name);
      
      childRefCompanies.current.getAlert(com.Company_Name);
      
      }
      get_accounts('Accounts');
      get_companies('Companies');
          
          
          
        // console.log(recordForEdit.companies.Company_Name);
      // childRefCompanies.current.getAlert(recordForEdit.companies.Company_Name);
     
      // childRefSalesMan.cureent.getalert(recordForEdit.salesman.Sales_Man_Name);
  }, [saleman,com])
  
  // get_data('Companies','company');


  return (
      <Form onSubmit={handleSubmit}>
          <Grid container>
              <Grid item xs={6}>
              <Controls.Input
                      label="Bill Number"
                      value={values.Bill_ID}
                      error={errors.Bill_ID}
                      onChange={handleInputChange}


                      
                  />
            
                  <Controls.ComboBox_For_Companies
                      options={companies}
                      error={errors.Company_ID}
                      get_company_combo_box_value={get_company_combo_box_value}
                      ref={childRefCompanies}
                  />
                  <Controls.ComboBox_For_Sales_Man
                      options={salesman}
                      get_comboBx_value={get_salesman_combobox_value}
                      ref={childRefSalesMan}
                  /> 
                 
                  

              </Grid>
              <Grid item xs={6}>
              <Controls.Input
                      label="Total Price"
                      value={values.Total_Money}
                      onChange={handleInputChange}
                      disabled
                  />
                   <Controls.Input
                      label="Pay"
                      name="Total_Paid"
                      value={values.Total_Paid}
                      onChange={handleInputChange}
                      error={errors.Total_Paid}
                  />
                  <Controls.Select
                        name="Acount_Type"
                        label="Select Account"
                        value={values.Acount_Type}
                        onChange={handleInputChange}
                        options={accounts}
                        error={errors.Acount_Type}
                        
                        
                    />
                 
                
                 <div class='row' style={{marginLeft:'10%',marginTop:'0%'}}>
                      
                      <Controls.Button
                          type="submit"
                          // onClick={}
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          text="Save"
                          
                          variant="contained" color="primary"
                          startIcon={<SaveAltRounded/>}
                           />

                      <Controls.Button
                          // type="submit"
                          onClick={resetForm}
                          style={{width:'40%',height:'100%',borderRadius:'10px'}}
                          variant="contained" color="secondary"
                          startIcon={<CancelRounded/>}
                          

                          text="Cancel"
                          
                          
                           />
                                          
                      </div>
              </Grid>
          </Grid>
      </Form>
  )
});