export const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "69cb4e5c001651f6cfab";
export const DB_ID = "69cb505d0015fbe8a669";

export const COLLECTIONS = {
  WALLETS: "wallets",
  GAMES: "games",
  TRANSACTIONS: "transactions"
};

// ⚠️ Keep admin wallet static (safe for production)
export const ADMIN = {
  WALLET_ID: "", // set manually in admin panel or env later
  FEE_PERCENT: 0.10
};