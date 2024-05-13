import React from 'react'
import { FaBuilding, FaSuitcase , FaUserPlus, FaUsers} from 'react-icons/fa';

function HeroSection() {
    const heroData = [
      { id: 1, title: '1,23,441', subTitle: 'Live Jobs', icon: <FaSuitcase/>, },
      { id: 2, title: '91220', subTitle: 'Companies', icon: <FaBuilding />, },
      { id: 3, title: '2,65,300', subTitle: 'Job Seeker', icon: <FaUsers /> },
      { id: 4, title: '1,45,763', subTitle: 'Employers', icon: <FaUserPlus />},
    ]
  
  return (
    <div className="bg-gray-900 text-white py-20 flex flex-row space-x-40">
      <section className='flex ml-20'>
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white" >Find a job that suits you</h1>
        <p className="text-lg mt-4 text-white">Your Dream Job</p>
        
        <div className="mt-8 flex gap-x-5 flex-col gap-y-5   ">
          {heroData.map((item) => (
            <div key={item.id} className="flex items-center box-border m-5 bg-gray-800 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] p-6">
              {/* className="w-6 h-6 rounded-full bg-white mr-2" */}
              <div className='w-14 h-14 shadow-md border-0.5'> {item.icon}</div>  
              <div className='content'>
                <p className='text-bold text-xl '>{item.title}</p>
                <p className='text-md text-gray-400'>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>  
      </section>
      <section >
      <img src="https://plus.unsplash.com/premium_photo-1661485199941-42bcd66977db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRyZWFtJTIwam9ifGVufDB8fDB8fHww" alt="Icon" className="mt-8 w-auto h-auto shadow-xl opacity-90" />
      </section>
    </div>
  );
}

export default HeroSection