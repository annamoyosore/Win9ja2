import { useEffect, useState } from "react";
import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS } from "../constants/config";
import { getUser } from "../services/authService";
import { claimWin } from "../services/gameService";

export default function GameBoard({ gameId }) {
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    getUser().then(setUser);

    db.getDocument(DB_ID, COLLECTIONS.GAMES, gameId)
      .then(setGame);
  }, [gameId]);

  if (!game || !user) return <div>Loading...</div>;

  const isWinner = game.winnerId === user.$id;

  return (
    <div>
      <h2>🎮 Game Board</h2>

      <p>Status: {game.status}</p>
      <p>Stake: ₦{game.stake}</p>

      {game.status === "finished" && isWinner && !claimed && (
        <button
          onClick={async () => {
            try {
              const result = await claimWin(game, user.$id);
              alert(`🏆 You won ₦${result.winAmount}`);
              setClaimed(true);
            } catch (err) {
              alert(err.message);
            }
          }}
          style={{
            padding: 12,
            background: "gold",
            border: "none",
            marginTop: 20
          }}
        >
          🏆 CLAIM WIN
        </button>
      )}

      {game.status === "finished" && !isWinner && (
        <p>❌ You lost this game</p>
      )}
    </div>
  );
}