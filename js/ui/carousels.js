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
};

function scrollLogic() {

  console.log('scrollLogic running');

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
};