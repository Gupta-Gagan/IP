import React from 'react'
import { FaUserPlus } from 'react-icons/fa';
import {MdFindInPage} from 'react-icons/md';
import {IoMdSend} from 'react-icons/io'

function HowItWorks() {
  const howItWorksData = [
    { id: 1, title: <FaUserPlus />, subTitle: 'Create Account', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, title: <MdFindInPage />, subTitle: 'Find a Job/Post a Job', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 3, title: <IoMdSend />, subTitle: 'Create Account', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  ];
  return (
    <div className="py-20 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">How JobUp Works</h2>
        <div className="flex justify-center space-x-32">
          {howItWorksData.map((item,index) => (
            <div key={item.id} className={` p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-80 h-80 ${index%2 ? 'bg-gray-700': 'bg-gray-600'}`}>
              <h3 className="text-lg font-semibold h-8 w-10  text-gray-200">{item.title}</h3>
              <p className=" mt-2 text-lg font-bold text-white">{item.subTitle}</p>
              <p className=" mt-2 text-white">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks