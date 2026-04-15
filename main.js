function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('mainContent');
    
    // Check if we are on a mobile/tablet screen
    if (window.innerWidth <= 992) {
        // Mobile Logic: Toggle the sliding class
        sidebar.classList.toggle('mobile-open');
        // On mobile, we don't want to shrink the main content, 
        // so we don't necessarily need to toggle 'expanded'
    } else {
        // Desktop Logic: Toggle the closing/expanding classes
        sidebar.classList.toggle('closed');
        main.classList.toggle('expanded');
    }
}
        // Dropdown Toggle Logic
        function toggleDropdown(element) {
            const allDropdowns = document.querySelectorAll('.dropdown-toggle');
            
            // Optional: Close other open dropdowns first (accordion style)
            allDropdowns.forEach(dd => {
                if (dd !== element) {
                    dd.classList.remove('active-dropdown');
                }
            });

            // Toggle the clicked dropdown
            element.classList.toggle('active-dropdown');
        }
    
document.querySelectorAll('.carousel').forEach(car=>{
  const slides = Array.from(car.querySelectorAll('img.slide'));
  const dots = car.querySelectorAll('.dot').length
    ? Array.from(car.querySelectorAll('.dot'))
    : (function(){ const wrap=document.createElement('div'); wrap.className='dots';
        slides.forEach((_,i)=>{ const d=document.createElement('span'); d.className='dot'+(i?'' : ' active'); wrap.appendChild(d); });
        car.appendChild(wrap); return Array.from(wrap.children); })();

  let i = 0;
  const show = n=>{
    slides.forEach((s,idx)=>s.classList.toggle('active', idx===n));
    dots.forEach((d,idx)=>d.classList.toggle('active', idx===n));
    i = n;
  };
  const dur = parseInt(car.getAttribute('data-interval')||4500,10);
  let timer = setInterval(()=>show((i+1)%slides.length), dur);
  dots.forEach((d,idx)=>d.addEventListener('click', ()=>{
    clearInterval(timer); show(idx); timer = setInterval(()=>show((i+1)%slides.length), dur);
  }));
});


(function(){
  const text = "ꖾꗍꗇⱤꕯꖦ'ꕷ ꕗⱤꗍⱲ";
  const title = document.getElementById("brew-title");
  const colors = ["#FFA500", "#FFFFFF", "#1E90FF"];
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    span.style.transition = "color 2s ease";
    span.style.color = colors[0];
    title.appendChild(span);
  }
  let currentColor = 0;
  setInterval(() => {
    const spans = title.querySelectorAll("span");
    for (let i = 0; i < spans.length; i++) {
      setTimeout(() => {
        spans[i].style.color = colors[(currentColor + 1) % colors.length];
      }, i * 200);
    }
    currentColor = (currentColor + 1) % colors.length;
  }, 4000);
})();



document.querySelectorAll('.carousel').forEach(carousel => {
  const slides = carousel.querySelectorAll('.slide');
  const dots = carousel.querySelectorAll('.dot');
  let current = 0;
  const interval = parseInt(carousel.dataset.interval) || 4000;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }

  // Auto slide
  setInterval(() => {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }, interval);

  // Dot click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
});