import React from 'react'
import { formateDate } from './../../utils/formateDate';

const DoctorAbout = () => {
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                About of
                <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                    Dr. Shivdutt Tiwari
                </span>
            </h3>
            <p className='text__para'>
                He is one of the leading specialists in his field with over 10 years of experience. 
                Dr. Shivdutt Tiwari has been recognized for his contributions to medical research and patient care. 
                His dedication to his profession and his patients is unparalleled.
            </p>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Education
            </h3>
            <ul className='pt-4 md:p-5'>
                {/* I might have to change the format for this */}
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate('09-13-2014')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            MS - General Surgery
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        King George's Medical University, Lucknow
                    </p>
                </li>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate('07-04-2010')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            MBBS
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        King George's Medical University, Lucknow
                    </p>
                </li>
            </ul>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Experience
            </h3>
            <ul className='grid sm:grid-cols-2 gap-[30px]  pt-4 md:p-5'>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('07-04-2010')} - {formateDate('08-13-2014')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        Resident Doctor
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        King George's Medical University, Lucknow
                    </p>
                </li>

                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('07-04-2010')} - {formateDate('08-13-2014')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        Resident Doctor
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        King George's Medical University, Lucknow
                    </p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default DoctorAbout