import { useEffect, useContext} from 'react'
import './App.css'
import {Context} from './main'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import NavBar from './components/Layout/NavBar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Home from './components/Home/Home.jsx'
import Jobs from './components/Job/Jobs.jsx'
import JobDetails from './components/Job/JobDetails.jsx'
import MyJobs from './components/Job/MyJobs.jsx'
import PostJob from './components/Job/PostJob.jsx'
import Application from './components/Application/Application.jsx'
import MyApplications from './components/Application/MyApplications.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

    const {isAuthorized, setIsAuthorized, setUser, user} = useContext(Context)

    useEffect(() => {
        const fetchUser = async() => {
       
            console.log(`fetch user start`)
            await axios.get("http://localhost:4000/api/v1/user/get-user", {withCredentials: true})
            .then((res) => {
            
              setUser(res.data.data)
              setIsAuthorized(true)
            })
            .catch((error) => {
              setIsAuthorized(false)
            })   
        
        }

        fetchUser()
      
    }, [isAuthorized])
  

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/job/all-jobs" element={<Jobs/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/job/:id" element={<JobDetails/>} />
        <Route path="/job/myjobs" element={<MyJobs/>} />
        <Route path="/job/post-job" element={<PostJob/>} />
        <Route path="/application/:id" element={<Application/>} />
        <Route path="/user/my-applications" element={<MyApplications/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
