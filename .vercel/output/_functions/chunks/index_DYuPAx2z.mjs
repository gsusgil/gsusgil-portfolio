import { e as createComponent, m as maybeRenderHead, r as renderTemplate, g as addAttribute, k as renderComponent, l as renderSlot, o as renderHead, p as renderScript, h as createAstro } from './astro/server_CEEhSdsu.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';

const $$ResumeModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="modal" id="resumeModal" aria-hidden="true"> <div class="modal__overlay" id="resumeOverlay"></div> <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Resume PDF"> <div class="modal__bar"> <strong>Resume</strong> <div class="modal__actions"> <a class="btn" href="/resume/CV_JesusGil_GraphicDesigner.pdf" download style="padding:8px 12px;">
Download
</a> <button class="btn" id="closeResumeButton" type="button" style="padding:8px 12px;">
Close
</button> </div> </div> <div class="modal__body"> <iframe src="/resume/CV_JesusGil_GraphicDesigner.pdf#view=FitH" title="Resume PDF"></iframe> </div> </div> </div>`;
}, "/Users/nopassword/cd project-portfolio/src/components/ResumeModal.astro", void 0);

const themeUrl = "data:text/javascript;base64,LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFRIRU1FIOKAlCBDb250cm9sIGRlIG1vZG8gbm9jdHVybm8gKGRhcmsvbGlnaHQpCiAgIC0gU2luIGZyYW1ld29ya3MKICAgLSBHdWFyZGEgcHJlZmVyZW5jaWEgZW4gbG9jYWxTdG9yYWdlCiAgIC0gUmVzcGV0YSBlbCBzaXN0ZW1hIHNpIGVsIHVzdWFyaW8gbm8gZWxpZ2nDsyBuYWRhCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKZnVuY3Rpb24gaW5pdFRoZW1lQ29udHJvbGxlcigpIHsKICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gInVuZGVmaW5lZCIpIHJldHVybjsKICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAidW5kZWZpbmVkIikgcmV0dXJuOwoKICBjb25zdCBUSEVNRV9TVE9SQUdFX0tFWSA9ICJ0aGVtZSI7CgogIGZ1bmN0aW9uIGdldEN1cnJlbnRUaGVtZSgpIHsKICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCJkYXRhLXRoZW1lIikgfHwgImRhcmsiOwogIH0KCiAgZnVuY3Rpb24gcGVyc2lzdFRoZW1lKHRoZW1lVmFsdWUpIHsKICAgIHRyeSB7CiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFRIRU1FX1NUT1JBR0VfS0VZLCB0aGVtZVZhbHVlKTsKICAgIH0gY2F0Y2gge30KICB9CgogIGZ1bmN0aW9uIGdldFBlcnNpc3RlZFRoZW1lKCkgewogICAgdHJ5IHsKICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFRIRU1FX1NUT1JBR0VfS0VZKTsKICAgIH0gY2F0Y2ggewogICAgICByZXR1cm4gbnVsbDsKICAgIH0KICB9CgogIGZ1bmN0aW9uIHNldFRoZW1lKHRoZW1lVmFsdWUpIHsKICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoImRhdGEtdGhlbWUiLCB0aGVtZVZhbHVlKTsKICAgIHBlcnNpc3RUaGVtZSh0aGVtZVZhbHVlKTsKICAgIHVwZGF0ZVRoZW1lTGFiZWwodGhlbWVWYWx1ZSk7CiAgfQoKICBjb25zdCB0aGVtZVRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ0aGVtZVRvZ2dsZUJ1dHRvbiIpOwogIGNvbnN0IHRoZW1lVG9nZ2xlTGFiZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidGhlbWVUb2dnbGVMYWJlbCIpOwoKICBmdW5jdGlvbiB1cGRhdGVUaGVtZUxhYmVsKHRoZW1lVmFsdWUpIHsKICAgIGlmICghdGhlbWVUb2dnbGVMYWJlbCkgcmV0dXJuOwogICAgdGhlbWVUb2dnbGVMYWJlbC50ZXh0Q29udGVudCA9CiAgICAgIHRoZW1lVmFsdWUgPT09ICJkYXJrIiA/ICJEYXJrIiA6ICJMaWdodCI7CiAgfQoKICB1cGRhdGVUaGVtZUxhYmVsKGdldEN1cnJlbnRUaGVtZSgpKTsKCiAgaWYgKHRoZW1lVG9nZ2xlQnV0dG9uKSB7CiAgICB0aGVtZVRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgY29uc3QgbmV4dFRoZW1lID0KICAgICAgICBnZXRDdXJyZW50VGhlbWUoKSA9PT0gImRhcmsiID8gImxpZ2h0IiA6ICJkYXJrIjsKICAgICAgc2V0VGhlbWUobmV4dFRoZW1lKTsKICAgIH0pOwogIH0KCiAgY29uc3QgaGFzVXNlclByZWZlcmVuY2UgPSBCb29sZWFuKGdldFBlcnNpc3RlZFRoZW1lKCkpOwogIGNvbnN0IHN5c3RlbVRoZW1lTWVkaWFRdWVyeSA9IHdpbmRvdy5tYXRjaE1lZGlhCiAgICA/IHdpbmRvdy5tYXRjaE1lZGlhKCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIikKICAgIDogbnVsbDsKCiAgaWYgKHN5c3RlbVRoZW1lTWVkaWFRdWVyeSAmJiAhaGFzVXNlclByZWZlcmVuY2UpIHsKICAgIHN5c3RlbVRoZW1lTWVkaWFRdWVyeS5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCAoZXZlbnQpID0+IHsKICAgICAgY29uc3Qgc3lzdGVtVGhlbWUgPSBldmVudC5tYXRjaGVzID8gImRhcmsiIDogImxpZ2h0IjsKICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgiZGF0YS10aGVtZSIsIHN5c3RlbVRoZW1lKTsKICAgICAgdXBkYXRlVGhlbWVMYWJlbChzeXN0ZW1UaGVtZSk7CiAgICB9KTsKICB9Cn0KCmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICJ1bmRlZmluZWQiKSB7CiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICJsb2FkaW5nIikgewogICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsIGluaXRUaGVtZUNvbnRyb2xsZXIsIHsgb25jZTogdHJ1ZSB9KTsKICB9IGVsc2UgewogICAgaW5pdFRoZW1lQ29udHJvbGxlcigpOwogIH0KfQ==";

const modalUrl = "data:text/javascript;base64,ZnVuY3Rpb24gaW5pdFJlc3VtZU1vZGFsKCkgewogIGlmICh0eXBlb2Ygd2luZG93ID09PSAidW5kZWZpbmVkIikgcmV0dXJuOwogIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICJ1bmRlZmluZWQiKSByZXR1cm47CgogIGNvbnN0IG1vZGFsUm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyZXN1bWVNb2RhbCIpOwogIGNvbnN0IG9wZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgib3BlblJlc3VtZUJ1dHRvbiIpOwogIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImNsb3NlUmVzdW1lQnV0dG9uIik7CiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyZXN1bWVPdmVybGF5Iik7CgogIGlmICghbW9kYWxSb290IHx8ICFvcGVuQnV0dG9uIHx8ICFjbG9zZUJ1dHRvbiB8fCAhb3ZlcmxheSkgcmV0dXJuOwoKICBsZXQgbGFzdEZvY3VzZWRFbGVtZW50ID0gbnVsbDsKCiAgZnVuY3Rpb24gbG9ja0JvZHlTY3JvbGwoc2hvdWxkTG9jaykgewogICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IHNob3VsZExvY2sgPyAiaGlkZGVuIiA6ICIiOwogIH0KCiAgZnVuY3Rpb24gb3Blbk1vZGFsKCkgewogICAgbGFzdEZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDsKICAgIG1vZGFsUm9vdC5jbGFzc0xpc3QuYWRkKCJpcy1vcGVuIik7CiAgICBtb2RhbFJvb3Quc2V0QXR0cmlidXRlKCJhcmlhLWhpZGRlbiIsICJmYWxzZSIpOwogICAgbG9ja0JvZHlTY3JvbGwodHJ1ZSk7CiAgICBjbG9zZUJ1dHRvbi5mb2N1cygpOwogIH0KCiAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHsKICAgIG1vZGFsUm9vdC5jbGFzc0xpc3QucmVtb3ZlKCJpcy1vcGVuIik7CiAgICBtb2RhbFJvb3Quc2V0QXR0cmlidXRlKCJhcmlhLWhpZGRlbiIsICJ0cnVlIik7CiAgICBsb2NrQm9keVNjcm9sbChmYWxzZSk7CiAgICBpZiAobGFzdEZvY3VzZWRFbGVtZW50Py5mb2N1cykgbGFzdEZvY3VzZWRFbGVtZW50LmZvY3VzKCk7CiAgfQoKICAvLyDwn5SlIElNUE9SVEFOVEU6IGV2aXRhciBkdXBsaWNhZG9zCiAgb3BlbkJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCJjbGljayIsIG9wZW5Nb2RhbCk7CiAgY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBjbG9zZU1vZGFsKTsKICBvdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoImNsaWNrIiwgY2xvc2VNb2RhbCk7CgogIG9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBvcGVuTW9kYWwpOwogIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgY2xvc2VNb2RhbCk7CiAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGNsb3NlTW9kYWwpOwoKICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigia2V5ZG93biIsIChldmVudCkgPT4gewogICAgaWYgKGV2ZW50LmtleSA9PT0gIkVzY2FwZSIgJiYgbW9kYWxSb290LmNsYXNzTGlzdC5jb250YWlucygiaXMtb3BlbiIpKSB7CiAgICAgIGNsb3NlTW9kYWwoKTsKICAgIH0KICB9KTsKfQoKLy8gUHJpbWVyYSBjYXJnYQppZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gImxvYWRpbmciKSB7CiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsIGluaXRSZXN1bWVNb2RhbCk7Cn0gZWxzZSB7CiAgaW5pdFJlc3VtZU1vZGFsKCk7Cn0KCi8vIPCflKUgQ0xBVkUgUEFSQSBBU1RSTwpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJhc3RybzpwYWdlLWxvYWQiLCBpbml0UmVzdW1lTW9kYWwpOwpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJhc3RybzphZnRlci1zd2FwIiwgaW5pdFJlc3VtZU1vZGFsKTs=";

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "Portfolio", description = "Lorem ipsum portfolio." } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-theme="dark"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description"', "><title>", "</title><!-- \u2705 Bootstrap theme instant\xE1neo (antes de pintar) -->", "", "</head> <body> ", " ", ' <!-- \u2705 Scripts globales (NO inline imports, solo URLs bundleadas) --> <script type="module"', '><\/script> <script type="module"', "><\/script> </body> </html>"])), addAttribute(description, "content"), title, renderScript($$result, "/Users/nopassword/cd project-portfolio/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts"), renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "ResumeModal", $$ResumeModal, {}), addAttribute(themeUrl, "src"), addAttribute(modalUrl, "src"));
}, "/Users/nopassword/cd project-portfolio/src/layouts/BaseLayout.astro", void 0);

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="theme-toggle"> <button class="btn" id="themeToggleButton" type="button" aria-label="Toggle theme">
Theme
<span class="small" id="themeToggleLabel">Dark</span> </button> </div>`;
}, "/Users/nopassword/cd project-portfolio/src/components/ThemeToggle.astro", void 0);

// src/data/projects/paid-media-funnel-design.js
const paidMediaFunnel = {
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

// src/data/projects/email-communication-design.js
const emailDesign = {
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
};

// src/data/projects/event-visual-identity.js
const eventIdentity = {
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
};

// src/data/projects/brand-identity-refresh.js
const brandRefresh = {
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
};

// src/data/projects/index.js


/**
 * Lista única para:
 * - getStaticPaths()
 * - "More projects"
 * - getProjectBySlug()
 */
const projects = [
  paidMediaFunnel,
  emailDesign,
  eventIdentity,
  brandRefresh,
];

const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug);

export { $$BaseLayout as $, $$ThemeToggle as a, getProjectBySlug as g, projects as p };
