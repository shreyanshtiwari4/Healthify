import convertTime from '../../utils/convertTime.js'
import { BASE_URL,token } from './../../config';
import { toast } from 'react-toastify';
import axios from 'axios';

const SidePanel = ({doctorId, ticketPrice, timeSlots}) => {
    const bookingHandler = async () => {
        try {
            const res = await axios.post(
            `${BASE_URL}/bookings/checkout-session/${doctorId}`,
            {}, // empty body
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
            );

            const data = res.data;

            if (data.session?.url) {
                window.location.href = data.session.url;
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            toast.error(errorMsg);
        }
    };

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
            {ticketPrice} $
            </span>
        </div>

        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>

            <ul className='mt-3'>
            {timeSlots?.map((item,index)=>{
                return (<li key = {index} className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                       {item.day.charAt(0).toUpperCase()+item.day.slice(1)}
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                    </p>
                </li>)

            })}
            </ul>
        </div>
        <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>Book Appointment</button>
    </div>
  )
}

export default SidePanel