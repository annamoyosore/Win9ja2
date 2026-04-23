import { databases } from "./config";

const DB_ID = "YOUR_DB_ID";
const TRX = "wallet_transactions";

// create transaction
export async function createTransaction(data) {
  return await databases.createDocument(DB_ID, TRX, "unique()", data);
}

// get user transactions
export async function getUserTransactions(userId) {
  return await databases.listDocuments(DB_ID, TRX, [
    `userId=${userId}`
  ]);
}