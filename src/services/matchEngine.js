import { createMatch } from "../appwrite/matches.js";
import { getWallet, updateWallet } from "../appwrite/wallet.js";

export async function startMatch(p1, p2, stake) {

  const w1 = (await getWallet(p1)).documents[0];
  const w2 = (await getWallet(p2)).documents[0];

  if (w1.balance < stake || w2.balance < stake) {
    throw new Error("Insufficient balance");
  }

  // 🔒 LOCK FUNDS
  await updateWallet(w1.$id, w1.balance - stake);
  await updateWallet(w2.$id, w2.balance - stake);

  return await createMatch({
    player1Id: p1,
    player2Id: p2,
    stake,
    locked: true,
    status: "active",
    scoreP1: 0,
    scoreP2: 0
  });
}