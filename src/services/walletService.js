import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS, ADMIN } from "../constants/config";

// GET WALLET
export async function getWallet(userId) {
  const res = await db.listDocuments(DB_ID, COLLECTIONS.WALLETS);
  return res.documents.find(w => w.userId === userId);
}

// UPDATE WALLET
export async function updateWallet(walletId, balance) {
  return db.updateDocument(DB_ID, COLLECTIONS.WALLETS, walletId, {
    balance
  });
}

// CREDIT WINNER
export async function creditWinner(userId, amount) {
  const wallets = await db.listDocuments(DB_ID, COLLECTIONS.WALLETS);
  const wallet = wallets.documents.find(w => w.userId === userId);

  if (!wallet) throw new Error("Wallet not found");

  return db.updateDocument(DB_ID, COLLECTIONS.WALLETS, wallet.$id, {
    balance: wallet.balance + amount
  });
}