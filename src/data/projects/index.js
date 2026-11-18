// src/data/projects/index.js

import eventIdentity from "./event-visual-identity.js";
import brandRefresh from "./brand-identity-refresh.js";
import paidMediaFunnel from "./paid-media-funnel-design.js";
import emailDesign from "./email-communication-design.js";

/**
 * Fixed order, same hierarchy (handoff §2):
 * 1. Student Week — Event Identity
 * 2. Paula Belil + Arita — Brand Identity
 * 3. HVAC Master Launch — Campaign Direction
 * 4. Email System — CRM Design
 *
 * Used by the home grid/list, getStaticPaths(), and Previous/Next on project pages.
 */
export const projects = [eventIdentity, brandRefresh, paidMediaFunnel, emailDesign];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

/**
 * Header photo-burst: 6 portraits of Jesús, shown in this order (first = back of the pile,
 * last = front card). Files in /public/hero/, 4:5.
 */
export const burstImages = [
  { src: "/hero/jd-6.webp", alt: "Jesús Gil" },
  { src: "/hero/jd-5.webp", alt: "Jesús Gil" },
  { src: "/hero/jd-4.webp", alt: "Jesús Gil" },
  { src: "/hero/jd-3.webp", alt: "Jesús Gil" },
  { src: "/hero/jd-2.webp", alt: "Jesús Gil" },
  { src: "/hero/jd-1.webp", alt: "Jesús Gil, portrait" },
];
