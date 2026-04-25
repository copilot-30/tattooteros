const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');

document.documentElement.classList.add('js');

function updateHeaderState() {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 860 && siteNav && menuToggle) {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

requestAnimationFrame(() => {
  document.body.classList.add('loaded');
});

const revealNodes = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  revealNodes.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealNodes.forEach((element) => {
    element.classList.add('in-view');
  });
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const fullGalleryGrid = document.getElementById('full-gallery-grid');

if (fullGalleryGrid) {
  const start = Number(fullGalleryGrid.dataset.start || '1');
  const end = Number(fullGalleryGrid.dataset.end || '109');
  const basePath = fullGalleryGrid.dataset.basePath || 'images/previous%20works';
  const fragment = document.createDocumentFragment();

  for (let i = start; i <= end; i += 1) {
    const img = document.createElement('img');
    img.src = `${basePath}/${i}.jpg`;
    img.alt = `Tattoo artwork ${i}`;
    img.loading = 'lazy';
    img.decoding = 'async';

    img.addEventListener('error', () => {
      img.src = 'images/logo.jpg';
      img.alt = `Tattoo artwork ${i} (image unavailable)`;
      img.classList.add('gallery-fallback');
    });

    fragment.appendChild(img);
  }

  fullGalleryGrid.appendChild(fragment);
}
