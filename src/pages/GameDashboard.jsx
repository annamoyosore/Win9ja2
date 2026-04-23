import Lobby from "../components/Lobby";
import GameBoard from "../components/GameBoard";
import { useState } from "react";

export default function GameDashboard() {
  const [gameId, setGameId] = useState(null);

  return (
    <div>
      <h2>🎮 Game Dashboard</h2>

      {!gameId ? (
        <Lobby onStart={setGameId} />
      ) : (
        <GameBoard gameId={gameId} />
      )}
    </div>
  );
}