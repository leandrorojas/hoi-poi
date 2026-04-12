import { useState } from "react";
import "./LoginForm.css";

/**
 * @param {object} props
 * @param {function} props.onSubmit - Called with { username, password }. May return a promise.
 * @param {string} [props.error] - Inline error message to display (e.g. login failure)
 */
function LoginForm({ onSubmit, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitting(true);
      try {
        await onSubmit({ username: username.trim(), password });
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="hp-form-error" role="alert">{error}</div>}

      <div className="hp-form-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "username-error" : undefined}
          disabled={submitting}
        />
        {errors.username && <span id="username-error" className="hp-error" role="alert">{errors.username}</span>}
      </div>

      <div className="hp-form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          disabled={submitting}
        />
        {errors.password && <span id="password-error" className="hp-error" role="alert">{errors.password}</span>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
