import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const COMMON_PASSWORDS = new Set([
  "password",
  "password1",
  "password123",
  "12345678",
  "123456789",
  "1234567890",
  "qwerty",
  "qwerty123",
  "admin123",
  "welcome123",
  "letmein",
  "iloveyou",
  "abc123",
  "11111111",
  "00000000",
]);

function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passwordIsCommon = COMMON_PASSWORDS.has(
    password.toLowerCase()
  );

  const passwordIsValid =
    password.length > 0 &&
    passwordRules.every((rule) => rule.valid) &&
    !passwordIsCommon;

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!passwordIsValid) {
      return;
    }

    if (!passwordsMatch) {
      return;
    }

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
        className="auth-card register-card"
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
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Password */}
          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <div
              className={`input-wrapper ${
                password && !passwordIsValid ? "input-error" : ""
              } ${
                passwordIsValid ? "input-success" : ""
              }`}
            >
              <LockKeyhole size={18} />

              <input
                id="register-password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="password-requirements">
              {passwordRules.map((rule) => (
                <div
                  className={`password-rule ${
                    rule.valid ? "valid" : ""
                  }`}
                  key={rule.label}
                >
                  {rule.valid ? (
                    <Check size={14} />
                  ) : (
                    <X size={14} />
                  )}

                  <span>{rule.label}</span>
                </div>
              ))}
            </div>

            {passwordIsCommon && (
              <p className="field-error">
                This password is too common. Please choose a
                stronger password.
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirm-password">
              Confirm password
            </label>

            <div
              className={`input-wrapper ${
                confirmPassword && !passwordsMatch
                  ? "input-error"
                  : ""
              } ${
                passwordsMatch ? "input-success" : ""
              }`}
            >
              <LockKeyhole size={18} />

              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
              />
            </div>

            {confirmPassword && !passwordsMatch && (
              <p className="field-error">
                Passwords do not match.
              </p>
            )}

            {passwordsMatch && (
              <p className="field-success">
                Passwords match.
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit"
            disabled={!passwordIsValid || !passwordsMatch}
          >
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