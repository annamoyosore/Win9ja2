import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS, ADMIN } from "../constants/config";
import { creditWinner } from "./walletService";

/* =========================
   🎮 CREATE GAME (MISSING FIX)
========================= */
export async function createGame(hostId, stake) {
  return db.createDocument(DB_ID, COLLECTIONS.GAMES, "unique()", {
    hostId,
    guestId: "",
    stake,
    status: "waiting",
    winnerId: "",
    claimed: false,

    hostHand: "[]",
    guestHand: "[]",
    deck: "[]",
    discard: "[]",

    turn: hostId
  });
}

/* =========================
   🏆 SET WINNER
========================= */
export async function setWinner(gameId, winnerId) {
  return db.updateDocument(DB_ID, COLLECTIONS.GAMES, gameId, {
    winnerId,
    status: "finished",
    claimed: false
  });
}

/* =========================
   💰 CLAIM WIN
========================= */
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

  // lock claim first (prevents double spending)
  await db.updateDocument(DB_ID, COLLECTIONS.GAMES, game.$id, {
    claimed: true
  });

  // credit winner wallet
  await creditWinner(userId, winAmount);

  return { winAmount, adminFee };
}