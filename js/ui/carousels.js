import { PROJECTDESCRIPTIONS } from "../core/dom-utilities.js";
import { TOGGLEELEMENTS } from "../core/dom-utilities.js"
import { isElementInViewport } from "../core/dom-utilities.js"
import { turnDescriptionsOff } from "./project-description.js";
import { turnDescriptionsOn } from "./project-description.js";
import { closeCategoryMenus } from "../ui/category-menu.js"
import { removeImageCount } from "./mobile-function.js";
import { turnOffMobileArrows } from "../ui/mobile-function.js"
import { openCategoryMenus } from "../ui/category-menu.js"
import { changeHighligthedPrjOnScroll } from "../ui/highlighted-menu.js"
import { visualiseReferences } from "./references.js";

export function initMainScrollLogic() {
window.addEventListener('scroll', scrollLogic);

// Add responsive video handling for window resize
initVideoResponsiveness();

// Add ShowReel detection for button positioning
initShowReelDetection();
};

function scrollLogic() {

  const homeCarousel = document.querySelector('div#page-home');
  const aiCarousel = document.querySelector('div#carouselExampleDarkAi div.carousel-inner');
  const cgiCarousel = document.querySelector('div#carouselExampleDarkCgi div.carousel-inner');
  const phtCarousel = document.querySelector('div#carouselExampleDarkPhoto div.carousel-inner');
  const aboutCarousel = document.querySelector('div#page-about');

  if (homeCarousel && isElementInViewport(homeCarousel)) {
    /*console.log('Home carousel is in the viewport');*/
    turnDescriptionsOff(PROJECTDESCRIPTIONS);
    closeCategoryMenus(TOGGLEELEMENTS);
    removeImageCount();
    turnOffMobileArrows();

  } else if (aiCarousel && isElementInViewport(aiCarousel)) {
    /*console.log('Ai carousel is in the viewport')*/
    turnDescriptionsOn(PROJECTDESCRIPTIONS, aiCarousel)
    openCategoryMenus(TOGGLEELEMENTS)
    changeHighligthedPrjOnScroll(aiCarousel)
    // console.log('AI')
    visualiseReferences(aiCarousel)

  } else if (cgiCarousel && isElementInViewport(cgiCarousel)) {
    /*console.log('Cgi carousel is in the viewport')*/
    turnDescriptionsOn(PROJECTDESCRIPTIONS, cgiCarousel)
    openCategoryMenus(TOGGLEELEMENTS)
    changeHighligthedPrjOnScroll(cgiCarousel)
    // console.log('CGI')

  } else if (phtCarousel && isElementInViewport(phtCarousel)) {
    /*console.log('Photo carousel is in the viewport');*/
    turnDescriptionsOn(PROJECTDESCRIPTIONS, phtCarousel)
    openCategoryMenus(TOGGLEELEMENTS)
    changeHighligthedPrjOnScroll(phtCarousel)
    // console.log('photo')

  } else if (aboutCarousel && isElementInViewport(aboutCarousel)) {
    /*console.log('About carousel is in the viewport');*/
    turnDescriptionsOff(PROJECTDESCRIPTIONS);
    closeCategoryMenus(TOGGLEELEMENTS);

  } else {
    // console.log('Unusual carousel in the viewport!!');
  }
}

/**
 * Initialize video responsiveness for window resize events
 */
function initVideoResponsiveness() {
  // Handle window resize for video responsiveness
  window.addEventListener('resize', handleVideoResize);

  // Initial setup
  handleVideoResize();
}

/**
 * Handle video sizing on window resize
 */
function handleVideoResize() {
  const video = document.getElementById('cg-video');
  if (!video) return;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Responsive sizing based on window dimensions
  if (windowWidth <= 768) {
    // Mobile
    video.style.maxHeight = '50vh';
    video.style.width = '100%';
  } else if (windowWidth <= 1024) {
    // Tablet
    video.style.maxHeight = '60vh';
    video.style.width = '100%';
  } else if (windowWidth <= 1920) {
    // Desktop
    video.style.maxHeight = '70vh';
    video.style.width = '90%';
  } else {
    // Large desktop
    video.style.maxHeight = '75vh';
    video.style.width = '85%';
  }

  // Ensure video maintains aspect ratio
  video.style.height = 'auto';
  video.style.objectFit = 'contain';
  video.style.margin = '0 auto';
  video.style.display = 'block';
}

/**
 * Initialize ShowReel detection for button positioning
 */
function initShowReelDetection() {
  // Listen for carousel slide changes
  const cgiCarousel = document.getElementById('carouselExampleDarkCgi');
  if (cgiCarousel) {
    // Listen for Bootstrap carousel slide events
    cgiCarousel.addEventListener('slid.bs.carousel', handleShowReelDetection);
    cgiCarousel.addEventListener('slide.bs.carousel', handleShowReelDetection);

    // Check on initial load
    setTimeout(() => {
      handleShowReelDetection();
    }, 500);
  }
}

/**
 * Detect if ShowReel video is active and adjust button positioning
 */
function handleShowReelDetection() {
  const cgiCarousel = document.getElementById('carouselExampleDarkCgi');
  const activeItem = cgiCarousel?.querySelector('.carousel-item.active');
  const video = activeItem?.querySelector('video');

  const prevContainer = cgiCarousel?.querySelector('.carousel-button-container-prev');
  const nextContainer = cgiCarousel?.querySelector('.carousel-button-container-next');

  if (video && prevContainer && nextContainer) {
    // ShowReel is active - move buttons away from center
    prevContainer.classList.add('video-active-positioning');
    nextContainer.classList.add('video-active-positioning');
  } else {
    // No video active - restore normal positioning
    if (prevContainer) prevContainer.classList.remove('video-active-positioning');
    if (nextContainer) nextContainer.classList.remove('video-active-positioning');
  }
}
