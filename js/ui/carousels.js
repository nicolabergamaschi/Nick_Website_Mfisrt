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
window.addEventListener('scroll', scrollLogic());
};

function scrollLogic() {
  const homeCarousel = document.querySelector('div#page-home'); 
  const aiCarousel = document.querySelector('div#carouselExampleDarkAi div.carousel-inner');
  const cgiCarousel = document.querySelector('div#carouselExampleDarkCgi div.carousel-inner');
  const phtCarousel = document.querySelector('div#carouselExampleDarkPhoto div.carousel-inner');
  const aboutCarousel = document.querySelector('div#page-about');

  if (isElementInViewport(homeCarousel)) {
    /*console.log('Home carousel is in the viewport');*/
    turnDescriptionsOff(PROJECTDESCRIPTIONS);
    closeCategoryMenus(toggleElements);
    removeImageCount();
    turnOffMobileArrows();

  } else if (isElementInViewport(aiCarousel)) {
    /*console.log('Ai carousel is in the viewport')*/
    turnDescriptionsOn(PROJECTDESCRIPTIONS, aiCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(aiCarousel)
    // console.log('AI')
    visualiseReferences(aiCarousel)

  } else if (isElementInViewport(cgiCarousel)) {
    /*console.log('Cgi carousel is in the viewport')*/
    turnDescriptionsOn(PROJECTDESCRIPTIONS, cgiCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(cgiCarousel)
    // console.log('CGI')

  } else if (isElementInViewport(phtCarousel)) {
    /*console.log('Photo carousel is in the viewport');*/
    turnDescriptionsOn(PROJECTDESCRIPTIONS, phtCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(phtCarousel)
    // console.log('photo')

  } else if (isElementInViewport(aboutCarousel)) {
    /*console.log('About carousel is in the viewport');*/
    turnDescriptionsOff(PROJECTDESCRIPTIONS);
    closeCategoryMenus(toggleElements);

  } else {
    // console.log('Unusual carousel in the viewport!!');
  }
};