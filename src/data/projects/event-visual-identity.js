// src/data/projects/event-visual-identity.js
// Content ported verbatim from handoff/gsusgil-portfolio.html (project id: "student-week").

const CL = "In‑house · Higher education (AEC)";

export default {
  slug: "event-visual-identity",
  name: "Student Week",
  disc: "Event Identity",
  year: "2023-26",
  client: CL,
  role: "Visual direction, concept evolution, identity system",

  idea: "Barcelona’s architecture as an identity system.",
  key: "Keep the structure fixed and change only the landmark, so every edition is new and still recognisable.",
  d1: "A recurring event identity built on Barcelona’s architecture. It began with single landmarks and grew into a broader system, keeping the same structural anchors so every edition is recognisably the same event.",
  d2: "I set the concept and directed its evolution across four editions: Sagrada Família, Park Güell, Casa Batlló with the panot pattern, and a 2026 system that spans several landmarks.",
  out: "Four editions on one system. Each year keeps the structure and adds a new landmark.",

  stats: [
    ["4", "Editions"],
    ["5", "Landmarks in the 2026 system"],
  ],

  cover: { src: "/projects/event-identity/sagrada-familia.png", alt: "Student Week identity based on Sagrada Família" },
  hero: { src: "/projects/event-identity/sagrada-familia-v2.png", alt: "Student Week 2026 identity system" },
  thumbs: [
    { src: "/projects/event-identity/sagrada-familia.png", alt: "2023 — Sagrada Família" },
    { src: "/projects/event-identity/park-guell.png", alt: "2024 — Park Güell" },
    { src: "/projects/event-identity/casa-batllo.png", alt: "2025 — Casa Batlló + panot" },
    { src: "/projects/event-identity/hotel-w.png", alt: "2026 — Hotel W" },
  ],

  // Note: reordered vs. the prototype's shot order so the 16:9 recap video lands in the
  // panoramic cell (s4) instead of a small 9:7 one — same 5 captions, no text changed.
  shots: [
    { src: "/projects/event-identity/sagrada-familia.png", caption: "2023 · Sagrada Família" },
    { src: "/projects/event-identity/park-guell.png", caption: "2024 · Park Güell" },
    { src: "/projects/event-identity/casa-batllo.png", caption: "2025 · Casa Batlló + panot" },
    { src: "/projects/event-identity/mies-van-rhode.png", caption: "2026 · Multi-landmark system" },
    { video: "/projects/event-identity/resumen-stw-2025-b.mp4", caption: "2025 · Applied to the live event" },
  ],

  creditsNote: "Performance, content and alumni teams",
};
