import { PROJECTDESCRIPTIONS } from "../core/dom-utilities.js"
import { updateMobileImageCount } from "../ui/mobile-function.js"
import { turnOnMobileArrows } from "../ui/mobile-function.js"

const headList = document.querySelectorAll('ul#sub-list li');
const toggleElements = document.querySelectorAll('div.toggle');

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
  locationDescriptions.forEach(project => {
    const title = project.querySelector('h4');
    const paragraph = project.querySelector('p');
    title.style.display = 'none';
    paragraph.style.display = 'none';
    if (project.getAttribute('data-prj') === activeElementCarousel.id) {
      title.style.display = 'block';
      paragraph.style.display = 'block';
      updateMobileImageCount(carousel); // <-- Add this line
      turnOnMobileArrows();
    }
  });
}

export function initProjectDescriptions() {
  //! make sure the descriptions are off when launchin the web-page
  window.onload = function() {
    PROJECTDESCRIPTIONS.forEach(project => {
      const title = project.querySelector('h4.title');
      const paragraph = project.querySelector('p.text-description');
      title.style.display = 'none';
      paragraph.style.display = 'none';
    })
  };

  //! trigger project descriptions using image click
  images.forEach(image => {
    image.addEventListener("click", function () {
      turnDescriptionsOn(PROJECTDESCRIPTIONS, image)
    })
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
        } else {
          console.log('no matching ids')
        }
      });
    });
  });
}  