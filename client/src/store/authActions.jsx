import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../main';


axios.defaults.withCredentials = true;

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axios.post(
        `${server}/users/login`,
        credentials,
        config
      );

      // console.log("Response", response);

      localStorage.setItem('token', response.data.userToken);
      setAuthToken(response.data.userToken);

      return response.data;
    } catch (error) {

      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        console.log("error",error)
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${document.cookie.replace('token=', '')}`,
        },
      };

      const response = await axios.post(
        `${server}/users/register`,
        userData,
        config
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("error response", error.response)
        return rejectWithValue(error.response.data.message);
      } else {
        console.log("error", error)
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


// export const loadUser = createAsyncThunk(
//   'auth/loadUser',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${server}/users/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`, 
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch user data');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );





// export const loadUser = createAsyncThunk(
//   'auth/loadUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${server}/users/profile`);
//       console.log(response)
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/users/profile`, {
        withCredentials: true,
      });

      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);
