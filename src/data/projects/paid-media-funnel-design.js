// src/data/projects/paid-media-funnel-design.js

export default {
  slug: "paid-media-funnel-design",
  title: "Paid Media Funnel Design",
  kicker: "Selected project",
  lede:
    "A three-stage Instagram carousel funnel designed to move architects and engineers from awareness to qualified conversion.",
  preview: "/thumbs/preview-project-1.png",

  modules: [
    {
      type: "visualHero",
      images: [
        {
          label: "TOFU",
          src: "/projects/ig-funnel/carousel-1/01.jpg",
          alt: "TOFU carousel preview",
        },
        {
          label: "MOFU",
          src: "/projects/ig-funnel/carousel-2/01.jpg",
          alt: "MOFU carousel preview",
        },
        {
          label: "BOFU",
          src: "/projects/ig-funnel/carousel-3/01.jpg",
          alt: "BOFU carousel preview",
        },
      ],
    },

    {
      type: "caseOverview",
      eyebrow: "Funnel overview",
      text:
        "HVAC Master Launch — a paid media visual system built to guide prospects through awareness, consideration and conversion with a coherent campaign language.",
      facts: [
        {
          label: "Role",
          value: "Visual direction · Funnel structure · Campaign design",
        },
        {
          label: "Audience",
          value: "Architects & Engineers",
        },
        {
          label: "Output",
          value: "3 Instagram carousel stages · 17 total slides",
        },
      ],
      metrics: [
        {
          value: "235K+",
          label: "Impressions",
        },
        {
          value: "1,519",
          label: "Clicks",
        },
        {
          value: "3",
          label: "Enrollments first week",
        },
      ],
    },

    {
      type: "carousel",
      layout: "scroll",
      num: "01",
      stage: "TOFU — Awareness",
      metrics: {
        impressions: "78,951",
        clicks: "827",
        ctr: "1.05%",
      },
      did:
        "Built the entry point of the funnel with high-impact hierarchy, technical context and clear value framing to stop scroll and establish industry relevance.",
      dir: "/projects/ig-funnel/carousel-1",
      count: 5,
    },

    {
      type: "carousel",
      layout: "scroll",
      num: "02",
      stage: "MOFU — Consideration",
      metrics: {
        impressions: "110,709",
        clicks: "405",
        ctr: "0.74%",
      },
      did:
        "Expanded content depth and academic credibility, moving users from industry awareness into program positioning without breaking the visual system.",
      dir: "/projects/ig-funnel/carousel-2",
      count: 5,
    },

    {
      type: "carousel",
      layout: "scroll",
      num: "03",
      stage: "BOFU — Conversion",
      metrics: {
        impressions: "45,915",
        clicks: "287",
        ctr: "0.63%",
      },
      did:
        "Shifted the narrative toward outcomes, institutional trust and decision-making, strengthening CTA visibility for high-intent prospects.",
      dir: "/projects/ig-funnel/carousel-3",
      count: 7,
    },

    {
      type: "text",
      h2: "Outcome",
      p:
        "The final system aligned visual design with funnel psychology, maintaining consistency from awareness to conversion while adapting each stage to user intent. The campaign generated qualified leads and secured three enrollments within the first week of launch.",
    },
  ],
};