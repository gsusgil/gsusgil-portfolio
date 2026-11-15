// src/data/projects/event-visual-identity.js
// Content ported verbatim from handoff/gsusgil-portfolio.html (project id: "student-week").

const CL = "In‑house · Higher education (AEC)";

export default {
  slug: "event-visual-identity",
  name: "Student Week",
  disc: "Event Identity",
  year: "2024-27",
  client: CL,
  role: "Visual direction, concept evolution, identity system",

  idea: "Barcelona’s architecture as an identity system.",
  key: "Keep the structure fixed and change only the landmark, so every edition is new and still recognisable.",
  d1: "A recurring event identity built on Barcelona’s architecture. It began with single landmarks and grew into a broader system, keeping the same structural anchors so every edition is recognisably the same event.",
  d2: "I set the concept and directed its evolution edition after edition: from Casa Batlló and the panot pattern to a 2026 system that spans several landmarks, and a first look at 2027.",
  out: "Four editions on one system. Each year keeps the structure and adds a new landmark.",

  stats: [
    ["4", "Editions"],
    ["5", "Landmarks in the 2026 system"],
  ],

  cover: { src: "/home/grid/event.webp", alt: "Student Week identity based on Sagrada Família" },
  hero: { src: "/projects/event-identity/hero.webp", alt: "Student Week 2026 identity system" },
  thumbs: [
    { src: "/home/list/event-1.webp", alt: "2024 — Casa Batlló" },
    { src: "/home/list/event-2.webp", alt: "2025 — Casa Batlló + panot" },
    { src: "/home/list/event-3.webp", alt: "2026 — Torre de Collserola" },
    { src: "/home/list/event-4.webp", alt: "2027 — Preview" },
  ],

  // Note: reordered vs. the prototype's shot order so the 16:9 recap video lands in the
  // panoramic cell (s4) instead of a small 9:7 one — same 5 captions, no text changed.
  shots: [
    { video: "/projects/event-identity/resumen-stw-2025-web.mp4", poster: "/projects/event-identity/resumen-poster.jpg", caption: "2025 · Live event", note: "The system in motion" },
    { src: "/projects/event-identity/2027-vertical.webp", caption: "2027 · Preview", note: "New direction, same Passeig de Gràcia tile", pos: "50% 25%" },
    { src: "/projects/event-identity/2024-preview.webp", caption: "2024 · Casa Batlló", note: "Panot tiles + a Gaudí detail" },
    { src: "/projects/event-identity/2026-collserola-sq.webp", caption: "2026 · Collserola", note: "Passeig de Gràcia tile + a named landmark" },
  ],

  creditsNote: "Performance, content and alumni teams",
};
