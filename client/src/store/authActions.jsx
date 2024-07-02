import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../main';


axios.defaults.withCredentials = true;

export const setAuthToken = (token) => {
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
      // console.log("login response",response);
      localStorage.setItem('token', response.data.userToken);
      setAuthToken(response.data.userToken); 

      return response.data; 
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Error:", error);
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
        console.error("Error response:", error.response);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Error:", error);
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);




export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/users/profile`, {
        withCredentials: true,
      });

      if (response.data.userToken) { 
        localStorage.setItem('token', response.data.userToken);
        setAuthToken(response.data.userToken);
      }

      // console.log("User profile loaded:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Error:", error);
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

