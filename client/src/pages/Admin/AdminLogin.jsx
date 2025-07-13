import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import  HashLoader  from 'react-spinners/HashLoader';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/admin/login`, formData);
      const { token, message } = res.data;

      localStorage.setItem('adminToken', token);
      toast.success(message);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex justify-center items-center h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-[90%] max-w-[400px]'>
        <h2 className='text-2xl font-bold mb-6 text-center text-primaryColor'>Admin Login</h2>

        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Admin Email'
          required
          className='w-full mb-4 px-4 py-2 border rounded'
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
          className='w-full mb-6 px-4 py-2 border rounded'
        />

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-primaryColor text-white py-2 rounded hover:bg-blue-600'
        >
            { loading ? <HashLoader size={35} color='#ffffff' /> : 'Login' }
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
