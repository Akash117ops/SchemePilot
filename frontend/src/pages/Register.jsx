import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend registration will be connected here next.
    console.log("Registration submitted");
  };

  return (
    <div className="auth-page">
      <div className="auth-background-glow glow-one" />
      <div className="auth-background-glow glow-two" />

      <Link to="/" className="auth-back">
        <ArrowLeft size={17} />
        Back to home
      </Link>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-brand">
          <div className="logo-mark">
            <Sparkles size={18} />
          </div>

          <span>SchemePilot</span>
        </div>

        <div className="auth-heading">
          <h1>Create your account</h1>
          <p>Start discovering government schemes relevant to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="full-name">Full name</label>

            <div className="input-wrapper">
              <User size={18} />

              <input
                id="full-name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email address</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <div className="input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="register-password"
                type="password"
                placeholder="Create a password"
                minLength={6}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>

            <div className="input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                minLength={6}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit">
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-switch register-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;