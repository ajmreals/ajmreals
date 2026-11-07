import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share through this site.`,
  alternates: { canonical: "/privacy" },
  // Useful to visitors, not something to compete for in search.
  robots: { index: false, follow: true },
};

// Last substantive change to this policy. Update it when the practices
// described here change — not on every deploy.
const UPDATED = "7 November 2026";

export default function PrivacyPage() {
  return (
    <main id="main-content" className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <FadeIn className="mb-4">
            <SectionHeader label="Legal" title="Privacy policy." />
          </FadeIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-12">
            Last updated {UPDATED}
          </p>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-10">
              <Section title="The short version">
                <p>
                  We collect what you type into our forms so we can reply to
                  you and send you what you asked for. We don&apos;t sell it,
                  we don&apos;t share it for advertising, and you can ask us to
                  delete it at any time by emailing{" "}
                  <Mail /> .
                </p>
              </Section>

              <Section title="What we collect">
                <p>
                  Only what you give us. There are two forms on this site.
                </p>
                <ul className="flex flex-col gap-2 mt-3">
                  <Item>
                    <strong className="text-[#F5F5F5]">Contact form</strong> —
                    your name, email address, and optionally your phone number,
                    which package you&apos;re interested in, and your message.
                  </Item>
                  <Item>
                    <strong className="text-[#F5F5F5]">
                      Pre-Shoot Checklist
                    </strong>{" "}
                    — your name, email address, and optionally your brokerage.
                  </Item>
                </ul>
                <p className="mt-3">
                  We also record which form a submission came from, and when.
                  We do not ask for payment details anywhere on this site.
                </p>
              </Section>

              <Section title="Why we have it">
                <p>
                  To answer your enquiry, to send you the checklist if you
                  asked for it, and to keep track of conversations we&apos;re
                  having with prospective clients. If you download the
                  checklist we may occasionally email you about our work; every
                  such email has an unsubscribe link, and you can also just
                  reply and ask us to stop.
                </p>
              </Section>

              <Section title="Who else sees it">
                <p>
                  We keep this list short on purpose, and it is accurate as of
                  the date above.
                </p>
                <ul className="flex flex-col gap-2 mt-3">
                  <Item>
                    <strong className="text-[#F5F5F5]">Supabase</strong> —
                    hosts the database your submission is stored in, on servers
                    in the United States.
                  </Item>
                  <Item>
                    <strong className="text-[#F5F5F5]">Resend</strong> —
                    delivers the notification email that tells us you got in
                    touch.
                  </Item>
                  <Item>
                    <strong className="text-[#F5F5F5]">Vimeo</strong> — hosts
                    the videos embedded on our home and portfolio pages. We
                    load those players in do-not-track mode, but Vimeo may
                    still set cookies if you press play. Their privacy policy
                    governs that.
                  </Item>
                  <Item>
                    <strong className="text-[#F5F5F5]">Google Analytics</strong>{" "}
                    — measures site traffic. It sees your visit, not what you
                    type into our forms.
                  </Item>
                  <Item>
                    <strong className="text-[#F5F5F5]">Railway</strong> — hosts
                    this website and keeps standard server logs.
                  </Item>
                </ul>
                <p className="mt-3">
                  We do not sell your information, and we do not share it with
                  advertisers or data brokers.
                </p>
              </Section>

              <Section title="Cookies and analytics">
                <p>
                  We use Google Analytics to see how many people visit the
                  site, which pages they read, and roughly where they came
                  from. It sets cookies in your browser and tells us things
                  like your approximate city and what kind of device you used.
                  We use it to understand what&apos;s working on the site —
                  not to build a profile of you, and never to target
                  advertising.
                </p>
                <p className="mt-3">
                  We also record when someone submits a form, so we can tell
                  how many enquiries came from which page. That record is a
                  count — it does not include your name, email, or anything
                  else you typed.
                </p>
                <p className="mt-3">
                  Embedded Vimeo players may set their own cookies when you
                  play a video. Beyond those two, we set no advertising or
                  tracking cookies.
                </p>
                <p className="mt-3">
                  If you&apos;d rather not be counted, browser do-not-track
                  settings, ad blockers, and Google&apos;s own{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[#F5F5F5] transition-colors"
                  >
                    opt-out add-on
                  </a>{" "}
                  all work here.
                </p>
              </Section>

              <Section title="How long we keep it">
                <p>
                  Enquiries are kept while we may still reasonably be doing
                  business together, and are removed on request. If you ask us
                  to delete your details, we will do so and confirm.
                </p>
              </Section>

              <Section title="Your choices">
                <p>
                  Email <Mail /> and you can ask us to send you a copy of what
                  we hold about you, correct it, delete it, or stop emailing
                  you. We&apos;ll action it and reply. You don&apos;t need to
                  give a reason, and depending on where you live you may have
                  these rights by law regardless.
                </p>
              </Section>

              <Section title="Children">
                <p>
                  This site is aimed at businesses and is not directed at
                  children. We don&apos;t knowingly collect information from
                  anyone under 13.
                </p>
              </Section>

              <Section title="Changes">
                <p>
                  If we change how we handle your information, we&apos;ll
                  update this page and the date at the top.
                </p>
              </Section>

              <Section title="Contact">
                <p>
                  {site.name} — <Mail />
                  <br />
                  <a
                    href="tel:+13477887898"
                    className="underline underline-offset-4 hover:text-[#F5F5F5] transition-colors"
                  >
                    347-788-7898
                  </a>
                </p>
              </Section>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-14 pt-8 border-t border-[#222]">
            <Link
              href="/"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              ← Back to the site
            </Link>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-heading font-semibold text-[#F5F5F5] mb-3">
        {title}
      </h2>
      <div className="text-[#888] text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-accent shrink-0">·</span>
      <span>{children}</span>
    </li>
  );
}

function Mail() {
  return (
    <a
      href={`mailto:${site.email}`}
      className="underline underline-offset-4 hover:text-[#F5F5F5] transition-colors"
    >
      {site.email}
    </a>
  );
}
