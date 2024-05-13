import React, { useContext } from 'react'
import {Context} from '../../main'
import {FaFacebookF, FaYoutube, FaLinkedin} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'

function Footer() {
  const {isAuthorized} = useContext(Context)
  return (
    <>
      <footer className={isAuthorized ? "bg-gray-800 text-white p-4" : "hidden"}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          &copy; {new Date().getFullYear()}  ALL RIGHT RESERVED BY GAGAN GUPTA
        </div>
        <div>
          <Link to={"/"} className="text-white hover:text-gray-400 mx-2"> <FaFacebookF /></Link>
          <Link to={"/"} className="text-white hover:text-gray-400 mx-2"><FaYoutube /></Link>
          <Link to={"/"} className="text-white hover:text-gray-400 mx-2"><FaLinkedin /> </Link>
          <Link to={"/"} className="text-white hover:text-gray-400 mx-2"> <RiInstagramFill /> </Link>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer