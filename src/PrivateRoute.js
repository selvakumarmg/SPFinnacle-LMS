import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, requiresAuth, ...rest }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = false

  return (
    <Route
      {...rest}
      element={
            !isAuthenticated ? (
          <Navigate to="/login" replace />
        ) : (
          <Element />
        )
      }
    />
  );
};

export default PrivateRoute;
