const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-nav');
const navigationLinks = document.querySelectorAll('.main-nav a');

const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mainNavigation?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mainNavigation?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

const heroSlider = document.querySelector('[data-hero-slider]');
const heroTrack = heroSlider?.querySelector('[data-hero-slider-track]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let heroIndex = 0;
let heroTimer;

const getHeroDistance = () => {
  const slide = heroTrack?.querySelector('.hero-slide');
  if (!slide || !heroTrack) return 0;

  const gap = Number.parseFloat(getComputedStyle(heroTrack).gap) || 0;
  return slide.getBoundingClientRect().width + gap;
};

const moveHeroSlider = () => {
  if (!heroTrack) return;

  heroIndex += 1;
  heroTrack.style.transition = 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)';
  heroTrack.style.transform = `translateX(${-heroIndex * getHeroDistance()}px)`;

  if (heroIndex === 3) {
    window.setTimeout(() => {
      heroTrack.style.transition = 'none';
      heroIndex = 0;
      heroTrack.style.transform = 'translateX(0)';
    }, 760);
  }
};

const startHeroSlider = () => {
  if (prefersReducedMotion || !heroTrack) return;
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(moveHeroSlider, 3400);
};

const stopHeroSlider = () => {
  window.clearInterval(heroTimer);
};

heroSlider?.addEventListener('mouseenter', stopHeroSlider);
heroSlider?.addEventListener('mouseleave', startHeroSlider);
heroSlider?.addEventListener('focusin', stopHeroSlider);
heroSlider?.addEventListener('focusout', startHeroSlider);

window.addEventListener('resize', () => {
  if (!heroTrack) return;
  heroTrack.style.transition = 'none';
  heroTrack.style.transform = `translateX(${-heroIndex * getHeroDistance()}px)`;
});

startHeroSlider();

const slider = document.querySelector('[data-slider]');
const sliderTrack = slider?.querySelector('[data-slider-track]');
const previousButton = slider?.querySelector('[data-slider-prev]');
const nextButton = slider?.querySelector('[data-slider-next]');

const moveSlider = (direction) => {
  if (!sliderTrack) return;

  const card = sliderTrack.querySelector('.category-card');
  const gap = Number.parseFloat(getComputedStyle(sliderTrack).gap) || 0;
  const distance = (card?.getBoundingClientRect().width || 280) + gap;

  sliderTrack.scrollBy({
    left: direction * distance,
    behavior: 'smooth'
  });
};

previousButton?.addEventListener('click', () => moveSlider(-1));
nextButton?.addEventListener('click', () => moveSlider(1));

document.getElementById('year').textContent = new Date().getFullYear();
