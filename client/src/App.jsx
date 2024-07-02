import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Workspace from "./Pages/Workspace";
import Login from "./Pages/Login";
import AppBar from "./AppBar";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/authActions";
import Register from "./Pages/Register";
import Permission from "./Pages/Permission";
import SuperAdminHome from "./Pages/SuperAdmin/SuperAdminHome";
import AdminHome from "./Pages/Admin/AdminHome";
import UserHome from "./Pages/Users/UserHome";
import PermissionManage from "./Pages/PermissionManage";
import RoleManagement from "./Pages/RoleManagement";
import UserManagement from "./Pages/userManagement";
import DocumentList from "./Pages/DocumentList";
import ProjectList from "./Pages/ProjectList";
import Editor from "./Components/Editor";
import { v4 as uuidV4 } from "uuid";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("role", role);
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("User role in getDashboard:", user?.role);
  }, [user]);


  const getDashboard = () => {
    if (!user) return <Redirect to="/" />;

    if (user.role === 'user') return <UserHome />;
    if (user.role === 'admin') return <AdminHome />;
    if (user.role === 'superAdmin') return <SuperAdminHome />;
    return <Redirect to="/project" />;
  };


  // const getDashboard = () => {
  //   if (user?.role === '667a913b51c51cedfc905fac') return <UserHome />;
  //   if (user?.role === '667a913b51c51cedfc905fab') return <AdminHome />;
  //   if (user?.role === '667a913b51c51cedfc905faa') return <SuperAdminHome />;
  //   return null;
  // };


  return (
    <Router>
      <AppBar />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/home" element={getDashboard()} />
            {/* <Route path="/choose" element={<Choose />} /> */}
            <Route element={<ProtectedRoute role='superAdmin' />}>
              <Route path="/adminHome" element={<AdminHome />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/project" element={<ProjectList />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/permission" element={<Permission />} />
            <Route path="/permManage" element={<PermissionManage />} />
            <Route path="/roleManage" element={<RoleManagement />} />
            <Route element={<ProtectedRoute role='admin' />}>
              <Route path="/userManage" element={<UserManagement companyId='668137420706bda71690a38f' />} />
              {/* <Route path="/userManage" element={<UserManagement companyId={user.companyId} />} /> */}
            </Route>
            <Route path="/docs" element={<DocumentList projectId="667ee886290d54a2fec60f72" />} />
            <Route path="/documents/:id" element={<Editor />} />

            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
        <Route path="/new" element={<Navigate to={`/documents/${uuidV4()}`} replace />} />
        {/* <Route path="/unauthorized" element={<div>Unauthorized</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;


