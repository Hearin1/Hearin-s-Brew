function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("mainContent");
  if (!sidebar || !main) return;
  if (window.innerWidth <= 992) {
    sidebar.classList.toggle("mobile-open");
  } else {
    sidebar.classList.toggle("closed");
    main.classList.toggle("expanded");
  }
}

function toggleDropdown(element) {
  document.querySelectorAll(".dropdown-toggle").forEach(dropdown => {
    if (dropdown !== element) dropdown.classList.remove("active-dropdown");
  });
  element.classList.toggle("active-dropdown");
}

document.querySelectorAll(".carousel").forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll("img.slide"));
  if (!slides.length) return;
  let dots = Array.from(carousel.querySelectorAll(".dot"));
  if (dots.length !== slides.length) {
    let wrapper = carousel.querySelector(".dots");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "dots";
      carousel.appendChild(wrapper);
    }
    wrapper.replaceChildren();
    dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Show slide ${index + 1}`);
      wrapper.appendChild(dot);
      return dot;
    });
  }
  let current = 0;
  const show = index => {
    current = index;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  };
  show(0);
  const duration = Number.parseInt(carousel.dataset.interval || "4500", 10);
  let timer;
  const start = () => {
    if (slides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(() => show((current + 1) % slides.length), duration);
    }
  };
  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    window.clearInterval(timer);
    show(index);
    start();
  }));
  start();
});

const animatedTitle = document.getElementById("brew-title");
if (animatedTitle) {
  const titleText = "ꖾꗍꗇⱤꕯꖦ'ꕷ ꕗⱤꗍⱲ";
  const colors = ["#FFA500", "#FFFFFF", "#1E90FF"];
  Array.from(titleText).forEach(character => {
    const span = document.createElement("span");
    span.textContent = character;
    span.style.color = colors[0];
    span.style.transition = "color 2s ease";
    animatedTitle.appendChild(span);
  });
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let color = 0;
    window.setInterval(() => {
      animatedTitle.querySelectorAll("span").forEach((span, i) => {
        window.setTimeout(() => { span.style.color = colors[(color + 1) % colors.length]; }, i * 200);
      });
      color = (color + 1) % colors.length;
    }, 4000);
  }
}
