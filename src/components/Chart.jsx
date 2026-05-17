import { useEffect, useState } from "react";

export default function Chart() {

  const [price, setPrice] = useState(0);

  useEffect(() => {

    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://api.twelvedata.com/price?symbol=EUR/USD&apikey=${import.meta.env.TWELVEDATA_API_KEY}`
        );

        const data = await res.json();

        if (data.price) {
          setPrice(data.price);
        }

      } catch (err) {
        console.log("Price fetch error:", err);
      }
    }

    // initial fetch
    fetchPrice();

    // update every 3 seconds
    const interval = setInterval(fetchPrice, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>
      <h2>EUR/USD</h2>
      <h1>{price}</h1>
    </div>
  );
      }
