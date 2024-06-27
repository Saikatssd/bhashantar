import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Workspace from "./Pages/Workspace";
import Choose from "./Pages/Choose";
import Login from "./Pages/Login";
import AppBar from "./AppBar";
import ProtectedRoute from "./Components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { loadUser } from "./store/authActions";
import store from "./store/store";
import Register from "./Pages/Register";
import Permission from "./Pages/Permission";
import Home from "./Pages/SuperAdmin/Home";
import PermissionManage from "./Pages/PermissionManage";
import RoleManage from "./Pages/PermissionManage";
import RoleManagement from "./Pages/RoleManagement";
import UserManagement from "./Pages/userManagement";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const companyId = "6678812c8514f813f398d231";
  // const role='superadmin';

  const dispatch = useDispatch();
  useEffect(() => {
    // const token = Cookies.get('token');
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      dispatch(loadUser());
    }
  }, []);

  return (
    <Router>
      <AppBar />
      {
        isAuthenticated ? (
          <Routes>
            <Route path="/shome" element={<Home/>} />

            <Route path="/choose" element={<Choose />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/permission" element={<Permission/>}></Route>
            <Route path="/roleMange" element={<RoleManage/>}></Route>
            <Route path="*" element={<Navigate to="/choose" />}></Route>
          </Routes>) :
          //Logged out Routes
          (<Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>)
      }

      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/choose" element={<Choose />} />
          <Route path="workspace" element={<Workspace />} />
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes> */}
    </Router>
  );
}
w
export default App;
