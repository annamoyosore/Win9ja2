import { account } from "./config.js";

export const login = (email, password) =>
  account.createEmailSession(email, password);

export const register = (email, password, name) =>
  account.create("unique()", email, password, name);

export const getUser = () => account.get();