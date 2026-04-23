import { updateBalance } from "../appwrite/users";

const ADMIN_ID = "YOUR_ADMIN_ID";

export async function giveCommission(amount) {
  const commission = amount * 0.1; // 10%

  await updateBalance(ADMIN_ID, commission);

  return commission;
}