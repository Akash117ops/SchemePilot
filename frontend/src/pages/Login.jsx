import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend authentication will be connected here next.
    console.log("Login submitted");
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
          <h1>Welcome back</h1>
          <p>Login to continue discovering government schemes.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="password-label-row">
              <label htmlFor="password">Password</label>

              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>

            <div className="input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit">
            Login
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;