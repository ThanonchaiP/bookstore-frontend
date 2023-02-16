import { toast } from "react-toastify";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "store/configureStore";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user && !localStorage.getItem("user")) {
    toast.error("You need to be logged in to do that!");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
