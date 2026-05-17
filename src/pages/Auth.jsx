import { useState } from "react";
import {
  registerUser,
  loginUser
} from "../appwrite/auth";

import {
  databases,
  DATABASE_ID,
  WALLET_COLLECTION,
  ID
} from "../appwrite/config";

export default function Auth({ onLogin }) {

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAuth() {

    try {
      setLoading(true);

      // LOGIN
      if (isLogin) {
        await loginUser(email, password);
      }

      // REGISTER
      else {

        const user = await registerUser(
          email,
          password,
          name
        );

        await loginUser(email, password);

        // CREATE WALLET
        await databases.createDocument(
          DATABASE_ID,
          WALLET_COLLECTION,
          ID.unique(),
          {
            userId: user.$id,
            balance: 10000,
            demoBalance: 10000,
            profit: 0,
            loss: 0,
            currency: "USD",
            createdAt: new Date().toISOString()
          }
        );
      }

      onLogin();

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleAuth}>
        {loading ? "Loading..." : isLogin ? "Login" : "Register"}
      </button>

      <p onClick={() => setIsLogin(!isLogin)}>
        Switch
      </p>
    </div>
  );
}