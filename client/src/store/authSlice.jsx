import { createSlice } from '@reduxjs/toolkit';
import { login, register, loadUser } from './authActions';
import { setAuthToken } from './authActions';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      role: localStorage.getItem('role') || null,
    },
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      Cookies.remove('token');
      setAuthToken(null);
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.userToken;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.userToken);
        // console.log("user from login fulfilled",action.payload.user)
        localStorage.setItem('role', action.payload.user.role);
        // console.log("role from login fulfilled",action.payload.user.role)

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // console.log("Role from loadUser:", action.payload.user.role); // Log role
        if (action.payload.role) {
          localStorage.setItem('role', action.payload.user.role);
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
