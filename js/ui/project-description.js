import { PROJECTDESCRIPTIONS } from "../core/dom-utilities.js";
import { updateMobileImageCount } from "../ui/mobile-function.js";
import { turnOnMobileArrows } from "../ui/mobile-function.js";

const headList = document.querySelectorAll('ul#sub-list li');
const allImages = document.querySelectorAll('.carousel-inner');

export function turnDescriptionsOff(locationDescriptions) {
  locationDescriptions.forEach(project => {
    const title = project.querySelector('h4');
    const paragraph = project.querySelector('p');
    title.style.display = 'none'
    paragraph.style.display = 'none'
  });
}
export function turnDescriptionsOn(locationDescriptions, carousel) {
  const activeElementCarousel = carousel.querySelector('.active');
  if (!activeElementCarousel) return;

  // Get all project description elements inside the container(s)
  locationDescriptions.forEach(container => {
    const projectDivs = container.querySelectorAll('div[data-prj]');
    projectDivs.forEach(project => {
      const title = project.querySelector('h4');
      const paragraph = project.querySelector('p');
      title.style.display = 'none';
      paragraph.style.display = 'none';

      if (project.getAttribute('data-prj') === activeElementCarousel.id) {
        title.style.display = 'block';
        paragraph.style.display = 'block';

        // Check if the active image has references and update title accordingly
        updateTitleWithReferenceButton(title, activeElementCarousel);

        updateMobileImageCount(carousel);
        turnOnMobileArrows();
      }
    });
  });
}

/**
 * Updates the title with or without reference button based on active image's hasRef property
 * @param {HTMLElement} titleElement - The title element to update
 * @param {HTMLElement} activeCarouselItem - The active carousel item
 */
function updateTitleWithReferenceButton(titleElement, activeCarouselItem) {
  // Get the active image and check if it has references
  const activeImage = activeCarouselItem.querySelector('img, video');
  const hasRef = activeImage && activeImage.getAttribute('data-has-ref') === 'true';

  // Store the original title if not already stored
  if (!titleElement.dataset.originalTitle) {
    // Get the text content, excluding any existing buttons
    const titleText = titleElement.textContent.replace(/\s*-\s*$/, '').trim();
    titleElement.dataset.originalTitle = titleText;
  }

  const originalTitle = titleElement.dataset.originalTitle;

  // Clear existing content
  titleElement.innerHTML = '';

  if (hasRef) {
    // Add the title text and reference button
    const referenceButton = document.createElement('button');
    referenceButton.id = 'references';
    referenceButton.textContent = 'references';
    referenceButton.style.cssText = 'border: 0px solid rgb(196, 196, 196); box-shadow: 3px 5px 5px rgb(181, 181, 181); margin-bottom: 1rem; padding: 0.2rem 1rem; border-radius: 25px; background-color: rgb(220, 220, 220); color: rgb(147, 147, 147); font-family: "DM Sans", sans-serif; font-size: 0.9rem; font-weight: 400; cursor: pointer; transition: all 0.2s ease;';

    // Add event listener for the reference button
    referenceButton.addEventListener('click', function() {
      // TODO: Implement reference image display logic for this specific image
      console.log(`Reference button clicked for image: ${activeImage.src}`);
    });

    titleElement.innerHTML = `${originalTitle} - `;
    titleElement.appendChild(referenceButton);
  } else {
    // Just show the original title without button
    titleElement.textContent = originalTitle;
  }
}export function initProjectDescriptions() {
  //! make sure the descriptions are off when launchin the web-page
  window.onload = function() {
    PROJECTDESCRIPTIONS.forEach(project => {
      const title = project.querySelector('h4.title');
      const paragraph = project.querySelector('p.text-description');
      title.style.display = 'none';
      paragraph.style.display = 'none';
    })
  };

  // Update descriptions when carousel slides (navigation buttons, swipe, etc.)
  document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('slid.bs.carousel', function () {
      const carouselInner = carousel.querySelector('.carousel-inner');
      turnDescriptionsOn(PROJECTDESCRIPTIONS, carouselInner);
    });
  });

  //! trigger project descriptions using sub-list button prj click
  headList.forEach(sublist => {
    sublist.addEventListener('click', function() {
      const linkTagFromClickSublist = sublist.children[0].id;

      PROJECTDESCRIPTIONS.forEach(project => {
        const title = project.querySelector('h4');
        const paragraph = project.querySelector('p');
        title.style.display = 'none';
        paragraph.style.display = 'none';

        if (project.getAttribute('data-prj') === linkTagFromClickSublist) {
          title.style.display = 'block';
          paragraph.style.display = 'block';

          // Find the corresponding active carousel item to check for hasRef
          const carousels = document.querySelectorAll('.carousel-inner');
          carousels.forEach(carousel => {
            const activeElement = carousel.querySelector('.active');
            if (activeElement && activeElement.id === linkTagFromClickSublist) {
              updateTitleWithReferenceButton(title, activeElement);
            }
          });
        }
      });
    });
  });
}
