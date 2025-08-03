import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to fetch profile:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Header type={user?.type} />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-10 px-4 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Profile</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">Name</p>
              <p className="text-xl font-medium text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-xl font-medium text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Role</p>
              <p className="text-xl font-medium text-gray-800">{user.type}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Joined/Created Projects</p>
              <p className="text-xl font-medium text-gray-800">{user.joinedProjects?.length || 0}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">User ID</p>
              <p className="text-sm text-gray-500 break-all">{user._id}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
