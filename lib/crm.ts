// Shared CRM constants. Kept out of the "use server" action file, which may
// only export async functions.
export const STATUSES = [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
] as const;

export type Status = (typeof STATUSES)[number];
