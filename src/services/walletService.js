import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS } from "../constants/config";

// Get wallet
export async function getWallet(userId) {
  const res = await db.listDocuments(DB_ID, COLLECTIONS.WALLETS);
  return res.documents.find(w => w.userId === userId);
}

// Request deposit (NOT credited yet)
export async function requestDeposit(userId, amount, reference) {
  return db.createDocument(DB_ID, COLLECTIONS.TRANSACTIONS, "unique()", {
    userId,
    type: "deposit",
    amount,
    reference,
    status: "pending"
  });
}

// Admin later manually updates wallet
export async function approveDeposit(walletId, amount) {
  const wallet = await db.getDocument(DB_ID, COLLECTIONS.WALLETS, walletId);

  return db.updateDocument(DB_ID, COLLECTIONS.WALLETS, walletId, {
    balance: wallet.balance + amount
  });
}