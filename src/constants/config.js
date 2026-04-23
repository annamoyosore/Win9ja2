export const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "YOUR_PROJECT_ID";
export const DB_ID = "whotDB";

export const COLLECTIONS = {
  WALLETS: "wallets",
  GAMES: "games",
  TRANSACTIONS: "transactions"
};

export const ADMIN = {
  WALLET_ID: localStorage.getItem("ADMIN_WALLET_ID") || "",
  FEE_PERCENT: 0.10
};
