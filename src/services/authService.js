import { account } from "../constants/appwrite";
import { ID } from "appwrite";

export const register = (email, password) =>
  account.create(ID.unique(), email, password);

export const login = (email, password) =>
  account.createEmailSession(email, password);

export const getUser = () => account.get();