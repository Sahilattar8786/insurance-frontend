import React from 'react';

import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddUser from './Component/AddUser';
import UpdateUserComponent from './Component/UpdateUser';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser/>}></Route>
          <Route path='/UpdateUser/:id' element={<UpdateUserComponent/>}></Route>
          {/* Add more routes here */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
