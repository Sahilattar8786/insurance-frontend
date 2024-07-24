import { Add  } from '@mui/icons-material'
import { Button,Box ,Typography,Grid, TableContainer ,Paper,Table, TableHead, TableRow ,TableCell, TableBody, TextField} from '@mui/material'
import React, { useEffect, useState,useCallback }  from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { deleteUser, getUser, searchuser } from '../app/Slice/userSlice'
import { toast,ToastContainer } from 'react-toastify'
import debounce from 'lodash/debounce';
export default function Private() {

    
   const navigate=useNavigate()
   const dispatch=useDispatch()
   const [searchQuery,setSearchQuery]=useState('');
   const userData=useSelector(state=>state.userData.data)
   useEffect(()=>{
      dispatch(getUser())
   },[dispatch])
   
   const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const deleteHandler=async(id)=>{
    try {
      await dispatch(deleteUser(id)).unwrap();
      toast.success('User deleted successfully',{
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  } catch (error) {
      toast.error('Failed to delete user');
  }
  }
  const debouncedSearch = useCallback(debounce((query) => {
    console.log('query',query)
    if (query.trim()) {
        dispatch(searchuser(query));
    } else {
        // Optionally, you might want to reset search results when the query is cleared
        dispatch(getUser());
    }
}, 1000), [dispatch]);

const searchHandler = (e) => {
    const value = e.target.value;
    console.log(value)
    setSearchQuery(value);
    debouncedSearch(value); // Call the debounced function
};
  return (
    <Box
     sx={{
        backgroundColor:'#f5f5f5',
        padding:'20px',
        mt:3
     }}
    >
    <Box sx={{ margin: '10px 0' }}>
    <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item  xs={5}  sm={4} md={4}>
            <Typography variant="h4" component="div"  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } 
                }}>
                User Management
            </Typography>
        </Grid>
        <Grid item sm={4} md={4}>
            <TextField 
              id="search-input"
              label="Search by Name Mobile No"
              type="search"
              variant="outlined"
              size='small'
              value={searchQuery}
              onChange={searchHandler}
            />
        </Grid>
        <Grid item  sm={4} md={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Button variant='contained' color='primary' startIcon={<Add />} onClick={()=>navigate('/Adduser')}>
                Add User
            </Button>
        </Grid>
    </Grid>
</Box>
      <TableContainer component={Paper}>
        <Table sx={{
            minWidth:650,
            marginTop:'20px'
        }} >
         <TableHead>
            <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>UID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>birthDay</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {
                userData && userData.length>0 ?(userData.map((row,index)=>(
                    <TableRow key={index}>
                         <TableCell>{index+1}</TableCell>
                         <TableCell>{row._id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{formatDate(row.birthday)}</TableCell>
                        <TableCell>{row.mobileNo}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        
                        <TableCell sx={{
                            // display:'flex',
                            justifyContent:'space-between',
                        }}>
                            <Button variant='contained' color='primary' sx={{m:0.5}} onClick={()=>navigate(`/UpdateUser/${row._id}`)} >Edit</Button>
                            <Button variant='contained' color='secondary' sx={{m:0.5}} onClick={()=>deleteHandler(row._id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))) : <TableRow>
                     <TableCell colSpan={7} sx={{
                        textAlign:{
                            xs:'start',
                            md:'center'
                        },
                        fontSize:{xs:14,md:16},
                        fontWeight:'bold'
                     }}>No Data Found</TableCell>
                </TableRow>
            }
         </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer/>
    </Box>
  )
}
