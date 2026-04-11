import { useState } from "react";

/**
 * @param {object} props
 * @param {function} props.onSubmit - Called with { username, password } on valid submission
 */
function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ username: username.trim(), password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="hp-form-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span className="hp-error">{errors.username}</span>}
      </div>

      <div className="hp-form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="hp-error">{errors.password}</span>}
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}

export default LoginForm;
