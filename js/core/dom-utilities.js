// const containing an Array of project carousels (no-home carousel)
export const PROJECTCAROUSELS = document.querySelectorAll("div#carouselExampleDarkAi, div#carouselExampleDarkCgi, div#carouselExampleDarkPhoto");
export const PROJECTDESCRIPTIONS = document.querySelectorAll('div.prj-description');
export const TOGGLEELEMENTS = document.querySelectorAll('div.toggle');
// Helper: get the visible carousel
export function getActiveCarousel() {
  // All carousels
  const carousels = [
    document.getElementById('carouselExampleDarkAi'),
    document.getElementById('carouselExampleDarkCgi'),
    document.getElementById('carouselExampleDarkPhoto')
  ];
  // Find the one in viewport (or visible)
  for (const carousel of carousels) {
    if (!carousel) continue;
    const rect = carousel.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      return carousel;
    }
  }
  return null;
};
// Helper: turn off multiple elements given an array (querySelectorAll)
export function turnOffmultiple(elements) {
  elements.forEach((el) => {
    el.style.display = 'none';
  });
};
// Helper: selects the active image given a project carousel
export function activeImageFromCarousel(carousel) {
  return carousel.querySelector('.carousel-item.active img');
};
// Helper: returns true if argument element is in viewport
export function isElementInViewport(element) {
  const area = element.getBoundingClientRect();
  return (
    area.top >= 0 &&
    area.left >= 0 &&
    area.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    area.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
