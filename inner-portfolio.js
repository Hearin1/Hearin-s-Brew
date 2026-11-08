document.addEventListener("DOMContentLoaded",()=>{const toggle=document.querySelector(".portfolio-inner-toggle");const nav=document.querySelector(".portfolio-inner-nav");if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});nav.querySelectorAll("a").forEach(link=>{const destination=link.getAttribute("href");if(destination===location.pathname.split("/").pop())link.setAttribute("aria-current","page");link.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")})})}});

/* Reuse the homepage's magical stars across the interior pages. */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main#mainContent .star-section");
  const targets = sections.length ? Array.from(sections) : [document.querySelector("main#mainContent")].filter(Boolean);
  targets.forEach(target => {
    if (target.querySelector(":scope > .inner-magic-sparkles")) return;
    target.classList.add("inner-magic-field");
    const stars = document.createElement("div");
    stars.className = "inner-magic-sparkles";
    stars.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 7; i++) {
      const star = document.createElement("span");
      star.textContent = i % 2 ? "✧" : "✦";
      stars.appendChild(star);
    }
    target.prepend(stars);
  });
});
