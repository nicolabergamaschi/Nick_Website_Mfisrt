// Reference image overlay logic - updated for new naming convention
const referenceImages = {
  // ai-Vogue project references (new indices after migration)
  'ai-Vogue_2': [
    './resources/images/references/ref_ai-Vogue_2_1.png',
    './resources/images/references/ref_ai-Vogue_2_2.png'
  ],
  'ai-Vogue_3': [
    './resources/images/references/ref_ai-Vogue_3_1.png',
    './resources/images/references/ref_ai-Vogue_3_2.png'
  ],

  // Add more reference mappings as needed
  // Example: 'project-name_data-index': ['ref1.png', 'ref2.png']
};

function getCurrentImageKey() {
  const activeImg = document.querySelector('.carousel-item.ai.active img');
  if (!activeImg) return null;
  return `${activeImg.id}_${activeImg.getAttribute('data-index')}`;
}

function showReferenceOverlay() {
  const blurringLayer = document.getElementById('blurringLayer');
  const mainContainer = document.querySelector('.main-container');
  const activeImg = document.querySelector('.carousel-item.ai.active img');

  if (!blurringLayer || !mainContainer || !activeImg) return;

  // Toggle overlay and blur
  const oldContainer = document.getElementById('reference-flex-container');
  const isActive = blurringLayer.classList.contains('active');
  if (isActive) {
    blurringLayer.classList.remove('active');
    blurringLayer.style.filter = '';
    if (oldContainer) oldContainer.remove();
    return;
  }
  if (oldContainer) oldContainer.remove();

  const key = getCurrentImageKey();
  const refs = referenceImages[key] || [];
  if (refs.length > 0) {
    // Apply blur to the background first
    blurringLayer.classList.add('active');
    blurringLayer.style.filter = 'blur(8px)';

    // Get active image position and dimensions to center reference images on it
    const imageRect = activeImg.getBoundingClientRect();

    // Create flex container with delay and animation
    setTimeout(() => {
      const flexContainer = document.createElement('div');
      flexContainer.id = 'reference-flex-container';
      flexContainer.style.display = 'flex';
      flexContainer.style.justifyContent = 'center';
      flexContainer.style.alignItems = 'center';
      flexContainer.style.gap = '2vw';
      flexContainer.style.position = 'fixed';
      flexContainer.style.top = imageRect.top + 'px';
      flexContainer.style.left = imageRect.left + 'px';
      flexContainer.style.width = imageRect.width + 'px';
      flexContainer.style.height = imageRect.height + 'px';
      flexContainer.style.zIndex = '9999';
      flexContainer.style.pointerEvents = 'none';
      flexContainer.style.opacity = '0';
      flexContainer.style.transform = 'scale(0.8)';
      flexContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

      refs.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'reference-overlay-img';
        img.style.maxWidth = '40%';
        img.style.maxHeight = '80%';
        img.style.objectFit = 'contain';
        img.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
        flexContainer.appendChild(img);
      });

      // Append to main container
      mainContainer.appendChild(flexContainer);

      // Trigger animation after a brief delay
      setTimeout(() => {
        flexContainer.style.opacity = '1';
        flexContainer.style.transform = 'scale(1)';
      }, 50);
    }, 300); // 300ms delay after blur starts
  }
}

// Check if current active image has references available and show/hide button accordingly
function toggleReferenceButton() {
  const activeImg = document.querySelector('.carousel-item.ai.active img');
  const referenceButton = document.getElementById('references');

  if (!activeImg || !referenceButton) return;

  // Get the key for the current image
  const key = getCurrentImageKey();

  // Check if references exist for this image in the referenceImages object
  if (referenceImages[key] && referenceImages[key].length > 0) {
    referenceButton.style.display = 'inline-block';
  } else {
    referenceButton.style.display = 'none';
  }
}

// Only declare referencesButton once and attach event if not already
let referencesButton = document.getElementById('references');
if (referencesButton) {
  referencesButton.addEventListener('click', showReferenceOverlay);
}

// Initialize button visibility on page load
document.addEventListener('DOMContentLoaded', toggleReferenceButton);

// Listen for carousel slide events to update button visibility
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carouselExampleDarkAi');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', toggleReferenceButton);
  }
});

// Deactivate blurring overlay and remove reference overlays on scroll
window.addEventListener('wheel', () => {
  const blurringLayer = document.getElementById('blurringLayer');
  if (blurringLayer) {
    blurringLayer.classList.remove('active');
    blurringLayer.style.filter = '';
    const oldContainer = document.getElementById('reference-flex-container');
    if (oldContainer) oldContainer.remove();
  }
});
//! visualise references logic ---- TO BE TRIGGERED BY CLICKS ON NAV ARROWS RATHER THAN PAGE SCROLL -- as page scroll triggers functions just when scrolled and it is usefull in order to understand the active carousel but for active element/image we will need to eventListener for clicks of nav buttons

export function visualiseReferences(carousel) {
  // I should divide it in 4 steps
  // 1. select active CAROUSEL
  // 2. select img through active DIV
  // 3. add reference button to active image descriptions
  // 4. when clicking visualise overlay ref images on screen preferably using 'div.carousel-inner'

  // Guard clause: check if carousel has content
  const carouselInner = carousel.querySelector('.carousel-inner');
  if (!carouselInner || !carouselInner.children || carouselInner.children.length === 0) {
    // Carousel is empty (automation system hasn't loaded content yet)
    return;
  }

  const activeItem = carousel.querySelector('.active');
  if (!activeItem || !activeItem.children[0]) {
    // No active item found
    return;
  }

  const activeImage = activeItem.children[0];
  //console.log(activeImage)
  if (activeImage.className.includes('ref')) {
    //console.log('this image has a reference attribute.')
  } else {
    //console.log('This image has no ref attribute')
  }
}


//! -------------------- WIP ------------------------------
// ...existing code...
// ...existing code...
