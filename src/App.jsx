import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
  
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/notes" element={<ViewNotes />} />
            <Route path="/" element={<CreateNote />} />
          </Routes>
      </main>
    </div>
  );
};

export default App;
