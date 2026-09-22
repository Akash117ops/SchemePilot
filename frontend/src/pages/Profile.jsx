import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getProfile,
  createProfile,
  updateProfile,
} from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    state: "",
    category: "",
    occupation: "",
    annual_income: "",
  });

  const [profileExists, setProfileExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setForm({
          age: data.age ?? "",
          gender: data.gender ?? "",
          state: data.state ?? "",
          category: data.category ?? "",
          occupation: data.occupation ?? "",
          annual_income: data.annual_income ?? "",
        });

        setProfileExists(true);
      } catch (error) {
        if (error.message === "Profile not found") {
          setProfileExists(false);
        } else {
          setError(
            error.message || "Unable to load your profile."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSaving(true);

    const profileData = {
      age: Number(form.age),
      gender: form.gender,
      state: form.state,
      category: form.category,
      occupation: form.occupation,
      annual_income: Number(form.annual_income),
    };

    try {
        console.log("PROFILE EXISTS BEFORE SUBMIT:", profileExists);
      if (profileExists) {
        await updateProfile(profileData);
        setSuccess("Profile updated successfully.");
      } else {
        await createProfile(profileData);
        setProfileExists(true);
        setSuccess("Profile created successfully.");
      }
    } catch (error) {
      setError(
        error.message || "Unable to save your profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="protected-loading-spinner" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <nav className="profile-navbar">
        <Link to="/dashboard" className="profile-back">
          <ArrowLeft size={17} />
          Dashboard
        </Link>

        <Link to="/" className="profile-brand">
          <div className="logo-mark">
            <Sparkles size={18} />
          </div>
          <span>SchemePilot</span>
        </Link>
      </nav>

      <main className="profile-content">
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="profile-icon">
            <User size={24} />
          </div>

          <div>
            <p className="profile-eyebrow">YOUR PROFILE</p>

            <h1>Tell us about yourself</h1>

            <p>
              Your information helps SchemePilot determine which
              government schemes may be relevant to you.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="profile-account">
            <div className="profile-avatar">
              {(user?.full_name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>{user?.full_name}</strong>
              <span>{user?.email}</span>
            </div>
          </div>

          {error && (
            <div className="profile-message profile-error">
              {error}
            </div>
          )}

          {success && (
            <div className="profile-message profile-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-form-grid">
              <div className="profile-field">
                <label htmlFor="age">Age</label>

                <input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="gender">Gender</label>

                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="profile-field">
                <label htmlFor="state">State</label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="e.g. Karnataka"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="category">
                  Social category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>

              <div className="profile-field">
                <label htmlFor="occupation">
                  Occupation
                </label>

                <input
                  id="occupation"
                  name="occupation"
                  type="text"
                  placeholder="e.g. Student"
                  value={form.occupation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="annual_income">
                  Annual income (₹)
                </label>

                <input
                  id="annual_income"
                  name="annual_income"
                  type="number"
                  min="0"
                  placeholder="e.g. 300000"
                  value={form.annual_income}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="profile-form-footer">
              <p>
                This information is used only to determine your
                scheme eligibility.
              </p>

              <button
                type="submit"
                className="profile-save"
                disabled={isSaving}
              >
                <Save size={17} />

                {isSaving
                  ? "Saving..."
                  : profileExists
                    ? "Update Profile"
                    : "Save Profile"}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

export default Profile;
