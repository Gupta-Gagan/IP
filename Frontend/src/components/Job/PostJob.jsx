import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

function PostJob() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("")
  const [salaryFrom, setSalaryFrom] = useState(0)
  const [salaryTo, setSalaryTo] = useState(0)
  const [fixedSalary, setFixedsalary] = useState(0)
  const [salaryType, setSalaryType] = useState("")
  const navigateTo = useNavigate()

  const {isAuthorized, user} = useContext(Context)

  if(!isAuthorized){
    navigateTo('/login')
  }

  const handleJobPost = async (e) => {
    e.preventDefault()
    if(salaryType === "Fixed Salary"){
      setSalaryFrom(0)
      setSalaryTo(0)
    }
    else if(salaryType === "Ranged Salary"){
      setFixedsalary(0)
    }
    else{
      setSalaryFrom(0)
      setSalaryTo(0)
      setFixedsalary(0)
    }

    axios.post('http://localhost:4000/api/v1/job/post-job', fixedSalary>0 ? {title, description, category, location, city, country, fixedSalary} : {title, description, category, location, city, country, salaryFrom, salaryTo}, {
      withCredentials : true,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => toast.success(res.data.message))
    .catch((error) => toast.error(error.res.data.message))

  }

  if(!isAuthorized || user.role !== "Employer"){
    navigateTo('/')
  }

  return (
    <div className="container mx-auto mt-8">
    <h3 className="text-xl font-semibold mb-4">Post a Job</h3>
    <form onSubmit={handleJobPost} className="bg-white shadow-md p-4 rounded-md">
      <div className="mb-4">
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Title" />
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2">
          <option value="">Select Category</option>
          <option value="FullStack">Full Stack</option>
          <option value="AndroidDevelopment">Android Development</option>
          <option value="ArtificialAndMachineLearning">Artificial and Machine Learning</option>
          <option value="SoftwareEngineering">Software Engineering</option>
          <option value="CloudComputing">Cloud Computing</option>
        </select>
        <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Country" />
        <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="City" />
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Location" />
      </div>
      <div className="mb-4 salary-wrapper">
        <select name="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2">
          <option value="default">Default</option>
          <option value="fixedsalary">Fixed Salary</option>
          <option value="rangedsalary">Ranged Salary</option>
        </select>
        {salaryType === 'fixedsalary' ? (
          <input type="number" name="fixedSalary" value={fixedSalary} onChange={(e) => setFixedsalary(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Fixed Salary" />
        ) : (
          <div>
            <input type="number" name="salaryFrom" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Salary From" />
            <input type="number" name="salaryTo" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Salary To" />
          </div>
        )}
      </div>
      <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="10" className="w-full p-2 border border-gray-300 rounded-md mb-4" placeholder="Description"></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Create Job</button>
    </form>
  </div>
  )
}

export default PostJob