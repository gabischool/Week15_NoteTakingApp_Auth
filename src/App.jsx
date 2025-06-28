import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
  
          <Routes>
            <Route path="/login" element={
                <Login />
            } />
            <Route path="/Register" element={
                <Register />
            }/>
              
            
            {/* protected routes,we need to use protectedroutes component */}
            <Route path="/notes" element={
            <ProtectedRoute requireAuth>
               <ViewNotes />
            </ProtectedRoute>
          } />
            <Route path="/" element={
              <ProtectedRoute requireAuth>
                <CreateNote />
              </ProtectedRoute>
            } />
          </Routes>
      </main>
    </div>
  );
};

export default App;
