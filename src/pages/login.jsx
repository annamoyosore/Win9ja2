import { useState } from "react";
import { login } from "../services/authService";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);

      alert("✅ Login successful");

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>🔐 Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },
  box: {
    background: "#1e293b",
    padding: 20,
    borderRadius: 10,
    width: 300,
    textAlign: "center",
    color: "#fff"
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    border: "none"
  },
  button: {
    width: "100%",
    marginTop: 15,
    padding: 12,
    background: "gold",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold"
  }
};