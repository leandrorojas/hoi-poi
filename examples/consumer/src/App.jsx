import { useState } from "react";
import { LoginForm } from "@leandrorojas/hoi-poi/components";
import "@leandrorojas/hoi-poi/components/style.css";

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async ({ username, password }) => {
    setError("");
    // Pretend login: reject "fail", accept anything else
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (username === "fail") {
      setError("Invalid credentials");
      return;
    }
    setResult({ username, passwordLength: password.length });
  };

  return (
    <main style={{ maxWidth: 360, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>hoi-poi consumer example</h1>
      <p>Rendering <code>LoginForm</code> from <code>@leandrorojas/hoi-poi@0.0.1</code>.</p>
      <LoginForm onSubmit={handleSubmit} error={error} />
      {result && (
        <pre data-testid="login-result" style={{ marginTop: "1rem" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
