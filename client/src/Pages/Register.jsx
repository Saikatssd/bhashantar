// //only superadmin can register

// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'user',
//   });

//   const { name, email, password, role } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${server}/users/register`, formData, {
//         headers: {
//           Authorization: `Bearer ${document.cookie.replace('token=', '')}`,
//         },
//       });
//       console.log(res.data);
//     } catch (err) {
//       console.error(err.response.data);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <div>
//         <label>Name</label>
//         <input type="text" name="name" value={name} onChange={onChange} required />
//       </div>
//       <div>
//         <label>Email</label>
//         <input type="email" name="email" value={email} onChange={onChange} required />
//       </div>
//       <div>
//         <label>Password</label>
//         <input type="password" name="password" value={password} onChange={onChange} required />
//       </div>
//       <div>
//         <label>Role</label>
//         <select name="role" value={role} onChange={onChange}>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//           <option value="superadmin">Superadmin</option>
//         </select>
//       </div>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;

// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'user',
//   });

//   const { name, email, password, role } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${server}/users/register`, formData, {
//         headers: {
//           Authorization: `Bearer ${document.cookie.replace('token=', '')}`,
//         },
//       });
//       console.log(res.data);
//     } catch (err) {
//       console.error(err.response.data);
//     }
//   };

//   return (
//     <div className="flex h-screen justify-center items-center"> <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6"> <form onSubmit={onSubmit} className="space-y-4">
//           <div className="flex flex-col">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={name}
//               onChange={onChange}
//               required
//               id="name"
//               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={onChange}
//               required
//               id="email"
//               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={onChange}
//               required
//               id="password"
//               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="role">Role</label>
//             <select
//               name="role"
//               value={role}
//               onChange={onChange}
//               id="role"
//               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="superadmin" disabled>
//                 Superadmin (Restricted)
//               </option>
//             </select>
//           </div>
//           <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import { server } from '../main.jsx'
// import { Alert, AlertTitle } from "@mui/material";
// import {register} from '../store/authActions.jsx'
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from 'js-cookie';

// const Register = () => {

//   const { isAuthenticated, error, loading } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       window.location.href = "/choose";
// //     }
// //     if (error) {
// //       console.log(error);
// //     //   alert.error(error);
// //     //   dispatch(clearErrors());
// //     }
// //   }, [dispatch, alert, isAuthenticated, error]);

//     const [alertVisible, setAlertVisible] = useState(false);
//     const [alertMessage, setAlertMessage] = useState("");
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: 'user',
//     });

//     const { name, email, password, role } = formData;
//     const userToken = Cookies.get('token')
//     // console.log(userToken);

//     const onChange = (e) =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     // const onSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         // console.log(formData)
//     //         const res = await axios.post(`${server}/users/register`, formData, {
//     //             headers: {
//     //                 // Authorization: `Bearer ${document.cookie.replace('token=', '')}`,
//     //                 // Authorization: `Bearer ${userToken}`,
//     //                 'Content-Type': 'application/json',
//     //             },
//     //         });
//     //         console.log(res.data);
//     //     } catch (error) {
//     //         setAlertMessage(error);
//     //         setAlertVisible(true);
//     //         // console.error(error);
//     //         console.log(error);
//     //     }
//     // };

//     const onSubmit = (e) => {
//         e.preventDefault();
//         dispatch(register(formData));
//       };

//     return (
//         <div className="flex h-screen justify-center items-center">
// <div className="w-full max-w-md bg-white  rounded-md px-8 py-6 border border-gray-200 drop-shadow-xl">
//     {/* {alertVisible && (
//         <Alert severity="error" onClose={() => setAlertVisible(false)}>
//             <AlertTitle>Error</AlertTitle>
//             {alertMessage}
//         </Alert>
//     )} */}
//     <form onSubmit={onSubmit} className="space-y-4">
//         <div className="flex flex-col">
//             <label htmlFor="name">Name</label>
//             <input
//                 type="text"
//                 name="name"
//                 value={name}
//                 onChange={onChange}
//                 required
//                 id="name"
//                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-200"
//             />
//         </div>
//         <div className="flex flex-col">
//             <label htmlFor="email">Email</label>
//             <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={onChange}
//                 required
//                 id="email"
//                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-200"
//             />
//         </div>
//         <div className="flex flex-col">
//             <label htmlFor="password">Password</label>
//             <input
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={onChange}
//                 required
//                 id="password"
//                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2
//   border border-gray-200"
//             />
//         </div>
//         <div className="flex flex-col">
//             <label htmlFor="role">Role</label>
//             <select
//                 name="role"
//                 value={role}
//                 onChange={onChange}
//                 id="role"
//                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-200"
//             >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//                 <option value="superadmin" disabled>
//                     Superadmin (Restricted)
//                 </option>
//             </select>
//         </div>
//         <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//             Register
//         </button>
//     </form>
// </div>
//         </div>
//     );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../main.jsx"; // Assuming server URL is defined in main.jsx
import { Container, Alert, AlertTitle, Grid, Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { register } from "../store/authActions.jsx"; // Assuming register action dispatches a request
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";



const Register = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role is user
  });

  const { name, email, password, role } = formData;
  const userToken = Cookies.get("token"); // Assuming token is stored in a cookie

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Handle loading state (optional)
    if (loading) {
      return; // Prevent duplicate requests
    }

    try {
      const response = await dispatch(register(formData)); // Dispatch register action
      setAlertVisible(true);
      setAlertMessage("Registration successful!");
      setFormData({ name: "", email: "", password: "", role: "user" }); // Reset form data
    } catch (error) {
      console.error(error); // Log errors for debugging
      setAlertVisible(true);
      setAlertMessage("Registration failed. Please try again.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <div className="hidden sm:mb-1 sm:flex sm:justify-center">
            <div>
              <a href="#" className="font-bold text-3xl text-indigo-600">
                <img
                  src="/logo.png"
                  alt="Bhashantaar Logo"
                  style={{ height: "13rem", width: "auto" }}
                />
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
        <h1 className="text-4xl font-bold text-center tracking-tight text-gray-900 sm:text-3xl mb-10">
              Register new User
            </h1>
        <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
                    
      <div className="max-w-xl lg:max-w-3xl">
      {alertVisible && (
                  <Alert
                    severity={error ? "error" : "success"}
                    onClose={() => setAlertVisible(false)}
                  >
                    <AlertTitle>{error ? "Error" : "Success"}</AlertTitle>
                    {alertMessage}
                  </Alert>
                )}
        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              id="name"
              className="mt-1 px-2 py-1.5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              name="last_name"
              className="mt-1 px-2 py-1.5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              value={email}
                      onChange={onChange}
                      required
              className="mt-1 px-2 py-1.5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              id="password"
              className="mt-1 px-2 py-1.5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              className="mt-1 px-2 py-1.5 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="role demo-simple-select-standard"
          name="role"
                      value={role}
                      onChange={onChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

          {/* <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      name="role"
                      value={role}
                      onChange={onChange}
                      id="role"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-200"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin" disabled>
                        Superadmin (Restricted)
                      </option>
                    </select>
                  </div> */}


          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              and
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </main>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
