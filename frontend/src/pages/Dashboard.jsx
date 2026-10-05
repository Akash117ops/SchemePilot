import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  LogOut,
  Search,
  Sparkles,
  User,
  CheckCircle2,
  CircleUserRound,
  FileCheck2,
} from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import { getProfile, getFavorites } from "../services/api";

function Dashboard() {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [profileData, favoriteData] = await Promise.all([
          getProfile(),
          getFavorites(),
        ]);

        setProfile(profileData);
        setFavorites(Array.isArray(favoriteData) ? favoriteData : []);
      } catch (error) {
        console.error("Dashboard data error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const profileFields = [
    "age",
    "gender",
    "state",
    "category",
    "occupation",
    "annual_income",
  ];

  const completedFields = profile
    ? profileFields.filter(
        (field) =>
          profile[field] !== null &&
          profile[field] !== undefined &&
          profile[field] !== ""
      ).length
    : 0;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const profileMessage = useMemo(() => {
    if (profileCompletion === 100) {
      return "Your profile is complete. You're ready to check scheme eligibility.";
    }

    if (profileCompletion >= 50) {
      return "You're halfway there. Complete your profile for better eligibility matching.";
    }

    return "Complete your profile to get personalized government scheme recommendations.";
  }, [profileCompletion]);

  const displayName =
    user?.full_name ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <Link to="/dashboard" className="dashboard-brand">
          <div className="dashboard-brand-icon">
            <Sparkles size={20} />
          </div>

          <span>SchemePilot</span>
        </Link>

        <div className="dashboard-nav-actions">
          <Link to="/profile" className="dashboard-profile-link">
            <User size={18} />
            Profile
          </Link>

          <button
            type="button"
            onClick={logout}
            className="dashboard-logout-button"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-container">
        {/* Welcome */}
        <motion.section
          className="dashboard-welcome"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div>
            <p className="dashboard-eyebrow">
              <Sparkles size={15} />
              Your SchemePilot dashboard
            </p>

            <h1>
              Welcome back,{" "}
              <span>{displayName}</span> 👋
            </h1>

            <p>
              Discover government schemes that match your profile,
              save useful schemes, and keep everything in one place.
            </p>
          </div>

          <Link to="/eligibility" className="dashboard-primary-button">
            Find eligible schemes
            <ArrowRight size={18} />
          </Link>
        </motion.section>

        {/* Stats */}
        <section className="dashboard-stats">
          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="dashboard-stat-icon">
              <Heart size={21} />
            </div>

            <div>
              <span>Saved schemes</span>
              <strong>
                {isLoading ? "—" : favorites.length}
              </strong>
            </div>
          </motion.div>

          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="dashboard-stat-icon">
              <FileCheck2 size={21} />
            </div>

            <div>
              <span>Profile completion</span>
              <strong>
                {isLoading ? "—" : `${profileCompletion}%`}
              </strong>
            </div>
          </motion.div>

          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="dashboard-stat-icon">
              <Search size={21} />
            </div>

            <div>
              <span>Explore schemes</span>
              <strong>Browse</strong>
            </div>
          </motion.div>
        </section>

        {/* Profile completion */}
        <motion.section
          className="dashboard-profile-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="dashboard-profile-card-top">
            <div className="dashboard-section-icon">
              <CircleUserRound size={23} />
            </div>

            <div>
              <h2>Complete your profile</h2>
              <p>{profileMessage}</p>
            </div>

            <Link
              to="/profile"
              className="dashboard-outline-button"
            >
              {profileCompletion === 100
                ? "Update profile"
                : "Complete profile"}
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="dashboard-progress-area">
            <div className="dashboard-progress-header">
              <span>Profile progress</span>
              <strong>{profileCompletion}%</strong>
            </div>

            <div className="dashboard-progress-track">
              <motion.div
                className="dashboard-progress-fill"
                initial={{ width: 0 }}
                animate={{
                  width: `${profileCompletion}%`,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                }}
              />
            </div>
          </div>

          <div className="dashboard-profile-checks">
            {profileFields.map((field) => {
              const completed =
                profile?.[field] !== null &&
                profile?.[field] !== undefined &&
                profile?.[field] !== "";

              const labels = {
                age: "Age",
                gender: "Gender",
                state: "State",
                category: "Category",
                occupation: "Occupation",
                annual_income: "Annual income",
              };

              return (
                <div
                  key={field}
                  className={
                    completed
                      ? "dashboard-check completed"
                      : "dashboard-check"
                  }
                >
                  {completed ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <div className="dashboard-check-empty" />
                  )}

                  <span>{labels[field]}</span>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Quick actions */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <p>Quick actions</p>
              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="dashboard-actions-grid">
            <Link
              to="/eligibility"
              className="dashboard-action-card"
            >
              <div className="dashboard-action-icon">
                <Sparkles size={22} />
              </div>

              <div>
                <h3>Find eligible schemes</h3>
                <p>
                  Check which government schemes match your
                  profile.
                </p>
              </div>

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/schemes"
              className="dashboard-action-card"
            >
              <div className="dashboard-action-icon">
                <Search size={22} />
              </div>

              <div>
                <h3>Browse schemes</h3>
                <p>
                  Search, filter and explore available schemes.
                </p>
              </div>

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/favorites"
              className="dashboard-action-card"
            >
              <div className="dashboard-action-icon">
                <Heart size={22} />
              </div>

              <div>
                <h3>Saved schemes</h3>
                <p>
                  View the schemes you've saved for later.
                </p>
              </div>

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/profile"
              className="dashboard-action-card"
            >
              <div className="dashboard-action-icon">
                <User size={22} />
              </div>

              <div>
                <h3>Your profile</h3>
                <p>
                  Review or update your personal information.
                </p>
              </div>

              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Saved schemes preview */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <p>Your saved schemes</p>
              <h2>Keep useful schemes close</h2>
            </div>

            {favorites.length > 0 && (
              <Link
                to="/favorites"
                className="dashboard-view-all"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {isLoading ? (
            <div className="dashboard-empty-card">
              <p>Loading your saved schemes...</p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="dashboard-empty-card">
              <div className="dashboard-empty-icon">
                <Heart size={24} />
              </div>

              <h3>No saved schemes yet</h3>

              <p>
                Browse government schemes and save the ones
                you want to come back to later.
              </p>

              <Link
                to="/schemes"
                className="dashboard-outline-button"
              >
                Explore schemes
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="dashboard-saved-preview">
              {favorites.slice(0, 3).map((scheme) => (
                <Link
                  key={scheme.id}
                  to={`/schemes/${scheme.id}`}
                  className="dashboard-saved-card"
                >
                  <div>
                    <Heart size={17} />
                  </div>

                  <h3>{scheme.name}</h3>

                  <p>
                    {scheme.description ||
                      "View scheme details and eligibility information."}
                  </p>

                  <span>
                    View details
                    <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;