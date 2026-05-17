import WebSocket from "ws";

export function startSocket(io) {

  const ws = new WebSocket(
    `wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.TWELVEDATA_API_KEY}`
  );

  ws.on("open", () => {

    ws.send(JSON.stringify({
      action: "subscribe",
      params: {
        symbols: "EUR/USD,GBP/USD"
      }
    }));

  });

  ws.on("message", (msg) => {

    const data = JSON.parse(msg);

    io.emit("price", {
      symbol: data.symbol,
      price: data.price
    });

  });
}