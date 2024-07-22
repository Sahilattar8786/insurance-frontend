import { Add  } from '@mui/icons-material'
import { Button,Box ,Typography,Grid, TableContainer ,Paper,Table, TableHead, TableRow ,TableCell, TableBody} from '@mui/material'
import React, { useEffect }  from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { deleteUser, getUser } from '../app/Slice/userSlice'
import { toast,ToastContainer } from 'react-toastify'
export default function Private() {

    
   const navigate=useNavigate()
   const dispatch=useDispatch()
   const userData=useSelector(state=>state.userData.data)
   useEffect(()=>{
     dispatch(getUser())
   },[dispatch,userData])
   
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
        <Grid item  xs={5}  sm={6} md={8}>
            <Typography variant="h4" component="div"  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } 
                }}>
                User Management
            </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
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
                ))) : <Typography variant='body1'>No Data Found</Typography>
            }
         </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer/>
    </Box>
  )
}
