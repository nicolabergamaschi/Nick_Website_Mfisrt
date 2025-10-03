import { PROJECTCAROUSELS } from "../core/dom-utilities.js"
import { activeImageFromCarousel } from "../core/dom-utilities.js"

const cursorTag = document.querySelector("div.cursors");
const ball = cursorTag.querySelector("div");
const cursorProject = cursorTag.querySelector("span#cursor-text");
const cursorCount = cursorTag.querySelector("span#image-count");
const navBtnsContainers = document.querySelectorAll('.carousel-button-container-prev, .carousel-button-container-next');

export function initCursors() {
  // tracking mouse cursor in order to place image count
  document.addEventListener("mousemove", function (event) {
    ball.style.left = event.pageX + "px";
    ball.style.top = event.pageY + "px";
  });

  PROJECTCAROUSELS.forEach(prjCarousel => {
  // same logic for both mouse hover and clicks
    renderCursorInfo(prjCarousel, "mousemove");
  // same logic for both mouse hover and clicks
    renderCursorInfo(prjCarousel, "click");
  });

  // Clearing the cursor image count while not hovering over nav-buttons
  navBtnsContainers.forEach(button => {
    button.addEventListener('mouseleave', function() {
      cursorProject.innerText = "";
      cursorCount.innerText = "";
    });
  });
}

function renderCursorInfo(prjCarousel, eventToListen) {
  prjCarousel.addEventListener(eventToListen, function () {
      const activeElement = activeImageFromCarousel(prjCarousel);
      if (activeElement) { // Check if activeElement exists
        const elementTag = activeElement.getAttribute('data-hover'); //! element tag
        const arrayElements = document.querySelectorAll(`img[data-hover="${elementTag}"], video[data-hover="${elementTag}"]`);
        const elementsCount = arrayElements.length;
        // Find the index of the active element within the group
        const activeIndex = Array.from(arrayElements).indexOf(activeElement) + 1; // +1 to make it 1-based
        cursorCount.innerHTML = `${activeIndex}/${elementsCount}`; // Update the cursor with the current index and total count
        const tag = activeElement.getAttribute('data-hover');
        if (tag) {
            cursorProject.innerHTML = tag.split('-')[1] || ""; // Update the tag dynamically
        } else {
            cursorProject.innerHTML = ""; // Clear if no tag
        }
      } else {
        cursorCount.innerHTML = ""; // Clear the count if no activeElement is found
        cursorProject.innerHTML = ""; // Clear the tag if no activeElement is found
      }
    });
}
