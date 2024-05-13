import React from 'react'

function ResumeModal({imageUrl, onClose}) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <span className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="Resume" className="max-w-full h-auto" />
      </div>
    </div>
  )
}

export default ResumeModal