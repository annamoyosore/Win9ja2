import { db, CONFIG } from "./config.js";

export const getWallet = (userId) =>
  db.listDocuments(CONFIG.databaseId, CONFIG.collections.wallets, [
    `userId=${userId}`
  ]);

export const updateWallet = (docId, balance) =>
  db.updateDocument(CONFIG.databaseId, CONFIG.collections.wallets, docId, {
    balance
  });