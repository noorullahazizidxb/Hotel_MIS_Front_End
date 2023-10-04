import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "./components/controls/Controls";
import { useForm, Form } from './components/useForm';
import Box from '@material-ui/core/Box';
import './App.scoped.css';
import './index.css';
import Paper from '@material-ui/core/Paper';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';




const initialFValues = {
    email: '',
    password: '',
}



export default function Log_In(props) {
    const { handleLogin,recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "email is not valid."



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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
           
            handleLogin(values,'login', resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
   <Paper  id='login_paper' elevation={6}>

        <Grid   item xs sm lg xl>
 
        
        <Typography style={{marginLeft:'14%',marginBottom:'5%'}} variant="h3">Welcome to HMIS</Typography>

        <Form onSubmit={handleSubmit}>
                 
                    <Controls.Input
                        name="email"
                        label="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        style={{marginLeft:'10%'}}

                    />
                    <Controls.Input
                        label="password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        type="password"
                        style={{marginLeft:'10%'}}
                    />
                    <Card style={{width:'60%',marginLeft:'20%',borderRadius:'20px'}}>
                  <CardContent style={{marginLeft:'5%'}}>
                    <Typography variant="body2">Please Recheck Your Email and Password</Typography>
                  </CardContent>
                  <CardActions style={{marginLeft:'15%'}}>
                    
                        <Controls.Button
                            
                            type="submit"
                            text="Log in" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                </CardActions>
                </Card>
           
        </Form>
        </Grid>
  </Paper>
    
       
    )
}
