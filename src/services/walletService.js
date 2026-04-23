import { db } from "../constants/appwrite";
import { COLLECTIONS, DB_ID, ADMIN } from "../constants/config";

export async function getWallet(userId) {
  const res = await db.listDocuments(DB_ID, COLLECTIONS.WALLETS);
  return res.documents.find(w => w.userId === userId);
}

export async function updateWallet(walletId, balance) {
  return db.updateDocument(DB_ID, COLLECTIONS.WALLETS, walletId, {
    balance
  });
}

// 💰 AUTO PAYOUT SYSTEM
export async function payoutWinner(winnerId, stake) {
  const totalPot = stake * 2;
  const adminFee = totalPot * ADMIN.FEE_PERCENT;
  const winnerAmount = totalPot - adminFee;

  const wallets = await db.listDocuments(DB_ID, COLLECTIONS.WALLETS);

  const winner = wallets.documents.find(w => w.userId === winnerId);
  const admin = wallets.documents.find(w => w.userId === ADMIN.WALLET_ID);

  if (winner) {
    await updateWallet(winner.$id, winner.balance + winnerAmount);
  }

  if (admin) {
    await updateWallet(admin.$id, admin.balance + adminFee);
  }

  return { winnerAmount, adminFee };
}