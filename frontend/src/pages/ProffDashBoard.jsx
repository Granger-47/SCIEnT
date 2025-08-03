import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProffDisplay from '../components/ProffDisplay';
import Header from '../components/Header';
import CreateProject from '../components/CreateProject';

const Proffdashboard = () => {
  const [user, setUser] = useState(null);
  const type = localStorage.getItem('type');

  if(type!=='Professor'){
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

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/proff', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (err) {
      console.error('Error fetching professor data:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header type={user?.type}/>
      <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
          <CreateProject done={fetchUser}/>
          <p className='text-5xl mb-5'><strong>Your projects</strong></p>
        {user?.joinedProjects?.length > 0 ? (
            user.joinedProjects.map((project) => (
              <ProffDisplay key={project._id} project={project} />
            ))
          ) : (
            <p>No projects found.</p>
        )}
      </div>
      
    </>
  );
};

export default Proffdashboard;
