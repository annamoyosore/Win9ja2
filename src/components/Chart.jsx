import { useEffect, useState } from "react";
import socket from "../socket";

export default function Chart() {

  const [price, setPrice] = useState(0);

  useEffect(() => {

    socket.on("price", (data) => {
      setPrice(data.price);
    });

    return () => socket.off("price");

  }, []);

  return (
    <div>
      <h2>EUR/USD</h2>
      <h1>{price}</h1>
    </div>
  );
}