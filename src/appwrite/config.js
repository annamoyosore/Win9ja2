import { Client, Account, Databases, ID, Query } from "appwrite";

// =====================
// INIT APPWRITE CLIENT
// =====================
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// =====================
// SERVICES
// =====================
export const account = new Account(client);
export const databases = new Databases(client);

// =====================
// HELPERS
// =====================
export { client, ID, Query };