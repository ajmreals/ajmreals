import { z } from "zod";

// One schema per form, used on the server. Server Actions are callable
// directly, so client-side validation is a convenience — this is the gate.

const name = z
  .string()
  .trim()
  .min(1, "Please enter your name")
  .max(100, "That name is too long");

const email = z
  .string()
  .trim()
  .min(1, "Please enter your email")
  .max(200, "That email is too long")
  .email("That email doesn't look right");

/**
 * Honeypot. Bots fill every field they find; a real person never sees it.
 *
 * Deliberately permissive here: the action checks it separately and answers
 * as if the submission worked, so a bot learns nothing. Rejecting it in the
 * schema would return a visible error and give the game away.
 */
const honeypot = z.string().max(200).optional();

export const contactSchema = z.object({
  name,
  email,
  phone: z.string().trim().max(40, "That phone number is too long").optional(),
  package: z.string().trim().max(60).optional(),
  message: z.string().trim().max(5000, "Please keep it under 5000 characters").optional(),
  website: honeypot,
});

export const checklistSchema = z.object({
  name,
  email,
  brokerage: z.string().trim().max(150, "That name is too long").optional(),
  website: honeypot,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ChecklistInput = z.input<typeof checklistSchema>;

/** First human-readable problem, or null when the input is fine. */
export function firstError(result: z.ZodSafeParseResult<unknown>): string | null {
  if (result.success) return null;
  return result.error.issues[0]?.message ?? "Please check the form and try again";
}
