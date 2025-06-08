// ✅ App.jsx – Entry point that configures routes and wraps protected pages
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { checkAuthStatus } from "./store/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  // ✅ Dispatch checkAuthStatus when app loads to verify if user is logged in (e.g., from cookie)
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar shown on all pages */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* ✅ Public routes – Only accessible to unauthenticated users */}
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

          {/* ✅ Protected routes – Only accessible to authenticated users */}
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
