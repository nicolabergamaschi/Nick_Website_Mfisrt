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

  'cg-DMP_2': [
    './resources/images/references/ref_cg-DMP_2_1.png'

  ],

  // Add more reference mappings as needed
  // Example: 'project-name_data-index': ['ref1.png', 'ref2.png']
};

// Position constants for each category based on vertical carousel layout
const CATEGORY_POSITIONS = {
  'ai': { top: '15vh' },      // AI section - top third
  'cg': { top: '12vh' },         // CGI section - middle third
  'ph': { top: '70vh' }       // PHOTO section - bottom third
};

// COMMENTED OUT - This function was causing issues by detecting wrong active image
// function getCurrentImageKey() {
//   // Find the active image from any carousel
//   const activeImg = document.querySelector('.carousel-item.active img');

//   if (!activeImg) {
//     return null;
//   }

//   const imgId = activeImg.id;
//   const dataIndex = activeImg.getAttribute('data-index');

//   // Generate key in format: category-projectname_index (e.g., "ai-Vogue_2")
//   const key = `${imgId}_${dataIndex}`;

//   return key;
// }

function showReferenceOverlay(imageId, dataIndex) {
  const blurringLayer = document.getElementById('blurringLayer');
  const mainContainer = document.querySelector('.main-container');
  const activeImg = document.querySelector('.carousel-item.active img');

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

  // Generate key directly from passed parameters instead of DOM searching
  const key = `${imageId}_${dataIndex}`;
  const refs = referenceImages[key] || [];

  // Extract category from imageId (e.g., "ai-Vogue" -> "ai", "cg-DMP" -> "cg")
  const category = imageId.split('-')[0];
  const categoryPosition = CATEGORY_POSITIONS[category] || CATEGORY_POSITIONS['cg']; // Default to CGI position

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
      // Category-based positioning: horizontal center, vertical based on category
      //flexContainer.style.top = categoryPosition.top;
      flexContainer.style.top = '12rem';
      flexContainer.style.left = '50%';
      flexContainer.style.transform = 'translateX(-50%)';
      flexContainer.style.width = '95vw';  // Maximized container width
      flexContainer.style.height = '50vh'; // Maximized container height
      flexContainer.style.zIndex = '9999';
      flexContainer.style.pointerEvents = 'none';
      flexContainer.style.opacity = '0';
      flexContainer.style.transition = 'opacity 0.5s ease';

      refs.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'reference-overlay-img';
        img.style.maxWidth = '90%';  // Significantly increased from 60% for much better visibility
        img.style.maxHeight = '90%'; // Increased from 70% to use more screen space
        img.style.objectFit = 'contain';
        img.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';

        flexContainer.appendChild(img);
      });

      // Append to main container
      mainContainer.appendChild(flexContainer);

      // Trigger animation after a brief delay
      setTimeout(() => {
        flexContainer.style.opacity = '1';
      }, 50);
    }, 300); // 300ms delay after blur starts
  }
}

// Check if current active image has references and inject button accordingly
function toggleReferenceButton() {
  const activeImg = document.querySelector('.carousel-item.active img');
  const titleElement = document.querySelector('#title');

  if (!activeImg || !titleElement) {
    return;
  }

  // Get the key for the current image
  const key = getCurrentImageKey();

  // Store the original title text (without any reference buttons or separators)
  const originalTitle = titleElement.textContent.split(' - ')[0].trim();

  // Remove any existing reference button and clean the title
  const existingButton = titleElement.querySelector('#references');
  if (existingButton) {
    existingButton.remove();
  }

  // Reset title to original text only
  titleElement.textContent = originalTitle;

  // Check if references exist for this image
  if (referenceImages[key] && referenceImages[key].length > 0) {
    // Create the reference button
    const referenceButton = document.createElement('button');
    referenceButton.id = 'references';
    referenceButton.textContent = 'references';
    referenceButton.style.cssText = `
      border: 0px solid rgb(196, 196, 196);
      box-shadow: 3px 5px 5px rgb(181, 181, 181);
      margin-left: 0.5rem;
      margin-bottom: 1rem;
      padding: 0.2rem 1rem;
      border-radius: 25px;
      background-color: rgb(220, 220, 220);
      color: rgb(147, 147, 147);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-block;
    `;

    // Add click event listener
    referenceButton.addEventListener('click', showReferenceOverlay);

    // Add separator text and button
    const separatorText = document.createTextNode(' - ');
    titleElement.appendChild(separatorText);
    titleElement.appendChild(referenceButton);
  }

  // Always ensure title element is visible
  titleElement.style.display = 'block';
}

// OLD SYSTEM - Commented out to prevent conflicts with new dynamic system
// The new system in project-description.js handles button creation based on hasRef property

// Initialize button visibility on page load
// document.addEventListener('DOMContentLoaded', toggleReferenceButton);

// Listen for content management system ready event
// document.addEventListener('contentManagerReady', () => {
//   setTimeout(toggleReferenceButton, 100);
// });

// Listen for carousel slide events
// document.addEventListener('DOMContentLoaded', () => {
//   const carousels = ['carouselExampleDarkAi', 'carouselExampleDarkCgi', 'carouselExampleDarkPhoto'];

//   carousels.forEach(carouselId => {
//     const carousel = document.getElementById(carouselId);
//     if (carousel) {
//       carousel.addEventListener('slid.bs.carousel', toggleReferenceButton);
//     }
//   });
// });

// Remove reference overlays on scroll
window.addEventListener('wheel', () => {
  const blurringLayer = document.getElementById('blurringLayer');
  if (blurringLayer) {
    blurringLayer.classList.remove('active');
    blurringLayer.style.filter = '';
    const oldContainer = document.getElementById('reference-flex-container');
    if (oldContainer) oldContainer.remove();
  }
});

// Make showReferenceOverlay globally accessible for the new dynamic button system
window.showReferenceOverlay = showReferenceOverlay;
