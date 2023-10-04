
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useState,useEffect } from "react";
import MaterialTable from "material-table";
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar} from '@material-ui/core';
import axios from 'axios';
import { withCookies,useCookies } from "react-cookie";
import { useForm, Form } from '../../components/useForm';
import { forwardRef } from 'react';

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
import {withRouter} from 'react-router-dom'
import ViewColumn from '@material-ui/icons/ViewColumn';
import { ShoppingCartRounded, Sync, TransferWithinAStationRounded } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications'
import { ToastProvider } from 'react-toast-notifications';
import QRCode from 'qrcode';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Loans: forwardRef((props, ref) => <TransferWithinAStationRounded {...props} ref={ref} />),
    Sales: forwardRef((props, ref) => <ShoppingCartRounded {...props} ref={ref} />),
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    display: 'flexGrow',
    marginTop:'1%'
  },
  paper: {
    margin: theme.spacing(1),
    borderRadius:'20px',

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

export default function Customer_List_Zoom() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Display the List"
      />
      <div className={classes.container}>
        <Zoom in={checked}>
          <Paper elevation={5} className={classes.paper}>
            <Bills_Modal/>
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




function Bills_Modal() {
  const classes = useStyles();
  const [open_sale, setOpenSale] = React.useState(false);
  const [open_loan, setOpenLoan] = React.useState(false);
  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])
  const [refreshflag, setRefreshFlag] = React.useState(false);

  const [data_for_modal_sale, setData_For_Modal_Sale] = React.useState([]);
  const [data_for_modal_loan, setData_For_Modal_Loan] = React.useState([]);
  const [products,setProducts]=useState([]);

  const handleOpenSale = (value) => {
    setOpenSale(true);
    

    setData_For_Modal_Sale(value);
  };

  const handleCloseSale = () => {
    setOpenSale(false);
  };
  const handleOpenLoan = (value) => {
    setOpenLoan(true);
    setData_For_Modal_Loan(value);
  }

  const handleCloseLoan = () => {
    setOpenLoan(false);
  };
  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 10000,
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
    //   setAccoupnts(response.data);
    // }
      setProducts(response.data.Available);
      ///Making LookUp Value
      
   
  })
  .catch(function (error) {
    alert('we cant get Products'+error);
  })
  .then(function () {
    // always executed
  });
    }
  
const change_refresh_flag=()=>{
  setRefreshFlag(true);
}
       
    
  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
// }, [recordForEdit])


getProducts('Product');




},[]);


let lookup=products.reduce(function(acc,cur,i){
    acc[cur.id]=cur.Product_Name;
    return acc;
  },{})



  return (
    <div>
      
      <Customer_List setRefreshFlag={setRefreshFlag} refreshflag={refreshflag}  handleOpenModal_Sale={handleOpenSale} handleOpenModal_Loan={handleOpenLoan}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open_sale}
        onClose={handleCloseSale}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open_sale}>
          <div className={classes.paper}>
            {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p> */}
              
              <Sales  data={data_for_modal_sale} lokup={lookup} handleClose={handleCloseSale}/>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open_loan}
        onClose={handleCloseLoan}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open_loan}>
          <div className={classes.paper}>
            {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p> */}
              
              <Loans change_refresh_flag={change_refresh_flag} data={data_for_modal_loan} lokup={lookup} handleClose={handleCloseLoan}/>
          </div>
        </Fade>
      </Modal>
     </div>
  );
}



function Customer_List(props){
  const {handleOpenModal_Sale,refreshflag,handleOpenModal_Loan,setRefreshFlag}=props;
  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])
  const [qrimage,setQRimage]=useState();
  const [customer,setCustomers]=useState([]);
  
  const [columns, setColumns] = useState([
    { 
      title: "Customer Name", field: "Customer_Name"
    },
    {
      title: "Sold",
      field: "Total_Items_Sold",
    },
    
    {
      title: "Loaned",
      field: 'Total_Items_loaned'
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
      title: "Total Sold Price",
      field: 'Total_Sale_Price'
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
      title: "Total Loan Price",
      field: 'Total_Loan_Price'
      // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
    },
    {
    title: "Photo",
    field: 'Path',
      render:rowData=><Avatar src={'http://localhost:8000/'+rowData.Path}  style={{borderRadius:'50%',border:'1px solid black'}} alt="No Image"/>
    //   // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 

     }
  ]);
 //creating api 
 const Api = axios.create({
  baseURL: 'http://localhost:8000/api/Rizq_Halal/',
  timeout: 10000,
  headers: {
    "Accept":"application/json",
    "Authorization":"Bearer "+cookies.Token,
  },
});

  
  const getCustomers=async (address)=>{
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
      setCustomers(response.data);
      
    if(refreshflag==true){
      setRefreshFlag(false);
    }
  })
  .catch(function (error) {
    alert('we cant get Products');
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

// get_data('Companies','company')


getCustomers('Customers');


},[refreshflag]);

// setProducts([...products,sum])

 


  return (
    <div className="App">
      
      <MaterialTable
        icons={tableIcons}
        title="Products"
        columns={columns}
        style={{padding:'3%',borderRadius:'20px'}}
        elevation={4}
        data={customer}
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
            icon:tableIcons.Sales,
            tooltip:'Show Sales',
            onClick:(event,rowData)=>{
              // const AllRelation=Object.assign({},products.All_Relation);
              // const data_for_sale_modal=JSON.parse(rowData);
        
              
              
              handleOpenModal_Sale(rowData);
            }

          },
          {
            icon:tableIcons.Loans,
            tooltip:'Show Loans',
            onClick:(event,rowData)=>{
              // const AllRelation=Object.assign({},products.All_Relation);
              
              handleOpenModal_Loan(rowData);
              
              
              // handleOpenModal_Loan(AllRelation[rowData.tableData.id].importedproducts,AllRelation[rowData.tableData.id].Product_Name,products.Available);
            }

          },
        ]}
        
      />
      {qrimage ? (<a href={qrimage} download> <img src={qrimage} alt='no qr code'/></a>):null}
    </div>
  );
}




const Sales=withRouter((props)=>{
  const { addToast } = useToasts()
  
  const {data,lokup,handleClose,history}=props;
  const [cookies, setCookie, removeCookie,] = useCookies(['Token']) 
console.log(lokup);
  
  const [columns, setColumns] = useState([
    { 
      title: "Bill Number", field: "Bill_Number"
    },
    {
      title: "Product_Name",
      field: "Product_ID",
      lookup:lokup
      // lookup: { 2: "İstanbul", 3: "Şanlıurfa" }, 

      
    },
    
    {
      title: "Quantity",
      field: 'Quantity',
    },

    {
      title: "Total Price",
      field: 'Total_Price'
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

  
 
 //creating api 
 const Api = axios.create({
  baseURL: 'http://localhost:8000/api/Rizq_Halal/',
  timeout: 10000,
  headers: {
    "Accept":"application/json",
    "Authorization":"Bearer "+cookies.Token,
  },
});

  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
// }, [recordForEdit])

  


// getProducts('Product');



},[]);





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
        title={data.Customer_Name}
        columns={columns}
        data={data.sale}
        style={{padding:'3%',borderRadius:'20px'}}
        actions={[
          {
            icon:tableIcons.Edit,
            tooltip:'Update',
            onClick:(event,rowData)=>{
              
          history.push({
            pathname:'/Update_Sales',
            state:{rowData,data}
          });
          
          
          
        
            
     
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
          //       handleOpen(data,prname);
                
          //       resolve();
          //     }, 1000);
          //   }),
          
                  }}
        
      />

</ToastProvider>    
      
    </div>
  );
});


const Loans=withRouter((props)=>{
    const { addToast } = useToasts()
    
    const {change_refresh_flag,data,lokup,handleClose,history}=props;
    
    const [products,setProducts]=useState();
    
    const [cookies, setCookie, removeCookie,] = useCookies(['Token']) 
    const Api = axios.create({
      baseURL: 'http://localhost:8000/api/Rizq_Halal/',
      timeout: 10000,
      headers: {
        "Accept":"application/json",
        "Authorization":"Bearer "+cookies.Token,
      },
    }); 
    
    const [columns, setColumns] = useState([
      { 
        title: "Bill Number", field: "Bill_Number"
      },
      {
        title: "Product Name",
        field: "Product_ID",
        lookup:lokup
      },
      
      {
        title: "Quantity",
        field: 'Quantity'
        // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
      },
      {
        title: "Total Price",
        field: 'Total_Price'
        // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }, 
      },
      {
        title: "Available",
        field: 'Available_Quantity'
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
    const Pay_Loan=async (address,id)=>{
      await Api.put(address)
    .then(function (response) {
      // if(name=='company'){
    
      //   // setCompanies(response.data);
      //   setSalesMan(response.data.salesman)
    
      // }else if(name=='products'){
      //   setProducts(response.data);
    
      // }else if(name=='accounts'){
      //   setAccoupnts(response.data);
      // }
      
  
    })
    .catch(function (error) {
      alert('we couldnt pay the loan');
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
  
  
  // getProducts('Product');
  
  
  
  console.log(data);
  },[]);
  
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
          title={data.Customer_Name}
          columns={columns}
          data={data.loan}
          style={{padding:'3%',borderRadius:'20px'}}
          actions={[
            {
              icon:tableIcons.Edit,
              tooltip:'Update',
              onClick:(event,rowData)=>{
            
      
            
          
                  history.push({
              pathname:'/Update_Loans',
              state:{rowData,data}
            });
               
        
              
       
        }
  
            },
            {
            icon:tableIcons.Loans,
            tooltip:'Paid',
            onClick:(event,rowData)=>{
              // const AllRelation=Object.assign({},products.All_Relation);
                    
        Swal.fire({
          title: 'Are You sure that this customer has paid the loans ?',
          showDenyButton: true,
          confirmButtonText: 'Yes he has paid',
          denyButtonText: `Cancel`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
          Pay_Loan(`pay_loan/${rowData.id}`);
          change_refresh_flag();
          } else if (result.isDenied) {
            
            
          }
        })
  
              
              
              
              // handleOpenModal_Loan(AllRelation[rowData.tableData.id].importedproducts,AllRelation[rowData.tableData.id].Product_Name,products.Available);
            }

          },
       
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
            //       handleOpen(data,prname);
                  
            //       resolve();
            //     }, 1000);
            //   }),
            
                    }}
          
        />
  
  </ToastProvider>    
        
      </div>
    );
  });