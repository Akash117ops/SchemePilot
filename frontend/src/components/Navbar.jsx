
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  LogIn,
  LogOut,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">
            <Sparkles size={19} />
          </div>
          <span>SchemePilot</span>
        </Link>

        <div className="navbar-actions">
          <NavLink
            to="/"
            end
            className="navbar-link"
          >
            <Home size={16} />
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className="navbar-link"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className="navbar-link"
              >
                <User size={16} />
                Profile
              </NavLink>

              <button
                type="button"
                onClick={logout}
                className="navbar-button navbar-button-outline"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="navbar-link"
              >
                <LogIn size={16} />
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="navbar-button navbar-button-primary"
              >
                <UserPlus size={16} />
                Get started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
