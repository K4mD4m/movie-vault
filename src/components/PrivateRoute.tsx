import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // lub np. <LoadingSpinner />
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
