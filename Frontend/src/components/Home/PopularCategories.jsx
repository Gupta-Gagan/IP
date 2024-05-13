import React from 'react'
import { FaReact } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoLogoGameControllerA } from 'react-icons/io';
import { MdAccountBalance, MdOutlineAnimation, MdOutlineDesignServices, MdOutlineWebhook } from 'react-icons/md';
import {TbAppsFilled} from 'react-icons/tb'

function PopularCategories() {
  const popularCategoriesData = [
    { id: 1, title: 'Graphics & Design', subTitle: '319 Open Position', icon: <MdOutlineDesignServices /> },
    { id: 2, title: 'Frontend Web Develeopment', subTitle: '105 Open Position', icon: <TbAppsFilled/> },
    { id: 3, title: 'Mobile App Development', subTitle: '294 Open Position', icon:<MdOutlineWebhook/> },
    { id: 4, title: 'Mern Stack Development', subTitle: '507 Open Position', icon:<FaReact/> },
    { id: 5, title: 'Account & Finance', subTitle: '152 Open Position', icon:<MdAccountBalance/> },
    { id: 6, title: 'Artificial Intelligence', subTitle: '875 Open Position', icon:<GiArtificialIntelligence/> },
    { id: 7, title: 'Video Animation', subTitle: '150 Open Position', icon:<MdOutlineAnimation/> },
    { id: 8, title: 'Game Development', subTitle: '80 Open Position', icon:<IoLogoGameControllerA/> },
  ];
  return (
    <div className="py-20 bg-gray-900">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-24 text-center text-white">Popular Categories</h1>
        {/* <div className="grid grid-cols-3 gap-8">
          {popularCategoriesData.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.subTitle}</p>
            </div>
          ))}
        </div> */}
        <div className=" flex gap-x-5 flex-row gap-y-8 flex-wrap  ">
          {popularCategoriesData.map((item) => (
            <div key={item.id} className="flex space-x-5 w-80 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-sm flex-row m-3 p-4 bg-gray-700">
              <div className='w-5 h-5 bg-green-400'> {item.icon}</div>  
              <div className='content'>
                <p className='text-bold text-lg font-bold text-white'>{item.title}</p>
                <p className='text-md text-gray-200'>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCategories