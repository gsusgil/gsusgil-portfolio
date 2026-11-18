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
  bench: false,

  idea: "One system, two speeds.",
  key: "Two modes on one modular structure: editorial depth for nurturing, event context and clear next steps for follow‑up.",
  d1: "A modular email system for a 65K+ contact database, built to work in two modes: long-form editorial nurturing and contextual follow-up after events.",
  d2: "I designed the repeatable structure and the hierarchy rules behind it. The newsletter guides a long read through clear blocks, so it scans easily. The post-event email opens with the event, then moves to feedback and the programmes that connect to it.",
  out: "One reusable structure for every send, and results that back it.",

  stats: [
    ["65K+", "Contact database"],
    ["47.36%", "Newsletter open rate"],
    ["39.29%", "Post-event clickthrough"],
  ],

  cover: { src: "/home/grid/email.webp", alt: "Newsletter and post-event email side by side" },
  hero: { src: "/projects/email-design/hero.webp", alt: "Email system: newsletter and post-event email", pos: "6%" },
  thumbs: [
    { src: "/home/list/email-1.webp", alt: "Newsletter — header and Learn section" },
    { src: "/home/list/email-2.webp", alt: "Newsletter — HVAC news block" },
    { src: "/home/list/email-3.webp", alt: "Post-event email — EstructuraVIVA" },
    { src: "/home/list/email-4.webp", alt: "Post-event email — programme card" },
  ],

  // Two long, scroll-driven emails (shots[0..1]).
  shots: [
    { src: "/projects/email-design/email-1.png", caption: "Newsletter · editorial nurturing" },
    { src: "/projects/email-design/email-2.png", caption: "Post-event · follow-up that also promotes programmes" },
  ],

  creditsNote: "Performance, content and alumni teams",
};
