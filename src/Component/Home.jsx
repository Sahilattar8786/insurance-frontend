import { FormControl, InputLabel, MenuItem,Box,Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import Private from './Private';

export default function Home() {
    const [selectValue,setSelectValue] =useState(0) ;

    const handleChange=(event)=>{
         setSelectValue(event.target.value);
    }
  return (
    <Box sx={{
        display:'block',
        p:2
    }}>
        <h1>Welcome to the Insurance App!</h1>
          <FormControl fullWidth >
             <InputLabel id="input-lable-1">User Type</InputLabel>
             <Select
              labelId="input-lable-1"
              id="input-select-1"
              name="Select Your User Type"
              label="User Type"
              onChange={handleChange}
              value={selectValue}
             >
             <MenuItem value={1}>Private</MenuItem>
             <MenuItem value={2}>Company</MenuItem>
             </Select>
          </FormControl>

          {
             selectValue=== 0 ? (
                <Box sx={{
                    mt:5,
                    p:2,
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    height:'100px',
                    backgroundColor:'lightgray'
 
                }}>
                    <Typography variant="body1" color="initial">
                       Please select a User type.
                    </Typography>
                 </Box>
             ) : selectValue ===1 ? (
                 <Private/>
             ) : (
                <p>Company user selected.</p>
             )
          }
    </Box>
  )
}
