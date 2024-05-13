import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {Context} from '../../main'
import { Navigate, useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

function Login() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context)
  const navigateTo = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(`Login Handle Started`)
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/user/login", {username: name, email, password, role }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })

      console.log('We get Login data \n')

      toast.success(data.message)
      setName("")
      setEmail("")
      setPassword("")
      setRole("")

      setIsAuthorized(true)


    } catch (error) {
      toast.error(error.response.data.message)
      console.log(`Error is -> ${error}`)
      setIsAuthorized(false)

    }
  }

  if (isAuthorized) {
    return <Navigate to={"/"}  />
  }
  
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">LOGIN YOUR ACCOUNT</h2>
      <form  className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">Username</label>
          <input type="text" id="username" name="username" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block font-medium">Role</label>
          {/* Add a select input with three options */}
          <select id="role" name="selectedRole" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Role</option>
            <option value="Employer">Employer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
        </div>
        <button type="submit" onClick={handleLogin}  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">LOGIN</button>
        <Link to="/register" className="text-indigo-600 ml-2">Create A New One? REGISTER</Link>
      </form>
    </div>
  )
}

export default Login