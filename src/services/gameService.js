import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS, ADMIN } from "../constants/config";
import { creditWinner } from "./walletService";

// SET WINNER
export async function setWinner(gameId, winnerId) {
  return db.updateDocument(DB_ID, COLLECTIONS.GAMES, gameId, {
    winnerId,
    status: "finished",
    claimed: false
  });
}

// CLAIM WIN
export async function claimWin(game, userId) {
  if (game.winnerId !== userId) {
    throw new Error("❌ Not your win");
  }

  if (game.claimed) {
    throw new Error("⚠️ Already claimed");
  }

  const totalPot = game.stake * 2;
  const adminFee = totalPot * ADMIN.FEE_PERCENT;
  const winAmount = totalPot - adminFee;

  // mark claimed first (prevents double click exploit)
  await db.updateDocument(DB_ID, COLLECTIONS.GAMES, game.$id, {
    claimed: true
  });

  // credit wallet
  await creditWinner(userId, winAmount);

  return { winAmount, adminFee };
}