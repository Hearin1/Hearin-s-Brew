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

const featuredArtwork = [
  {src:"assets/Pooh Bear P4.jpg",alt:"Pooh in a fantasy-inspired illustration",name:"Pooh / Fantasy concepts",href:"lorcana-game-mat-concepts.html"},
  {src:"assets/Tigger p2.jpg",alt:"Tigger with a sword in a fantasy illustration",name:"Tigger / Fantasy concepts",href:"lorcana-game-mat-concepts.html"},
  {src:"assets/piglet P2.jpg",alt:"Piglet in a fantasy illustration",name:"Piglet / Fantasy concepts",href:"lorcana-game-mat-concepts.html"},
  {src:"assets/Kanga and roo.jpg",alt:"Kanga and Roo in a fantasy illustration",name:"Kanga & Roo / Fantasy concepts",href:"lorcana-game-mat-concepts.html"},
  {src:"assets/Mickey p2.jpg",alt:"Mickey in a fantasy illustration",name:"Mickey / Fantasy concepts",href:"lorcana-game-mat-concepts.html"},
  {src:"assets/jinx.png",alt:"Jinx Listens, a quiet scene with Jinx",name:"Jinx Listens / More artwork",href:"misc-art.html"},
  {src:"assets/seance.png",alt:"The séance, friends gathered around candles",name:"The séance / More artwork",href:"misc-art.html"}
];
const featuredImage=document.getElementById("featured-art-image");
const featuredLink=document.getElementById("featured-art-link");
const featuredCount=document.querySelector(".art-cycle-count");
if(featuredImage&&featuredLink&&featuredCount){
  let current=0;
  function showArtwork(index){
    current=(index+featuredArtwork.length)%featuredArtwork.length;
    const art=featuredArtwork[current];
    featuredImage.src=art.src;
    featuredImage.alt=art.alt;
    featuredLink.textContent=art.name+" ↗";
    featuredLink.href=art.href;
    featuredCount.textContent=(current+1)+" / "+featuredArtwork.length;
  }
  document.querySelectorAll(".art-cycle-button").forEach(button=>{
    button.addEventListener("click",()=>showArtwork(current+Number(button.dataset.direction)));
  });
  featuredArtwork.slice(1).forEach(art=>{const preload=new Image();preload.src=art.src;});
}
