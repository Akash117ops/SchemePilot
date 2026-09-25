import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  IndianRupee,
  Info,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSchemeById } from "../services/api";

function SchemeDetails() {
  const { schemeId } = useParams();

  const [scheme, setScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadScheme = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getSchemeById(schemeId);

        setScheme(data);
      } catch (error) {
        setError(
          error.message || "Unable to load scheme details."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadScheme();
  }, [schemeId]);

  if (isLoading) {
    return (
      <div className="scheme-details-loading">
        <div className="protected-loading-spinner" />
        <p>Loading scheme details...</p>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="scheme-details-page">
        <nav className="scheme-details-navbar">
          <Link
            to="/eligibility"
            className="scheme-details-back"
          >
            <ArrowLeft size={17} />
            Back to results
          </Link>

          <Link to="/" className="scheme-details-brand">
            <div className="logo-mark">
              <Sparkles size={18} />
            </div>

            <span>SchemePilot</span>
          </Link>
        </nav>

        <main className="scheme-details-content">
          <div className="scheme-details-error">
            <Info size={30} />

            <h2>Unable to load scheme</h2>

            <p>
              {error ||
                "The requested scheme could not be found."}
            </p>

            <Link
              to="/eligibility"
              className="scheme-details-primary-button"
            >
              Back to results
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="scheme-details-page">
      <nav className="scheme-details-navbar">
        <Link
          to="/eligibility"
          className="scheme-details-back"
        >
          <ArrowLeft size={17} />
          Back to results
        </Link>

        <Link to="/" className="scheme-details-brand">
          <div className="logo-mark">
            <Sparkles size={18} />
          </div>

          <span>SchemePilot</span>
        </Link>
      </nav>

      <main className="scheme-details-content">
        {/* HERO */}
        <motion.section
          className="scheme-details-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="scheme-details-hero-icon">
            <Sparkles size={28} />
          </div>

          <div className="scheme-details-hero-content">
            <div className="scheme-details-badge">
              <CheckCircle2 size={15} />
              Eligibility match
            </div>

            <h1>{scheme.name}</h1>

            <p>{scheme.description}</p>
          </div>
        </motion.section>

        {/* MAIN GRID */}
        <div className="scheme-details-grid">
          {/* LEFT */}
          <motion.div
            className="scheme-details-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.1,
            }}
          >
            {/* BENEFITS */}
            <section className="scheme-details-card">
              <div className="scheme-details-section-heading">
                <div className="scheme-details-section-icon">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <h2>Benefits</h2>
                  <p>What this scheme provides</p>
                </div>
              </div>

              <div className="scheme-details-section-content">
                <p>{scheme.benefits}</p>
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="scheme-details-card">
              <div className="scheme-details-section-heading">
                <div className="scheme-details-section-icon">
                  <FileText size={19} />
                </div>

                <div>
                  <h2>Required documents</h2>
                  <p>Documents you may need</p>
                </div>
              </div>

              <div className="scheme-details-documents">
                {scheme.required_documents
                  ?.split(/\r?\n|,\s*/)
                  .filter(Boolean)
                  .map((document, index) => (
                    <div
                      key={`${document}-${index}`}
                      className="scheme-document-item"
                    >
                      <CheckCircle2 size={16} />
                      <span>{document.trim()}</span>
                    </div>
                  ))}
              </div>
            </section>

            {/* ELIGIBILITY */}
            <section className="scheme-details-card">
              <div className="scheme-details-section-heading">
                <div className="scheme-details-section-icon">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h2>Eligibility criteria</h2>
                  <p>Requirements for this scheme</p>
                </div>
              </div>

              <div className="scheme-criteria-grid">
                <div className="scheme-criteria-item">
                  <span>Age</span>

                  <strong>
                    {scheme.min_age} – {scheme.max_age} years
                  </strong>
                </div>

                <div className="scheme-criteria-item">
                  <span>State</span>

                  <strong>{scheme.state}</strong>
                </div>

                <div className="scheme-criteria-item">
                  <span>Category</span>

                  <strong>{scheme.category}</strong>
                </div>

                <div className="scheme-criteria-item">
                  <span>Gender</span>

                  <strong>{scheme.gender}</strong>
                </div>

                <div className="scheme-criteria-item">
                  <span>Occupation</span>

                  <strong>{scheme.occupation}</strong>
                </div>

                <div className="scheme-criteria-item">
                  <span>Income limit</span>

                  <strong>
                    {scheme.income_limit !== null &&
                    scheme.income_limit !== undefined
                      ? `₹${Number(
                          scheme.income_limit
                        ).toLocaleString("en-IN")}`
                      : "Not specified"}
                  </strong>
                </div>
              </div>
            </section>
          </motion.div>

          {/* RIGHT SIDEBAR */}
          <motion.aside
            className="scheme-details-sidebar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{
              duration: 0.45,
              delay: 0.15,
            }}
          >
            <div className="scheme-details-action-card">
              <div className="scheme-details-action-icon">
                <Globe size={22} />
              </div>

              <h2>Ready to apply?</h2>

              <p>
                Visit the official scheme website or application
                portal to learn more and apply.
              </p>

              {scheme.application_link && (
                <a
                  href={scheme.application_link}
                  target="_blank"
                  rel="noreferrer"
                  className="scheme-details-primary-button"
                >
                  Apply / Learn more
                  <ExternalLink size={17} />
                </a>
              )}

              {scheme.official_website && (
                <a
                  href={scheme.official_website}
                  target="_blank"
                  rel="noreferrer"
                  className="scheme-details-secondary-button"
                >
                  Official website
                  <ExternalLink size={16} />
                </a>
              )}
            </div>

            <div className="scheme-details-info-card">
              <div className="scheme-info-row">
                <Users size={18} />

                <div>
                  <span>Scheme ID</span>
                  <strong>#{scheme.id}</strong>
                </div>
              </div>

              <div className="scheme-info-row">
                <IndianRupee size={18} />

                <div>
                  <span>Income limit</span>

                  <strong>
                    {scheme.income_limit !== null &&
                    scheme.income_limit !== undefined
                      ? `₹${Number(
                          scheme.income_limit
                        ).toLocaleString("en-IN")}`
                      : "Not specified"}
                  </strong>
                </div>
              </div>

              <div className="scheme-info-row">
                <ShieldCheck size={18} />

                <div>
                  <span>Eligibility</span>
                  <strong>Matched your profile</strong>
                </div>
              </div>
            </div>

            <Link
              to="/eligibility"
              className="scheme-details-back-results"
            >
              <ArrowLeft size={16} />
              Check another profile
            </Link>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}

export default SchemeDetails;