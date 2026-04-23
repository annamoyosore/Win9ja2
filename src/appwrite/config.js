import { Client, Account, Databases } from "appwrite";

export const CONFIG = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "YOUR_PROJECT_ID",
  databaseId: "YOUR_DB_ID",

  collections: {
    users: "users",
    wallets: "wallets",
    lobby: "lobby",
    matches: "matches",
    transactions: "transactions"
  },

  adminIds: ["ADMIN_ID1", "ADMIN_ID2"]
};

const client = new Client()
  .setEndpoint(CONFIG.endpoint)
  .setProject(CONFIG.projectId);

export const account = new Account(client);
export const db = new Databases(client);