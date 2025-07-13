import './App.css'; 
import Layout from './layout/Layout';
import {ToastContainer} from 'react-toastify'
import AdminRouter from './routes/AdminRouter';
import {Route,Routes} from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path='/admin/*' element={<AdminRouter />} />
        <Route path='/*' element={<Layout/>}/>
      </Routes>
      <ToastContainer theme='dark' />
    </>
  );
}

export default App;