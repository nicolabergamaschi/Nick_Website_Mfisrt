import { getActiveCarousel } from "../core/dom-utilities.js"

// Shrinks navigation buttons when on CGI Carousel - Showreel in order to allow interaction with Vimeo media player
const carouselCgi = document.getElementById('carouselExampleDarkCgi');
const showReelSlide = document.querySelector('#cg-ShowReel.carousel-item');
const prevBtnCgiContainer = carouselCgi.querySelector('.carousel-button-container-prev');
const nextBtnCgiContainer = carouselCgi.querySelector('.carousel-button-container-next');
const prevBtn = prevBtnCgiContainer.querySelector('.carousel-control-prev');
const nextBtn = nextBtnCgiContainer.querySelector('.carousel-control-next');

// navigation buttons Showreel - Cgi Carousel
export function adjustBtnWidthShowReel() {
  // Guard clause: showReelSlide might not exist if content hasn't loaded yet
  if (!showReelSlide) {
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
  if (!carouselCgi) return;
    // On slide change
  carouselCgi.addEventListener('slid.bs.carousel', adjustBtnWidthShowReel);
  // On page load
  adjustBtnWidthShowReel();
}

const prevBtnMobile = document.getElementById('mobile-prev');
const nextBtnMobile = document.getElementById('mobile-next');
const descriptionTitle = document.getElementById('title');

// navigation buttons for mobile
export function initNavigationBtnMobile() {
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
