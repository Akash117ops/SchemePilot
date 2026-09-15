import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Search,
  ShieldCheck,
  Sparkles,
  Heart,
  FileCheck2,
} from "lucide-react";
import { motion } from "framer-motion";

function Home() {
  const features = [
    {
      icon: Search,
      title: "Discover Schemes",
      description:
        "Explore government schemes from different categories in one simple platform.",
    },
    {
      icon: ShieldCheck,
      title: "Check Eligibility",
      description:
        "Get matched with schemes based on your personal eligibility information.",
    },
    {
      icon: Heart,
      title: "Save Your Favorites",
      description:
        "Keep useful schemes in one place so you can come back to them later.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Tell us about yourself",
      description:
        "Enter basic details such as your age, state, category, occupation and income.",
    },
    {
      number: "02",
      title: "We check your eligibility",
      description:
        "SchemePilot compares your profile with the eligibility requirements of schemes.",
    },
    {
      number: "03",
      title: "Discover your schemes",
      description:
        "Get a personalized list of schemes that may be relevant to you.",
    },
  ];

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-mark">
            <Sparkles size={18} />
          </div>
          <span>SchemePilot</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="active">
            Home
          </Link>
          <Link to="/schemes">Explore Schemes</Link>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="nav-cta">
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="hero">
          <div className="hero-background-glow glow-one" />
          <div className="hero-background-glow glow-two" />

          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-badge">
              <span className="badge-dot" />
              Government scheme discovery made simple
            </div>

            <h1>
              Find government schemes
              <span> you're eligible for.</span>
            </h1>

            <p className="hero-description">
              SchemePilot helps you discover government schemes based on your
              age, state, category, gender, occupation and income — all in one
              place.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-button">
                Check My Eligibility
                <ArrowRight size={18} />
              </Link>

              <Link to="/schemes" className="secondary-button">
                Explore Schemes
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <Check size={16} />
                Free to use
              </div>

              <div className="trust-item">
                <Check size={16} />
                Simple eligibility check
              </div>

              <div className="trust-item">
                <Check size={16} />
                Official scheme links
              </div>
            </div>
          </motion.div>

          {/* Eligibility Card */}
          <motion.div
            className="eligibility-preview"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="preview-header">
              <div>
                <p className="preview-label">ELIGIBILITY SNAPSHOT</p>
                <h3>Your profile is ready</h3>
              </div>

              <div className="preview-check">
                <Check size={20} />
              </div>
            </div>

            <div className="profile-preview">
              <div className="profile-row">
                <span>Age</span>
                <strong>21</strong>
              </div>

              <div className="profile-row">
                <span>State</span>
                <strong>Karnataka</strong>
              </div>

              <div className="profile-row">
                <span>Occupation</span>
                <strong>Student</strong>
              </div>

              <div className="profile-row">
                <span>Income</span>
                <strong>₹3 Lakh</strong>
              </div>
            </div>

            <div className="match-result">
              <div className="match-icon">
                <Sparkles size={19} />
              </div>

              <div>
                <span>Potential matches</span>
                <strong>12 schemes found</strong>
              </div>
            </div>

            <div className="preview-footer">
              <span>Powered by SchemePilot eligibility engine</span>
              <ArrowRight size={15} />
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stat">
            <strong>100+</strong>
            <span>Government schemes</span>
          </div>

          <div className="stat-divider" />

          <div className="stat">
            <strong>Smart</strong>
            <span>Eligibility matching</span>
          </div>

          <div className="stat-divider" />

          <div className="stat">
            <strong>Free</strong>
            <span>For everyone</span>
          </div>

          <div className="stat-divider" />

          <div className="stat">
            <strong>24/7</strong>
            <span>Scheme discovery</span>
          </div>
        </section>

        {/* Features */}
        <section className="section features-section">
          <div className="section-heading">
            <div className="section-label">WHY SCHEMEPILOT</div>

            <h2>
              Government support,
              <span> made easier.</span>
            </h2>

            <p>
              Finding schemes shouldn't require searching through dozens of
              different websites. SchemePilot brings discovery and eligibility
              checking together.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  className="feature-card"
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -6 }}
                >
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <ArrowRight className="feature-arrow" size={18} />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="section how-section" id="how-it-works">
          <div className="section-heading centered">
            <div className="section-label">HOW IT WORKS</div>

            <h2>
              Three steps to find
              <span> relevant schemes.</span>
            </h2>

            <p>
              No complicated forms. Just provide a few basic details and let
              SchemePilot do the matching.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <motion.div
                className="step-card"
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
              >
                <div className="step-number">{step.number}</div>

                <div className="step-line" />

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-content">
            <div className="cta-icon">
              <FileCheck2 size={25} />
            </div>

            <h2>Not sure which schemes you qualify for?</h2>

            <p>
              Create your profile and let SchemePilot find potentially relevant
              government schemes for you.
            </p>

            <Link to="/register" className="primary-button light-button">
              Check My Eligibility
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <div className="logo-mark">
                <Sparkles size={17} />
              </div>
              <span>SchemePilot</span>
            </Link>

            <p>
              Making government scheme discovery simpler, smarter and more
              accessible.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4>Platform</h4>
              <Link to="/schemes">Explore Schemes</Link>
              <Link to="/register">Check Eligibility</Link>
              <Link to="/login">Login</Link>
            </div>

            <div>
              <h4>Information</h4>
              <a href="#how-it-works">How It Works</a>
              <a href="#about">About</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SchemePilot. Educational project.</span>

          <span className="footer-note">
            Always verify eligibility on official government portals.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;