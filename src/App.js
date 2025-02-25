import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Home from "./pages/Home";
import UpdatePatient from './pages/UpdatePatient';
import CreatePatient from './pages/CreatePatient';

 function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/create-Patient" element={<CreatePatient />} />
          <Route path="/edit-Patient/:id" element={<UpdatePatient />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;