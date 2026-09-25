import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  IndianRupee,
  Search,
  Sparkles,
  UserRound,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { checkEligibility } from "../services/api";

function Eligibility() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    state: "",
    category: "",
    occupation: "",
    annual_income: "",
  });

  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);
    setHasSearched(false);

    const eligibilityData = {
      age: Number(form.age),
      gender: form.gender,
      state: form.state,
      category: form.category,
      occupation: form.occupation,
      annual_income: Number(form.annual_income),
    };

    if (
      !Number.isInteger(eligibilityData.age) ||
      eligibilityData.age < 1 ||
      eligibilityData.age > 120
    ) {
      setError("Please enter a valid age between 1 and 120.");
      setIsLoading(false);
      return;
    }

    if (eligibilityData.annual_income < 0) {
      setError("Annual income cannot be negative.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await checkEligibility(eligibilityData);

      console.log("Eligibility results:", data);

      setResults(data);
      setHasSearched(true);
    } catch (error) {
      setError(
        error.message ||
          "Unable to check eligibility. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
        {/* HEADER */}
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

        {/* FORM */}
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
              {/* AGE */}
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

              {/* GENDER */}
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

              {/* STATE */}
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

              {/* CATEGORY */}
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

              {/* OCCUPATION */}
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

              {/* INCOME */}
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
                disabled={isLoading}
              >
                {isLoading
                  ? "Checking..."
                  : "Find matching schemes"}

                {!isLoading && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </motion.div>

        {/* RESULTS */}
        {hasSearched && (
          <motion.section
            className="eligibility-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="eligibility-results-header">
              <div>
                <p className="eligibility-eyebrow">
                  YOUR MATCHES
                </p>

                <h2>
                  {results.length > 0
                    ? `${results.length} schemes may be relevant to you`
                    : "No matching schemes found"}
                </h2>

                <p>
                  Based on the information you provided, these
                  schemes match the eligibility criteria in
                  SchemePilot.
                </p>
              </div>

              {results.length > 0 && (
                <div className="eligibility-result-count">
                  <CheckCircle2 size={18} />
                  {results.length} matches
                </div>
              )}
            </div>

            {results.length > 0 ? (
              <div className="eligibility-results-grid">
                {results.map((scheme, index) => (
                  <motion.article
                    key={scheme.id}
                    className="scheme-result-card"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                  >
                    <div className="scheme-result-top">
                      <div className="scheme-result-icon">
                        <Sparkles size={20} />
                      </div>

                      <span className="scheme-match-badge">
                        Eligible match
                      </span>
                    </div>

                    <h3>{scheme.name}</h3>

                    <p className="scheme-result-description">
                      {scheme.description}
                    </p>

                    <div className="scheme-result-section">
                      <div className="scheme-result-section-title">
                        <CheckCircle2 size={16} />
                        <span>Benefits</span>
                      </div>

                      <p>{scheme.benefits}</p>
                    </div>

                    <div className="scheme-result-section">
                      <div className="scheme-result-section-title">
                        <FileText size={16} />
                        <span>Required documents</span>
                      </div>

                      <p className="scheme-documents">
                        {scheme.required_documents}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="scheme-result-button"
                    >
                      View scheme details
                      <ArrowRight size={17} />
                    </button>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="eligibility-empty">
                <Search size={28} />

                <h3>No matching schemes found</h3>

                <p>
                  We couldn't find schemes matching all the
                  details you entered. You can try checking again
                  with different information.
                </p>
              </div>
            )}
          </motion.section>
        )}
      </main>
    </div>
  );
}

export default Eligibility;