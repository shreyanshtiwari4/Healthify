import React from 'react'
import FaqItem from './faqItem'
import {faqs} from '../../assets/data/faqs'

const FaqList = () => {
    return (
        <ul className='mt-[30px]'>
            {faqs.map((item,index)=> (
                <FaqItem item={item} key={index} />
            ))}
        </ul>
    )
}

export default FaqList