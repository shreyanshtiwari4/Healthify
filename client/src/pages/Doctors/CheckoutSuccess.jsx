import {Link} from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className='bg-grey-100 h-screen'>
        <div className='bg-white p-6 md:mx-auto'>
            <svg 
                className='w-16 h-16 text-green-600 mx-auto my-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
            >
                <path
                    fill='currentColor'
                    d='M12,0A12,12,0,1,0,24,12,12,014,12,014,0,0,0,12,02m6,927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.
                    43.188L5.785,13.769a1,1,0,1,1,1.25-1.56214.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
                ></path>
                <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' fill='currentColor' />
                <path stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2l4-4' />
            </svg>
            <div className='text-center'>
                <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
                    Payment Done!
                </h3>
                <p className='text-gray-600 my-2'>
                    Thank you for completing your secure online payment.
                </p>
                <p>Have a great day! </p>
                <div className='py-10 text-center'>
                    <Link
                        to='/home'
                        className='px-12 bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition'
                        >
                        Go Back To Home
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutSuccess