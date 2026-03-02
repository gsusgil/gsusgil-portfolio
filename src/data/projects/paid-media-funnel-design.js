// src/data/projects/paid-media-funnel-design.js
export default {
  slug: "paid-media-funnel-design",
  title: "Paid Media Funnel Design",
  kicker: "Selected project",
  lede: "Three-stage Instagram carousel funnel: awareness → consideration → conversion.",
  preview: "/thumbs/project-1.jpg",

modules: [
  {
    type: "intro",
    title: "HVAC Master Launch",
    sections: [
      {
        label: "Objective",
        text: "Attract qualified leads and guide them through a structured funnel, progressively increasing intent so prospects reach advisors informed and conversion-ready.",
      },
      { label: "Audience", text: "Architects & Engineers" },
      { label: "Product", text: "Specialized Master’s Degree in HVAC Systems" },
    ],
    scope:
      "Led the visual direction across all funnel stages, translating performance strategy into structured creative systems. Adapted hierarchy, messaging density, and visual emphasis per stage (TOFU, MOFU, BOFU) while maintaining brand coherence and narrative continuity throughout the campaign.",
  },

  {
    type: "carousel",
    layout: "grid",
    num: "01",
    stage: "TOFU — Awareness",
    metrics: { impressions: "78,951", clicks: "827", ctr: "1.05%" },
    did:
      "Established the funnel’s visual entry point through high-impact hierarchy and data-led messaging designed to stop scroll and frame industry relevance. Built a recognisable foundation to ensure consistency across later stages.",
    dir: "/projects/ig-funnel/carousel-1",
    count: 5,
  },

  // ✅ MOFU (carousel 2)
{
  type: "carousel",
  layout: "grid",
  num: "02",
  stage: "MOFU — Consideration",
  metrics: { impressions: "110,709", clicks: "405", ctr: "0.74%" },
  did: "Expanded content depth and academic authority while preserving brand continuity. Structured carousel progression to transition from industry awareness to program positioning without breaking engagement flow.",
  dir: "/projects/ig-funnel/carousel-2",
  count: 5,
},

 // ✅ BOFU (carousel 3)
{
  type: "carousel",
  layout: "scroll",
  num: "03",
  stage: "BOFU — Conversion",
  metrics: { impressions: "45,915", clicks: "287", ctr: "0.63%" },
  did: "Refocused the narrative toward aspirational outcomes and institutional credibility. Refined hierarchy and strengthened call-to-action prominence to support high-intent decision-making.",
  dir: "/projects/ig-funnel/carousel-3",
  count: 7,
},


  // ✅ CONCLUSION
{
  type: "text",
  h2: "Conclusion",
  p: "A structured visual progression aligned with funnel psychology maintained engagement from awareness to conversion. The campaign generated qualified leads and secured three enrollments within the first week of launch, validating the impact of a coherent creative system tailored to audience intent.",
},
],
};