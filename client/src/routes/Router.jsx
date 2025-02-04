import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import Doctors from '../pages/Doctors/Doctors';


const Router = () => {
  return (
    <Routes>
        <Route path = '/' element={ <Home /> } />
        <Route path = '/home' element={ <Home /> } />
        <Route path = '/login' element={ <Login /> } />
        <Route path = '/signup' element={ <Signup /> } />
        <Route path = '/services' element={ <Services /> } />
        <Route path = '/contact' element={ <Contact /> } />
        <Route path = '/doctors' element={ <Doctors /> } />
        <Route path = '/doctors/:id' element={ <DoctorDetails/> } />
    </Routes>
  )
}

export default Router;