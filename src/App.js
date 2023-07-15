import React from 'react';
import './index.css'; // Import Tailwind CSS styles
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import UserForm from './screens/UserForm';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import PendingApplications from './screens/PendingApplications';
import { store, persistor } from './config/store';
import { PersistGate } from 'redux-persist/integration/react';
import TermsAndConditions from './screens/TermsAndConditions';
import Register from './screens/Register';

export const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    requiresAuth: false,
  },
  {
    path: '/spfinnacle-lms',
    component: Dashboard,
    exact: true,
    requiresAuth: false,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    requiresAuth: true,
  },
  {
    path: '/login',
    component: Login,
    requiresAuth: false,
  },
  {
    path: '/signup',
    component: Register,
    requiresAuth: false,
  },
  {
    path: '/pending-action',
    component: PendingApplications,
    requiresAuth: false,
  },
  {
    path: '/spfinnacle-lms/terms-and-conditions',
    component: TermsAndConditions,
  },
  {
    component: NotFound,
  },
];

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.AuthReducer.authStatus);
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);
  console.log("userDetails", userDetails);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/user-details" element={<UserForm />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              (route.path === '/spfinnacle-lms/terms-and-conditions') ? (
                <route.component />
              ) : (
                !isAuthenticated ? (
                  <Navigate to="/login" />
                ) : isAuthenticated && route.requiresAuth && userDetails && userDetails.status === 'pending' ? (
                  <Navigate to="/pending-action" />
                ) : (
                  <route.component />
                )
              )
            }
          />
        ))}
        {/* {userDetails && userDetails.status === 'pending' && (
          <Route path="/pending-action" element={<PendingApplications />} />
        )} */}
      </Routes>
    </Router>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrivateRoute />
        {/* <TermsAndConditions /> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
