import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    // if no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // if token exists, render the protected page
  return children;
};
