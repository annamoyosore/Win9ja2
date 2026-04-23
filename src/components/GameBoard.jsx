import { useEffect, useRef, useState } from "react";
import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS } from "../constants/config";
import { getUser } from "../services/authService";
import { claimWin } from "../services/gameService";

const SHAPES = ["circle", "triangle", "square", "star", "cross"];

// =========================
// DECK
// =========================
function createDeck() {
  const deck = [];
  for (const shape of SHAPES) {
    for (let i = 1; i <= 13; i++) {
      if (i === 6 || i === 9) continue;
      deck.push({ shape, number: i });
    }
    deck.push({ shape, number: 14 });
  }
  return deck.sort(() => Math.random() - 0.5);
}

// =========================
// VALID MOVE
// =========================
function isValidMove(card, top) {
  if (!top) return true;
  return card.number === top.number || card.shape === top.shape;
}

// =========================
// MAIN GAME
// =========================
export default function GameBoard({ gameId }) {
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const [claimed, setClaimed] = useState(false);

  const gameRef = useRef(null);

  useEffect(() => {
    getUser().then(setUser);

    db.getDocument(DB_ID, COLLECTIONS.GAMES, gameId)
      .then(setGame);
  }, [gameId]);

  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  if (!game || !user) return <div>Loading...</div>;

  const isHost = game.hostId === user.$id;
  const hand = isHost ? JSON.parse(game.hostHand || "[]") : JSON.parse(game.guestHand || "[]");
  const top = JSON.parse(game.discard || "[]").at(-1);

  function playCard(index) {
    const copy = { ...game };

    const playerHand = isHost
      ? JSON.parse(copy.hostHand)
      : JSON.parse(copy.guestHand);

    const card = playerHand[index];

    if (!isValidMove(card, top)) return alert("Invalid move");

    playerHand.splice(index, 1);

    copy.discard = JSON.stringify([
      ...JSON.parse(copy.discard || "[]"),
      card
    ]);

    if (isHost) {
      copy.hostHand = JSON.stringify(playerHand);
    } else {
      copy.guestHand = JSON.stringify(playerHand);
    }

    db.updateDocument(DB_ID, COLLECTIONS.GAMES, gameId, copy)
      .then(setGame);
  }

  const isWinner = game.winnerId === user.$id;

  return (
    <div style={{ padding: 20 }}>
      <h2>🎮 WHOT GAME</h2>

      <p>Stake: ₦{game.stake}</p>
      <p>Status: {game.status}</p>

      <h3>Top Card</h3>
      <pre>{JSON.stringify(top)}</pre>

      <h3>Your Cards</h3>
      <div style={{ display: "flex", gap: 10 }}>
        {hand.map((c, i) => (
          <button key={i} onClick={() => playCard(i)}>
            {c.shape}-{c.number}
          </button>
        ))}
      </div>

      {/* 🏆 CLAIM WIN BUTTON */}
      {game.status === "finished" && isWinner && !claimed && (
        <button
          onClick={async () => {
            const result = await claimWin(game, user.$id);
            alert(`🏆 You won ₦${result.winAmount}`);
            setClaimed(true);
          }}
          style={{
            marginTop: 20,
            padding: 12,
            background: "gold",
            border: "none"
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