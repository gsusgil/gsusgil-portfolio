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
 * Header photo-burst (handoff §11): 5 project images, at least one per project, pulled
 * straight from each project's own cover/thumbs — change a project's image here and the
 * burst picks it up too. The 6th card (portrait) is added separately by the script.
 */
export const burstImages = [
  eventIdentity.cover,
  brandRefresh.cover,
  paidMediaFunnel.cover,
  emailDesign.cover,
  eventIdentity.thumbs[1],
];
