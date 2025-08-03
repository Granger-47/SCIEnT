import React from 'react';
import axios from 'axios';

const StudentDisplay = ({ project }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const handleJoin = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.post(
            `${backendURL}/api/student`,
            { projectId: project._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert('Joined project successfully!');
          console.log(res.data.project);
        } catch (err) {
          alert(err.response?.data?.msg || 'Failed to join project');
          console.error(err);
        }
      };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-5 w-full min-h-[28vh] max-w-3xl mx-auto border border-gray-200 relative
    transform transition-transform duration-300 ease-in-out hover:rotate-2 hover:scale-105">
        <button
        onClick={handleJoin}
        className="absolute right-4 top-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition"
     > Join </button>
      <h3 className="text-3xl font-semibold text-gray-800 mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="text-sm text-gray-500 absolute bottom-2">
        <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
        <p><strong>Members:</strong> {project.members?.length || 0}</p>
      </div>
      <p className='absolute right-2 bottom-2 text-xs text-gray-500'>Project ID: {project._id}</p>
    </div>
  );
};

export default StudentDisplay;
