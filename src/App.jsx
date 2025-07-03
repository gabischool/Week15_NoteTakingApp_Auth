import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";
import { checkAuthStatus } from "./store/slices/authSlice";

// ✅ Move this OUTSIDE the App component
const ProtectedRoute = ({ children, requireAuth }) => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  if (status === "loading") {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/notes" replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/notes"
            element={
              <ProtectedRoute requireAuth={true}>
                <ViewNotes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth={true}>
                <CreateNote />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
