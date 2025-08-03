import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const type = localStorage.getItem('type');
  
  return (
    <header className="absolute top-0 bg-white w-screen max-w-full shadow-md py-4 px-6 mb-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">ProjectHub</h1>
      <nav className="space-x-6">
        <Link to={`/${type?.toLowerCase() || 'dashboard'}`} className="text-gray-700 hover:text-blue-500 font-medium">
          Dashboard
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-500 font-medium">
          Profile
        </Link>
        <Link to="/logout" className="text-red-600 hover:text-red-800 font-medium">
          Log out
        </Link>
      </nav>
    </header>
  );
};

export default Header;
