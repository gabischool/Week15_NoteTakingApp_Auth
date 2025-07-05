
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute"


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">

        <Routes>
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />
            <Route path="/register" element={
              <ProtectedRoute requireAuth={false}>  
              <Register />
              </ProtectedRoute>
            } />
           

              {/* protected routes, we need to use ProtectedRoute component */}
            <Route path="/notes" element={
              <ProtectedRoute requireAuth={true}>
                <ViewNotes />
              </ProtectedRoute>
            } />
             
            <Route path="/" element={<CreateNote />} />
          </Routes>
      </main>
    </div>
  );
};
export default App;
