import React from 'react'
import { TextField } from '@material-ui/core';
import '../../App.scoped.css';
import '../../index.css';
import {
    withStyles,
   
  } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--text-primary)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--text-secondary)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--brand-color)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--text-secondary)',
      },
    },
  },
})(TextField);

export default function Input(props) {

    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <CssTextField
            
            variant="outlined"
            label={label}
            name={name}
            InputLabelProps={{
              style: { color: 'var(--text-primary)' },
            }}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
