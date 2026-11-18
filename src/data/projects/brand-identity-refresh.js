// src/data/projects/brand-identity-refresh.js
// Content ported verbatim from handoff/gsusgil-portfolio.html (project id: "brand-identity").
// Arita is still lorem ipsum per handoff §5 — not invented here, carried over as-is until
// Jesús writes the real copy. Paula Belil is missing one of its three real gallery assets
// (wordmark/palette shot) — renders as a placeholder plate.

export default {
  slug: "brand-identity-refresh",
  name: "Paula Belil + Arita",
  disc: "Brand Identity",
  year: "2025-26",
  client: "Paula Belil · Arita",
  role: "Concept direction, identity design, visual system",

  idea: "Two identities, each built from what the client already had.",
  key: "",
  d1: "Two identity projects, approached the same way: start from what the client already has and turn it into a system.",
  d2: "Two clients are presented here, each with its own brief, system and result.",
  out: "Two identities, each with a system the client can keep using.",

  stats: [],

  cover: { src: "/home/grid/paula.webp", alt: "Paula Belil PB monogram" },
  hero: { src: "/projects/paula-belil/hero.webp", alt: "Paula Belil and Arita brand identities" },
  thumbs: [
    { src: "/home/list/paula-1.webp", alt: "Paula Belil logo" },
    { src: "/home/list/paula-2.webp", alt: "Paula Belil on set" },
    { src: "/home/list/paula-3.webp", alt: "Arita logo" },
    { src: "/home/list/paula-4.webp", alt: "Arita pilates" },
  ],

  creditsNote: null, // client !== in-house → "Collaborators (To be added)"

  chapters: [
    {
      name: "Paula Belil",
      client: "Paula Belil · Photographer and filmmaker",
      year: "2025",
      role: "Concept direction, monogram design, visual system",
      d1: "An identity refresh for photographer and filmmaker Paula Belil: a serif wordmark, a natural palette and a custom PB monogram that carries the brand where the full name cannot.",
      d2: "I led concept and design, then built the system for editorial, digital and social use.",
      out: "One system for her editorial, digital and social work.",
      key: "Let a monogram do the work where the full name cannot.",
      shots: [
        { video: "/projects/paula-belil/brandboard.mp4", poster: "/projects/paula-belil/monograma-pb.png", caption: "Brandboard" },
        { placeholder: true, caption: "Serif wordmark and palette" },
        { src: "/projects/paula-belil/brand-system.png", caption: "Brand system in use" },
      ],
    },
    {
      name: "Arita",
      client: "Arita · Pilates essentials",
      year: "2026",
      role: "Identity design, logo system, brand guidelines",
      d1: "An identity for Arita, a pilates essentials brand positioned as accessible luxury: a premium, sustainable alternative to names like Alo Yoga, for women whose lifestyle is built around wellness.",
      d2: "I designed a simple, recognisable logo that holds up across formats, in a palette of rose, chocolate, cream and berry red chosen to feel current. The brand is meant to be a safe place for women who want to feel good and look good.",
      out: "A logo with its uses, a basic brand manual and every version needed online and offline.",
      key: "Make a premium brand feel like a safe place.",
      shots: [
        { placeholder: true, caption: "Logo in the brand palette" },
        { placeholder: true, caption: "Logo versions and uses" },
        { placeholder: true, caption: "Basic brand manual" },
      ],
    },
  ],
};
