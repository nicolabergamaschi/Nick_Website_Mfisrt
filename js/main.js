import { initNavigationBtnShowReel } from "./ui/navigation-buttons.js";
import { initNavigationBtnMobile } from "./ui/navigation-buttons.js";
import { initCategoryMenu } from "./ui/category-menu.js";
import { initCursors } from "./ui/cursors.js"; 
import { initProjectDescriptions } from "./ui/project-description.js";
import { initMainScrollLogic } from "./ui/carousels.js";
import { initMobileImageCount } from "./ui/mobile-function.js";
import { initHighligthsMenu } from "./ui/highlighted-menu.js";


// initialise Navigation Button ShowReel - CGI Carousel
document.addEventListener('DOMContentLoaded', initNavigationBtnShowReel);
// initialise bottom Navigation Buttons on Mobile
document.addEventListener('DOMContentLoaded', initNavigationBtnMobile);
// initialise category menu
document.addEventListener('DOMContentLoaded', initCategoryMenu);
// initialise cursors and cursor count
document.addEventListener('DOMContentLoaded', initCursors);
// initialise project descriptions
document.addEventListener('DOMContentLoaded', initProjectDescriptions);
// initialise main scroll logic for carousels
document.addEventListener('DOMContentLoaded', initMainScrollLogic);
// initialise image count position for mobile
document.addEventListener('DOMContentLoaded', initMobileImageCount);
// initialise highlights on bottom menus
document.addEventListener('DOMContentLoaded', initHighligthsMenu);