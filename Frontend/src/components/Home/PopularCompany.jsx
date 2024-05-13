import React from 'react'
import { FaMicrosoft, FaGoogle } from 'react-icons/fa'
import {SiTesla} from 'react-icons/si'

function PopularCompany() {
  const popularCompaniesData = [
    { id: 1, title: 'Google', location: 'Street H-16 Banglore - India', openPositions: 10, icon: <FaGoogle /> },
    { id: 2, title: 'Microsoft', location: 'Street F-98 Hyderabad - India', openPositions: 5, icon: <FaMicrosoft />},
    { id: 3, title: 'Tesla', location: 'Street KF-99 Gujrat - India', openPositions: 8, icon: <SiTesla /> },
  ];
  return (
    <div className="py-20 bg-gray-900">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Popular Companies</h1>
        <div className="flex flex-wrap gap-x-7 gap-y-12">
          {popularCompaniesData.map((item,index) => (
            <div key={item.id} className={`bg-gray-100 p-6 rounded-lg shadow-md ${index%2 ? 'bg-gray-700' : 'bg-gray-600'}`}>
              <div className="flex items-center mb-4">
              <div className='w-5 h-5 mr-5 text-gray-200'> {item.icon}</div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
              <p className=" text-white">{item.location}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-[27vw]">{item.openPositions}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCompany