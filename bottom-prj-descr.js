const projectDescriptions = document.querySelectorAll('div.prj-description div'); // array of all div.description containers

const mainMenu = document.querySelectorAll('li#head-list') // array with all headlist element for the projects menu
const allImages = document.querySelectorAll('.carousel-inner'); // array with all of the divs containing images from carousels

const headList = document.querySelectorAll('ul#sub-list li') // array with all headlist element for the projects menu
const toggleElements = document.querySelectorAll('div.toggle');


function isElementInViewport(element) {
  const area = element.getBoundingClientRect();
  return (
    area.top >= 0 &&
    area.left >= 0 &&
    area.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    area.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function turnDescriptionsOff(locationDescriptions) {
  locationDescriptions.forEach(project => {
    const title = project.querySelector('h4');
    const paragraph = project.querySelector('p');
    title.style.display = 'none'
    paragraph.style.display = 'none'
  });
}
function turnDescriptionsOn(locationDescriptions, carousel) {
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
      turnOnArrows();
    }
  });
}
function openCategoryMenus(elementToOpen) {
  elementToOpen.forEach(element => {
    element.classList.add('open');
  });
}
function closeCategoryMenus(elementToClose) {
  elementToClose.forEach(element => {
    element.classList.remove('open');
  })
}

//! make sure the menus are off when launchin the web-page

window.onload = function() {
  projectDescriptions.forEach(project => {
    const title = project.querySelector('h4.title');
    const paragraph = project.querySelector('p.text-description');
    title.style.display = 'none';
    paragraph.style.display = 'none';
  })
};


//! trigger project descriptions using image click
images.forEach(image => {
  image.addEventListener("click", function () {
    const tagContainer = image.querySelector('div.carousel-dark div.carousel-inner div.active img');
    turnDescriptionsOn(projectDescriptions, image)
  })
})

//! trigger project descriptions using sub-list button prj click
headList.forEach(sublist => {
  sublist.addEventListener('click', function() {
    const linkTagFromClickSublist = sublist.children[0].id;
    projectDescriptions.forEach(project => {

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
    
  })
})

//! changing highlighted project based on scrolling
function changeHighligthedPrjOnScroll(carousel) {
  const activeItem = carousel.querySelector('.carousel-item.active');
  if (activeItem) {
    const activePrjId = activeItem.id;
    updateSublistHighlightFromScroll(activePrjId); // Use the new function
  }
}


//! enable/disable descriptions while scrolling between projects and update it if scrolling to a different category

window.addEventListener('scroll', function() {
  const homeCarousel = document.querySelector('div#page-home'); 
  const aiCarousel = document.querySelector('div#carouselExampleDarkAi div.carousel-inner');
  const cgiCarousel = document.querySelector('div#carouselExampleDarkCgi div.carousel-inner');
  const phtCarousel = document.querySelector('div#carouselExampleDarkPhoto div.carousel-inner');
  const aboutCarousel = document.querySelector('div#page-about');

  if (isElementInViewport(homeCarousel)) {
    /*console.log('Home carousel is in the viewport');*/
    turnDescriptionsOff(projectDescriptions);
    closeCategoryMenus(toggleElements);
    removeImageCount();
    turnOffArrows();
    

  } else if (isElementInViewport(aiCarousel)) {
    /*console.log('Ai carousel is in the viewport')*/
    turnDescriptionsOn(projectDescriptions, aiCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(aiCarousel)
    console.log('AI')

  } else if (isElementInViewport(cgiCarousel)) {
    /*console.log('Cgi carousel is in the viewport')*/
    turnDescriptionsOn(projectDescriptions, cgiCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(cgiCarousel)
    console.log('CGI')

  } else if (isElementInViewport(phtCarousel)) {
    /*console.log('Photo carousel is in the viewport');*/
    turnDescriptionsOn(projectDescriptions, phtCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(phtCarousel)
    console.log('photo')

  } else if (isElementInViewport(aboutCarousel)) {
    /*console.log('About carousel is in the viewport');*/
    turnDescriptionsOff(projectDescriptions);
    closeCategoryMenus(toggleElements);

  } else {
    console.log('Unusual carousel in the viewport!!');
  }
})

document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(max-width: 414px)').matches) {
    const imageCount = document.getElementById('image-count');
    const title = document.getElementById('title');
    if (imageCount && title) {
      // Move image count text to title
      title.textContent += ' ' + imageCount.textContent;
      // Optionally hide the original image count
      imageCount.style.display = 'none';
    }
  }
});

function updateImageCountInTitle() {
  if (!window.matchMedia('(max-width: 414px)').matches) return;
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

function updateMobileImageCount(carousel) {
  if (!window.matchMedia('(max-width: 414px)').matches) return;

  // Remove any previous injected count
  document.querySelectorAll('.mobile-image-count').forEach(el => el.remove());

  // Find all carousel items and the active one
  const items = Array.from(carousel.querySelectorAll('.carousel-item'));
  const activeIndex = items.findIndex(item => item.classList.contains('active'));

  // Find the visible project title
  const visibleTitle = Array.from(document.querySelectorAll('h4.title#title'))
    .find(title => title.style.display !== 'none');

  if (visibleTitle && items.length > 0 && activeIndex !== -1) {
    // --- General carousel count (above title) ---
    const countDiv = document.createElement('div');
    countDiv.className = 'mobile-image-count';
    countDiv.textContent = `${activeIndex + 1} / ${items.length}`;
    countDiv.style.textAlign = 'center';
    countDiv.style.fontWeight = 'bold';
    countDiv.style.marginBottom = '0.5em';
    visibleTitle.parentNode.insertBefore(countDiv, visibleTitle);

    // --- Inline project image count ---
    // Get the project id of the active item
    const activeProjectId = items[activeIndex].id;
    // Get all items with the same project id (i.e., same project)
    const projectItems = items.filter(item => item.id === activeProjectId);
    // Find the index of the active item within its project group
    const projectIndex = projectItems.indexOf(items[activeIndex]);

    // Remove any previous inline count (split at ' | ')
    visibleTitle.textContent = visibleTitle.textContent.split(' | ')[0];
    // Add the count inline
    visibleTitle.textContent += ` | ${projectIndex + 1} / ${projectItems.length}`;
  }
}

function removeImageCount() {
    // Remove any previous injected count
  document.querySelectorAll('.mobile-image-count').forEach(el => el.remove());
}

function turnOffArrows() {
  document.querySelectorAll('.mobile-nav-buttons').forEach(el => el.style.display = 'none');
}

function turnOnArrows() {
  document.querySelectorAll('.mobile-nav-buttons').forEach(el => el.style.display = 'flex');
}