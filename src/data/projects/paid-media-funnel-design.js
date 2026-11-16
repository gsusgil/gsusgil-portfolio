// src/data/projects/paid-media-funnel-design.js
// Content ported verbatim from handoff/gsusgil-portfolio.html (project id: "hvac-master-launch").

const CL = "In‑house · Higher education (AEC)";

export default {
  slug: "paid-media-funnel-design",
  name: "HVAC Master Launch",
  disc: "Campaign Direction",
  year: "", // To be added — handoff §5
  client: CL,
  role: "Visual direction, funnel structure, campaign design",
  bench: false, // set true once the account-average benchmark is available

  idea: "Design that follows intent, from the first scroll to enrolment.",
  key: "One visual language across all three stages. Only hierarchy and depth change with intent.",
  d1: "A paid media system across Instagram and LinkedIn that moves architects and engineers from awareness to enrolment: three funnel stages, 17 carousel slides, one campaign language.",
  d2: "I directed the visual system and shaped each stage around intent: high-impact hierarchy to stop the scroll, academic depth for consideration, then outcomes and a clear call to action for conversion.",
  out: "Qualified leads and the first enrolments within a week of launch.",

  stats: [
    ["230K+", "Impressions"],
    ["1.5K+", "Clicks"],
    ["17", "Slides across 3 stages"],
  ],

  cover: { src: "/home/grid/hvac.webp", alt: "HVAC Master Launch — awareness stage" },
  hero: { src: "/projects/ig-funnel/hero.webp", alt: "HVAC Master Launch — Instagram carousel system" },
  thumbs: [
    { src: "/home/list/hvac-1.webp", alt: "Carousel 1 — market size" },
    { src: "/home/list/hvac-2.webp", alt: "Carousel 2 — what HVAC systems do" },
    { src: "/home/list/hvac-3.webp", alt: "Carousel 3 — the equipment" },
    { src: "/home/list/hvac-4.webp", alt: "Carousel 4 — call to action" },
  ],

  shots: [
    { src: "/projects/ig-funnel/linkedin-mofu.webp", caption: "Consideration · LinkedIn, the master's value up front", ar: "1860/780" },
    { src: "/projects/ig-funnel/story-mofu.webp", caption: "Consideration · Stories, full-screen with a clear call to action", ar: "1080/1920" },
    { src: "/projects/ig-funnel/tofu-market.webp", caption: "Awareness · the market opportunity in one number", ar: "930/780" },
    { src: "/projects/ig-funnel/tofu-systems.webp", caption: "Awareness · what HVAC systems do", ar: "930/780" },
  ],

  creditsNote: "Performance, content and alumni teams",
};
