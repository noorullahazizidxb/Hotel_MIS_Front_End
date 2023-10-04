import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '../../App.scoped.css';
import '../../index.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  withStyles,
 
} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function MaterialUIPicker(props) {
  // The first commit of Material-UI
  const {text,date,handleDateChange} = props;

  const classes = useStyles();


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
  })(KeyboardDatePicker);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={text}
          format="MM/dd/yyyy"
          value={date}
          onChange={handleDateChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        {/* <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /> */}
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
