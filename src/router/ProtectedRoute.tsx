import { Navigate } from "react-router";
import type { ProtectedRouteProps } from "./types";

const ProtectedRoute = ({ allowed, redirectPath = "/signIn", children }: ProtectedRouteProps) => {
    return allowed ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;