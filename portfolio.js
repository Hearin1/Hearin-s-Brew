const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }));
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const animatedWordmark = document.querySelector(".animated-wordmark");
if (animatedWordmark) {
  const letters = Array.from(animatedWordmark.textContent);
  animatedWordmark.replaceChildren(...letters.map((character, index) => {
    const span = document.createElement("span");
    span.className = "color-letter";
    span.style.setProperty("--letter-index", index);
    span.textContent = character === " " ? "\u00a0" : character;
    span.setAttribute("aria-hidden", "true");
    return span;
  }));
}
