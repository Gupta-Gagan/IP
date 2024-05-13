import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ResumeModal from './ResumeModal'

function MyApplications() {

  const [application, setApplication] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [resumeImageUrl, setResumeImageUrl] = useState("")

  const {user, isAuthorized} = useContext(Context)
  const navigateTo = useNavigate()

  useEffect(() => {
    if(!isAuthorized){
      navigateTo("/login")
    }
    try {
      if(user && user.role === "Employer"){
        axios.get('http://localhost:4000/api/v1/application/employer/getAll', {withCredentials: true})
        .then((res) => setApplication(res.data.data))
      }
      else{
        axios.get('http://localhost:4000/api/v1/application/jobSeeker/getAll', {withCredentials: true})
        .then((res) => setApplication(res.data.data))
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }

  }, [isAuthorized, user])

  

  const deleteApplication = async(id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/application/jobSeeker/deleteApplication/${id}`, {withCredentials:true})
      setApplication((prevApplications) => prevApplications.filter((application) => application._id !== id))
      toast.success("Application deleted successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl)
    setModalOpen(true)
  }

  const closeModal = (imageUrl) => {
    setModalOpen(false)
  }





  return (
    <div className="container mx-auto mt-8">
      Hello
    {user && user.role === 'Job Seeker' ? (
        <div>
            <h3 className="text-xl font-semibold mb-4">My Job Applications</h3>
            {application.map((application) => (
                <JobSeekerCard  element={application} deleteApplication={deleteApplication} openModal={openModal} key ={application._id}/>
            ))}
        </div>
    ) : (
        <div>
            <h3 className="text-xl font-semibold mb-4">Job Seeker's Applications</h3>
            {application.map((application) => (
                <EmployerCard  element={application} openModal={openModal} key={application._id} />
            ))}
        </div>
    )}

    {modalOpen && (<ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} /> )}


</div>
  )
}

export default MyApplications


const JobSeekerCard = ({element, deleteApplication, openModal}) => {
  return (
    <div className="border border-gray-300 rounded-md shadow-md p-4 mb-4">
    <div className="mb-4">
        <p><span className="font-semibold">Name:</span> {element.name}</p>
        <p><span className="font-semibold">Email:</span> {element.email}</p>
        <p><span className="font-semibold">Phone Number:</span> {element.phoneNumber}</p>
        <p><span className="font-semibold">Address:</span> {element.address}</p>
        <p><span className="font-semibold">Cover Letter:</span> {element.coverLetter}</p>
    </div>
    <div className="mb-4">
        <img src={element.resume.url} alt="Profile" onClick={() => openModal(element.resume.url)} className="cursor-pointer w-24 h-24 object-cover rounded-full" />
    </div>
    <div>
        <button onClick={() => deleteApplication(element._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete Application</button>
    </div>
</div>
  )
}

const EmployerCard = ({element, openModal}) => {
  return (
    <div className="border border-gray-300 rounded-md shadow-md p-4 mb-4">
    <div className="mb-4">
        <p><span className="font-semibold">Name:</span> {element.name}</p>
        <p><span className="font-semibold">Email:</span> {element.email}</p>
        <p><span className="font-semibold">Phone Number:</span> {element.phoneNumber}</p>
        <p><span className="font-semibold">Address:</span> {element.address}</p>
        <p><span className="font-semibold">Cover Letter:</span> {element.coverLetter}</p>
    </div>
    <div className="mb-4">
        <img src={element.resume.url} alt="Profile" onClick={() => openModal(element.resume.url)} className="cursor-pointer w-24 h-24 object-cover rounded-full" />
    </div>
   
</div>
  )
}


