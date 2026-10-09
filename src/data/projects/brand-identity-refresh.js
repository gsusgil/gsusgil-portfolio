// src/data/projects/brand-identity-refresh.js
// Content ported verbatim from handoff/gsusgil-portfolio.html (project id: "brand-identity").
// Arita is still lorem ipsum per handoff §5 — not invented here, carried over as-is until
// Jesús writes the real copy. Paula Belil is missing one of its three real gallery assets
// (wordmark/palette shot) — renders as a placeholder plate.

export default {
  slug: "brand-identity-refresh",
  name: "Paula Belil + Arita",
  disc: "Brand Identity",
  year: "",
  client: "Paula Belil · Arita",
  role: "Concept direction, identity design, visual system",

  idea: "Two identities, each built from what the client already had.",
  key: "",
  d1: "Two identity projects, approached the same way: start from what the client already has and turn it into a system.",
  d2: "Two clients are presented here, each with its own brief, system and result.",
  out: "Two identities, each with a system the client can keep using.",

  stats: [],

  cover: { src: "/projects/paula-belil/monograma-pb.png", alt: "Paula Belil PB monogram" },
  hero: { src: "/projects/paula-belil/brand-system.png", alt: "Paula Belil brand system" },
  thumbs: [
    { src: "/projects/paula-belil/monograma-pb.png", alt: "PB monogram" },
    { src: "/projects/paula-belil/brand-system.png", alt: "Brand system" },
    { src: "/projects/paula-belil/monograma-pb.png", alt: "PB monogram" },
    { src: "/projects/paula-belil/brand-system.png", alt: "Brand system" },
  ],

  creditsNote: null, // client !== in-house → "Collaborators (To be added)"

  chapters: [
    {
      name: "Paula Belil",
      client: "Paula Belil · Photographer and filmmaker",
      year: "",
      role: "Concept direction, monogram design, visual system",
      d1: "An identity refresh for photographer and filmmaker Paula Belil: a serif wordmark, a natural palette and a custom PB monogram that carries the brand where the full name cannot.",
      d2: "I led concept and design, then built the system for editorial, digital and social use.",
      out: "One system for her editorial, digital and social work.",
      key: "Let a monogram do the work where the full name cannot.",
      // Brandboard video not produced yet (handoff §4) — conventional path, falls back to
      // the .pending plate if it 404s; poster is the real monogram so it isn't blank either way.
      videoPiece: {
        video: "/projects/paula-belil/brandboard.mp4",
        poster: "/projects/paula-belil/monograma-pb.png",
        caption: "Brandboard",
        images: [
          { placeholder: true, caption: "Serif wordmark and palette" },
          { src: "/projects/paula-belil/brand-system.png", caption: "Brand system in use" },
        ],
      },
    },
    {
      name: "Arita",
      client: "Arita · Lorem ipsum",
      year: "Lorem",
      role: "Lorem ipsum, dolor sit amet, consectetur",
      d1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud exercitation.",
      d2: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      out: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      key: "Lorem ipsum dolor sit amet, consectetur.",
      // No real assets at all yet for Arita (handoff §5) — video and poster both pending.
      videoPiece: {
        caption: "Lorem ipsum",
        images: [
          { placeholder: true, caption: "Dolor sit amet" },
          { placeholder: true, caption: "Consectetur adipiscing" },
        ],
      },
    },
  ],
};
