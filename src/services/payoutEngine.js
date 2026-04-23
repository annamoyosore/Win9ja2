import { updateWallet } from "../appwrite/wallet.js";
import { updateMatch } from "../appwrite/matches.js";
import { getCommission } from "./commissionEngine.js";

export async function processPayout(match, winnerId, wallets) {

  if (match.payoutDone) {
    throw new Error("Already paid");
  }

  if (match.status !== "active") {
    throw new Error("Invalid match state");
  }

  const total = match.stake * 2;
  const commission = getCommission(total);
  const winAmount = total - commission;

  const winnerWallet = wallets.find(w => w.userId === winnerId);
  const adminWallet = wallets.find(w => w.isAdmin);

  // 💰 PAY WINNER
  await updateWallet(
    winnerWallet.$id,
    winnerWallet.balance + winAmount
  );

  // 💰 PAY ADMIN
  await updateWallet(
    adminWallet.$id,
    adminWallet.balance + commission
  );

  // ✅ MARK MATCH DONE
  await updateMatch(match.$id, {
    payoutDone: true,
    winnerId,
    status: "finished"
  });
}