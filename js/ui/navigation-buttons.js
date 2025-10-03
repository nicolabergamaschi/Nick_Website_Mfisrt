import { getActiveCarousel } from "../core/dom-utilities.js"

// navigation buttons Showreel - Cgi Carousel
export function adjustBtnWidthShowReel() {
  // Get DOM elements when function is called, not at module load time
  const carouselCgi = document.getElementById('Cgi');
  const showReelSlide = document.querySelector('#cg-ShowReel.carousel-item');

  // Guard clause: check if elements exist
  if (!carouselCgi || !showReelSlide) {
    return;
  }

  const prevBtnCgiContainer = carouselCgi.querySelector('.carousel-button-container-prev');
  const nextBtnCgiContainer = carouselCgi.querySelector('.carousel-button-container-next');

  if (!prevBtnCgiContainer || !nextBtnCgiContainer) {
    return;
  }

  const prevBtn = prevBtnCgiContainer.querySelector('.carousel-control-prev');
  const nextBtn = nextBtnCgiContainer.querySelector('.carousel-control-next');

  if (!prevBtn || !nextBtn) {
    return;
  }

  if (showReelSlide.classList.contains('active')) {
    prevBtnCgiContainer.style.width = '10%';
    nextBtnCgiContainer.style.width = '10%';
    prevBtnCgiContainer.style.transition = 'width 0.3s';
    nextBtnCgiContainer.style.transition = 'width 0.3s';
    // Shrink the actual buttons and make them less intrusive
    prevBtn.style.width = '10%';
    nextBtn.style.width = '10%';
    prevBtn.style.height = '100%';
    nextBtn.style.height = '100%';
    prevBtn.style.background = 'transparent';
    nextBtn.style.background = 'transparent';
    prevBtn.style.pointerEvents = 'auto';
    nextBtn.style.pointerEvents = 'auto';
  } else {
    prevBtnCgiContainer.style.width = '';
    nextBtnCgiContainer.style.width = '';
    prevBtnCgiContainer.style.transition = '';
    nextBtnCgiContainer.style.transition = '';
    prevBtn.style.width = '';
    nextBtn.style.width = '';
    prevBtn.style.height = '';
    nextBtn.style.height = '';
    prevBtn.style.background = '';
    nextBtn.style.background = '';
    prevBtn.style.pointerEvents = '';
    nextBtn.style.pointerEvents = '';
  }
}

export function initNavigationBtnShowReel() {
  // Get DOM elements when function is called, not at module load time
  const carouselCgi = document.getElementById('Cgi');

  if (!carouselCgi) return;

  // On slide change
  carouselCgi.addEventListener('slid.bs.carousel', adjustBtnWidthShowReel);
  // On page load
  adjustBtnWidthShowReel();
}

// navigation buttons for mobile
export function initNavigationBtnMobile() {
  // Get DOM elements when function is called, not at module load time
  const prevBtnMobile = document.getElementById('mobile-prev');
  const nextBtnMobile = document.getElementById('mobile-next');

  if (!prevBtnMobile || !nextBtnMobile) {
    return; // Elements don't exist yet
  }

  if (window.matchMedia('(max-width: 768px)').matches) {

    prevBtnMobile.addEventListener('click', function () {
      const carousel = getActiveCarousel();
      if (!carousel) return;
      const prev = carousel.querySelector('.carousel-control-prev');
      if (prev) prev.click();
      setTimeout(updateImageCountInTitle, 350); // Wait for carousel to update
    });

    nextBtnMobile.addEventListener('click', function () {
      const carousel = getActiveCarousel();
      if (!carousel) return;
      const next = carousel.querySelector('.carousel-control-next');
      if (next) next.click();
      setTimeout(updateImageCountInTitle, 350); // Wait for carousel to update
    });
  }
};

function updateImageCountInTitle() {
  if (!window.matchMedia('(max-width: 768px)').matches) return;
  const imageCount = document.getElementById('image-count');
  // Find the currently visible project title
  const visibleTitle = Array.from(document.querySelectorAll('h4.title#title'))
    .find(title => title.style.display !== 'none');
  if (imageCount && visibleTitle) {
    // Remove any previous count (simple approach: split at ' | ')
    visibleTitle.textContent = visibleTitle.textContent.split(' | ')[0] + ' | ' + imageCount.textContent;
    imageCount.style.display = 'none';
  }
}
