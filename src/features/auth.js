import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  isAuthenticated: false,
  sessionId: '',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('accountId', action.payload.id);
    },
    logout: (state) => {
      state.user = '';
      state.isAuthenticated = false;
      state.sessionId = '';
      localStorage.clear();
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user;
