import React from 'react';
import '../../App.scoped.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AccountBoxRounded, BusinessRounded, DashboardRounded, DnsRounded, GroupAddRounded, ListAltRounded, PostAddRounded } from '@material-ui/icons';
import { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';

import { Grid, ListItemIcon, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withCookies, useCookies } from "react-cookie";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from '@mui/material/Box';
import '../../App.scoped.css';
import '../../index.css';



import axios from 'axios';




ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly report based on the current year!',
    },
  },
};



const useStyles = makeStyles((theme) => ({
  root: {
    height: 140,
  },
  container: {
    display: 'flex',
  },
  Over_All_Report: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1),
    width: 340,
    height: 60,
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'center',
    boxShadow: "1px 1px 1px var(--text-primary)",
    border: "1px solid var(--text-primary)",
    borderRadius: 15
  },
  Accounts_Report: {
    display: 'inline-flex',
    justifyContent: 'center',
    margin: theme.spacing(1),
    width: 280,
    height: 190,
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'center',
    boxShadow: "1px 1px 1px var(--text-primary)",
    border: "1px solid var(--text-primary)",
    borderRadius: 15
  },
  Today_Sale: {
    display: 'inline-flex',
    alignContent: 'left',
    verticalAlign: 'center',
    margin: theme.spacing(0.5),
    width: 200,
    height: 70,
    boxShadow: "1px 1px 1px var(--text-primary)",
    border: "1px solid var(--text-primary)",
    borderRadius: 15
  },
  chartjs2: {
    boxShadow: "1px 1px 1px var(--text-primary)",
    border: "1px solid var(--text-primary)",
    borderRadius: 15
  },
}));





export function Over_All_Report_Column_One(props) {
  const { data } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const Over_All_Reports_List = [
    {
      text: 'Over All Sales',
      icon: <PostAddRounded style={{ color: 'var(--text-primary)' }} />,
      data: data.Over_All_Sales,
      effect: 1000,
    },
    {
      text: 'Customer Loans',
      icon: <GroupAddRounded style={{ color: 'var(--text-primary)' }} />,
      data: data.Over_All_Loans_To_Customers,
      effect: 2000,


    },
    {
      text: 'Total Investments',
      icon: <BusinessRounded style={{ color: 'var(--text-primary)' }} />,
      data: data.Total_Investments,
      effect: 3000,

    },
    {
      text: 'My Investments',
      icon: <AccountBoxRounded style={{ color: 'var(--text-primary)' }} />,
      data: data.My_Investments,
      effect: 4000,


    },
    {
      text: 'Companies Loans',
      icon: <AccountBoxRounded style={{ color: 'var(--text-primary)' }} />,
      data: data.Companies_Loan_On_Us,
      effect: 5000,


    },
    {
      text: 'Over All Benifits',
      icon: <AccountBoxRounded style={{ color: 'var(--text-primary)' }} />,
      data: data.Over_All_Benifits,
      effect: 6000,


    },
  ];


  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    // if (recordForEdit != null)
    //     setValues({
    //         ...recordForEdit
    //     })
    // }, [recordForEdit])

    // get_data('Companies','company');



  }, [data]);
  return (




    <Grid container xs={12} md={4} Spacing={1} sm={6} lg={4}   >
      <Grid item direction='row'>
        <Grid item direction="column" xs={12} md={4} Spacing={1} sm={6} lg={4} >
          {
            Over_All_Reports_List.map((item, index) => {
              const { text, icon, data, effect } = item;
              return (

                <Grow
                  in={checked}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(checked ? { timeout: effect } : {})}
                >
                  <Box>
                    <Card className={classes.Over_All_Report}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <CardContent>
                        <Typography variant="h6" className='font-face-Genos' noWrap>
                          {text}
                        </Typography>
                        <Typography variant="body2">{data}</Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grow>





              );
            })
          }


          {/* </Grid>
      </Grid>
      <Grid item direction='row'>
      <Grid   direction="column" xs={6} md={5} Spacing={2} sm={6} lg={2}>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout:2000 } : {})}
        >
          <Paper elevation={4} className={classes.Over_All_Report} >
          
             <h4>Total Sales:560</h4> 
            
          </Paper>
        </Grow>
        </Grid>
        <Grid   direction="column"  xs={6} md={5} Spacing={2} sm={6} lg={2}>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout:3000 } : {})}
        >
          <Paper elevation={4} className={classes.Over_All_Report}>
          
             <h4>Total Sales:560</h4> 
            
          </Paper>
        </Grow>
        </Grid>
       
      </Grid>
      <Grid item direction='row'>
        <Grid   direction="column" xs={6} md={5} Spacing={2} sm={6} lg={2}>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout:4000 } : {})}
        >
          <Paper elevation={4} className={classes.Over_All_Report}>
          
             <h4>Total Sales:560</h4> 
            
          </Paper>
        </Grow>
        </Grid>
        <Grid   direction="column" xs={6} md={5} Spacing={2} sm={6} lg={2}>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout:5000 } : {})}
        >
          <Paper elevation={4} className={classes.Over_All_Report}>
          
             <h4>Total Sales:560</h4> 
            
          </Paper>
        </Grow> */}
        </Grid>
      </Grid>



    </Grid>

  );
}


export function Todays_And_Account_Report(props) {
  const { data, accounts } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const Over_All_Reports_List = [
    {
      text: 'Todays Sale',
      icon: <PostAddRounded style={{ color: 'white' }} />,
      data: data.Todays_Sale,
      effect: 1000,
    },
    {
      text: 'Todays Loan',
      icon: <GroupAddRounded style={{ color: 'white' }} />,
      data: data.Todays_Loan,
      effect: 2000,


    },
    {
      text: 'Todays Benifits',
      icon: <BusinessRounded style={{ color: 'white' }} />,
      data: data.Todays_Benifits,
      effect: 3000,

    },
    {
      text: 'This Month Benifts',
      icon: <AccountBoxRounded style={{ color: 'white' }} />,
      data: data.This_Months_Benfits,
      effect: 4000,


    },

  ];

  let effect = 1000;


  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (




    <Grid direction='row' container xs={12} md={12} Spacing={1} sm={12} lg={12}   >
      <Grid item direction='column' xs={7} md={7} Spacing={7} sm={7} lg={7}>
        <h3>Accounts</h3>

        {

          accounts.map((item, index) => {
            const { Acount_Name, Amount_Available, Total_Money_Based_On_This_Account
              , Total_Paid_Based_On_This_Account,
              Total_Reminderr_Based_On_This_Account, Total_Expanse } = item;

            return (

              <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: effect += 1000 } : {})}
              >
                <Card className={classes.Accounts_Report}>
                  <CardContent>
                    <Typography variant="h6" className='font-face-Genos' noWrap>
                      {Acount_Name}<br />
                      Amount Available:{Amount_Available}<br />
                      Total Negotiation:{Total_Money_Based_On_This_Account}<br />
                      Total Paid:{Total_Paid_Based_On_This_Account}<br />
                      Total Expanse:{Total_Expanse}<br />
                      Total Reminder:{Total_Reminderr_Based_On_This_Account}

                    </Typography>
                  </CardContent>
                </Card>

              </Grow>



            );
          })
        }
        {/*      
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout:1000 } : {})}
        >
          <Paper elevation={4} className={classes.Accounts_Report}>
          
             <h4>حساب پول نقد :560</h4> 
            
          </Paper>
        </Grow>
              <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout:2000 } : {})}
        >
          <Paper elevation={4} className={classes.Accounts_Report}>
          
             <h4>حساب مسعود:560</h4> 
            
          </Paper>
        </Grow>
      
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout:3000 } : {})}
        >
          <Paper elevation={4} className={classes.Accounts_Report}>
          
             <h4>حساب نورالله:560</h4> 
            
          </Paper>
        </Grow>   
        
         */}
      </Grid>
      <Grid item direction='column' xs={5} md={5} Spacing={1} sm={5} lg={5}>
        <h3>Todays_Sale</h3>
        {
          Over_All_Reports_List.map((item, index) => {
            const { text, icon, data, effect } = item;
            return (

              <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: effect } : {})}
              >
                <Card className={classes.Today_Sale}>
                  <CardContent>
                    <Typography variant="h6" className='font-face-Genos' noWrap>
                      {text}:{data}
                    </Typography>

                  </CardContent>
                </Card>
              </Grow>





            );
          })
        }


      </Grid>

    </Grid>

  );
}

export default function Home_Page() {
  const [data, setData] = useState([]);
  const [account_data, setAccount_Data] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);

  const Api = axios.create({
    baseURL: 'http://localhost:8000/api/Rizq_Halal/',
    timeout: 50000,
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + cookies.Token,
    },
  });
  const getReport = async (address) => {
    await Api.get(address)
      .then(function (response) {

        setData(response.data);

      })
      .catch(function (error) {
        // alert('we couldnt generate report');
      })
      .then(function () {
        // always executed
      });
  }
  const getAccounts = async (address) => {
    await Api.get(address)
      .then(function (response) {

        setAccount_Data(response.data);

      })
      .catch(function (error) {
        // alert('we couldnt generate report');
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

    // get_data('Companies','company');
    getReport('get_all_report');
    getAccounts('Accounts')
  }, []);

  return <>
    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'   >

      <Grid direction='column' xs={12} lg={4} sm={6} md={4}  >
        <h4>Over All Report</h4>
        <Over_All_Report_Column_One data={data} />
      </Grid>

      <Grid direction='column' xs={12} lg={8} sm={12} md={12} >
        <h4>Monthly Chart</h4>
        <Chart chart_data={data} />
      </Grid>

      <Grid item direction='row' xs={12} lg={12} sm={12} md={12}>

        <Todays_And_Account_Report accounts={account_data} data={data} />
      </Grid>


    </Grid>


  </>


}

export function Chart(props) {
  const { chart_data } = props;
  const classes = useStyles();

  const [cookies, setCookie, removeCookie,] = useCookies(['Token'])



  const labels = chart_data.Months

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Sales Based On Months',
        data: chart_data.Monthly_Sales,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Loans Based on Months',
        data: chart_data.Monthly_Loans,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Total Benifits Based on Months',
        data: chart_data.Monthly_Benfits,
        backgroundColor: 'rgba(164, 80, 130, 1)',
      },
      {
        label: 'Total Imports Based on Months',
        data: chart_data.Monthly_Imports,
        backgroundColor: 'rgba(200, 100, 235, 0.5)',
      },


      // {
      //   label: 'Dataset 3',
      //   data: [25,40,100,150,300,400,500],
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // }
    ],
  };
  return <Grid item style={{ marginLeft: '1%' }} spacing={1} lg md xs sm >
    <Paper className={classes.chartjs2} elevation={2}>
      <Bar options={options} data={data} />
    </Paper>

  </Grid>
}
