
import React, { useState } from "react";
import useLocalStorage from 'use-local-storage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Grid, } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Log_In from './Log_In'
import { withCookies, useCookies } from "react-cookie";
import AuthApi from "./AuthApi";
import Form_ValueApiProvider from "./Pages/Hr_Department/Form_ValueApi";
import Notification from "./components/Notification";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import Swal from 'sweetalert2'
import Update_Page from './Pages/Hr_Department/Update_Page'
import Employee_List_Zoom from './Pages/Hr_Department/Employee_List'
import Customer_List_Zoom from './Pages/Customer_and_Loan_List/Customer_List'
import Sales_Page from './Pages/Sales/Sales_Page'
import Loan_Page from './Pages/Loans/Loan_Page'
import { useToasts } from 'react-toast-notifications'
import { ToastProvider } from 'react-toast-notifications';
import Loan_Update from './Pages/Loans/Loan_Update'
import Sale_Update from './Pages/Sales/Sale_Update'
import Button from "./components/controls/Button";
import Product_Settings from './Pages/Settings/Product_Settings'
import Customer_Settings from './Pages/Settings/Customer_Settings'
import Companies_Settings from './Pages/Settings/Companies_Settings'
import Sales_Man_Settings from './Pages/Settings/Sales_Man_Settings'
import Account_Type_Settings from './Pages/Settings/Account_Type_Settings'
import Home_Page from './Pages/Dashboard/Home_Page';
import Expanse from './Pages/Expanse/Expanse';
import Users from './Pages/Users/Users';
import image from './2022_03_22_21_22_IMG_0510.JPG';
import Add_Employee_Page from "./Pages/Hr_Department/Add_Employee_Page";
import Em_Contracts from "./Pages/Hr_Department/Em_Contracts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import './App.scoped.css';
import './index.css';
import Box from "@material-ui/core/Box";
import Stocks from './Pages/Finance_Department/Stocks'
import Account_Holders_Page from './Pages/Account_Holders/Account_Holders_Page'
import { useHistory } from 'react-router-dom'


// const darkTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });

const App = (props) => {

  const [auth, SetAuth] = React.useState(true);


  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  // crating a function to switch between themes
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

  }
  // const [cookies, setCookie, removeCookie] = useCookies(['Refresh']);
  const readCookies = () => {
    const { cookies } = props;
    const Refresh = cookies.get('Refresh')
    if (Refresh == 'true') {

      SetAuth(true);
    }
  }
  React.useEffect(() => {
    readCookies();
  }, [])

  return (
    <main>


      <div className='App' data-theme={theme}>

        <Form_ValueApiProvider>
          <AuthApi.Provider value={{ auth, SetAuth }}>
            <ToastProvider
              autoDismiss
              autoDismissTimeout={5000}
              // components={{ Toast: snack }}
              placement="bottom-right"
            // placement="top-right"
            >
              <Router>

                <Routes switchTheme={switchTheme} />

              </Router >
            </ToastProvider>

          </AuthApi.Provider>
        </Form_ValueApiProvider>


      </div>
    </main>

  );
}



const LogIn = (props) => {
  const Auth = React.useContext(AuthApi);
  const [cookies, setCookie] = useCookies(['User']);
  const { addToast } = useToasts();


  //Creating A default Request For Log In
  const ApiLogin = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 2000,
    headers: {
      "Accept": "application/json",
    },
  });

  //Method For Log In
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const handleLogin = (values, address, resetForm) => {
    if (values.email == '' || values.password == '') {
      setNotify({
        isOpen: true,
        message: 'Please Type the Email or Password Please!',
        type: 'error'
      })

    }
    else {

      ApiLogin.post(address, values)
        .then(function (response) {

          Auth.SetAuth(true);

          setCookie('Refresh', 'true');
          setCookie('User', response.data.user.EM_ID);
          setCookie('Token', response.data.token);


        })
        .catch(function (error) {
          addToast('Incorrect Password Or Email!', {
            appearance: 'error',
            autoDismiss: true,
          });
        })
        .then(function () {
          // always executed
        });
    }


  }
  return (


    <Box className="Login-component" >

      <Log_In handleLogin={handleLogin} />
      <Notification
        notify={notify}
        setNotify={setNotify}
      />


    </Box>


  );
}

const Home = () => {
  const Auth = React.useContext(AuthApi);
  return (
    <Home_Page />
  );
}

const Routes = (props) => {
  const Auth = React.useContext(AuthApi);
  const { addToast } = useToasts();
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  const history = useHistory();


  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/HMIS/',
    timeout: 50000,
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + cookies.Token,
    },
  });




  const Post_Request = (address, value, success_message, error_message, resetForm) => {
    Api.post(address, value)
      .then(response => {
        addToast(success_message, {
          appearance: 'success',
          autoDismiss: true,
          zIndex: '1'
        });

      })
      .catch((error) => {
        addToast(error_message, {
          appearance: 'error',
          autoDismiss: true,
        });

      })
  }

  return (
    <Switch>
      <ProtectedLogin path="/Login" auth={Auth.auth} component={LogIn} />
      <ProtectedRoutes path="/Home" Api={Api} Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Home} />
      <ProtectedRoutes path="/Add_Employee" Api={Api} Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Add_Employee_Page} />
      <ProtectedRoutes path="/Employee_List" Api={Api} Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Employee_List_Zoom} />
      <ProtectedRoutes path="/User_Accounts" Api={Api} Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Account_Holders_Page} />
      <ProtectedRoutes path="/Stocks" Api={Api} Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Stocks} />
      {/* <ProtectedRoutes path="/update_ImportedProducts" Api={Api} get_ Post_Request={Post_Request}  switchTheme={props.switchTheme} auth={Auth.auth} component={Update_Page}/>
    <ProtectedRoutes path="/Sales" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Sales_Page}/>
    <ProtectedRoutes path="/Loans" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Loan_Page}/>
    <ProtectedRoutes path="/Customer_List" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Customer_List_Zoom}/>
    <ProtectedRoutes path="/Update_Loans" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme}  auth={Auth.auth} component={Loan_Update}/>
    <ProtectedRoutes path="/Update_Sales" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme}  auth={Auth.auth} component={Sale_Update}/>
    <ProtectedRoutes path="/Products" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Product_Settings}/>
    <ProtectedRoutes path="/Customers" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Customer_Settings}/>
    <ProtectedRoutes path="/Companies" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Companies_Settings}/>
    <ProtectedRoutes path="/SalesMan" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Sales_Man_Settings}/>
    <ProtectedRoutes path="/Accounts" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Account_Type_Settings}/>
    <ProtectedRoutes path="/Users" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Users}/>
    <ProtectedRoutes path="/Expanse" Api={Api}  Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Expanse}/> */}
      <ProtectedRoutes path="/Em_Contract" Api={Api} Post_Request={Post_Request} switchTheme={props.switchTheme} auth={Auth.auth} component={Em_Contracts} />



    </Switch>
  );

}
const ProtectedRoutes = ({ auth, component: Component, switchTheme, Post_Request, Api, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Dashboard switchTheme={switchTheme} pageContent={<Component Api={Api} get_ Post_Request={Post_Request} />} />
      ) :
        (
          <Redirect to="/Login" />
        )
      }
    />
  );
}
const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        <Component />
      ) :
        (
          <Redirect to="/Home" />
        )
      }
    />
  );
}

export default withCookies(App);;
