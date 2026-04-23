import { useState } from "react";
import { createGame } from "../services/gameService";

const STAKES = [200, 300, 400, 500, 700, 1000];

export default function Lobby({ onStart }) {
  const [stake, setStake] = useState(null);

  async function startGame() {
    if (!stake) return alert("Select stake");

    const game = await createGame("USER_ID", stake);

    onStart(game.$id);
  }

  return (
    <div>
      <h2>Lobby</h2>

      {STAKES.map(s => (
        <button key={s} onClick={() => setStake(s)}>
          ₦{s}
        </button>
      ))}

      <button onClick={startGame}>
        Create Game
      </button>
    </div>
  );
}