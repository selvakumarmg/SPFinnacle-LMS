import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducer';

// Thunk middleware setup
const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true
//   devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
