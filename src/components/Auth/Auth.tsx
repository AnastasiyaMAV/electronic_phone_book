import React from 'react';
import { Navigate } from 'react-router-dom';

interface IAuthProps {
  children: React.ReactNode;
  loggedIn: boolean;
}

const Auth: React.FC<IAuthProps> = ({ children, loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default Auth;
