import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: any) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
