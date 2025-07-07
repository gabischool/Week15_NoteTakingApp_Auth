import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { LogIn, UserPlus, Plus, List, LogOut} from 'lucide-react';

const Navbar = () => {
  const pathname = useLocation();
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const handleLogout = () => {
    console.log ("logout")
  }

  return (
      <div className="flex gap-4">
    {isAuthenticated ? (
      <>
        <Link to="/" className={pathname === "/" ? "bg-yellow-100 text-yellow-700" : "hover:bg-gray-100 text-gray-700"}>
          <Plus size={18} />
          <span>Create</span>
        </Link>
        <Link to="/notes" className={pathname === "/notes" ? "bg-yellow-100 text-yellow-700" : "hover:bg-gray-100 text-gray-700"}>
          <List size={18} />
          <span>View All</span>
        </Link>
        <button onClick={handleLogout} className="hover:bg-gray-100 text-gray-700">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </>
    ) : (
      <>
        <Link to="/login" className={pathname === "/login" ? "bg-yellow-100 text-yellow-700" : "hover:bg-gray-100 text-gray-700"}>
          <LogIn size={18} />
          <span>Login</span>
        </Link>
        <Link to="/register" className={pathname === "/register" ? "bg-yellow-100 text-yellow-700" : "hover:bg-gray-100 text-gray-700"}>
          <UserPlus size={18} />
          <span>Register</span>
        </Link>
      </>
    )}
  </div>
  )
}

export default Navbar;
