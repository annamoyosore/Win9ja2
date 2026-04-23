import { Client, Databases, Account } from "appwrite";
import { APPWRITE_ENDPOINT, PROJECT_ID } from "./config";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

export const db = new Databases(client);
export const account = new Account(client);