import React from 'react'
import { formateDate } from '../../utils/formateDate';

const Appointments = ({appointments}) => {
  return (
    <table className='w-full text-left text-sm text-gray-500'>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-6-py-3">NAME</th>
                <th scope="col" className="px-6-py-3">GENDER</th>
                <th scope="col" className="px-6-py-3">PAYMENT</th>
                <th scope="col" className="px-6-py-3">PRICE</th>
                <th scope="col" className="px-6-py-3">BOOKED ON</th>
            </tr>
        </thead>
        <tbody>
            {appointments?.map(item=>(<tr key = {item._id}>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                    <img src={item?.user?.photo || '/default.jpg'} className='w-10 h-10 rounded-full' alt='' />
                    <div className='text-base front-semibold'>{item.user.name}</div>
                    <div className='text-normal text-gray-500'>
                        {item?.user?.email}
                    </div>
                </th>
                <td className="px-6 py-4">{item?.user?.gender || 'N/A'}</td>
                <td className="px-6 py-4">
                  {item.isPaid && (<div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-green-500 '></div>
                      Paid
                  </div>
                  )}
                  {!item.isPaid && (<div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-red-500 '></div>
                      Unpaid
                  </div>
                  )}
                </td>
                <td className="px-6 py-4">{item.ticketPrice}</td>
                <td className="px-6 py-4">{formateDate(item.createdAt)}</td>

            </tr>))}
        </tbody>
    </table>
  )
}

export default Appointments;
