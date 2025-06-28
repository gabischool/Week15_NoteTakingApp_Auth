
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
  
          <Routes>
            <Route path="/login" element={
              <Login />} />
            <Route path="/register" element={
              <Register />} />

              {/* protected routes, we need to use ProtectedRoute component */}
            <Route path="/notes" element={<ViewNotes />} />
            <ProtectedRoute requireAuth>
              <ViewNotes />
            </ProtectedRoute>
          
            <Route path="/" element={<CreateNote />} />
            <ProtectedRoute requireAuth>
              <CreateNote />
            </ProtectedRoute>
          </Routes>
      </main>
    </div>
  );
};

const auth = isAuthenticated((state)) = useSelector((state) => state.auth );
const authenticated = auth?.isAuthenticated || false;
const user = auth?.user || null;

export default App;
