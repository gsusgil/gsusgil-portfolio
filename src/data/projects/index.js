// src/data/projects/index.js

import paidMediaFunnel from "./paid-media-funnel-design.js";
import emailDesign from "./email-communication-design.js";
import eventIdentity from "./event-visual-identity.js";
import brandRefresh from "./brand-identity-refresh.js";

/**
 * Lista única para:
 * - getStaticPaths()
 * - "More projects"
 * - getProjectBySlug()
 */
export const projects = [
  paidMediaFunnel,
  emailDesign,
  eventIdentity,
  brandRefresh,
];

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug);