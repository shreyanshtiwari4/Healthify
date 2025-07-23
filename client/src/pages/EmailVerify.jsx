import { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { useNavigate, useLocation } from 'react-router-dom';
import { use } from 'react';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
 // 10 minutes in seconds
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
    const role = location.state?.role || '';
    const timer = location.state?.timer || 600; 
      const [countdown, setCountdown] = useState(timer);// Default to 10 minutes if not provided



  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

   useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email.trim() || otp.includes('')) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const otpCode = otp.join('');
      const { data } = await axios.post(`${BASE_URL}/auth/verify-email`, {
        email,
        role,
        otp: otpCode,
      });
      if (data.success) {
        toast.success('Email verified successfully!');
        navigate('/login');
      } else {
        toast.error(data.message);
        if (data.message === 'OTP Expired') navigate('/sendVerifyotp');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/resend-otp`, { email });
      toast.success(res.data.message || "OTP resent successfully!");
      setCountdown(600); // Reset to 10 minutes
      setOtp(new Array(6).fill(''));
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='px-5 xl:px-0 flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='max-w-[400px] w-full bg-white rounded-lg shadow-md p-8'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-6 text-center'>
          Email Verification
        </h3>
        <p className='text__para text-center mb-4'>
          Enter the OTP sent to your email.
        </p>
        <form onSubmit={handleVerify}>
          <div className='mb-5 flex justify-center gap-2'>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => (inputRefs.current[idx] = el)}
                type='text'
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                className='w-10 h-10 text-center text-[18px] bg-gray-200 text-headingColor rounded-md border border-[#0066ff61] focus:outline-none focus:border-primaryColor'
                placeholder='•'
                required
              />
            ))}
          </div>
          <div className='mb-5 text-center'>
            {countdown > 0 ? (
              <>
                <span className='text-textColor'>Resend OTP in </span>
                <span className='text-primaryColor font-bold'>
                  {`${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(countdown % 60).padStart(2, '0')}`}
                </span>
              </>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="py-2 px-4 bg-primaryColor text-white rounded-lg"
                disabled={loading}
              >
                {loading ? <HashLoader size={20} /> : "Resend OTP"}
              </button>
            )}
          </div>
          <button
            type='submit'
            disabled={loading || countdown === 0}
            className='w-full py-3 px-4 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg'
          >
            {loading ? <HashLoader /> : 'Verify'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyEmail;