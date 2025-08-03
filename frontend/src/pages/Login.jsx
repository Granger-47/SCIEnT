import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
     
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${backendURL}/api/auth/login`, {
              email,
              pass: password, 
            });
            console.log('Login success:', res.data);
            const token = res.data.token;
            localStorage.setItem('token', res.data.token); 

            const verifyRes = await axios.get(`${backendURL}/api/auth/verify`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
        
            const user = verifyRes.data.user;
            localStorage.setItem('type', user.type);

            navigate(`/${user.type?.toLowerCase() || 'dashboard'}`);
          } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
          }
    }



  return (
    <>
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@example.com"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"/>
          </div>

          <button
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default Login
