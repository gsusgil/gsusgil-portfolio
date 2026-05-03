// src/data/projects/email-communication-design.js

export default {
  slug: "email-communication-design",
  title: "Email Communication Design",
  kicker: "Selected project",
  lede:
    "Newsletter and post-event nurturing designed to sustain engagement across different audience states.",
  preview: "/thumbs/email-thumbnail.png",

  modules: [
    {
  type: "visualHero",
  images: [
    {
      label: "Email system",
      src: "/projects/email-design/banner-mail-system.png",
      alt: "Email communication design preview",
    },
  ],
},
    {
      type: "caseOverview",
      eyebrow: "Email system overview",
      text:
        "A scalable communication system built to maintain engagement across a large contact database while adapting content structure to editorial nurturing and high-intent post-event follow-up.",
      facts: [
        {
          label: "Role",
          value: "Email design · Content hierarchy · Nurturing structure",
        },
        {
          label: "Audience",
          value: "Existing database · Active newsletter segment · Event leads",
        },
        {
          label: "Output",
          value: "Newsletter system · Post-event follow-up email",
        },
      ],
      metrics: [
        {
          value: "65K+",
          label: "Contact database",
        },
        {
          value: "10K+",
          label: "Active segment",
        },
        {
          value: "39.29%",
          label: "Best clickthrough rate",
        },
      ],
    },

    {
      type: "email",
      num: "01",
      label: "Newsletter",
      h2: "Editorial Nurturing",
      p:
        "Sustain long-term engagement through value-driven content while reinforcing academic authority and brand consistency.",
      src: "/projects/email-design/email-1.png",
      alt: "Newsletter email design",
      viewerLabel: "Newsletter preview",
      metrics: [
        { label: "Open Rate", value: "47.36%" },
        { label: "Click Rate", value: "3.72%" },
        { label: "Clickthrough Rate", value: "7.85%" },
      ],
      highlights: [],
      role:
        "Designed a modular editorial layout optimized for scannability and content hierarchy across a high-volume database. Built a repeatable structure adaptable to varying content density while maintaining brand consistency at scale.",
      insight:
        "A high open rate within a large database reflects strong subject-line alignment and established audience trust, reinforced by clear visual prioritization.",
    },

    {
      type: "email",
      num: "02",
      label: "Post-Event Email",
      h2: "Contextual Follow-Up",
      p:
        "Capitalize on event momentum by re-engaging attendees and guiding them toward deeper program exploration.",
      src: "/projects/email-design/email-2.png",
      alt: "Post-event email design",
      viewerLabel: "Post-event preview",
      flip: true,
      metrics: [
        { label: "Open Rate", value: "33.63%" },
        { label: "Click Rate", value: "13.21%" },
        { label: "Clickthrough Rate", value: "39.29%" },
      ],
      highlights: [
        "+19.6pp vs. average open rate",
        "+26.6pp vs. average clickthrough rate",
      ],
      role:
        "Shifted from editorial depth to focused conversion clarity. Structured messaging to quickly re-establish event context and elevate CTA visibility, translating live engagement into sustained interest.",
      insight:
        "Context-aware communication combined with simplified hierarchy significantly outperformed account averages, demonstrating the impact of adaptive email design within nurturing flows.",
    },

    {
      type: "text",
      h2: "Outcome",
      p:
        "A scalable modular system enabled consistent communication across a 65K+ database while adapting to distinct engagement contexts. From long-term editorial nurturing to high-intent event follow-up, structured email design sustained engagement at scale and reinforced lead progression within the broader marketing ecosystem.",
    },
  ],
};