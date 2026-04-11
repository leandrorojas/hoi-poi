function Greeting({ name = "World" }) {
  return <span>Hello, {name}!</span>;
}

function LoginForm({ onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ username: "test", password: "test123" }); }}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}

module.exports = { Greeting, LoginForm };
