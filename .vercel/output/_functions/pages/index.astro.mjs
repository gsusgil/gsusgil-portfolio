import { e as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderComponent, g as addAttribute } from '../chunks/astro/server_CEEhSdsu.mjs';
import 'piccolore';
import { a as $$ThemeToggle, p as projects, $ as $$BaseLayout } from '../chunks/index_DYuPAx2z.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Intro = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="intro" id="introSection" aria-label="Intro"> <div class="intro__maskLayer" id="introMaskLayer" aria-hidden="true"></div> <div class="small" style="position:absolute; bottom:22px; left:0; right:0; text-align:center;">
Scroll to enter
</div> </section>`;
}, "/Users/nopassword/cd project-portfolio/src/components/Intro.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="hero section" aria-label="Hero"> <div class="container"> <!-- =========================
         Top row (logo + theme)
    ========================== --> <div class="hero__top"> <!-- Logo placeholder centrado --> <div class="hero__brand" aria-label="Brand"> <img class="hero__logo hero__logo--light" src="/logo-gsusgil-red.svg" alt="gsusgil"> <img class="hero__logo hero__logo--dark" src="/logo-gsusgil.svg" alt="gsusgil"> </div> <!-- Theme toggle (derecha arriba) --> <div class="hero__toggle"> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} </div> </div> <!-- =========================
         Content (H1 / H2 / CTAs)
    ========================== --> <div class="hero__content"> <h1>Strategic Brand Systems</h1> <h2>Strong visual foundations for sustainable growth</h2> <div class="hero__ctaRow"> <!-- =========================
             Contact tooltip (no layout jump)
        ========================== --> <div class="contactTip" data-contact> <button class="btn btn--accent" type="button" data-contact-btn>
Contact
</button> <div class="contactTip__panel" role="dialog" aria-label="Contact options"> <div class="contactTip__label">Email</div> <div class="contactTip__row"> <div class="contactTip__email" data-email>hello@yourdomain.com</div> <button class="btn" type="button" data-copy-btn>Copy</button> <!-- Si quieres mailto directo:
              <a class="btn" href="mailto:hello@yourdomain.com">Mail</a>
              --> </div> </div> </div> <!-- =========================
             Resume button (abre modal)
        ========================== --> <button class="btn" type="button" id="openResumeButton">
Resume <span class="small">PDF</span> </button> </div> </div> </div> </section>`;
}, "/Users/nopassword/cd project-portfolio/src/components/Hero.astro", void 0);

const $$ProjectsList = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- =========================================================
  PROJECTS LIST — Lista textual (sin tags / sin fecha)
  - Desktop: hover muestra preview flotante siguiendo el cursor
  - Mobile: no preview (tap va directo al proyecto)
  - Lógica: /src/scripts/preview-follow.js
========================================================= -->${maybeRenderHead()}<section class="section" aria-label="Selected projects"> <div class="container"> <div class="small projects__kicker">Selected projects</div> <div id="projectsList"> ${projects.map((p, i) => renderTemplate`<a class="project-row"${addAttribute(`/projects/${p.slug}`, "href")}${addAttribute(p.preview, "data-preview")}${addAttribute(p.title, "data-title")}> <div class="project-row__num">${String(i + 1).padStart(2, "0")}</div> <div class="project-row__body"> <div class="project-row__title">${p.title}</div> <p class="project-row__excerpt">${p.lede}</p> </div> </a>`)} </div> </div> <div class="preview-float" id="previewFloat" aria-hidden="true"> <img class="preview-float__img" id="previewImage" alt=""> <div class="preview-float__label"> <span id="previewTitle">Project</span> <span>View</span> </div> </div> </section>`;
}, "/Users/nopassword/cd project-portfolio/src/components/ProjectsList.astro", void 0);

const homeUrl = "data:text/javascript;base64,LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIEhPTUUgQ0xJRU5UIEVOVFJZIOKAlCAoVmVyY2VsL0FzdHJvIHNhZmUpCiAgIC0gQXF1w60gU8ONIHB1ZWRlcyBpbXBvcnRhciBsaWJzIChMZW5pcy9HU0FQKSBwb3JxdWUgVml0ZSBidW5kbGVhIGVzdG8uCiAgIC0gTk8gcmVmZXJlbmNpYXIgZXN0byBjb21vICIvc2NyaXB0cy9ob21lLmNsaWVudC5qcyIKICAgICAtPiBTSUVNUFJFIGNhcmdhciBjb24gIj91cmwiIGRlc2RlIEFzdHJvLgo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCmltcG9ydCBMZW5pcyBmcm9tICJAc3R1ZGlvLWZyZWlnaHQvbGVuaXMiOwoKLy8gVHVzIG3Ds2R1bG9zIChzb2xvIGzDs2dpY2EgRE9NKQppbXBvcnQgIi4vaW50cm8tZ3NhcC5qcyI7CmltcG9ydCAiLi9wcmV2aWV3LWZvbGxvdy5qcyI7CmltcG9ydCAiLi9jb250YWN0LmpzIjsKCmZ1bmN0aW9uIGluaXRMZW5pcygpIHsKICBjb25zdCBsZW5pcyA9IG5ldyBMZW5pcyh7CiAgICBzbW9vdGhXaGVlbDogdHJ1ZSwKICAgIHNtb290aFRvdWNoOiBmYWxzZSwKICB9KTsKCiAgZnVuY3Rpb24gcmFmKHRpbWUpIHsKICAgIGxlbmlzLnJhZih0aW1lKTsKICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpOwogIH0KCiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7Cn0KCi8vIERPTSBsaXN0bwppZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gImxvYWRpbmciKSB7CiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsIGluaXRMZW5pcywgeyBvbmNlOiB0cnVlIH0pOwp9IGVsc2UgewogIGluaXRMZW5pcygpOwp9";

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Portfolio", "description": "Lorem ipsum portfolio landing." }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", " ", '  <script type="module"', "><\/script> "])), renderComponent($$result2, "Intro", $$Intro, {}), renderComponent($$result2, "Hero", $$Hero, {}), renderComponent($$result2, "ProjectsList", $$ProjectsList, {}), addAttribute(homeUrl, "src")) })}`;
}, "/Users/nopassword/cd project-portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/nopassword/cd project-portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
