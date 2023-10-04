import React,{useRef} from 'react';
import Switch from '@material-ui/core/Switch';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ToastProvider } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import CenterFocusStrongRoundedIcon from '@material-ui/icons/CenterFocusStrongRounded';
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
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SaveAltRounded from '@material-ui/icons/SaveAltRounded';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import 'bootstrap/dist/css/bootstrap.min.css';
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
export default function Sales_Man_Settings(props){
  ///this state is for getting the companies and we wil use this state in function getSalesMan
  //this state is for updata where the use presses the update butting this state will change and
  // will have a function for that called send_record_from_table_to_form 
  const [record_for_update,setRecord_For_Update]=useState();
  const [cookies, setCookie, removeCookie] = useCookies(['Token'])
  const [salesman,setSalesMan]=useState();

  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout:5000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });
  const refresh_table=async (address)=>{
    await Api.get(address)
  .then(function (response) {
    // if(name=='company'){
  
    //   // setSalesMan(response.data);
    //   setSalesMan(response.data.salesman)
  
    // }else if(name=='products'){
    //   setSalesMan(response.data);
  
    // }else if(name=='accounts'){
    //   setAccounts(response.data);
    // }
    setSalesMan(response.data);
      
   
  })
  .catch(function (error) {
    alert('we cant get Companise'+error);
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
  
  // get_data('Companies','com
  if(salesman==undefined){
    refresh_table('SalesMan')

  }
  

  },[]);
  
  return (
    <Grid container>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<SalesMan_Add_Page Update_Record_For_Form={record_for_update} refresh_table={refresh_table}/>
</Grid>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<Bills_Modal refresh_table={refresh_table} salesman={salesman} send_record_from_table_to_form={send_record_from_table_to_form}/>
</Grid>
    </Grid>
    
  )
}
function SalesMan_Add_Page(props) {
  const {Update_Record_For_Form,refresh_table}=props;
  const history=useHistory();
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [companies,setCompanies]=useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['Token'])

  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 20000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });
  const get_companies=async (address)=>{
    await Api.get(address)
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
    
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(()=>{
    get_companies('Companies');

    
  },[])

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="IMPORT"
      />
      <div className={classes.container}>
        <Zoom in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <SalesMan_Settings_Form refresh_table={refresh_table} recordForEdit={Update_Record_For_Form} companies={companies} />
          
          </Paper>
          
        </Zoom>
        {/* <Zoom in={checked} stylze={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          <Paper elevation={4} className={classes.paper}>
            
          </Paper>
        </Zoom> */}
      </div>
    </div>
  );
}

const initialFValues = {
    id: 0,
    Sales_Man_Name: '',
    Phone_Numbers: '',
    Company_Id:'',
}

function SalesMan_Settings_Form(props) {
    // const { addOrEdit, recordForEdit } = props
    const {recordForEdit,companies,refresh_table} = props;
    const [updateflag,setUpdateFlag]=useState(false)
    const [salesman,setSalesMan]=useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['Token'])
  


  
    // this state will be used if we want to update a record and we want to change the picture so
    // the picture from the table which is being displayed from the table in the form will disapear 
    // and our new image from the input will be displayed
    
    
    const childRefCompanies = useRef();
    const get_company_combo_box_value=(value)=>{
      setValues({...values,Company_Id:value.id});
      
      
     
  }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Sales_Man_Name' in fieldValues)
            temp.Sales_Man_Name = fieldValues.Sales_Man_Name ? "" : " Sales_Man_Name This field is required."
        if ('Phone_Numbers' in fieldValues)
            temp.Phone_Numbers = fieldValues.Phone_Numbers ? "" : " Product_Description This field is required."
        
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

    const Post_SaleMan=async (address,value,selectedFile)=>{
      
      const formData=new FormData();
      formData.append("Sales_Man_Name",value.Sales_Man_Name);
      formData.append("Phone_Numbers",value.Phone_Numbers);
      formData.append("Company_Id",value.Company_Id);

          await fetch(address,{
            method:"POST",
            body:formData,
            headers: {
              "Accept":"application/json",
              "Authorization":"Bearer "+cookies.Token,
            },
          })
          .then((res)=>{
            Swal.fire(
              'success!',
              'record inserted successfully!',
              'success'
            )
            resetForm();
            childRefCompanies.current.getAlert([])

          })
          .catch((error)=>{
            Swal.fire(
              'Error!',
              'An Unknown Error Occured During the Proccess!',
              'error'
            )
            
          })
      
  
    }
    const Update_Sales_Man=async (address,value,selectedFile)=>{
      
      const formData=new FormData();
        
          formData.append("Sales_Man_Name",value.Sales_Man_Name);
          formData.append("Company_Id",value.Company_Id);  
          formData.append("Phone_Numbers",value.Phone_Numbers);
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
              'Company Updated!',
              'Pres Enter to Continue!',
              'success'
            )
            setUpdateFlag(false);
            resetForm();
            childRefCompanies.current.getAlert([])

            
          })
          .catch((error)=>{
            console.log(error)
            Swal.fire(
              'Error!',
              'An Unknown Error Occured During the Proccess!',
              'error'
            )
            
          })
      
  
    }
    const handleSubmit =async (e) => {
        e.preventDefault()
        if (validate()) {
            // addOrEdit(values, resetForm);
            if(updateflag!=false){
          Update_Sales_Man(`http://localhost:8000/api/Rizq_Halal/SalesMan/${values.id}?_method=PATCH`,values);
      
          refresh_table('SalesMan');
    
           
            }else{

              Post_SaleMan('http://localhost:8000/api/Rizq_Halal/SalesMan',values);
          
          refresh_table('SalesMan');


            }
        }

    }
    
    
    

    useEffect(()=>{
      
      if(recordForEdit!=null){
        
        setValues({...recordForEdit});
        setUpdateFlag(true);
        
        
        console.log(recordForEdit.companies);
        childRefCompanies.current.getAlert(recordForEdit.companies.Company_Name)

      }
  

    },[recordForEdit])
    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              
                <Controls.Input
                        name="Sales_Man_Name"
                        label="Name"
                        
                        value={values.Sales_Man_Name}
                        onChange={handleInputChange}
                        error={errors.Sales_Man_Name}
                    />         
                    <Controls.Input
                        name="Phone_Numbers"
                        label="Phone Numbers"
                        
                        value={values.Phone_Numbers}
                        onChange={handleInputChange}
                        error={errors.Phone_Numbers}
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
                
                <Controls.ComboBox_For_Companies
                      options={companies}
                      error={errors.Company_ID}
                      get_company_combo_box_value={get_company_combo_box_value}
                      ref={childRefCompanies}
                  />   
                  
                    
                    {/* {SelectedFile ? <img style={{width:'20%',height:'40%',border:'5px solid black',borderRadius:'10px'}} src={SelectedFile.name}/>:null} */}
                    
                    
                            
                </Grid>
                
               
            </Grid>
        </Form>
    )
}



function SalesMan_List(props) {

  
  const {handleOpenModal,send_record_from_table_to_form,lokup,salesman,refresh_table}=props;
  const [sales_man_list,setSalesMan_List]=useState();
  
  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])
  const [qrimage,setQRimage]=useState();

  
   
  const [columns, setColumns] = useState([
    { 
      title: "Name", field: "Sales_Man_Name"
    },
    { 
      title: "Company", field: "Company_Id",lookup:lokup,
    },
    { 
      
      title: "Total Contract Amount", field: "Total_Contract_Amount"
    },
    { 
      
      title: "Total Paid", field: "Total_Paid"
    },
    { 
      
      title: "Total Loans", field: "Total_Loans"
    },
    { 
      
      title: "Contacts", field: "Phone_Numbers"
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
  
  if(lokup!=undefined){
    
    setColumns([...columns,columns[1].lookup=lokup]);

  }

  

 
  

},[lokup]);

// setSalesMan([...products,sum])

  //creating api 
  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 10000,
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
        
          //   // setSalesMan(response.data);
          //   setSalesMan(response.data.salesman)
        
          // }else if(name=='products'){
          //   setSalesMan(response.data);
        
          // }else if(name=='accounts'){
          //   setAccounts(response.data);
          // }
            // setSalesMan(response.data);
            Swal.fire(
              'Sales Man Deleted Successfully!',
              'Pres Enter to Continue!',
              'success'
            )
            refresh_table('SalesMan');
            
         
        })
        .catch(function (error) {
          Swal.fire(
            'Failed to Delete the Sales Man!',
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
        title="Sales Man "
        columns={columns}
        style={{padding:'3%',borderRadius:'20px'}}
        elevation={4}
        data={salesman}
        // editable={{
        //   // onRowAdd: (newData) =>
        //   //   new Promise((resolve, reject) => {
        //   //     setTimeout(() => {
        //   //       setSalesMan([...products, newData]);

        //   //       resolve();
        //   //     }, 1000);
        //   //   }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         // const dataUpdate = [...products];
        //         // const index = oldData.tableData.id;
        //         // dataUpdate[index] = newData;
        //         // setSalesMan([...dataUpdate]);
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
            tooltip:'Delete the Sales Man',
            onClick:(event,rowData)=>{
             delete_Companies(`SalesMan/${rowData.id}`);
            }

          },
          {
            icon:tableIcons.ShowBells,
            tooltip:'Show Bills Based on This Sales Man',
            onClick:(event,rowData)=>{
             handleOpenModal(rowData);
             console.log(rowData)
            }

          }
        ]}
  
        
      />
      {qrimage ? (<a href={qrimage} download> <img src={qrimage} alt='no qr code'/></a>):null}
    </div>
  );
}


function Bills_Modal(props) {
  
  const {send_record_from_table_to_form,salesman,refresh_table}=props;
  const [cookies, setCookie, removeCookie,] = useCookies(['Token']);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data_for_modal, setData_For_Modal] = React.useState([]);
  const [companies,setCompanies]=useState(null);
  const [lookup_value_for_company_id_in_Company_List,setlookup_value_for_company_id_in_Company_List]=useState();
  
  const [salesman_name, setSalesMan_For_Modal] = React.useState();
    
  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 10000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });


   
    const get_companies=async (address)=>{
      await Api.get(address)
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
      // if (recordForEdit != null)
      //     setValues({
      //         ...recordForEdit
      //     })
  // }, [recordForEdit])
  if(companies!=null){
 
   setlookup_value_for_company_id_in_Company_List(companies.reduce(function(acc,cur,i){
     acc[cur.id]=cur.Company_Name;
     return acc;
   },{}));
  }else{
  get_companies('Companies')

  }
  

  
 
  
  },[companies]);
  

  const handleOpen = (value) => {
    setOpen(true);
    setData_For_Modal(value);
    setSalesMan_For_Modal(value.Sales_Man_Name)
  
    
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <SalesMan_List  
      send_record_from_table_to_form={send_record_from_table_to_form} 
      handleOpenModal={handleOpen}
      lokup={lookup_value_for_company_id_in_Company_List}
      salesman={salesman}
      
    

     refresh_table={refresh_table}/>
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
              
              <Company_Bills  Sales_Man_Name={salesman_name} data={data_for_modal} handleClose={handleClose}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
const Company_Bills=(props)=>{
  const { addToast } = useToasts()
  
  const {data,Sales_Man_Name,lookup,handleClose}=props;
  
  const [selectedRow,setSelectedRow]=useState(null);
  
  const [cookies, setCookie, removeCookie,] = useCookies(['Token']) 
  const [tablefooter_data,setTableFooter_Data]=useState();
   
  
    useEffect(() => {
      // if (recordForEdit != null)
      //     setValues({
      //         ...recordForEdit
      //     })
  // }, [recordForEdit])
  setTableFooter_Data([{Total_Contract_Amount:'100',Total_Paid:data.Total_Paid,Total_Loans:data.Total_Loans}])
  
  
  
 
  
  },[]);
  
  const [columns, setColumns] = useState([
    { 
      title: "Bill Number", field: "Bill_ID"
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

<MaterialTable
        icons={tableIcons}
        title={Sales_Man_Name}
        columns={columns}
        data={data.importedbills}
        style={{padding:'3%',borderRadius:'20px'}}
        footerData={tablefooter_data}
        onRowClick={((evt,selectedRow)=>{setSelectedRow(selectedRow.tableData.id)})}
        options={{
          rowStyle: rowData=>({
            backroundColor:(selectedRow===rowData.tableData.id)? '#EEE':'#FFF'
          }),
        }}
            />
   
      
    </div>
  );
};