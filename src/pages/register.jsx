import { useState } from "react";
import { register, login } from "../services/authService";
import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS } from "../constants/config";

export default function Register({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      setLoading(true);

      // 🔐 Create account
      const user = await register(email, password);

      // 🔓 Login immediately
      await login(email, password);

      // 💰 Create wallet with bonus
      await db.createDocument(DB_ID, COLLECTIONS.WALLETS, "unique()", {
        userId: user.$id,
        balance: 2000 // signup bonus
      });

      alert("🎉 Account created! ₦2000 bonus added");

      if (onSuccess) onSuccess();

    } catch (err) {
      console.error(err);
      alert("❌ Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>📝 Register</h2>

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

        <button onClick={handleRegister} style={styles.button}>
          {loading ? "Creating..." : "Register"}
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