# Four things only you can do

Everything on the code side is finished and deployed. These four need a login,
a DNS record, or a camera — things I have no access to. Each is written so it
is a copy-paste, not a research project.

Ordered by what they're worth.

---

## ~~1. Google Search Console~~ — DONE, 11 Nov

Verified via the Google Analytics property, sitemap submitted, all five pages
listed. Nothing further to do; it populates on its own.

- **Within a day** the sitemap status flips from "Couldn't fetch" to Success.
  That status only means Google logged the submission before actually reading
  the file — the sitemap was confirmed healthy by opening it directly.
- **2–7 days** until pages show under Indexing → Pages.
- **Performance** stays empty until people arrive through search.

One thing that now matters: **do not remove Google Analytics from the site.**
Ownership was verified through it, so taking it out un-verifies the property
silently. The snippet also has to stay in `<head>` — that is why it is no
longer loaded through next/script.

Optional, any time: **URL Inspection** → paste the homepage → **Request
indexing**. It jumps the queue, turning days into hours. Purely a speed-up.

<details>
<summary>Original steps, kept for reference</summary>

Right now Google does not know the site exists. Nothing else on this list
matters as much.

**You can skip the hard verification step.** Google Analytics is already on the
site (`G-DQD7P628G5`), and Search Console accepts that as proof of ownership.

1. Go to **search.google.com/search-console**, signed in with the same Google
   account that owns the Analytics property.
2. **Add property** → choose the **URL prefix** box on the right (not Domain).
3. Enter exactly: `https://www.ajmreals.nyc`
   The `www` matters. The site redirects the bare domain, and the property has
   to match where pages actually live.
4. On the verification screen pick **Google Analytics**. It should verify
   immediately. If it doesn't, use the **HTML tag** method and send me the tag —
   I'll add it to the site in two minutes.
5. Once verified, open **Sitemaps** in the left menu and submit:
   `sitemap.xml`
6. Open **URL Inspection**, paste `https://www.ajmreals.nyc`, and click
   **Request indexing**. Repeat for `/portfolio`, `/faq` and `/checklist`.

Indexing takes a few days to a couple of weeks. Check back in a week under
**Pages** to see what Google has accepted.

</details>

---

## 2. Fix the SPF record — 5 minutes, prevents future email problems

Your mail currently delivers, so this is not on fire. It's the kind of thing
that starts bouncing at the worst possible moment.

**The problem:** your domain's mail is handled by **Microsoft 365** (the MX
record points at `ajmreals-nyc.mail.protection.outlook.com`), but the SPF
record on the root domain authorises **GoDaddy** (`secureserver.net`) instead.
SPF is the record that tells other mail servers who is allowed to send as you.
It currently names the wrong provider, so strict receivers can treat your mail
as unauthorised.

**Before you change anything, check what's there.** In GoDaddy → DNS, find the
TXT record on the root (`@`) that starts with `v=spf1`.

**If it mentions `secureserver.net` and you do NOT use GoDaddy webmail**,
replace the whole value with:

```
v=spf1 include:spf.protection.outlook.com -all
```

**If you DO still send mail from a GoDaddy mailbox**, use this instead so you
don't break it:

```
v=spf1 include:spf.protection.outlook.com include:secureserver.net -all
```

Two rules that matter:

- **Only one SPF record per domain.** Two `v=spf1` TXT records on the root is
  not "extra coverage" — it is an error, and mail servers reject both. If you
  find two, merge them into one line.
- **Do not touch `send.ajmreals.nyc`.** That subdomain carries its own records
  for Resend, which is what sends your lead alerts and follow-ups. It is
  separate and already correct.

**While you're in there, add DMARC.** You almost certainly have none. Create a
new TXT record:

- Name: `_dmarc`
- Value: `v=DMARC1; p=none; rua=mailto:acruz928@gmail.com`

`p=none` changes nothing about delivery — it only asks receivers to email you
reports about who is sending as your domain. It is the safe first step, and it
tells you whether anyone is spoofing you.

---

## 3. Turnstile keys — 10 minutes, optional

The widget is now built and wired into both forms. It stays invisible until
both keys exist, so there is no rush.

1. Go to **dash.cloudflare.com** → **Turnstile** → **Add widget**.
2. Name it `ajmreals`, and add `www.ajmreals.nyc` as the hostname.
3. Widget mode: **Managed**.
4. Copy the two keys it gives you.
5. In **Railway** → your service → **Variables**, add both:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = the site key
   - `TURNSTILE_SECRET_KEY` = the secret key

**Add both or neither.** The secret key alone rejects every submission. Both
together is the only valid state.

After Railway redeploys, submit the contact form yourself once to confirm a
real message still gets through.

---

## 4. Photography

You have one real stills sample on the site. The gap is not your eye — the
composition across everything you've sent is consistently good. It is window
exposure, and it is fixable in ten seconds per room.

Next prepped listing:

- **Bracket every interior.** Three frames at −2, 0 and +2 exposure, blended
  afterwards. That is the entire difference between the shot that's on the site
  and the ones that aren't.
- **Shoot interiors mid-morning or mid-afternoon** — your own checklist already
  says this.
- Send me 6–10 and I'll build the photography section out properly.

---

## Already handled — no action needed

- Pricing, savings display, terms — live
- FAQ, structured data, sitemap, robots.txt — live
- Share images on every page — fixed
- Turnstile code — built and tested
- Instagram avatar — in `brand/instagram/`, upload `ig-3a-justified-1080.png`
