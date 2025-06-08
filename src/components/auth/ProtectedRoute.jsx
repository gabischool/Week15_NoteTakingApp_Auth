// ✅ ProtectedRoute.jsx — Controls access to protected/unprotected routes
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requireAuth }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading indicator while checking authentication state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // TODO: If route requires authentication and user is not authenticated, redirect to login
  // ✅ Redirect to /login if user is not authenticated and the route needs auth
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // TODO: If route requires unauthenticated user and user is authenticated, redirect to notes
  // ✅ Redirect to /notes if user is authenticated but the route is for unauthenticated users
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/notes" replace />;
  }

  // ✅ Otherwise, render the intended route content
  return children;
};

export default ProtectedRoute;
