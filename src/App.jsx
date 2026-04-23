import { useState } from "react";
import GameDashboard from "./pages/GameDashboard";
import WalletDashboard from "./pages/WalletDashboard";

export default function App() {
  const [page, setPage] = useState("game");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("game")}>🎮 Game</button>
        <button onClick={() => setPage("wallet")}>💰 Wallet</button>
      </nav>

      {page === "game" ? <GameDashboard /> : <WalletDashboard />}
    </div>
  );
}