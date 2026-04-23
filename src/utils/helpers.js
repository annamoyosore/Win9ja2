export function formatMoney(n) {
  return "₦" + Number(n || 0).toLocaleString();
}

export function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}