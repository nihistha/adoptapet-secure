import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Get user data from storage
    return user && user.role === "admin" ? <Outlet /> : <Navigate to="/unauthorized" />;
};
export default AdminRoute