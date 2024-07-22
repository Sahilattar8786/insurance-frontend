import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Button,
  FormHelperText
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../app/Slice/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [Age, setAge] = useState("");
  const [MobNo, setMobNo] = useState("");
  const [address, setAddress] = useState("");
  const dispatch=useDispatch();
  const error =useSelector(state=>state.userData.error)
  const navigate=useNavigate();
  const [errors, setErrors] = useState({
    prefix: "",
    firstName: "",
    MiddleName: "",
    lastName: "",
    dob: "",
    address: "",
  });

  const validation = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!prefix) {
      newErrors.prefix = "*required Please Select Prefix";
      isValid = false;
    }
    if (!firstName) {
      newErrors.firstName = "*required Please Enter First Name";
      isValid = false;
    }
    if (!MiddleName) {
      newErrors.MiddleName = "*required Please Enter Middle Name";
      isValid = false;
    }
    if (!lastName) {
      newErrors.lastName = "*required Please Enter Last Name ";
      isValid = false;
    }
    if (!dob) {
      newErrors.dob = "*required";
      isValid = false;
    }
    if (Age < 18) {
      newErrors.dob = "*age should be 18 or above";
      isValid = false;
    }
    if (!address) {
      newErrors.address = "*required";
      isValid = false;
    }
    if (MobNo.length < 10) {
      newErrors.mobNo = "*enter a valid mobile number";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const dateHandler = (e) => {
    const newDOB=e.target.value
    setDob(newDOB);

    //calculate age
    const birthDate = new Date(newDOB);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    //submit the form data
    if (validation()) {
      const fullName = `${prefix} ${firstName}${MiddleName}${lastName}`;
      console.log(fullName,MobNo,dob,address)
      handleAddUser({ fullName,MobNo,dob,address });
    }
  };
  // Add User Handler 
  const handleAddUser = async ({ fullName,MobNo,dob,address }) => {
    try {
        await dispatch(addUser({fullName,MobNo,dob,address})).unwrap(); // unwrap the action to handle resolved and rejected cases
        toast.success('User added successfully!',{
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose:()=>navigate('/')
        });
    } catch (err) {
        toast.error(`Failed to add user: ${err.message}`);
    }
};

  const MobileNoHandle = (e) => {
    const regex = /^\d*$/;
    if (regex.test(e.target.value)) {
      setMobNo(e.target.value);
    }
  };

  const validateTextInput = (value) => {
    const regex = /^[a-zA-Z\s]*$/; // Only letters and spaces allowed
    return regex.test(value);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (validateTextInput(value)) {
      setter(value);
    }
  };

  console.log(errors);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        // height:'100vh',
        backgroundColor: "#f5f5f5",
        p: 2,
        m: 2,
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 600 }}>
        <Box
          sx={{
            backgroundColor: "white",
            p: 1,
            display: "flex",
            borderRadius: 5,
            m: 5,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="title-select">Select Your Title</InputLabel>
            <Select
              labelId="title-select"
              name="Select Your Title"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              sx={{
                mb: 2,
              }}
              error={!!errors.prefix}
              required
              fullWidth
            >
              <MenuItem value={"Master"}>Master.</MenuItem>
              <MenuItem value={"Mr."}>Mr.</MenuItem>
              <MenuItem value={"Mrs."}>Mrs.</MenuItem>
              <MenuItem value={"Miss"}>Miss.</MenuItem>
              <MenuItem value={"Dr."}>Dr.</MenuItem>
              <MenuItem value={"Er"}>Er.</MenuItem>
            </Select>
            <FormHelperText sx={{
              color: "error.main",
              display: "block",
            }}>{errors.prefix}</FormHelperText>
            <TextField
              id="name-textfield"
              label="First Name"
              value={firstName}
              onChange={handleInputChange(setFirstName)}
              sx={{
                mb: 2,
              }}
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              id="middle-name-textfield"
              label="Middle Name"
              value={MiddleName}
              onChange={handleInputChange(setMiddleName)}
              sx={{
                mb: 2,
              }}
              required
              error={!!errors.firstName}
              helperText={errors.MiddleName}
            />
            <TextField
              id="last-name-textfield"
              label="Last Name"
              value={lastName}
              onChange={handleInputChange(setLastName)}
              sx={{
                mb: 2,
              }}
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              id="fullName-TextField"
              label="Full Name"
              value={`${prefix} ${firstName} ${MiddleName} ${lastName}`}
              disabled
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="dob-textfield"
              label="Date of Birth"
              type="date"
              sx={{
                mb: 3,
                "& input": {
                  padding: "10px 14px",
                },
              }}
              error={!!errors.dob}
              helperText={errors.dob}
              onChange={dateHandler}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="Age-TextField"
              label="Your Age Is"
              value={Age}
              disabled
              sx={{
                mb: 2,
                width: "100%",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="Mobile No"
              type="tel"
              value={MobNo}
              onChange={MobileNoHandle}
              sx={{
                mb: 2,
              }}
              inputProps={{
                maxLength: 10,
                pattern: "\\d*",
              }}
              required
              error={!!errors.mobNo}
              helperText={errors.mobNo}
            />
            <TextField
              id="address-textField"
              label="Address"
              multiline
              maxRows={4}
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              sx={{
                mb: 2,
              }}
              required
              error={!!errors.address}
              helperText={errors.address}
            />
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Save
              </Button>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Paper>
      <ToastContainer />
    </Box>
  );
}
