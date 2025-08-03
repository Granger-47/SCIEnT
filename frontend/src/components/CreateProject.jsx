import React,{useState} from 'react'
import axios from 'axios';

const CreateProject = ({done}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
              'http://localhost:3000/api/proff',
              { name, description },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log('Project created:', res.data.project);
            alert('Project created successfully!');
            setName('');
            setDescription('');
            done();
          } catch (err) {
            alert('Error creating project');
            console.log(err);
          }
        };

  return (
    <>
        <div className='w-full max-w-screen-xl mt-25 overflow-x-hidden px-4 flex justify-center items-center'>
            <div className='bg-white shadow-md rounded-xl mb-5 w-4xl min-h-[20vh]'>
                <h2 className="text-2xl font-semibold mt-4 text-gray-800 mb-6 text-center">
            Create a New Project
            </h2>

            <form className="space-y-5 p-10" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
                </label>
                <input
                type="text" onChange={(e)=>setName(e.target.value)}
                placeholder="Enter project name"
                className="w-[40%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
                </label>
                <textarea
                rows="4" onChange={(e)=>setDescription(e.target.value)}
                placeholder="Enter project description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
                Add Project
            </button>
            </form>
            </div>
        </div>
    </>
  )
}

export default CreateProject
