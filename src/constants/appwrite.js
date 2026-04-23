import { Client, Databases, Account } from "appwrite";

// 🔐 Your Appwrite credentials
const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1";
const PROJECT_ID = "69cb4e5c001651f6cfab";

// 🔌 Init client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

// 🗄️ Services
export const db = new Databases(client);
export const account = new Account(client);