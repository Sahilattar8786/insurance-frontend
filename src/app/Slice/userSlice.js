import { TrySharp } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { startTransition } from "react";
export const addUser = createAsyncThunk(
    'user/add', async({fullName,MobNo,dob,address},{rejectWithValue})=>{

        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
              const user = await axios.post('http://localhost:7000/api/private',{name:fullName,mobileNo:MobNo,birthday:dob,address},config)

              return user.data

        }catch(error){
           return rejectWithValue(error.response.data)
        }
    }
)
export const getUser =createAsyncThunk(
    'user/fetch',async()=>{
       try{
      const config={
        headers: {
            'Content-Type': 'application/json'
        }
      }  
        const response = await axios.get('http://localhost:7000/api/private',config)
        return response.data
       }catch(error){
        return error.response.data;
       }
    }
)
export const Updateuser=createAsyncThunk(
    'user/update',async({id,fullName,MobNo,dob,address},{rejectWithValue})=>{
       try{
           const config={
            headers: {
                'Content-Type': 'application/json'
            }
           }
           const response = await axios.patch(`http://localhost:7000/api/private/${id}`,{name:fullName,mobileNo:MobNo,birthday:dob,address},config) ;
           return response.data
       }catch(error){
        return rejectWithValue(error.response.data);
       }
    }
)
export const deleteUser=createAsyncThunk(
    'user/delete',async(id)=>{
        try{
            const config={
                headers:{
                     'Content-Type': 'application/json'
                }
            }
            const response = await axios.delete(`http://localhost:7000/api/private/${id}`,config) ;
            return response
        }catch(error){
            return error.response.data;
        }
    }
)

export const getUserById=createAsyncThunk(
    'user/details', async(id)=>{
        try{
        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }    
        const response = await axios.get(`http://localhost:7000/api/private/${id}`)

        return response.data
        }catch(error){
           return error.response.error
        }
    }
)

//search user 
export const searchuser=createAsyncThunk(
    'search/user' ,async(query,{rejectWithValue})=>{
        try{
            const config={
                headers: {
                    'Content-Type': 'application/json'
                }
            }    
            const response = await axios.get(`http://localhost:7000/api/private/find?query=${query}`,config)
            console.log('searchData:',response)
            return response.data
    }catch(error){
        return rejectWithValue(error.response.data)
    }
}
)
const initialState={
    data:null,
    userDetail:null,
    loading:false,
    success:false,
    error:null
}


const userSlice = createSlice({
    name:'user',
    initialState: initialState ,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUser.pending ,(state,action)=>{
            state.loading=true
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.success=false
        })
        .addCase(addUser.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.error
            state.success=false
        })
        .addCase(deleteUser.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.success=false
        })
        .addCase(getUserById.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getUserById.fulfilled,(state,action)=>{
            state.loading=false ;
            state.userDetail=action.payload;
            state.success=true ;
            
        })
        .addCase(getUserById.rejected,(state,action)=>{
            state.loading=false ;
            state.error=action.payload ;
            state.success=false ;
        })
        .addCase(Updateuser.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(Updateuser.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
        })
        .addCase(Updateuser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.error
            state.success=false  ;
        })
        .addCase
        (searchuser.pending,(state,action)=>{
            state.loading=true
        })
        .addCase
        (searchuser.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload
        })
        .addCase
        (searchuser.rejected,(state,action)=>{
            state.loading=false
            state.data=[]
            state.error=action.payload
            state.success=false
            
        })
    }
})

export default userSlice.reducer;