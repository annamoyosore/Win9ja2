import { db } from "../constants/appwrite";
import { DB_ID, COLLECTIONS } from "../constants/config";

/* =========================
   💰 GET WALLET
========================= */
export async function getWallet(userId) {
  const res = await db.listDocuments(DB_ID, COLLECTIONS.WALLETS);
  return res.documents.find(w => w.userId === userId);
}

/* =========================
   💳 REQUEST DEPOSIT (MANUAL APPROVAL FLOW)
========================= */
export async function requestDeposit(userId, amount, reference) {
  return db.createDocument(DB_ID, COLLECTIONS.TRANSACTIONS, "unique()", {
    userId,
    type: "deposit",
    amount,
    reference,
    status: "pending" // admin approves later
  });
}