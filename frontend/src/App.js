import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toastify from './components/Toastify/Toastify';
import Login from './pages/Auth/Login/login';
import Register from './pages/Auth/Register/register';
import ProtectedRoutes from './protectedRoute';
import Layout from './components/Layout';
import Devices from './components/Devices/devices';
import Users from './components/Users/users';
import Profile from './components/Profile/profile';
import DeviceDetails from './components/Devices/deviceDetails';
import { refreshTokenApi } from './services/api';

function App() {

  setInterval(async() => {
    const refresh= JSON.parse(localStorage.getItem("refresh"))
    const access =  await refreshTokenApi({refresh: refresh})
    localStorage.setItem("authToken", JSON.stringify(access?.access)); 
  }, 300000)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Devices />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/device_details/:deviceId" element={<DeviceDetails />} />
          </Route>
        </Route>
      </Routes>
      <Toastify />
    </Router>
  );
}

export default App;
