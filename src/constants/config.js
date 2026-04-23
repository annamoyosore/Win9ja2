export const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "69cb4e5c001651f6cfab";
export const DB_ID = "69cb505d0015fbe8a669";

export const COLLECTIONS = {
  WALLETS: "wallets",
  GAMES: "games",
  TRANSACTIONS: "transactions"
};

export const ADMIN = {
  WALLET_ID: localStorage.getItem("ADMIN_WALLET_ID") || "",
  FEE_PERCENT: 0.10
};
