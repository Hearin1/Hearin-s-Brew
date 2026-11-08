/* Shared, accessible artwork preview across the portfolio. */
(() => {
  const artSelectors = [
    ".brew-art-tile img", ".feature-card img", ".favorite-misc-art img", ".more-art-characters img",
    ".miscSingle img", ".art-fight img", ".artFight img",
    ".gallery img", ".gallery-grid img", ".art-gallery img",
    ".brew-art-gallery img", ".brew-project-card img",
    ".work-card img", ".featured-art img", "#featured-art-image",
    ".portfolio-inner-page main img", "main img", ".home-main img"
  ];
  const images = [...new Set([...document.querySelectorAll(artSelectors.join(","))])]
    .filter(img => !img.closest("header, footer, nav, .star-content, .portfolio-inner-header, .brew-site-footer, .sketch-zoom, .more-art-lightbox")
      && !img.classList.contains("brew-footer-dwarf") && !img.closest("[data-no-zoom]"));
  if (!images.length) return;
  const overlay = document.createElement("div");
  overlay.className = "site-art-lightbox";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Enlarged artwork");
  overlay.innerHTML = '<button class="site-art-lightbox-close" type="button" aria-label="Close enlarged artwork">×</button><img alt="">';
  document.body.appendChild(overlay);
  const large = overlay.querySelector("img");
  const close = overlay.querySelector("button");
  let previousFocus;
  function open(img) {
    if (!img.currentSrc && !img.src) return;
    previousFocus = document.activeElement;
    large.src = img.currentSrc || img.src;
    large.alt = img.alt || "Enlarged artwork";
    overlay.hidden = false;
    document.body.classList.add("site-art-lightbox-open");
    close.focus();
  }
  function dismiss() {
    overlay.hidden = true;
    large.removeAttribute("src");
    document.body.classList.remove("site-art-lightbox-open");
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  }
  images.forEach(img => {
    img.classList.add("site-art-zoomable");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Enlarge " + (img.alt || "artwork"));
    img.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); open(img); });
    img.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); open(img); }
    });
    const link = img.closest("a");
    if (link && /raw\.githubusercontent\.com|\.(?:png|jpe?g|gif|webp)(?:\?|$)/i.test(link.href)) {
      link.removeAttribute("target");
      link.addEventListener("click", e => { e.preventDefault(); open(img); });
    }
  });
  close.addEventListener("click", dismiss);
  overlay.addEventListener("click", e => { if (e.target === overlay) dismiss(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) dismiss(); });
})();
