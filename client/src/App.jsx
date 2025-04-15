import './App.css'; 
import Layout from './layout/Layout';
import {ToastContainer} from 'react-toastify'

function App() {

  return (
    <>
      
      <Layout />
      <ToastContainer 
        theme='dark'
      />
      
      </>
  )
  
}

export default App;