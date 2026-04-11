const { useState } = require("react");

function Greeting({ name = "World" }) {
  return <span>Hello, {name}!</span>;
}

function LoginForm({ onSubmit, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ username, password }); }}>
      {error && <div role="alert">{error}</div>}
      <label htmlFor="username">Username</label>
      <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
}

module.exports = { Greeting, LoginForm };
