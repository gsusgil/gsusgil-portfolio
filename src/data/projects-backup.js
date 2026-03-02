// src/data/projects.js
export const projects = [
  {
    slug: "paid-media-funnel-design",
    title: "Paid Media Funnel Design",
    kicker: "Selected project",
    lede: "Three-stage Instagram carousel funnel: awareness → consideration → conversion.",
    preview: "/thumbs/project-1.jpg",
    modules: [
      {
        type: "text",
        h2: "Overview",
        p: "A paid media funnel built with three Instagram carousels. Two carousels use 5 slides, the closing carousel uses 7 slides.",
      },
      {
  type: "carousel",
  layout: "grid", // ✅ 5 slides sin scroll
  num: "01",
  h2: "Awareness carousel",
  p: "...",
  dir: "/projects/paid-media-funnel/carousel-1",
  count: 5,
},
{
  type: "carousel",
  layout: "grid", // ✅ 5 slides sin scroll
  num: "02",
  h2: "Consideration carousel",
  p: "...",
  dir: "/projects/paid-media-funnel/carousel-2",
  count: 5,
},
{
  type: "carousel",
  layout: "scroll", // ✅ 7 slides con scroll
  num: "03",
  h2: "Conversion carousel",
  p: "...",
  dir: "/projects/paid-media-funnel/carousel-3",
  count: 7,
},
      {
        type: "text",
        h2: "Conclusion",
        p: "A consistent visual system that keeps pace high while maintaining readability and intent.",
      },
    ],
  },

  {
    slug: "email-communication-design",
    title: "Email Communication Design",
    kicker: "Selected project",
    lede: "Two email designs focused on clarity, hierarchy, and conversion.",
    preview: "/thumbs/project-2.jpg",
    modules: [
      {
        type: "text",
        h2: "Overview",
        p: "Two emails designed as a sequence: first builds context, second drives the primary action.",
      },
      {
        type: "image",
        num: "01",
        h2: "Email 01 — Context + value",
        p: "Establishes message hierarchy and sets expectations with clear scanning patterns.",
        src: "/projects/email-design/email-1.jpg",
        alt: "Email design 01",
      },
      {
        type: "image",
        num: "02",
        h2: "Email 02 — Action + CTA",
        p: "Stronger CTA, fewer competing elements, and clearer reading flow.",
        src: "/projects/email-design/email-2.jpg",
        alt: "Email design 02",
      },
      {
        type: "text",
        h2: "Conclusion",
        p: "Consistent layout rules across both emails create a coherent sequence and reduce cognitive load.",
      },
    ],
  },

  {
    slug: "event-visual-identity",
    title: "Event Visual Identity",
    kicker: "Selected project",
    lede: "Event identity system across three years, showing evolution and consistency.",
    preview: "/thumbs/project-3.jpg",
    modules: [
      {
        type: "text",
        h2: "Overview",
        p: "A visual identity that evolves year to year while keeping a recognizable system backbone.",
      },
      {
        type: "image",
        num: "01",
        h2: "Year 1",
        p: "Foundation: core grid, typography, and base palette.",
        src: "/projects/event-identity/year-1.jpg",
        alt: "Event identity year 1",
      },
      {
        type: "image",
        num: "02",
        h2: "Year 2",
        p: "Refinement: improved hierarchy and expanded applications.",
        src: "/projects/event-identity/year-2.jpg",
        alt: "Event identity year 2",
      },
      {
        type: "image",
        num: "03",
        h2: "Year 3",
        p: "Maturity: stronger signature elements and more confident layouts.",
        src: "/projects/event-identity/year-3.jpg",
        alt: "Event identity year 3",
      },
      {
        type: "video",
        h2: "Recap video",
        p: "Video goes here (placeholder for now).",
        poster: "/projects/event-identity/video-placeholder.jpg",
        alt: "Event recap video placeholder",
      },
      {
        type: "text",
        h2: "Conclusion",
        p: "The system balances evolution and recognition — new energy each year, same identity DNA.",
      },
    ],
  },

  {
    slug: "brand-identity-refresh",
    title: "Brand Identity Refresh",
    kicker: "Selected project",
    lede: "A brand refresh summarized through a brandboard/brandbook walkthrough.",
    preview: "/thumbs/project-4.jpg",
    modules: [
      {
        type: "text",
        h2: "Overview",
        p: "A focused refresh: cleaner typography, refined color decisions, and consistent usage rules.",
      },
      {
        type: "video",
        h2: "Brandboard / brandbook walkthrough",
        p: "Video goes here (placeholder for now).",
        poster: "/projects/brand-refresh/video-placeholder.jpg",
        alt: "Brandbook video placeholder",
      },
      {
        type: "text",
        h2: "Conclusion",
        p: "A practical refresh that improves consistency without losing brand familiarity.",
      },
    ],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);