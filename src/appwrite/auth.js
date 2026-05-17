import { account, ID } from "./config";

// REGISTER
export const registerUser = (email, password, name) => {
  return account.create(ID.unique(), email, password, name);
};

// LOGIN
export const loginUser = (email, password) => {
  return account.createEmailPasswordSession(email, password);
};

// GET USER
export const getUser = () => {
  return account.get();
};

// LOGOUT
export const logoutUser = () => {
  return account.deleteSession("current");
};