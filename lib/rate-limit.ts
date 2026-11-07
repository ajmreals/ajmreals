import { headers } from "next/headers";

// In-memory sliding window. Railway runs this app as a single long-lived Node
// process, so a Map is enough; move to Redis if the service ever scales past
// one replica, since each would then keep its own counts.
type Hit = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

const hits = new Map<string, Hit>();
let lastSweep = Date.now();

function sweep(now: number) {
  // Drop expired entries occasionally so the map cannot grow without bound.
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  // forEach rather than for..of: the build targets ES5, where iterating a
  // Map needs downlevelIteration. Deleting during forEach is safe.
  hits.forEach((hit, key) => {
    if (hit.resetAt <= now) hits.delete(key);
  });
}

function clientKey(): string {
  const h = headers();
  // Railway terminates TLS upstream and sets x-forwarded-for.
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

/**
 * Returns true when this caller is over the limit.
 *
 * Fails open: if the IP cannot be determined every caller shares the
 * "unknown" bucket, which would throttle real people behind one proxy — so
 * that bucket is never limited.
 */
export function isRateLimited(scope: string): boolean {
  const key = `${scope}:${clientKey()}`;
  if (key.endsWith(":unknown")) return false;

  const now = Date.now();
  sweep(now);

  const hit = hits.get(key);
  if (!hit || hit.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  hit.count += 1;
  return hit.count > MAX_PER_WINDOW;
}
