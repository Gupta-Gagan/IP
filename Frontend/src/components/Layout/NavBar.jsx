import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function NavBar() {

  const [show, setShow] = useState(false)
  // const [myuser, setMyUser] = useState([])
  const { isAuthorized, setIsAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate()



  const logoutHandle = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true })
      toast.success(response.data.message);
      setIsAuthorized(false)
      navigateTo("/")

    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthorized(true)
    }
  }

  const getuser = () => {
    console.log(`NavBar user is -> ${user}`)
  }





  return (
    <nav className={isAuthorized ? "flex justify-between items-center bg-gray-800 p-4" : "hidden"}>
      
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 mr-4" />
        <Link to={"/"} className="text-white text-lg font-semibold">Job Up</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300 hover:subpixel-antialiased" onClick={() => setShow(false)}>Home</Link>
        </li>
        <li>
          <Link to={"/job/all-jobs"} onClick={() => setShow(false)} className="text-white hover:text-gray-300 hover:subpixel-antialiased">All Jobs</Link>
        </li>



        <li>
          <Link to={"/user/my-applications"} onClick={() => setShow(false)} className="text-white hover:text-gray-300 hover:subpixel-antialiased">{  (user && user.role === 'Employer') ? "APPLICANT's Application" : "My Application"}</Link>
        </li>
       

        {
          user && user.role === "Employer" ? (<>
            <li>
              <Link to={"/job/post-job"} onclick={() => setShow(false)} className="text-white hover:text-gray-300 hover:subpixel-antialiased">
                POST JOB
              </Link>
            </li>
            <li>
              <Link to={"/job/myjobs"} onclick={() => setShow(false)} className="text-white hover:text-gray-300 hover:subpixel-antialiased">
                MY JOB
              </Link>
            </li>
          </>) : (<></>)
        }

      </ul>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={logoutHandle}>LOGOUT</button>
      <div>
        {/* <GiHamburgerMenu  onclick={() => setShow(!show)}/> */}
      </div>
      
    </nav>

  )
}

export default NavBar