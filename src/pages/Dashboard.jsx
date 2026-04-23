import { useState } from "react";
import Lobby from "../components/Lobby";
import GameBoard from "../components/GameBoard";

export default function Dashboard() {
  const [gameId, setGameId] = useState(null);

  return (
    <div>
      <h1>WHOT BETTING GAME</h1>

      {!gameId ? (
        <Lobby onStart={setGameId} />
      ) : (
        <GameBoard gameId={gameId} />
      )}
    </div>
  );
}