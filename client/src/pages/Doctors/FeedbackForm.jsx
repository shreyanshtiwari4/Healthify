import React, {useState} from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BASE_URL, token } from './../../config'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import axios from 'axios'

const FeedbackForm = () => {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const[loading , setLoading] = useState(false);
  const {id} = useParams()

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        if (!rating || !reviewText) {
            setLoading(false);
            toast.error('Rating and review fields are required');
            return;
        }

        const res = await axios.post(
            `${BASE_URL}/doctors/${id}/reviews`,
            { rating, reviewText },
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
                }
            }
        );

        toast.success(res.data.message);
    } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        toast.error(errorMsg);
    } finally {
        setLoading(false);
    }
    };
    
  return (
    <form action="">
        <div>
            <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                How would you rate the overall experience?
            </h3>

            <div>
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <button
                            key={index}
                            type='button'
                            className={`${
                                index <= ((hover && rating) || hover) ? 'text-yellowColor' : 'text-gray-400'
                            } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            onDoubleClick={() => {
                                setRating(0);
                                setHover(0);
                            }}
                        >
                            <span>
                                <AiFillStar/>
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>

        <div className='mt-[30px]'>
            <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                Share your feedback or suggestions
            </h3>

            <textarea 
                className='border border-solid border-[#0066ff34] focus:outline outline:primaryColor w-full px-4
                py-3 rounded-md'
                rows="5"
                placeholder='Write your message'
                onChange={e => setReviewText(e.target.value)}
            ></textarea>
        </div>
        <button type='submit' onClick={handleSubmitReview} className='btn'>
            {loading? <HashLoader size={25} color='#fff'/>:'Submit Feedback'}
        </button>
    </form>
  )
}

export default FeedbackForm