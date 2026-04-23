import { databases } from "./config";

const DB_ID = "YOUR_DB_ID";
const USERS = "users";

// create user profile
export async function createUser(user) {
  return await databases.createDocument(DB_ID, USERS, user.$id, {
    name: user.name,
    email: user.email,
    balance: 0
  });
}

// get user
export async function getUser(userId) {
  return await databases.getDocument(DB_ID, USERS, userId);
}

// update balance
export async function updateBalance(userId, amount) {
  const user = await getUser(userId);

  return await databases.updateDocument(DB_ID, USERS, userId, {
    balance: user.balance + amount
  });
}