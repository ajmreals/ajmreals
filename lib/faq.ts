import { site } from "@/lib/site";

/**
 * The FAQ. Single source of truth — the page renders these and the FAQPage
 * JSON-LD serialises the same strings, so the visible text and the structured
 * data can never drift apart. Google treats a mismatch between the two as a
 * reason to drop the rich result, so this matters.
 *
 * Every answer here is drawn from something already published: the pricing
 * section, the Pre-Shoot Checklist PDF, or lib/site.ts. Nothing is invented.
 * If you can't point at where an answer comes from, don't add it — an FAQ is
 * the page a prospect quotes back at you.
 *
 * `answer` is plain text on purpose (JSON-LD can't carry JSX). Where a link
 * helps, put it in `link` and it renders after the answer.
 */
export type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export const faq: FaqItem[] = [
  {
    question: "Do I have to sign up for a monthly retainer?",
    answer:
      "No. A single listing is $400 with no retainer and no minimum term — book one when you need one. The monthly retainers are there for agents, developers, and builders who want content every month and would rather not rebook each time.",
    link: { href: "/#packages", label: "See all packages" },
  },
  {
    question: "What do I get for the $400 single listing?",
    answer:
      "One cinematic walkthrough film of the property, shot, edited, and delivered ready for MLS, social, and email — for homes up to 1,000 sq ft. Photos are an extra $275, a 2D floor plan an extra $50, or both together for $300.",
  },
  {
    question: "What if the home is bigger than 1,000 sq ft?",
    answer:
      "Add $75 for each additional 500 sq ft. A 2,000 sq ft home works out at $550 — the $400 base plus two increments. For anything substantially larger, get in touch and we'll quote the job properly.",
    link: { href: "/contact", label: "Get a quote" },
  },
  {
    question: "Do you shoot photos as well as video?",
    answer:
      "Yes. Edited photography is included on every retainer tier — we shoot what the property needs rather than working to a set number. On a single listing, photos are a $275 add-on.",
  },
  {
    question: "Do you fly a drone?",
    answer:
      "Drone aerials are included in the Growth and Partner retainers. On a single listing or a Starter retainer, mention it when you book and we'll quote it. Drone needs clear skies and wind under 20 mph — we watch the forecast and will call it off rather than deliver footage that looks rough.",
  },
  {
    question: "Which areas do you cover?",
    answer: `${site.areaServed.join(", ")}. Recent listings include Brooklyn, White Plains, and Lloyd Harbor. If the property sits outside those three states, get in touch anyway and we'll quote it with travel included.`,
    link: { href: "/portfolio", label: "See recent work" },
  },
  {
    question: "How soon do I get the files?",
    answer:
      "Delivery is part of the package, counted from the shoot: 10 days on Starter, 7 on Growth, and 5 on Partner. If a particular listing needs to be live sooner than that, say so before you book rather than after.",
  },
  {
    question: "How many rounds of revisions do I get?",
    answer:
      "One round on Starter, two on Growth, and unlimited on Partner. A round means you send your notes in one go and we work through them together.",
  },
  {
    question: "How long is the retainer term?",
    answer:
      "Starter runs on a 3-month minimum, Growth on 6 months, and Partner is a 12-month term. A single listing has no term at all — it's one shoot, one invoice.",
  },
  {
    question: "How long are you on site?",
    answer:
      "Budget two to three hours for a typical listing. What makes it longer is almost never the house: it's staging still in progress when we arrive, nobody on site with access, or cars nobody can move.",
  },
  {
    question: "What time of day is best to shoot?",
    answer:
      "Interiors photograph best mid-morning or mid-afternoon, when the light is soft and there's no hard shadow across the floors. Front-facing exteriors want the afternoon, once the sun has come round to the front of the house. For a hero exterior, golden hour — the ninety minutes before sunset. Twilight is a single thirty-minute window with no second chance, so it gets scheduled on purpose.",
  },
  {
    question: "How should the property be prepped before you arrive?",
    answer:
      "Blinds open and slats level, every light on including closets and under-cabinet, ceiling fans off, counters cleared, and cars off the driveway. The single biggest fix we make in post is mismatched bulbs — one warm bulb beside two cool ones turns a white kitchen green on camera. We put the whole list, timed 48 hours, 24 hours, and the morning before, in a free two-page checklist.",
    link: { href: "/checklist", label: "Get the free Pre-Shoot Checklist" },
  },
  {
    question: "Can you handle the prep for me?",
    answer:
      "On a retainer, yes — shoot coordination is included. We confirm access, walk the prep list with the seller, and time the light, so you don't think about any of it.",
  },
  {
    question: "Do you only work with real estate agents?",
    answer:
      "Most of our work is listings for agents, developers, and builders, and the site is built around that. We also shoot weddings, nightlife and events, law firms, gyms and studios, restaurants, and medspas and clinics.",
  },
  {
    question: "How do I book a shoot?",
    answer: `Send a message through the contact form, email ${site.email}, or call ${site.phone.replace("+1-", "")}. Inquiries are answered within 24 hours. Tell us the address, the rough square footage, and when the listing goes live, and we'll come back with a date.`,
    link: { href: "/contact", label: "Start an inquiry" },
  },
];
