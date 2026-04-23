import { useEffect, useState } from "react";
import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS } from "../constants/config";
import { getUser } from "../services/authService";
import { payoutWinner } from "../services/walletService";

export default function GameBoard({ gameId }) {
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(setUser);

    const unsub = db.subscribe(
      `databases.${DB_ID}.collections.${COLLECTIONS.GAMES}.documents.${gameId}`,
      (res) => setGame(res.payload)
    );

    return () => unsub();
  }, [gameId]);

  if (!game || !user) return <div>Loading...</div>;

  const myId = user.$id;

  const opponentId = game.players.find(p => p !== myId);

  const myHand = game.hands?.[myId] || [];
  const top = game.discard?.at(-1);

  async function playCard(index) {
    const card = myHand[index];

    const newHand = [...myHand];
    newHand.splice(index, 1);

    await db.updateDocument(DB_ID, COLLECTIONS.GAMES, gameId, {
      [`hands.${myId}`]: newHand,
      discard: [...game.discard, card],
      turn: opponentId
    });
  }

  // 🏆 FINAL WIN
  async function endGame(winnerId) {
    await payoutWinner(winnerId, game.stake);
    alert("🏆 Winner paid automatically!");
  }

  return (
    <div>
      <h2>Multiplayer WHOT</h2>

      <p>Round: {game.round}/3</p>
      <p>Turn: {game.turn === myId ? "Your Turn" : "Opponent"}</p>

      <div>
        Top Card: {top?.number} {top?.shape}
      </div>

      <div>
        {myHand.map((c, i) => (
          <button key={i} onClick={() => playCard(i)}>
            {c.number}-{c.shape}
          </button>
        ))}
      </div>
    </div>
  );
}