import React from 'react'
import {Context} from '../../main'
import { useContext } from 'react'
import HeroSection from '../Home/HeroSection'
import HowItWorks from '../Home/HowItWorks'
import PopularCategories from '../Home/PopularCategories'
import PopularCompany from '../Home/PopularCompany'
import { Navigate } from 'react-router-dom'

function Home() {

  const {isAuthorized, user} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to={"/login"} />
  }

  

  return (
    <div>
      {console.log(`My User Is -> ${user}`)}
      <HeroSection  />
      <HowItWorks  />
      <PopularCategories  />
      <PopularCompany  />

    </div>
  );
}

export default Home