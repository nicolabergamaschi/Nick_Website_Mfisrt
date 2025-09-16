import { initNavigationBtnShowReel } from "./ui/navigation-buttons.js";
import { initNavigationBtnMobile } from "./ui/navigation-buttons.js";
import { initCategoryMenu } from "./ui/category-menu.js";
import { initCursors } from "./ui/cursors.js";
import { initProjectDescriptions } from "./ui/project-description.js";
import { initMainScrollLogic } from "./ui/carousels.js";
import { initMobileImageCount } from "./ui/mobile-function.js";
import { initHighligthsMenu } from "./ui/highlighted-menu.js";
import { initContentManager } from "./content-manager.js";


// initialise automated content management system (FIRST - populate carousels)
document.addEventListener('DOMContentLoaded', initContentManager);

// Wait for content to be ready before initializing other systems
document.addEventListener('contentManagerReady', () => {
    // initialise Navigation Button ShowReel - CGI Carousel
    initNavigationBtnShowReel();
    // initialise bottom Navigation Buttons on Mobile
    initNavigationBtnMobile();
    // initialise category menu
    initCategoryMenu();
    // initialise cursors and cursor count
    initCursors();
    // initialise project descriptions
    initProjectDescriptions();
    // initialise main scroll logic for carousels
    initMainScrollLogic();
    // initialise image count position for mobile
    initMobileImageCount();
    // initialise highlights on bottom menus
    initHighligthsMenu();
});
