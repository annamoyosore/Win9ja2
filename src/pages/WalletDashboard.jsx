import { useEffect, useState } from "react";
import { getWallet, requestDeposit } from "../services/walletService";
import { getUser } from "../services/authService";

export default function WalletDashboard() {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    getUser().then(async (user) => {
      const w = await getWallet(user.$id);
      setWallet(w);
    });
  }, []);

  async function handleDeposit() {
    const user = await getUser();

    await requestDeposit(user.$id, Number(amount), "FLW_REF_MANUAL");

    alert("Deposit request sent. Await admin approval.");
  }

  return (
    <div>
      <h2>💰 Wallet Dashboard</h2>

      <h3>Balance: ₦{wallet?.balance || 0}</h3>

      <input
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleDeposit}>
        Request Deposit
      </button>
    </div>
  );
}