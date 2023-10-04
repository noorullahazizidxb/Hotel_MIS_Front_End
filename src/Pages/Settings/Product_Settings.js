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
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SaveAltRounded from '@material-ui/icons/SaveAltRounded';
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
export default function Product_Settings(props){
  ///this state is for getting the products and we wil use this state in function getProducts
  const [products,setProducts]=useState([]);
  //this state is for updata where the use presses the update butting this state will change and
  // will have a function for that called send_record_from_table_to_form 
  const [record_for_update,setRecord_For_Update]=useState();
  const [cookies, setCookie, removeCookie] = useCookies(['Token'])

  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 2000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });
  const getProducts=async (address)=>{
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
      setProducts(response.data);
      
   
  })
  .catch(function (error) {
    alert('we cant get Products');
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
  
  getProducts('Product')
  },[]);
  
  return (
    <Grid container>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<Product_Add_Page refresh_table={getProducts} Update_Record_For_Form={record_for_update}/>
</Grid>
<Grid lg={12} xl={12} md={8} sm={8} xs={8} >
<Product_List products={products} refresh_table={getProducts} send_record_from_table_to_form={send_record_from_table_to_form}/>
</Grid>
    </Grid>
    
  )
}
function Product_Add_Page(props) {
  const {refresh_table,Update_Record_For_Form}=props;
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
        label="IMPORT"
      />
      <div className={classes.container}>
        <Zoom in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <Product_Settings_Form refresh_table={refresh_table} recordForEdit={Update_Record_For_Form} />
          
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
    Product_Name: '',
    Sale_Price: '',
    Product_Description: '',
}

function Product_Settings_Form(props) {
    // const { addOrEdit, recordForEdit } = props
    const {recordForEdit,refresh_table} = props;
    const [SelectedFile,setSelectedFile]=useState();
    const [postpath,setPostPath]=useState();
    const [updatepath,setUpdatePath]=useState();
    const [updateflag,setUpdateFlag]=useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['Token'])

    // this state will be used if we want to update a record and we want to change the picture so
    // the picture from the table which is being displayed from the table in the form will disapear 
    // and our new image from the input will be displayed
    const [imageupdateflag,setImageUpdateFlag]=useState(false)
    
    const childRef = useRef();
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Product_Name' in fieldValues)
            temp.Product_Name = fieldValues.Product_Name ? "" : " Product_Name This field is required."
        if ('Product_Description' in fieldValues)
            temp.Product_Description = fieldValues.Product_Description ? "" : " Product_Description This field is required."
        if ('Sale_Price' in fieldValues)
            temp.Sale_Price = fieldValues.Sale_Price ? "" : " Sale_Price This field is required."
        
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

    const Post_Products=async (address,value,selectedFile)=>{
      
      const formData=new FormData();
          formData.append("Path",selectedFile);
          formData.append("Product_Name",value.Product_Name);
          formData.append("Product_Description",value.Product_Description);
          formData.append("Sale_Price",value.Sale_Price);
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
              'Product Added!',
              'Pres Enter to Continue!',
              'success'
            )
          
          })
          .catch((error)=>{
            Swal.fire(
              'Error!',
              'An Unknown Error Occured During the Proccess!',
              'error'
            )
            
          })
      
  
    }
    const Update_Products=async (address,value,selectedFile)=>{
      
      const formData=new FormData();
          formData.append("Path",selectedFile);
          formData.append("Product_Name",value.Product_Name);
          formData.append("Product_Description",value.Product_Description);
          formData.append("Sale_Price",value.Sale_Price);
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
              'Product Updated!',
              'Pres Enter to Continue!',
              'success'
            )
          
            
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
          Update_Products(`http://localhost:8000/api/Rizq_Halal/Product/${values.id}?_method=PATCH`,values,SelectedFile);
          setImageUpdateFlag(false);
              setUpdateFlag(false);
              setSelectedFile(null);
          resetForm();
          refresh_table('Product');
            }else{

              Post_Products('http://localhost:8000/api/Rizq_Halal/Product',values,SelectedFile);
              setPostPath(false);
              setImageUpdateFlag(false);
              setUpdateFlag(false);
              setSelectedFile(null);
              resetForm();
              refresh_table('Product');
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
                        name="Product_Name"
                        label="Product Name"
                        
                        value={values.Product_Name}
                        onChange={handleInputChange}
                        error={errors.Product_Name}
                    />         
                    <Controls.Input
                        name="Sale_Price"
                        label="Product Price"
                        
                        value={values.Sale_Price}
                        onChange={handleInputChange}
                        error={errors.Sale_Price}
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
                        name="Product_Description"
                        label="Description"
                        
                        value={values.Product_Description}
                        onChange={handleInputChange}
                        error={errors.Product_Description}
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
                    
                    {/* {SelectedFile ? <img style={{width:'20%',height:'40%',border:'5px solid black',borderRadius:'10px'}} src={SelectedFile.name}/>:null} */}
                    
                    
                            
                </Grid>
                
               
            </Grid>
        </Form>
    )
}



function Product_List(props) {
  const {handleOpenModal,products,send_record_from_table_to_form,refresh_table}=props;
  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])
  const [qrimage,setQRimage]=useState();

  
  const [columns, setColumns] = useState([
    { 
      title: "Name", field: "Product_Name"
    },
    { 
      title: "Price", field: "Sale_Price"
    },
    {
      title: "Description",
      field: "Product_Description",
    },
    
    {
      title: "Availabe",
      field: 'Available'
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
    title: "Photo",
    field: 'Path',
      render:rowData=><Avatar src={'http://localhost:8000/'+rowData.Path}  style={{borderRadius:'50%',border:'1px solid black'}} alt="No Image"/>
    //   // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 

     }
  ]);
  /// for summing the Available Quantity
 
  const generateQRCode=async(value)=>{
    try{
      const response=await QRCode.toDataURL(JSON.stringify(value));
      setQRimage(response);
    }catch(error){ 
      console.log(error);
    }
  }
  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
// }, [recordForEdit])

// get_data('Companies','company');


},[products]);

// setProducts([...products,sum])

  //creating api 
  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 10000,
    headers: {
      "Accept":"application/json",
      "Authorization":"Bearer "+cookies.Token,
    },
  });
  const delete_product=(address)=>{
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
          //   setProducts(response.data);
        
          // }else if(name=='accounts'){
          //   setAccounts(response.data);
          // }
            // setProducts(response.data);
            Swal.fire(
              'Product Deleted Successfully!',
              'Pres Enter to Continue!',
              'success'
            )
            refresh_table('Product');
            
         
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
        title="Products"
        columns={columns}
        style={{padding:'3%',borderRadius:'20px'}}
        elevation={4}
        data={products.Available}
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
            icon:tableIcons.Edit,
            tooltip:'Update',
            onClick:(event,rowData)=>{
              
              
              
              
              send_record_from_table_to_form(rowData);
            }

          },
          {
            icon:tableIcons.Delete,
            tooltip:'Delete the product',
            onClick:(event,rowData)=>{
             delete_product(`Product/${rowData.id}`);
            }

          }
        ]}
        
      />
      {qrimage ? (<a href={qrimage} download> <img src={qrimage} alt='no qr code'/></a>):null}
    </div>
  );
}
