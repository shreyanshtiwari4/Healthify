import { formateDate } from './../../utils/formateDate';

const DoctorAbout = ({ name, about, qualifications = [], experiences = [] }) => {
    return (
      <div>
          <div className='w-full'>
              <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                  About
                  <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                      {name || "N/A"}
                  </span>
              </h3>
              <p className='text__para'>
                  {about || "No information available."}
              </p>
          </div>
  
          {/* Education Section */}
          <div className='mt-12'>
              <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                  Education
              </h3>
              <ul className='pt-4 md:p-5'>
                  {qualifications.length > 0 ? (
                      qualifications.map((item, index) => (
                          <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                              <div>
                                  <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                                      {item.startingDate ? formateDate(item.startingDate) : "N/A"} - 
                                      {item.endingDate ? formateDate(item.endingDate) : "Present"}
                                  </span>
                                  <p className='text-[16px] leading-6 font-medium text-textColor'>
                                      {item.degree || "Unknown Degree"}
                                  </p>
                              </div>
                              <p className='text-[14px] leading-5 font-medium text-textColor'>
                                  {item.university || "Unknown University"}
                              </p>
                          </li>
                      ))
                  ) : (
                      <p className="text-textColor">No Information available.</p>
                  )}
              </ul>
          </div>
  
          {/* Experience Section */}
          <div className='mt-12'>
              <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                  Experience
              </h3>
              <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                  {experiences.length > 0 ? (
                      experiences.map((item, index) => (
                          <li key={index} className='p-4 rounded bg-[#fff9ea]'>
                              <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                                  {item.startingDate ? formateDate(item.startingDate) : "N/A"} - 
                                  {item.endingDate ? formateDate(item.endingDate) : "Present"}
                              </span>
                              <p className='text-[16px] leading-6 font-medium text-textColor'>
                                  {item.position || "Unknown Position"}
                              </p>
                              <p className='text-[14px] leading-5 font-medium text-textColor'>
                                  {item.hospital || "Unknown Hospital"}
                              </p>
                          </li>
                      ))
                  ) : (
                      <p className="text-textColor">No Information available.</p>
                  )}
              </ul>
          </div>
      </div>
    )
  }
  
  export default DoctorAbout;
  