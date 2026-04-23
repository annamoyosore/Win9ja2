import { Client, Databases, Account } from "appwrite";
import { APPWRITE_ENDPOINT, PROJECT_ID } from "./config";

const client = new Client()
  .setEndpoint(https://nyc.cloud.appwrite.io/v1)
  .setProject(69cb4e5c001651f6cfab);

export const db = new Databases(client);
export const account = new Account(client);