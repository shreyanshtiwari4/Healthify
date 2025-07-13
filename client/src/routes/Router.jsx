import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import Doctors from '../pages/Doctors/Doctors';
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import CheckoutSuccess from '../pages/Doctors/CheckoutSuccess';

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
        <Route path = '/checkout-success' element={ <CheckoutSuccess/> } />
        <Route path = '/users/profile/me' 
          element={ 
            <ProtectedRoute allowedRoles={['patient']}> 
              <MyAccount /> 
            </ProtectedRoute> 
          } 
        />
        <Route path = '/doctors/profile/me' 
          element={ 
            <ProtectedRoute allowedRoles={['doctor']}> 
              <Dashboard/>  
            </ProtectedRoute>
          } 
        />
    </Routes>
  )
}

export default Router;