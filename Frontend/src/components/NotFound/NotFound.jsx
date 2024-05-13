import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-9xl">404 </h2>
                    <p className='text-xl '>Not Found</p>
                    <Link to={"/"}> Return To Home </Link>
                </div>
                
            </div>
        </>
    )
}

export default NotFound