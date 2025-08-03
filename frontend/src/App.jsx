import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProffDashBoard from './pages/ProffDashBoard';
import Success from './pages/Success';
import Logout from './pages/Logout';
import Profile from './pages/Profile'
import StudentDashboard from './pages/StudentDashboard';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/professor" element={<ProffDashBoard/>} />
      <Route path="/student" element={<StudentDashboard/>} />
      <Route path="/success" element={<Success />} />
      <Route path="/logout" element={<Logout />}/>
    </Routes>
  )
}

export default App
