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


export default function Stock_List_Searchable_Paper({ searchstring, list, handleOpenModal }) {

  const [checked, setChecked] = React.useState(true);

  const filteredList = list.filter((element) => {
    if (searchstring === '') {
      return element;
    }
    else {
      return element.Stock_Name.toLowerCase().includes(searchstring)
    }
  })

  return (
    <Box>
      <Stack spacing={1}
        sx={{
          overflow: 'auto',
          maxHeight: 500,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',




        }}
      >
        <div className='div_List'>
          {filteredList.map((item) => (
            <Zoom in={checked}>




              <Paper key={item.id}
                sx={{
                  textAlign: 'center',
                  padding: '2%',
                  marginRight: '2%',

                }}  >
                <Typography style={{ padding: '1%' }}>{item.Stock_Name}<strong>:اسم جنس</strong></Typography>
                <Typography style={{ padding: '1%' }}> {item.Unit_Ammount}<strong>:واحد اصلی خریداری</strong></Typography>
                <Typography style={{ padding: '1%' }}>{item.Unit_Name}<strong>:واحد اندازه گیری</strong> </Typography>
                <Typography style={{ padding: '1%' }}>{item.Dish_Name}<strong>:اسم غذایی بعد از پخت</strong></Typography>
                <Typography style={{ padding: '1%', paddingBottom: '4%' }}>{item.Created_User}<strong>:ایجاد شده توسط</strong> </Typography>

                <Card style={{ padding: '1%' }} >
                  <CardActions >
                    <Controls.Button
                      // type="submit"

                      // onClick={resetForm}
                      style={{ width: "33%", height: "100%", borderRadius: "10px", backgroundColor: 'var(--List-button-one)' }}
                      letiant="contained"
                      startIcon={<ShoppingCartOutlinedIcon />}
                      text="خریداری"
                    />
                    <Controls.Button
                      // type="submit"


                      onClick={() => { handleOpenModal(item) }}
                      style={{ width: "33%", height: "100%", borderRadius: "10px", backgroundColor: 'var(--List-button-tow)' }}
                      letiant="contained"
                      startIcon={<DnsRounded />}
                      text="خریدها"
                    />
                    <Controls.Button
                      // type="submit"


                      // onClick={resetForm}
                      style={{ width: "33%", height: "100%", borderRadius: "10px", backgroundColor: 'var(--List-button-edit)' }}
                      letiant="contained"
                      startIcon={<Edit />}
                      text="تصیح"
                    />
                  </CardActions>
                </Card>
              </Paper>
            </Zoom>
          ))}
        </div>
      </Stack>
    </Box>
  )
}
