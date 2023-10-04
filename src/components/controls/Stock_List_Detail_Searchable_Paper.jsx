import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material';
import { Paper, Box, Typography } from '@mui/material';
import '../../App.scoped.css';
import '../../index.css';
import Zoom from '@material-ui/core/Zoom';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import { TextField, Autocomplete } from '@mui/material'
import Controls from "./Controls";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { AccountBoxRounded, BusinessRounded, DashboardRounded, DnsRounded, GroupAddRounded, ListAltRounded, PostAddRounded } from '@material-ui/icons';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Edit from '@material-ui/icons/Edit';


export default function Stock_List_Detail_Searchable_Paper({ searchstring, list }) {

  const [checked, setChecked] = React.useState(true);

  const filteredList = list.filter((element) => {
    if (searchstring === '') {
      return element;
    }
    else {
      return element.Company_Name.toLowerCase().includes(searchstring)
    }
  })

  return (
    <Box  >
      <Stack spacing={1}
        sx={{
          overflow: 'auto',
          maxHeight: 500,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',





        }}
      >
        <div className='div_List' style={{ backgroundColor: 'var(--background)', borderRadius: '20px' }}>
          {
            filteredList.map((item) => (
              <Zoom in={checked}>




                <Paper key={item.id}
                  sx={{
                    textAlign: 'center',
                    padding: '2%',
                    marginRight: '2%',

                  }}  >
                  <Typography style={{ padding: '1%' }}> {item.Stock_Name}<strong>:اسم جنس</strong></Typography>
                  <Typography style={{ padding: '1%' }}>{item.Unit_Name} {item.Imported_Ammount}<strong>: مقدار وارد شده</strong></Typography>
                  <Typography style={{ padding: '1%' }}> {item.Dish_Name}<strong>:اسم غذایی بعد از پخت</strong></Typography>
                  <Typography style={{ padding: '1%' }}><strong>مقدار غذایی بعد از پخت:</strong> {item.Dish_Ammount_Generated} خوراک</Typography>
                  <Typography style={{ padding: '1%' }}><strong> مقدار پول قابل پرداخت :</strong>{item.Total_Ammount} {item.Money_Name} </Typography>
                  <Typography style={{ padding: '1%' }}><strong> مقدار پول  پرداخت شده :</strong> {item.Ammount_Paid} {item.Money_Name}</Typography>
                  <Typography style={{ padding: '1%' }}><strong>مقدار پول  باقی :</strong>{item.Ammount_Remaining} {item.Money_Name} </Typography>
                  <Typography style={{ padding: '1%' }}> <strong>مقدار تمام شد پول فی خوراک :</strong> {item.In_Price} {item.Money_Name}</Typography>
                  <Typography style={{ padding: '1%' }}><strong>پرداخت شده از حساب :</strong>{item.Cash_Account_Name}</Typography>
                  <Typography style={{ padding: '1%' }}> <strong>وارد شده از شرک :</strong>{item.Company_Name}</Typography>
                  <Typography style={{ padding: '1%', paddingBottom: '4%' }}>{item.Created_User_Name}<strong>:ایجاد شده توسط</strong> </Typography>

                  <Card style={{ padding: '1%' }} >
                    <CardActions >
                      <Controls.Button
                        // type="submit"

                        // onClick={resetForm}
                        style={{ width: "50%", height: "100%", borderRadius: "10px" }}
                        letiant="contained"
                        startIcon={<Edit />}
                        color="primary"
                        text="تصیح"
                      />
                      <Controls.Button
                        // type="submit"


                        // onClick={resetForm}
                        style={{ width: "50%", height: "100%", borderRadius: "10px", }}
                        letiant="contained"
                        startIcon={<CancelRoundedIcon />}
                        color="secondary"
                        text="حذف"
                      />
                    </CardActions>
                  </Card>
                </Paper>
              </Zoom>
            ))
          }
        </div>
      </Stack>
    </Box >
  )
}
