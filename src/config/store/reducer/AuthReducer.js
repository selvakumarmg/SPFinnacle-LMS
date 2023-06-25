import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authStatus: false,
  userDetails: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    logout: (state) => {
      state.authStatus = false;
      state.userDetails = null;
    },
  },
});

export const { setAuthStatus, setUserDetails, logout } = authSlice.actions;

const AuthReducer = authSlice.reducer;
export default AuthReducer;
