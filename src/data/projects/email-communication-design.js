// src/data/projects/email-communication-design.js
// Content ported verbatim from handoff/gsusgil-portfolio.html (project id: "email-system").
// Gap vs. the handoff: only 1 of 3 "detail" crops exists as a real asset today (banner-mail-system.png).
// The other two detail cells render as a plain placeholder plate until that material is produced.

const CL = "In‑house · Higher education (AEC)";

export default {
  slug: "email-communication-design",
  name: "Email System",
  disc: "CRM Design",
  year: "2026",
  client: CL,
  role: "Email design, content hierarchy, nurturing structure",
  long: true, // full-length scrollable email windows (handoff §3 "Emails largos")
  bench: true,

  idea: "One system, two speeds.",
  key: "Two modes on one modular structure: editorial depth for nurturing, a single action for follow‑up.",
  d1: "A modular email system for a 65K+ contact database, built to work in two modes: long-form editorial nurturing and short, high-intent follow-up after events.",
  d2: "I designed the repeatable structure and the hierarchy rules behind it. The newsletter is built for scanning. The post-event email strips back to context and one clear action.",
  out: "The post-event email clicked through well above the account average.",

  stats: [
    ["65K+", "Contact database"],
    ["47.36%", "Newsletter open rate"],
    ["39.29%", "Post-event clickthrough"],
  ],

  cover: { src: "/home/grid/email.webp", alt: "Email system overview" },
  hero: { src: "/projects/email-design/hero.webp", alt: "Newsletter email design" },
  thumbs: [
    { src: "/home/list/email-1.webp", alt: "Newsletter" },
    { src: "/home/list/email-2.webp", alt: "Post-event" },
    { src: "/home/list/email-3.webp", alt: "Email system" },
    { src: "/home/list/email-4.webp", alt: "Newsletter" },
  ],

  // Two long, scroll-driven emails (shots[0..1]).
  shots: [
    { src: "/projects/email-design/email-1.png", caption: "Newsletter · editorial nurturing" },
    { src: "/projects/email-design/email-2.png", caption: "Post-event · contextual follow-up" },
  ],

  creditsNote: "Performance, content and alumni teams",
};
