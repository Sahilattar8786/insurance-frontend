import { Box, Paper, Select, MenuItem, InputLabel, FormControl, Button, Stack, TextField, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, Updateuser, } from '../app/Slice/userSlice';
import { ToastContainer,toast } from 'react-toastify';
export default function UpdateUserComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [Newprefix, setPrefix] = useState("");
  const [NewfirstName, setFirstName] = useState("");
  const [NewMiddleName, setMiddleName] = useState("");
  const [NewlastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [Age, setAge] = useState(0);
  const [MobNo, setMobNo] = useState("");
  const [Newaddress, setNewAddress] = useState("");

  const userData = useSelector(state => state.userData.userDetail) || {};
  const { name, mobileNo, birthday, address } = userData;

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userData) {
      const { prefix, firstName, middleName, lastName } = parseFullName(name || "");
      setPrefix(prefix);
      setFirstName(firstName);
      setMiddleName(middleName);
      setLastName(lastName);
      setDob(formatDate(birthday));
      setMobNo(mobileNo);
      setNewAddress(address);
      AgeCalculator(birthday);
    }
  }, [userData]);

  const parseFullName = (fullName) => {
    const nameParts = fullName.split(' ');
    let prefix = "";
    let firstName = "";
    let middleName = "";
    let lastName = "";

    if (nameParts.length > 0) {
      prefix = nameParts[0];
      firstName = nameParts[1] || "";
      if (nameParts.length === 3) {
        lastName = nameParts[2];
      } else if (nameParts.length > 3) {
        middleName = nameParts.slice(2, -1).join(' ');
        lastName = nameParts[nameParts.length - 1];
      }
    }

    return { prefix, firstName, middleName, lastName };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  const dateHandler = (e) => {
    const newDOB = e.target.value;
    setDob(newDOB);
    AgeCalculator(newDOB);
  };

  const AgeCalculator = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const MobileNoHandle = (e) => {
    const regex = /^\d*$/;
    if (regex.test(e.target.value)) {
      setMobNo(e.target.value);
    }
  };

  const validation = () => {
    let isValid = true;
    const newErrors = {};
    if (!Newprefix) {
      newErrors.prefix = "*required Please Select Prefix";
      isValid = false;
    }
    if (!NewfirstName) {
      newErrors.firstName = "*required Please Enter First Name";
      isValid = false;
    }
    if (!NewMiddleName) {
      newErrors.MiddleName = "*required Please Enter Middle Name";
      isValid = false;
    }
    if (!NewlastName) {
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
    if (!Newaddress) {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validation()) {
     UpdateUserHanlder();
      
  };
}
  const UpdateUserHanlder=async()=>{
     try{
        const fullName = `${Newprefix} ${NewfirstName} ${NewMiddleName} ${NewlastName}`;
        await dispatch(Updateuser({ id, fullName,MobNo,dob,address: Newaddress })).unwrap();
        toast.success('User Updated successfully!',{
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose:()=>navigate('/')
        });
     }catch(error){
      toast.error(`Failed to Update user: ${error.message}`);
     }
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      p: 2,
      m: 2,
    }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            p: 1,
            display: 'flex',
            borderRadius: 5,
            m: 5
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="title-select">Select Your Title</InputLabel>
            <Select
              labelId="title-select"
              name="Select Your Title"
              value={Newprefix}
              onChange={(e) => setPrefix(e.target.value)}
              sx={{
                mb: 2,
              }}
              error={!!errors.prefix}
              required
              fullWidth
            >
              <MenuItem value={"Master"}>Master</MenuItem>
              <MenuItem value={"Mr."}>Mr.</MenuItem>
              <MenuItem value={"Mrs."}>Mrs.</MenuItem>
              <MenuItem value={"Miss"}>Miss</MenuItem>
              <MenuItem value={"Dr."}>Dr.</MenuItem>
              <MenuItem value={"Er"}>Er.</MenuItem>
            </Select>
            <FormHelperText sx={{
              color: "error.main",
              display: "block",
            }}>{errors.prefix}</FormHelperText>
            <TextField
              id="first-name-textfield"
              label="First Name"
              value={NewfirstName}
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
              value={NewMiddleName}
              onChange={handleInputChange(setMiddleName)}
              sx={{
                mb: 2,
              }}
              required
              error={!!errors.middleName}
              helperText={errors.MiddleName}
            />
            <TextField
              id="last-name-textfield"
              label="Last Name"
              value={NewlastName}
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
              value={`${Newprefix} ${NewfirstName} ${NewMiddleName} ${NewlastName}`}
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
              value={dob}
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
              value={Newaddress}
              onChange={(e) => setNewAddress(e.target.value)}
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
              <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Paper>
      <ToastContainer/>
    </Box>
  );
}
