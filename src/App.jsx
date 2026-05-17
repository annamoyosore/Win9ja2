import { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { account } from "./appwrite/config";

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function init() {
    try {
      const u = await account.get();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (loading) return <p>Loading...</p>;

  return user ? (
    <Dashboard setUser={setUser} />
  ) : (
    <Auth onLogin={init} />
  );
}