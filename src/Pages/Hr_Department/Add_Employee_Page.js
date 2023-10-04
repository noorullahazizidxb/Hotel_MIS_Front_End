import React, { useRef } from "react";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import "../../App.scoped.css";
import "../../index.css";
import Zoom from "@material-ui/core/Zoom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ToastProvider } from "react-toast-notifications";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import SaveAltRounded from "@material-ui/icons/SaveAltRounded";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import ReceiptIcon from "@material-ui/icons/Receipt";
import axios from "axios";
import clsx from "clsx";
import { withCookies, useCookies } from "react-cookie";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SupervisedUserCircleRounded from "@material-ui/icons/SupervisedUserCircleRounded";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import { useHistory } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import yellow from "@material-ui/core/colors/yellow";
import { purple } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Form_ValueApiProvider from "./Form_ValueApi";

// const darkTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
//   primary: {
//     // Purple and green play nicely together.
//     main: purple[500],
//   },
//   secondary: {
//     // This is green.A700 as hex.
//     main: '#11cb5f',
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: theme.spacing(100),
    },
  },
  yellowPaper: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25,
  },
  customBorder: {
    border: `3px solid ${yellow[200]}`,
  },
  customBorderRadius: {
    borderRadius: 25,
  },
}));
const initialFValues = {
  First_Form: {
    id: 0,
    Em_Name: "",
    Current_City: "",
    Email: "",
    Ph_Number: "",
    path: "",
    Created_By: "",
    Deleted_BY: "",
  },
  Second_Form: {
    id: 0,
    EM_ID: "",
    Em_Position: "",
    job_Type: "",
    Salary_Per_Hour: "",
    hours_per_day: "",
    present_days_per_week: "",
    Monthly_Salery: "",
    Contract_Years: "",
    contract_start_date: "",
    contract_End_date: "",
    Job_Description: "",
    Created_By: "",
    Deleted_BY: "",
  },
  Third_Form: {
    id: 0,
    email: "",
    password: "",
    password_confirmation: "",
    Role_ID: "",
    EM_ID: "",
    Created_By: "",
    Deleted_BY: "",
  },
};

export default function Add_Employee_Page(props) {
  const { Api, Post_Request } = props;
  const { addToast } = useToasts();

  const [checked, setChecked] = React.useState(true);

  const get_data = (address, success_message, error_message, setData) => {
    Api.get(address)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        addToast(error_message, {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .then(function () {
        // always executed
      });
  };
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Zoom in={checked}>
      <Paper elevation={6} style={{ marginBottom: '4%' }}>
        <Box p={1}>
          <CustomizedSteppers
            get_data={get_data}
            Post_Request={Post_Request}
            Api={Api}
          />
        </Box>
      </Paper>
    </Zoom>
  );
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AddShoppingCartIcon />,
    2: <ReceiptIcon />,
    2: <SupervisedUserCircleRounded />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const StepperStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(4),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Enter the basic info of the Employee",
    "Contracts Info of the Employee",
    "User Account Info",
  ];
}

function getStepContent(
  step,
  handleNext,
  handleReset,
  handleBack,
  Api,
  Post_Request,
  SelectedFile,
  first_Step_Val,
  second_Step_Val,
  third_Step_Val,
  setFirst_Step_Val,
  setSecond_Step_Val,
  setThird_Step_Val,
  get_data,
  edit_flag,
  rowData,
  EM_rowData,
  add_contract_rowData,
  create_contract_flag
) {
  switch (step) {
    case 0:
      return (
        <Add_Employee_Form
          get_data={get_data}
          setFirst_Step_Val={setFirst_Step_Val}
          first_Step_Val={first_Step_Val}
          Api={Api}
          handleReset={handleReset}
          handleNext={handleNext}
          edit_flag={edit_flag}
          EM_rowData={EM_rowData}
        />
      );
    case 1:
      return (
        <Emp_Contract
          edit_flag={edit_flag}
          rowData={rowData}
          get_data={get_data}
          setSecond_Step_Val={setSecond_Step_Val}
          second_Step_Val={second_Step_Val}
          Api={Api}
          handleReset={handleReset}
          handleBack={handleBack}
          handleNext={handleNext}
          create_contract_flag={create_contract_flag}
        />
      );
    case 2:
      return (
        <Add_User_Third_Page
          get_data={get_data}
          setSecond_Step_Val={setSecond_Step_Val}
          setThird_Step_Val={setThird_Step_Val}
          third_Step_Val={third_Step_Val}
          Api={Api}
          handleReset={handleReset}
          Post_Request={Post_Request}
          handleBack={handleBack}
          SelectedFile={SelectedFile}
          first_Step_Val={first_Step_Val}
          add_contract_rowData={add_contract_rowData}
          second_Step_Val={second_Step_Val}
        />
      );
    default:
      return "Unknown step";
  }
}

function CustomizedSteppers(props) {
  const { Api, Post_Request, get_data } = props;
  const classes = StepperStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  //for editing the items
  const history = useHistory();
  const [checked, setChecked] = React.useState(true);
  const [edit_flag, set_Edit_Flag] = React.useState(false);
  const [create_contract_flag, set_Create_Contract_Flag] = React.useState(false);
  // const rowData=props.location.state.rowData;
  const [rowData, setRowData] = React.useState(history.location.state.rowData);
  const [EM_rowData, setEM_rowData] = React.useState(history.location.state.EM_rowData);
  const [add_contract_rowData, set_Add_Contract_RowData] = React.useState(history.location.state.add_contract_rowData);


  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);

  const [SelectedFile, setSelectedFile] = useState();
  const [first_Step_Val, setFirst_Step_Val] = useState(
    initialFValues.First_Form
  );
  const [second_Step_Val, setSecond_Step_Val] = useState(
    initialFValues.Second_Form
  );
  const [third_Step_Val, setThird_Step_Val] = useState(
    initialFValues.Third_Form
  );

  const handleNext = (SelectedFile) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSelectedFile(SelectedFile);
  };

  // const F_Values = (step_number,values,SelectedFile) => {
  //   if(step_number==1)
  //   {
  //     setFirst_Step_Val(values);
  //   }
  //   if(step_number==2){
  //     setSecond_Step_Val(values);
  //   }
  //   if(step_number==3){
  //     setThird_Step_Val(values);
  //   }
  //   // setValue(values);
  //   // setUser_ID(totalprice);
  //   setSelectedFile(SelectedFile);
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  useEffect(() => {
    if (rowData != null) {
      setActiveStep(1);
      set_Edit_Flag(true);
    }
    if (EM_rowData != null) {
      setActiveStep(0);
      set_Edit_Flag(true);
    }
    if (add_contract_rowData != null) {
      setActiveStep(1);
      set_Create_Contract_Flag(true);
    }
  }, [rowData, EM_rowData, add_contract_rowData]);

  return (
    <div id="form_paper" className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography className={classes.instructions}>
        {getStepContent(
          activeStep,
          handleNext,
          handleReset,
          handleBack,
          Api,
          Post_Request,
          SelectedFile,
          first_Step_Val,
          second_Step_Val,
          third_Step_Val,
          setFirst_Step_Val,
          setSecond_Step_Val,
          setThird_Step_Val,
          get_data,
          edit_flag,
          rowData,
          EM_rowData,
          add_contract_rowData,
          create_contract_flag
        )}
      </Typography>
    </div>
  );
}

function Add_Employee_Form(props) {
  // const { addOrEdit, recordForEdit } = props
  const { addToast } = useToasts();
  const { handleNext, handleReset, first_Step_Val, setFirst_Step_Val, edit_flag, EM_rowData, add_contract_rowData } = props;
  const [updateflag, setUpdateFlag] = useState(false);
  const [postpath, setPostPath] = useState("");
  const [updatepath, setUpdatePath] = useState("");
  const [imageupdateflag, setImageUpdateFlag] = useState(false);
  const [added_flag, setAdded_Flag] = useState(false);
  const [SelectedFile, setSelectedFile] = useState([]);
  const history = useHistory();

  const [cookies, setCookie, removeCookie] = useCookies(["Token", "User"]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("Em_Name" in fieldValues)
      temp.Em_Name = fieldValues.Em_Name
        ? ""
        : " Em_Name This field is required.";
    if ("Current_City" in fieldValues)
      temp.Current_City = fieldValues.Current_City
        ? ""
        : " Current_City`This field is required.";
    if ("Email" in fieldValues)
      temp.Email = fieldValues.Email ? "" : " Email This field is required.";
    if ("Ph_Number" in fieldValues)
      temp.Ph_Number = fieldValues.Ph_Number
        ? ""
        : " Ph_Number This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(() => { if (EM_rowData != null) { return EM_rowData; } else { return first_Step_Val; } }, true, validate);

  //Function For Submitting the Form

  useEffect(() => {
    if (EM_rowData != null) {
      setValues({
        ...EM_rowData,
      });


    } else {
      setValues(first_Step_Val);
      if (first_Step_Val.id != 0) {
        setAdded_Flag(true);
      }
    }

  }, [first_Step_Val, EM_rowData]);

  //Function For Submitting the Form
  const Post_Employee = async (address1, selected_File) => {
    const formData = new FormData();
    formData.append("Path", selected_File);
    formData.append("Em_Name", values.Em_Name);
    formData.append("Email", values.Email);
    formData.append("Current_City", values.Current_City);
    formData.append("Ph_Number", values.Ph_Number);
    formData.append("Created_By", cookies.User);
    formData.append("Deleted_BY", values.Deleted_BY);

    await fetch(address1, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.Token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        addToast(
          `Record with Name: ${response.Em_Name
          }  Saved Successfully and her/his ID is ${response.id}!`,
          {
            appearance: "success",
            autoDismiss: true,
            zIndex: "1",
          }
        );
        setValues(response);
        setFirst_Step_Val(response);
      })
      .catch((error) => {
        addToast("Unable to Post Employees!", {
          appearance: "error",
          autoDismiss: true,
          zIndex: "1",
        });
      });
  };

  //Function For Submitting the Form
  const Update_Employee = async (address1, value, selected_File) => {
    const formData = new FormData();
    formData.append("Path", selected_File);
    formData.append("Em_Name", value.Em_Name);
    formData.append("Email", value.Email);
    formData.append("Current_City", value.Current_City);
    formData.append("Ph_Number", value.Ph_Number);
    formData.append("Created_By", cookies.User);
    formData.append("Deleted_BY", value.Deleted_BY);

    await fetch(address1, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.Token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        addToast(
          `Record with Name: ${response.Em_Name
          }  Updated Successfully and her/his ID is ${response.id}!`,
          {
            appearance: "success",
            autoDismiss: true,
            zIndex: "1",
          }
        );
        setValues(response);
        setFirst_Step_Val(response);
      })
      .catch((error) => {
        addToast("Unable to Update Employee!", {
          appearance: "error",
          autoDismiss: true,
          zIndex: "1",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // addOrEdit(values, resetForm);
      if (added_flag === true) {
        Update_Employee(
          `http://localhost:8000/api/HMIS/Employies/${values.id}?_method=PATCH`,
          values,
          SelectedFile
        );
        setAdded_Flag(true);
        handleNext();
      } else {
        if (edit_flag === true) {
          Swal.fire({
            title: `Do You Want to Update this Employee ${EM_rowData.Em_Name}`,
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Update_Employee(
                `http://localhost:8000/api/HMIS/Employies/${values.id}?_method=PATCH`,
                values,
                SelectedFile
              );
              history.push({
                pathname: '/Employee_List',
              })

            } else if (result.isDenied) {
              history.push({
                pathname: '/Employee_List',
              })
            }
          });

        }
        else {
          Post_Employee("http://localhost:8000/api/HMIS/Employies", SelectedFile);
          setAdded_Flag(true);
          handleNext();
        }

      }
    }
  };
  // let testObject = { 'one': 1, 'two': 2, 'three': 3 };

  // // Put the object into storage
  // localStorage.setItem('testObject', JSON.stringify(testObject));

  // // Retrieve the object from storage
  // let retrievedObject = localStorage.getItem('testObject');

  // console.log('retrievedObject: ', JSON.parse(retrievedObject));

  //}, [] ===> on mount Execution
  // }) Excecution in every render
  // return ()=>{
  //  the clean up code
  // }
  // })

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="id"
            label="Employee ID"
            hidden
            value={values.id}
            onChange={handleInputChange}
            error={errors.id}
          />
          <Controls.Input
            name="Em_Name"
            label="اسم کارمند"
            value={values.Em_Name}
            onChange={handleInputChange}
            error={errors.Em_Name}
          />

          <Controls.Input
            label="شهر فعلی"
            name="Current_City"
            value={values.Current_City}
            onChange={handleInputChange}
            error={errors.Current_City}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="ایمیل آدرس"
            name="Email"
            type="email"
            value={values.Email}
            onChange={handleInputChange}
            error={errors.Email}
          />

          <Controls.Input
            label="شماره تماس"
            name="Ph_Number"
            value={values.Ph_Number}
            onChange={handleInputChange}
            error={errors.Ph_Number}
          />
          <br />
          <div class="mb-3 mx-2 col-md-9 col-sm-5 col-xs-5 ">
            <input
              type="file"
              name="Path"
              id="File"
              class="form-control"
              onChange={(e) => {
                if (imageupdateflag != false) {
                  setImageUpdateFlag(false);
                  setSelectedFile(e.target.files[0]);
                  setPostPath(URL.createObjectURL(e.target.files[0]));
                } else {
                  setSelectedFile(e.target.files[0]);
                  setPostPath(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>

          <div style={{ display: "flex" }}>
            {imageupdateflag ? (
              <img
                style={{
                  width: "20%",
                  height: "50%",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  marginLeft: "40%",
                  marginBottom: "0%",
                  padding: "0px",
                }}
                src={"http://localhost:8000/" + SelectedFile}
              />
            ) : null}
            {postpath ? (
              <img
                style={{
                  width: "20%",
                  height: "50%",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  marginLeft: "40%",
                  marginBottom: "0%",
                  padding: "0px",
                }}
                src={postpath}
              />
            ) : null}
            {updatepath ? (
              <img
                style={{
                  width: "20%",
                  height: "50%",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  marginLeft: "40%",
                  marginBottom: "0%",
                  padding: "0px",
                }}
                src={updatepath}
              />
            ) : null}
          </div>
        </Grid>

        <div
          className="col-md-10 col-sm-12 col-xs-12"
          style={{
            marginLeft: "8%",
            marginRight: "10%",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <Card>
            <CardContent>
              <Typography letiant="body2">
                Please be aware that this step cant be undone.
              </Typography>
            </CardContent>
            <CardActions>
              {edit_flag ? <Controls.Button
                style={{ width: "50%", height: "100%", borderRadius: "10px", marginLeft: "25%" }}
                text="Update"
                type="submit"
                letiant="contained"
                color="primary"
                startIcon={<SaveAltRounded />}
              /> : (
                <Controls.Button
                  style={{ width: "50%", height: "100%", borderRadius: "10px" }}
                  text={
                    added_flag ? "Update Employee & Next" : "Save Employee & Next"
                  }
                  type="submit"
                  letiant="contained"
                  color="primary"
                  startIcon={<SaveAltRounded />}
                />
              )}
              {edit_flag ? null : (
                <Controls.Button
                  // type="submit"
                  onClick={handleReset}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  letiant="contained"
                  color="secondary"
                  startIcon={<CancelRoundedIcon />}
                  text="Cancel"
                />
              )}
              {edit_flag ? null : (
                <Controls.Button
                  // type="submit"
                  onClick={() => {
                    resetForm();
                  }}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  letiant="contained"
                  color="secondary"
                  startIcon={<CancelRoundedIcon />}
                  text="Reset"
                />
              )}


            </CardActions>
          </Card>
        </div>
      </Grid>
    </Form>
  );
}

function Emp_Contract(props) {
  // const Form_Val=React.useContext(Form_ValueApiProvider);
  const { addToast } = useToasts();
  const history = useHistory();

  const {
    handleBack,
    handleNext,
    Api,
    second_Step_Val,
    setSecond_Step_Val,
    edit_flag,
    rowData,
    create_contract_flag
  } = props;

  const [position, setPosition] = useState([""]);
  const [employies, setEmployies] = useState([""]);
  const [job_type, setJobType] = useState([""]);

  const [cookies, setCookie, removeCookie] = useCookies(["Token", "User"]);

  const [
    show_Hourly_and_Parmanent_drop_down_Flag,
    setShow_Hourly_and_Parmanent_drop_down_Flag,
  ] = useState(false);

  const childRef1 = useRef();
  const childRef2 = useRef();

  const [selectedDate_for_end, setSelectedDate_for_end] = React.useState(
    new Date()
  );

  const handleDateChange_for_end = (date) => {
    setSelectedDate_for_end(date);
    setValues({ ...values, contract_End_date: date });
  };
  const [selectedDate_for_start, setSelectedDate_for_start] = React.useState(
    new Date()
  );

  const handleDateChange_for_start = (date) => {
    setSelectedDate_for_start(date);
    setValues({ ...values, contract_start_date: date });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("EM_ID" in fieldValues)
      temp.EM_ID = fieldValues.EM_ID ? "" : " EM_ID  field is required.";
    if ("Monthly_Salery" in fieldValues)
      temp.Monthly_Salery = fieldValues.Monthly_Salery
        ? ""
        : "  Monthly Salery field is required.";
    if ("Contract_Years" in fieldValues)
      temp.Contract_Years = fieldValues.Contract_Years
        ? ""
        : "  Contract Years field is required.";
    if ("contract_start_date" in fieldValues)
      temp.contract_start_date = fieldValues.contract_start_date
        ? ""
        : "  Contract Start Date field is required.";
    if ("contract_End_date" in fieldValues)
      temp.contract_End_date = fieldValues.contract_End_date
        ? ""
        : "  Contract End Date field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(() => { if (rowData != null) { return rowData; } else { return second_Step_Val; } }, true, validate);




  const Put_Contract = async (address, value, success_message, error_message,) => {
    await Api.put(address, value)
      .then(response => {
        if (response.message != null) {
          addToast(error_message, {
            appearance: 'error',
            autoDismiss: true,
          });
        } else {
          addToast(`${success_message} Record Name`, {
            appearance: 'success',
            autoDismiss: true,
            zIndex: '1'
          });
          history.push({
            pathname: '/Employee_List',
          })
        }
      })
      .catch((error) => {
        addToast(error_message, {
          appearance: 'error',
          autoDismiss: true,
        });
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {


      // addOrEdit(values, resetForm);
      Swal.fire({
        title: `Do You Want to Update this Contract ${rowData.Em_Name}`,
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Put_Contract(`/Contracts/${values.id}`, values, "Contract Updated Successfully", "an Error Occured During the Update Proccess");

        } else if (result.isDenied) {
        }
      });
    }
  };
  const get_data = (address, success_message, error_message) => {
    Api.get(address)
      .then(function (response) {
        setPosition(response.data.Position);
        setJobType(response.data.JobType);
      })
      .catch(function (error) {
        addToast(error_message, {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    //checking if the user wants to update the record
    if (rowData != null) {
      if (job_type == "" && position == "") {
        get_data(
          "Position_and_JobType",
          "the get operation was successfull",
          "an error occured during the get proccess"
        );
      }
      setValues({
        ...rowData,
        Contract_Years: rowData.Contract_Years,
        Monthly_Salery: rowData.Monthly_Salery,
      });

      handleDateChange_for_end(rowData.contract_End_date);
      handleDateChange_for_start(rowData.contract_start_date);
      childRef1.current.getAlert(rowData.Position_Name);
      childRef2.current.getAlert(rowData.Job_Type_Name);
      if (rowData.job_Type == 1) {
        setShow_Hourly_and_Parmanent_drop_down_Flag(false);
      } else {
        setShow_Hourly_and_Parmanent_drop_down_Flag(true);
      }
    } else {
      setValues(second_Step_Val);
      if (job_type == "" && position == "") {
        get_data(
          "Position_and_JobType",
          "the get operation was successfull",
          "an error occured during the get proccess"
        );
      }

      childRef1.current.getAlert(second_Step_Val.Postions_Name);
      childRef2.current.getAlert(second_Step_Val.Type);
    }
  }, [second_Step_Val, rowData]);
  //}, [] ===> on mount Execution
  // }) Excecution in every render
  // return ()=>{
  //  the clean up code
  // }
  // })

  //Function For Submitting the Form
  const get_comboBx_value_for_postion = (value) => {
    setValues({
      ...values,
      Em_Position: value.id,
      Postions_Name: value.Postions_Name,
    });
    setSecond_Step_Val({
      ...values,
      Em_Position: value.id,
      Postions_Name: value.Postions_Name,
    });
  };

  const get_comboBx_value_for_job_Type = (value) => {
    if (value.id == 1) {
      setShow_Hourly_and_Parmanent_drop_down_Flag(false);
      setValues({ ...values, job_Type: value.id, Type: value.Type });
      setSecond_Step_Val({ ...values, job_Type: value.id, Type: value.Type });
    } else {
      setShow_Hourly_and_Parmanent_drop_down_Flag(true);
      setValues({ ...values, job_Type: value.id, Type: value.Type });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item lg={6} md={6} sm={6} xs>
          <Controls.ComboBox_For_Job_Type
            options={job_type}
            error={errors.job_Type}
            get_comboBx_value={get_comboBx_value_for_job_Type}
            ref={childRef2}
          />

          <Controls.ComboBox_For_Em_Position
            options={position}
            error={errors.Em_Position}
            get_comboBx_value={get_comboBx_value_for_postion}
            ref={childRef1}
          />

          <Controls.Input
            label="مدت قرار داد"
            name="Contract_Years"
            value={values.Contract_Years}
            onChange={handleInputChange}
            error={errors.Contract_Years}
          />

          <Controls.Input
            name="Monthly_Salery"
            label="معاش"
            value={values.Monthly_Salery}
            onChange={handleInputChange}
            error={errors.Monthly_Salery}
          />
          <Controls.MaterialUIPicker
            name="contract_start_date"
            text="تاریخ شروع قرار داد"
            date={selectedDate_for_start}
            handleDateChange={handleDateChange_for_start}
            error={errors.contract_start_date}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.MaterialUIPicker
            name="contract_End_date"
            text="تاریخ ختم قرار داد"
            date={selectedDate_for_end}
            handleDateChange={handleDateChange_for_end}
            error={errors.contract_End_date}
          />

          {show_Hourly_and_Parmanent_drop_down_Flag ? (
            <Grid lg sm xs md>
              <Controls.Input
                name="Salary_Per_Hour"
                label="معاش ساعت وار"
                value={values.Salary_Per_Hour}
                onChange={handleInputChange}
                error={errors.Salary_Per_Hour}
              />
              <Controls.Input
                name="hours_per_day"
                label="ساعت های حاضر در روز"
                value={values.hours_per_day}
                onChange={handleInputChange}
                error={errors.hours_per_day}
              />
              <Controls.Input
                name="present_days_per_week"
                label="حاضری هفته وار"
                value={values.present_days_per_week}
                onChange={handleInputChange}
                error={errors.present_days_per_week}
              />
            </Grid>
          ) : null}

          <Controls.Input
            id="outlined-textarea"
            label="لایحه وظایف"
            name="Job_Description"
            value={values.Job_Description}
            onChange={handleInputChange}
            error={errors.Job_Description}
            placeholder="Please Enter Job Description Here"
            multiline
            letiant="outlined"
          />

          <div class="row" style={{ marginLeft: "0%", marginTop: "5%" }}>
            <Card>
              <CardContent>
                <Typography letiant="body2">
                  Please Recheck the data before saving
                </Typography>
              </CardContent>
              <CardActions>
                {edit_flag || create_contract_flag ? null : (
                  <Controls.Button
                    onClick={() => {
                      setSecond_Step_Val(values);
                      handleBack();
                    }}
                    style={{
                      width: "30%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    text="Back"
                    letiant="contained"
                    color="primary"
                    startIcon={<SaveAltRounded />}
                  />
                )}
                {edit_flag ? null : (
                  <Controls.Button
                    onClick={() => {
                      setSecond_Step_Val(values);

                      handleNext();
                    }}
                    style={{
                      width: "30%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    text="Next"
                    letiant="contained"
                    color="primary"
                    startIcon={<SaveAltRounded />}
                  />
                )}
                {edit_flag ? (
                  <Controls.Button
                    type="submit"
                    // onClick={}
                    style={{
                      width: "30%",
                      height: "100%",
                      borderRadius: "10px",
                      marginLeft: '35%'
                    }}
                    text="Update"
                    letiant="contained"
                    color="primary"
                    startIcon={<SaveAltRounded />}
                  />
                ) : null}

                {edit_flag ? null : (
                  <Controls.Button
                    // type="submit"
                    onClick={() => {
                      resetForm();
                    }}
                    style={{
                      width: "30%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    letiant="contained"
                    color="secondary"
                    startIcon={<CancelRoundedIcon />}
                    text="Cancel"
                  />
                )}
              </CardActions>
            </Card>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

function Add_User_Third_Page(props) {
  // const Form_Val=React.useContext(Form_ValueApiProvider);
  const { addToast } = useToasts();
  const {
    reset,
    handleBack,
    handleNext,
    Api,
    Post_Request,
    SelectedFile,
    first_Step_Val,
    second_Step_Val,
    third_Step_Val,
    setThird_Step_Val,
    setSecond_Step_Val,
    get_data,
    add_contract_rowData
  } = props;
  const [updateflag, setUpdateFlag] = useState(false);

  const [passwordError, setPasswordErr] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const childRef1 = useRef();

  const [cookies, setCookie, removeCookie] = useCookies(["Token", "User"]);

  const [validation_flag, setValidation_Flag] = useState(false);

  const password_handleValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;

    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;

      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);

      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
        setValidation_Flag(false);
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
        setValidation_Flag(false);
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
        setValidation_Flag(false);
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
        setValidation_Flag(false);
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
        setValidation_Flag(false);
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
        setValidation_Flag(false);
      } else {
        errMsg = "";
        setValidation_Flag(true);
      }
      setPasswordErr(errMsg);
    }

    // for confirm password
    if (
      passwordInputFieldName === "password_confirmation" ||
      (passwordInputFieldName === "password" &&
        passwordInput.password_confirmation.length > 0)
    ) {
      if (values.password_confirmation !== values.password) {
        setConfirmPasswordError("Confirm password is not matched");
        setValidation_Flag(false);
      } else {
        setConfirmPasswordError("Password Matched");
        setValidation_Flag(true);
      }
    }
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "email is not valid.";
    if ("Role_ID" in fieldValues)
      temp.Role_ID = fieldValues.Role_ID ? "" : "   Role field is required.";
    if ("EM_ID" in fieldValues)
      temp.EM_ID = fieldValues.EM_ID ? "" : "   EMPLOYEE field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(third_Step_Val, true, validate);

  const [passwordInput, setPasswordInput] = useState({
    password: values.password,
    password_confirmation: values.password_confirmation,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate() && validation_flag == true) {
      // addOrEdit(values, resetForm);

      // let Em_Data=localStorage.getItem('data');
      // setEm_Data(JSON.parse(Em_Data));

      Post_Request(
        "/Contracts",
        second_Step_Val,
        `${first_Step_Val.Em_Name} Contract Added Successfully`,
        `an Error Occured During  the adding Contract  Proccess of ${first_Step_Val.Em_Name}`
      );
      Post_Request(
        "/signup",
        values,
        `User ${first_Step_Val.Em_Name} Added Successfully`,
        `an Error Occured During the adding User Proccess of ${first_Step_Val.Em_Name}`
      );
      // setPostPath(false);

      setUpdateFlag(false);

      // resetForm();
    }
  };

  useEffect(() => {
    if (add_contract_rowData != null) {
      setSecond_Step_Val({
        ...second_Step_Val,
        EM_ID: add_contract_rowData.id,
        Created_By: cookies.User,
      });
      setValues({
        ...third_Step_Val,
        email: add_contract_rowData.Email,
        EM_ID: add_contract_rowData.id,
        Role_ID: second_Step_Val.Em_Position,
        Created_By: cookies.User,
        Deleted_BY: third_Step_Val.Deleted_BY,
      });
    } else {
      setSecond_Step_Val({
        ...second_Step_Val,
        EM_ID: first_Step_Val.id,
        Created_By: cookies.User,
      });
      setValues({
        ...third_Step_Val,
        email: first_Step_Val.Email,
        EM_ID: first_Step_Val.id,
        Role_ID: second_Step_Val.Em_Position,
        Created_By: cookies.User,
        Deleted_BY: third_Step_Val.Deleted_BY,
      });

    }

  }, [third_Step_Val, add_contract_rowData]);
  // }, [recordForEdit])

  // get_data('Companies','company');

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid lg={6} md={6} sm={6} xs>
          <Controls.Input
            name="password"
            label="پاسورد"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            onKeyUp={password_handleValidation}
            error={passwordError}
          />

          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            class="row"
            style={{ marginLeft: "0%", marginRight: "3%", marginTop: "0%" }}
          >
            <Card>
              <CardContent>
                <Typography letiant="body2">
                  Please Recheck the data before saving
                </Typography>
              </CardContent>
              <CardActions>
                <Controls.Button
                  onClick={() => {
                    setThird_Step_Val({ ...values });

                    handleBack();
                  }}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  text="Back"
                  letiant="contained"
                  color="primary"
                  startIcon={<SaveAltRounded />}
                />
                <Controls.Button
                  type="submit"
                  // onClick={}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  text="Save"
                  letiant="contained"
                  color="primary"
                  startIcon={<SaveAltRounded />}
                />

                <Controls.Button
                  // type="submit"
                  onClick={() => {
                    resetForm();
                  }}
                  style={{ width: "30%", height: "100%", borderRadius: "10px" }}
                  letiant="contained"
                  color="secondary"
                  startIcon={<CancelRoundedIcon />}
                  text="Cancel"
                />
              </CardActions>
            </Card>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="password_confirmation"
            label="تاییدی پاسورد "
            type="password"
            value={values.password_confirmation}
            onKeyUp={password_handleValidation}
            onChange={handleInputChange}
            error={confirmPasswordError}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
