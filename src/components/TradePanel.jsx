import { useState } from "react";
import socket from "../socket";

export default function TradePanel() {

  const [amount, setAmount] = useState(10);
  const [direction, setDirection] = useState("UP");
  const [entryPrice, setEntryPrice] = useState(null);

  function placeTrade() {

    socket.emit("placeTrade", {
      amount,
      direction,
      symbol: "EUR/USD",
      time: Date.now()
    });

    alert("Trade placed!");
  }

  return (
    <div style={{ marginTop: 20 }}>

      <h3>Trade Panel</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        placeholder="Amount"
      />

      <select
        onChange={(e) =>
          setDirection(e.target.value)
        }
      >
        <option value="UP">BUY ↑</option>
        <option value="DOWN">SELL ↓</option>
      </select>

      <button onClick={placeTrade}>
        Execute Trade
      </button>

    </div>
  );
}