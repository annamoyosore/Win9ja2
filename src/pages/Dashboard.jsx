import { useEffect, useState } from "react";
import { account } from "../appwrite/config";
import Chart from "../components/Chart";
import TradePanel from "../components/TradePanel";

export default function Dashboard({ setUser }) {

  const [user, setLocalUser] = useState(null);

  async function loadUser() {
    const u = await account.get();
    setLocalUser(u);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h2>📊 ApexTrader Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <hr />

      <Chart />

      <TradePanel />

    </div>
  );
}