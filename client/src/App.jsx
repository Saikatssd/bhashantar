import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Workspace from './Pages/Workspace';
import Choose from './Pages/Choose';
import Login from './Pages/Login';
import AppBar from './AppBar';
import ProtectedRoute from './Components/ProtectedRoutes';
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     const userToken = Cookies.get('token');
  //     console.log('Usertoken',userToken);
  //     if (userToken) {
  //       console.log('User is logged in:', userToken);
  //     } else {
  //       console.log('User is not logged in');
  //     }
  //   }, 100); // Add a slight delay
  // }, []);
  
  return (

    <Router>
      <AppBar />
      {
        isAuthenticated ? (
          <Routes>
            <Route path="/choose" element={<Choose />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="*" element={<Navigate to="/choose" />}></Route>
          </Routes>) :
          //Logged out Routes
          (<Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>)}


      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/choose" element={<Choose />} />
          <Route path="workspace" element={<Workspace />} />
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes> */}
    </Router>
  )
}

export default App
