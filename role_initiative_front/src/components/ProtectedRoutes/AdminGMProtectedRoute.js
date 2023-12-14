import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminGMProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    return user.admin || user.GM ? children : <Navigate to="/" />;
}
