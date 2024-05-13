import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Application() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [coverLetter, setCoverLetter] = useState("")
  const [address, setAddress] = useState("")
  const [resume, setResume] = useState(null)
  const navigateTo = useNavigate()

  const {isAuthorized, user} = useContext(Context)

  const handleFileChange = (e) => {
    const resume = e.target.files[0]
    setResume(resume)
  }

  const {id} = useParams()

  const handleApplication = async(e)=>{
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("address", address)
    formData.append("coverLetter", coverLetter)
    formData.append("resume", resume)
    formData.append("jobId", id)

    try {
      const {data} = await axios.post('http://localhost:4000/api/v1/application/postApplication', formData, {withCredentials:true, headers:{"Content-Type": "mutipart/form-data"}})
      setName("")
      setEmail("")
      setPhoneNumber(0)
      setAddress("")
      setCoverLetter("")
      setResume("")

      toast.success(data.message)
      navigateTo('/job/all-jobs')
      
    } catch (error) {
      toast.error(error.response.data.message)
      
    }

    if(!isAuthorized || (user && user.role === "Employer")){
      navigateTo('/')
    }

  }
  return (
    <div className="container mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4">Apply for Job</h3>
      <form onSubmit={handleApplication} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone Number:
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-1">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block font-medium mb-1">
            Cover Letter:
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Type Something"
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block font-medium mb-1">
            Select Resume (JPG/PNG)
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".jpg,.png"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Application