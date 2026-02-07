export function formatStreak(count: number): string {
  if (count === 0) return "";
  if (count === 1) return "1 day streak";
  return `${count} day streak`;
}
