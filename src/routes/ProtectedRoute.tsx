import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth"; // Cek token di localStorage

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
