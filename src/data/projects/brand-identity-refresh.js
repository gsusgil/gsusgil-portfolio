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
  client: "Freelance · Paula Belil, Arita",
  role: "Concept direction, identity design, visual system",

  idea: "Two identities built to hold up in every format.",
  key: "",
  d1: "Two freelance identity projects: the personal brand of a photographer and filmmaker, and a pilates essentials brand. Each needed a mark that is simple, recognisable and flexible.",
  d2: "Each started from one distinctive mark and grew into a palette and a system the client can keep using.",
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

  creditsNote: "Paula Belil, Arita",

  chapters: [
    {
      name: "Paula Belil",
      client: "Freelance · Photographer and filmmaker",
      year: "2025",
      role: "Concept direction, monogram design, visual system",
      d1: "An identity refresh for photographer and filmmaker Paula Belil: a serif wordmark, a natural palette and a custom PB monogram.",
      d2: "I led concept and design, from the monogram to the system built around it.",
      out: "An identity that presents Paula as an experienced visual professional, refined yet contemporary, with a monogram and typography that bring recognition and consistency.",
      key: "Let a monogram do the work where the full name cannot.",
      shots: [
        // STANDBY: brandboard video kept here, hidden for now. Remove `hidden: true` to bring it back
        // (and drop the two 4:5 pieces below so the bento returns to the video layout).
        { hidden: true, video: "/projects/paula-belil/brandboard.mp4", poster: "/projects/paula-belil/monograma-pb.png", caption: "Brandboard" },
        { src: "/projects/paula-belil/paula-pillows.webp", ar: "4/5", caption: "Logo in use, lifestyle photography" },
        { src: "/projects/paula-belil/paula-on-set.webp", ar: "4/5", caption: "Logo in use, on set" },
        { src: "/projects/paula-belil/paula-wordmark-palette.webp", caption: "Serif wordmark and palette" },
        { src: "/projects/paula-belil/paula-camera.webp", caption: "Logo in use, behind the camera" },
      ],
    },
    {
      name: "Arita",
      client: "Freelance · Pilates essentials",
      year: "2026",
      role: "Identity design, logo system, brand guidelines",
      d1: "An identity for Arita, a pilates essentials brand for women whose lifestyle is built around wellness, around feeling good and looking good. The goal was for shopping with Arita to feel like a safe place: premium, sustainable and made for her.",
      d2: "I designed a simple, recognisable logo that holds up across formats. The palette moves through soft rose, cream, chocolate and berry red: subtle tones that guide the eye and mark a path from one touchpoint to the next.",
      out: "A logo with its uses, a basic brand manual and every version needed online and offline.",
      key: "Make every purchase feel like a safe place.",
      shots: [
        { src: "/projects/arita/arita-poster.webp", ar: "4/5", caption: "Brand in use, campaign poster" },
        { src: "/projects/arita/arita-social-grid.webp", ar: "4/5", caption: "Brand in use, social grid" },
        { src: "/projects/arita/arita-logo.webp", caption: "Logo in the brand palette" },
        { src: "/projects/arita/arita-palette.webp", caption: "Brand palette" },
      ],
    },
  ],
};
