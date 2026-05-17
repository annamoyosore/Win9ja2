export function checkTrade(entry, current) {
  return current > entry ? "WIN" : "LOSS";
}