import { updateBalance, getUser } from "../appwrite/users";

export async function lockStake(userId, stake) {
  const user = await getUser(userId);

  if (user.balance < stake) {
    throw new Error("Insufficient balance");
  }

  return await updateBalance(userId, -stake);
}

export async function releaseStake(userId, stake) {
  return await updateBalance(userId, stake);
}