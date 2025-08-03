import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import StudentDisplay from '../components/StudentDisplay';
import axios from 'axios';
import { Link } from 'react-router-dom';


const StudentDashboard = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [projects, setProjects] = useState([]);
  const type = localStorage.getItem('type');

  if(type!=='Student'){
    return  (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
          <h1 className="text-3xl font-bold text-red-700 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-700 mb-6">You're not a student. Please login with a student account.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to login
          </Link>
        </div>
      )
    
  }
  

  useEffect(() => {
    if (type !== 'Student') return;

    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${backendURL}/api/project`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjects(res.data.projects);
      } catch (err) {
        console.error('Error fetching projects:', err.response?.data || err.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-10">
        <h1 className="text-4xl font-bold text-center mt-10 mb-8">Available Projects</h1>
        <div className="flex flex-col gap-6 items-center">
          {projects.length > 0 ? (
            projects.map((project) => (
              <StudentDisplay key={project._id} project={project} />
            ))
          ) : (
            <p className="text-gray-700 text-lg">No projects found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
