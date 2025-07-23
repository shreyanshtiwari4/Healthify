import { useState } from 'react';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const SendVerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !role.trim()) {
      toast.error('Please enter email and select role');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/send-verify-otp`, { email, role });
      if (data.success) {
        toast.success('OTP sent successfully!');
        navigate('/emailverify', { state: { email, role, timer: 600 } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='max-w-[400px] w-full bg-white rounded-lg shadow-md p-8'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-6 text-center'>
          Send Verification OTP
        </h3>
        <form onSubmit={handleSendOtp}>
          <div className='mb-5'>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
              required
            />
          </div>
          <div className='mb-5'>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer'
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 px-4 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg'
          >
            {loading ? <HashLoader size={20} /> : 'Send OTP'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SendVerifyOtp;