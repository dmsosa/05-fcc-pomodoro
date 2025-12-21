//HELPERS
// Time formatting helper
export function parseTime (seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export function clamp(n: number): number  { return Math.min(60 * 60, Math.max(n, 5 * 60)) };
//