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
import Home from "./Pages/SuperAdmin/SuperAdminHome";
import PermissionManage from "./Pages/PermissionManage";
import RoleManagement from "./Pages/RoleManagement";
import UserManagement from "./Pages/userManagement";
import Editor from "./Components/Editor";
import { v4 as uuidV4 } from "uuid";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const companyId = "6678812c8514f813f398d231";
  // const role='superadmin';

  console.log(user.name)

  const dispatch = useDispatch();
  useEffect(() => {
    // const token = Cookies.get('token');
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      dispatch(loadUser());
    }
  }, []);

  //Landing page for users
  const getDashboard = () => {
    if (user.role === 'user') return <UserHome />;
    if (user.role === 'admin') return <AdminHome />;
    if (user.role === 'superAdmin') return <SuperAdminHome />;
    return <Redirect to="/" />;
  };

  return (
    <Router>
      <AppBar />
      {isAuthenticated ? (
        <Routes>
          <Route path="/shome" element={<Home />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/permission" element={<Permission />}></Route>
          <Route path="/roleMange" element={<RoleManage />}></Route>
          <Route path="/documents/:id" element={<Editor />}></Route>
          <Route path="*" element={<Navigate to="/choose" />}></Route>
        </Routes>
      ) : (
        //Logged out Routes
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      )}
      {
        isAuthenticated ? (
          <Routes>
            {/* <Route path="/dashboard" render={getDashboard} /> */}

            <Route path="/home" render={getDashboard} />

            <Route path="/choose" element={<Choose />} />

            <Route path="/project" element={<ProjectList />} />

            <Route path="/workspace" element={<Workspace />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/permission" element={<Permission />}></Route>
            <Route path="/permManage" element={<PermissionManage />}></Route>
            <Route path="/roleManage" element={<RoleManagement />}></Route>
            <Route path="/userManage" element={<UserManagement companyId={companyId} />}></Route>

            <Route path="/docs" element={<DocumentList projectId={"667ee886290d54a2fec60f72"} />} />


            <Route path="*" element={<Navigate to="/home" />}></Route>
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

      <Routes>
        <Route
          path="/new"
          element={<Navigate to={`/documents/${uuidV4()}`} replace />}
        />
      </Routes>
    </Router>
  );
}
export default App;
