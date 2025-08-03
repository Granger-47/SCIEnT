import React from 'react'

const ProffDisplay = ({project}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-5 w-full min-h-[28vh] max-w-3xl mx-auto border border-gray-200 relative
    transform transition-transform duration-300 ease-in-out hover:rotate-2 hover:scale-105">
      <h3 className="text-3xl font-semibold text-gray-800 mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      {/* <button className='bg-red-700 px-3 py-1 rounded-lg text-gray-200 absolute right-2 top-2
           transform transition-transform duration-100 ease-in-out hover:scale-120' onClick={()=>handleClick()}>Delete</button> */}
      <div className="text-sm text-gray-500 absolute bottom-2">
        <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
        <p><strong>Members:</strong> {project.members?.length || 0}</p>
      </div>
      <p className='absolute right-2 bottom-2 text-xs text-gray-500'>Project ID: {project._id}</p>
    </div>
  )
}

export default ProffDisplay
