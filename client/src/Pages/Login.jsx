import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { login } from "../store/authActions.jsx";
import { server } from "../main.jsx"
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5566/users/login", { email, password })
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data.message === "success") {
  //         navigate("/choose");
  //       }else if(result.data.message === "404: (User not found)"){
  //         setAlertMessage("Incorrect email.");
  //         setAlertVisible(true);
  //       }
  //       else if(result.data.message === "401 : (Incorrect password)"){
  //         setAlertMessage("Incorrect password.");
  //         setAlertVisible(true);
  //       }

  //        else{
  //         console.error("Login failed:", result.data.message);
  //       }
  //     })
  //     .catch((err) => console.error("Error:", err));
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const { data } = await axios.post(
  //       `${server}/users/login`,
  //       {
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     navigate("/choose");
  //     console.log(data);
  //   } catch (error) {
  //     setAlertMessage(error.response.data.message);
  //     setAlertVisible(true);
  //     console.log(error.response.data.message);

  //   }
  // }
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/choose");
    }
    if (error) {
      setAlertMessage(error);
      setAlertVisible(true);

    }
  }, [dispatch, isAuthenticated, error]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      <div className="">
        <div className="hidden sm:mb-1 sm:flex sm:justify-center">
          <div className="">
            <a href="#" className="font-bold text-3xl text-indigo-600">
              <img src="/logo.png" alt="Bhashantaar Logo" style={{ height: '13rem', width: 'auto' }} />
            </a>
          </div>
        </div>
        <h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {alertVisible && (
          <Alert severity="error" onClose={() => setAlertVisible(false)}>
            <AlertTitle>Error</AlertTitle>
            {alertMessage}
          </Alert>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              User Name
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md indent-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md indent-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Log in
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
