import { Link } from "react-router-dom";
import { LogOut, Search, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <Link to="/" className="dashboard-brand">
          <div className="logo-mark">
            <Sparkles size={18} />
          </div>

          <span>SchemePilot</span>
        </Link>

        <div className="dashboard-nav-actions">
          <Link to="/profile" className="dashboard-nav-link">
            <User size={17} />
            Profile
          </Link>

          <button
            type="button"
            className="dashboard-logout"
            onClick={logout}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <motion.section
          className="dashboard-welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="dashboard-eyebrow">
              YOUR DASHBOARD
            </p>

            <h1>
              Welcome back,{" "}
              <span>{user?.full_name || "there"}</span> 👋
            </h1>

            <p>
              Discover government schemes that may be relevant
              to you.
            </p>
          </div>

          <div className="dashboard-user-card">
            <div className="dashboard-avatar">
              {(user?.full_name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>{user?.full_name}</strong>
              <span>{user?.email}</span>
            </div>
          </div>
        </motion.section>

        <section className="dashboard-grid">
          <motion.div
            className="dashboard-action-card primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="dashboard-card-icon">
              <Search size={22} />
            </div>

            <h2>Find Eligible Schemes</h2>

            <p>
              Tell us about yourself and discover government
              schemes you may qualify for.
            </p>

            <Link
              to="/eligibility"
              className="dashboard-card-button"
            >
              Check eligibility
            </Link>
          </motion.div>

          <motion.div
            className="dashboard-action-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="dashboard-card-icon">
              <Sparkles size={22} />
            </div>

            <h2>Browse Schemes</h2>

            <p>
              Explore available government schemes and learn
              more about their benefits and eligibility.
            </p>

            <Link
              to="/schemes"
              className="dashboard-card-button secondary"
            >
              Browse schemes
            </Link>
          </motion.div>

          <motion.div
            className="dashboard-action-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="dashboard-card-icon">
              <User size={22} />
            </div>

            <h2>Your Profile</h2>

            <p>
              Update your personal information used to determine
              scheme eligibility.
            </p>

            <Link
              to="/profile"
              className="dashboard-card-button secondary"
            >
              View profile
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;