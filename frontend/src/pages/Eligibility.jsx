import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  IndianRupee,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function Eligibility() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    state: "",
    category: "",
    occupation: "",
    annual_income: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Number(form.age) < 1 || Number(form.age) > 120) {
      setError("Please enter a valid age between 1 and 120.");
      return;
    }

    if (Number(form.annual_income) < 0) {
      setError("Annual income cannot be negative.");
      return;
    }

    setError("");

    console.log("Eligibility form:", {
      ...form,
      age: Number(form.age),
      annual_income: Number(form.annual_income),
    });
  };

  return (
    <div className="eligibility-page">
      <nav className="eligibility-navbar">
        <Link to="/dashboard" className="eligibility-back">
          <ArrowLeft size={17} />
          Dashboard
        </Link>

        <Link to="/" className="eligibility-brand">
          <div className="logo-mark">
            <Sparkles size={18} />
          </div>
          <span>SchemePilot</span>
        </Link>
      </nav>

      <main className="eligibility-content">
        <motion.div
          className="eligibility-header"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="eligibility-icon">
            <Search size={24} />
          </div>

          <div>
            <p className="eligibility-eyebrow">
              SCHEME MATCHING
            </p>

            <h1>Find schemes you may be eligible for</h1>

            <p>
              Tell us a little about yourself. We'll use these
              details to find government schemes that match your
              profile.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="eligibility-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="eligibility-card-heading">
            <div>
              <h2>Your details</h2>
              <p>
                Enter accurate information for more relevant
                results.
              </p>
            </div>

            <div className="eligibility-help">
              <CircleHelp size={18} />
              <span>Required</span>
            </div>
          </div>

          {error && (
            <div className="eligibility-error">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="eligibility-form"
          >
            <div className="eligibility-form-grid">
              <div className="eligibility-field">
                <label htmlFor="eligibility-age">
                  Age
                </label>

                <div className="eligibility-input-wrapper">
                  <UserRound size={17} />

                  <input
                    id="eligibility-age"
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 23"
                    value={form.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="eligibility-field">
                <label htmlFor="eligibility-gender">
                  Gender
                </label>

                <select
                  id="eligibility-gender"
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

              <div className="eligibility-field">
                <label htmlFor="eligibility-state">
                  State
                </label>

                <input
                  id="eligibility-state"
                  name="state"
                  type="text"
                  placeholder="e.g. Karnataka"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="eligibility-field">
                <label htmlFor="eligibility-category">
                  Social category
                </label>

                <select
                  id="eligibility-category"
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

              <div className="eligibility-field">
                <label htmlFor="eligibility-occupation">
                  Occupation
                </label>

                <input
                  id="eligibility-occupation"
                  name="occupation"
                  type="text"
                  placeholder="e.g. Student"
                  value={form.occupation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="eligibility-field">
                <label htmlFor="eligibility-income">
                  Annual income
                </label>

                <div className="eligibility-input-wrapper">
                  <IndianRupee size={17} />

                  <input
                    id="eligibility-income"
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
            </div>

            <div className="eligibility-form-footer">
              <p>
                <strong>Why do we need this?</strong>
                <br />
                These details help us compare your profile with
                scheme eligibility requirements.
              </p>

              <button
                type="submit"
                className="eligibility-submit"
              >
                Find matching schemes
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

export default Eligibility;