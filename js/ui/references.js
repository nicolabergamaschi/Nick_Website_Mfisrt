// Reference image overlay logic - updated for new naming convention
const referenceImages = {
  // ai-Vogue project references (new indices after migration)
  // Example of new structure with folders:
  'ai-Vogue_2': [
    './resources/images/references/ai-Vogue_2/ref_ai-Vogue_2_1.png',
    './resources/images/references/ai-Vogue_2/ref_ai-Vogue_2_2.png',
    {
      'data-set': [
        './resources/images/references/ai-Vogue_2/data-set/image1.webp',
        './resources/images/references/ai-Vogue_2/data-set/image2.webp'
      ]
    }
  ],
  'ai-Vogue_3': [
    './resources/images/references/ref_ai-Vogue_3_1.png',
    './resources/images/references/ref_ai-Vogue_3_2.png'
  ],

  'ai-VogueBES_4': [
    './resources/images/references/ref_ai_VogueBES_4_1.webp',
    './resources/images/references/ref_ai_VogueBES_4_2.webp',
    './resources/images/references/ref_ai_VogueBES_4_3.webp',
    './resources/images/references/ref_ai_VogueBES_4_4.webp',
    './resources/images/references/ref_ai_VogueBES_4_5.webp',
    './resources/images/references/ref_ai_VogueBES_4_6.webp',
  ],

  'ai-Rombaut_8': [
    './resources/images/references/ref_ai-Rombaut_8_1.webp',
    './resources/images/references/ref_ai-Rombaut_8_2.webp',
    './resources/images/references/ref_ai-Rombaut_8_3.webp',
    './resources/images/references/ref_ai-Rombaut_8_4.webp',
    './resources/images/references/ref_ai-Rombaut_8_5.webp',
    './resources/images/references/ref_ai-Rombaut_8_6.webp',
  ],

  'ai-Rombaut_9': [
    './resources/images/references/ref_ai-Rombaut_9_1.webp',
    './resources/images/references/ref_ai-Rombaut_9_2.webp',
    './resources/images/references/ref_ai-Rombaut_9_3.webp',
    './resources/images/references/ref_ai-Rombaut_9_4.webp',
    './resources/images/references/ref_ai-Rombaut_9_5.webp',
    './resources/images/references/ref_ai-Rombaut_9_6.webp',
    './resources/images/references/ref_ai-Rombaut_9_7.webp',
  ],

  'cg-DMP_1': [
    './resources/images/references/cg-DMP_1/image1.webp',
    './resources/images/references/cg-DMP_1/image2.webp',
    './resources/images/references/cg-DMP_1/image3.webp',
    {
      'process': [
        './resources/images/references/cg-DMP_1/process/step1.webp',
        './resources/images/references/cg-DMP_1/process/step2.webp',
        './resources/images/references/cg-DMP_1/process/step3.webp'
      ]
    },
    {
      'sketches': [
        './resources/images/references/cg-DMP_1/sketches/sketch1.webp',
        './resources/images/references/cg-DMP_1/sketches/sketch2.webp'
      ]
    }
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

// Utility functions for handling mixed file/folder arrays
function isFolder(item) {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

function isImageFile(item) {
  return typeof item === 'string';
}

function getFolderName(folderObj) {
  return Object.keys(folderObj)[0];
}

function getFolderContents(folderObj) {
  const folderName = getFolderName(folderObj);
  return folderObj[folderName];
}

function separateFilesAndFolders(items) {
  const files = [];
  const folders = [];

  items.forEach(item => {
    if (isImageFile(item)) {
      files.push(item);
    } else if (isFolder(item)) {
      folders.push(item);
    }
  });

  return { files, folders };
}

// COMMENTED OUT - This function was causing issues by detecting wrong active image
function getCurrentImageKey() {
  // Find the active image from any carousel
  const activeImg = document.querySelector('.carousel-item.active img');

  if (!activeImg) {
    return null;
  }

  const imgId = activeImg.id;
  const dataIndex = activeImg.getAttribute('data-index');

  // Generate key in format: category-projectname_index (e.g., "ai-Vogue_2")
  const key = `${imgId}_${dataIndex}`;

  return key;
}

function showReferenceOverlay(imageId, dataIndex, folderContext = null) {
  const blurringLayer = document.getElementById('blurringLayer');
  const mainContainer = document.querySelector('.main-container');
  const activeImg = document.querySelector('.carousel-item.active img');

  if (!blurringLayer || !mainContainer || !activeImg) return;

  // Toggle overlay and blur - check specifically for reference container
  const oldContainer = document.getElementById('reference-flex-container');
  if (oldContainer) {
    // If reference overlay exists, close it
    blurringLayer.classList.remove('active');
    blurringLayer.style.filter = '';
    oldContainer.remove();
    return;
  }

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
      flexContainer.style.flexWrap = 'wrap';  // Enable wrapping
      flexContainer.style.justifyContent = 'center';
      flexContainer.style.alignItems = 'center';
      flexContainer.style.gap = '1.5vw';  // Slightly reduced gap for better fit
      flexContainer.style.position = 'fixed';
      // Category-based positioning: horizontal center, vertical based on category
      //flexContainer.style.top = categoryPosition.top;
      flexContainer.style.top = '8rem';  // Moved up slightly to allow more space
      flexContainer.style.left = '50%';
      flexContainer.style.transform = 'translateX(-50%)';
      flexContainer.style.width = '70vw';  // Maximized container width
      flexContainer.style.height = '70vh'; // Increased height to accommodate wrapping
      flexContainer.style.maxHeight = '80vh'; // Maximum height limit
      flexContainer.style.overflowY = 'auto'; // Allow scrolling if needed
      flexContainer.style.zIndex = '9999';
      flexContainer.style.pointerEvents = 'all'; // Enable interaction for slideshow
      flexContainer.style.opacity = '0';
      flexContainer.style.transition = 'opacity 0.5s ease';
      flexContainer.style.padding = '1rem'; // Add padding for better spacing

      // Separate files and folders
      const { files, folders } = separateFilesAndFolders(refs);

      // Calculate responsive sizing based on total number of items
      const totalItems = files.length + folders.length;
      let maxWidth, maxHeight;
      if (totalItems <= 2) {
        maxWidth = '45%';  // 2 items per row max
        maxHeight = '60vh';
      } else if (totalItems <= 4) {
        maxWidth = '40%';  // 2-3 items per row
        maxHeight = '35vh';
      } else {
        maxWidth = '28%';  // 3-4 items per row for many items
        maxHeight = '25vh';
      }

      // Render image files
      files.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'reference-overlay-img';

        img.style.maxWidth = maxWidth;
        img.style.maxHeight = maxHeight;
        img.style.minWidth = '200px';  // Minimum width for readability
        img.style.minHeight = '150px'; // Minimum height for readability
        img.style.objectFit = 'contain';
        img.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
        img.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Subtle background
        img.style.cursor = 'pointer'; // Indicate clickable
        img.style.transition = 'transform 0.2s ease, opacity 0.2s ease';

        // Add hover effect
        img.addEventListener('mouseenter', () => {
          img.style.transform = 'scale(1.05)';
          img.style.opacity = '0.9';
        });

        img.addEventListener('mouseleave', () => {
          img.style.transform = 'scale(1)';
          img.style.opacity = '1';
        });

        // Add click event for slideshow
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          const imageIndex = files.indexOf(src);
          startSlideshow(files, imageIndex, flexContainer, folderContext);
        });

        flexContainer.appendChild(img);
      });

      // Render folder items
      folders.forEach(folderObj => {
        const folderName = getFolderName(folderObj);
        const folderDiv = document.createElement('div');
        folderDiv.className = 'reference-folder-item';

        folderDiv.style.cssText = `
          max-width: ${maxWidth};
          max-height: ${maxHeight};
          min-width: 200px;
          min-height: 150px;
          background: linear-gradient(135deg, rgba(200, 200, 200, 0.8), rgba(170, 170, 170, 0.8));
          border: 2px solid rgba(150, 150, 150, 0.8);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        `;

        // Folder icon (simple black and white)
        const folderIcon = document.createElement('div');
        folderIcon.innerHTML = '�';
        folderIcon.style.cssText = `
          font-size: 3rem;
          margin-bottom: 0.5rem;
          filter: grayscale(100%) contrast(150%);
        `;

        // Folder name
        const folderLabel = document.createElement('div');
        folderLabel.textContent = folderName;
        folderLabel.style.cssText = `
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: rgb(80, 80, 80);
          text-align: center;
          padding: 0 0.5rem;
        `;

        // Folder item count
        const folderContents = getFolderContents(folderObj);
        const itemCount = document.createElement('div');
        itemCount.textContent = `${folderContents.length} items`;
        itemCount.style.cssText = `
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: rgb(120, 120, 120);
          margin-top: 0.25rem;
        `;

        // Add hover effect
        folderDiv.addEventListener('mouseenter', () => {
          folderDiv.style.transform = 'scale(1.05)';
          folderDiv.style.background = 'linear-gradient(135deg, rgba(220, 220, 220, 0.9), rgba(190, 190, 190, 0.9))';
        });

        folderDiv.addEventListener('mouseleave', () => {
          folderDiv.style.transform = 'scale(1)';
          folderDiv.style.background = 'linear-gradient(135deg, rgba(200, 200, 200, 0.8), rgba(170, 170, 170, 0.8))';
        });

        // Add click event to open folder
        folderDiv.addEventListener('click', (e) => {
          e.stopPropagation();
          showFolderOverlay(imageId, dataIndex, folderName, folderContents);
        });

        folderDiv.appendChild(folderIcon);
        folderDiv.appendChild(folderLabel);
        folderDiv.appendChild(itemCount);
        flexContainer.appendChild(folderDiv);
      });

      // Create controls container for folder navigation (similar to slideshow controls)
      if (folderContext) {
        const controlsContainer = document.createElement('div');
        controlsContainer.style.cssText = `
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        `;

        // Folder label
        const folderLabel = document.createElement('span');
        folderLabel.textContent = `Folder: ${folderContext}`;
        folderLabel.style.cssText = `
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          background: rgba(0, 0, 0, 0.5);
          padding: 0.5rem 1rem;
          border-radius: 20px;
        `;

        // Back button (matching "Back to Grid" style exactly)
        const backButton = document.createElement('button');
        backButton.textContent = '← Back';
        backButton.style.cssText = `
          background: rgba(220, 220, 220, 0.9);
          border: none;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgb(147, 147, 147);
          cursor: pointer;
          transition: all 0.2s ease;
        `;

        backButton.addEventListener('click', () => {
          // Go back to main reference view
          const blurringLayer = document.getElementById('blurringLayer');
          if (blurringLayer) {
            blurringLayer.classList.remove('active');
            blurringLayer.style.filter = '';
            flexContainer.remove();
            // Reopen main reference overlay
            setTimeout(() => showReferenceOverlay(imageId, dataIndex), 100);
          }
        });

        backButton.addEventListener('mouseenter', () => {
          backButton.style.background = 'rgba(200, 200, 200, 0.9)';
          backButton.style.transform = 'scale(1.05)';
        });

        backButton.addEventListener('mouseleave', () => {
          backButton.style.background = 'rgba(220, 220, 220, 0.9)';
          backButton.style.transform = 'scale(1)';
        });

        controlsContainer.appendChild(folderLabel);
        controlsContainer.appendChild(backButton);
        flexContainer.appendChild(controlsContainer);
      }

      // Append to main container
      mainContainer.appendChild(flexContainer);

      // Add click handler to close overlay when clicking outside images
      flexContainer.addEventListener('click', (e) => {
        // If clicking on the container itself (not on an image), close the overlay
        if (e.target === flexContainer) {
          const blurringLayer = document.getElementById('blurringLayer');
          if (blurringLayer) {
            blurringLayer.classList.remove('active');
            blurringLayer.style.filter = '';
            flexContainer.remove();
          }
        }
      });

      // Trigger animation after a brief delay
      setTimeout(() => {
        flexContainer.style.opacity = '1';
      }, 50);
    }, 300); // 300ms delay after blur starts
  }
}

// Function to display folder contents
function showFolderOverlay(imageId, dataIndex, folderName, folderContents) {
  // Close current overlay first
  const blurringLayer = document.getElementById('blurringLayer');
  const oldContainer = document.getElementById('reference-flex-container');
  if (oldContainer) {
    oldContainer.remove();
  }

  // Reopen with folder context
  setTimeout(() => {
    // Create a temporary refs array with just folder contents
    const originalRefs = referenceImages[`${imageId}_${dataIndex}`];
    referenceImages[`${imageId}_${dataIndex}`] = folderContents;

    // Show overlay with folder context
    showReferenceOverlay(imageId, dataIndex, folderName);

    // Restore original refs
    referenceImages[`${imageId}_${dataIndex}`] = originalRefs;
  }, 100);
}

// Slideshow functionality
function startSlideshow(imageUrls, startIndex, container, folderContext = null) {
  let currentIndex = startIndex;

  // Clear container and set up slideshow layout
  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.gap = '1rem';
  container.style.pointerEvents = 'all'; // Enable interaction

  // Create slideshow container
  const slideshowContainer = document.createElement('div');
  slideshowContainer.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
    position: relative;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(5px);
  `;

  // Create main image element
  const mainImage = document.createElement('img');
  mainImage.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
    transition: opacity 0.3s ease, transform 0.2s ease;
    cursor: pointer;
  `;

  // Add image protection
  mainImage.setAttribute('draggable', 'false');
  mainImage.addEventListener('contextmenu', (e) => e.preventDefault());
  mainImage.addEventListener('selectstart', (e) => e.preventDefault());

  // Add click event for fullscreen
  mainImage.addEventListener('click', () => {
    openFullscreen(imageUrls[currentIndex]);
  });

  // Add hover effect for main image
  mainImage.addEventListener('mouseenter', () => {
    mainImage.style.transform = 'scale(1.02)';
  });

  mainImage.addEventListener('mouseleave', () => {
    mainImage.style.transform = 'scale(1)';
  });

  // Navigation buttons
  const prevButton = document.createElement('button');
  prevButton.innerHTML = '‹';
  prevButton.className = 'slideshow-nav-button slideshow-prev-button';
  prevButton.style.cssText = `
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    z-index: 10;
    transition: background 0.2s ease;
    display: ${imageUrls.length > 1 ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
  `;

  const nextButton = document.createElement('button');
  nextButton.innerHTML = '›';
  nextButton.className = 'slideshow-nav-button slideshow-next-button';
  nextButton.style.cssText = prevButton.style.cssText;
  nextButton.style.left = 'auto';
  nextButton.style.right = '10px';

  // Update image function
  function updateImage() {
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = imageUrls[currentIndex];
      mainImage.style.opacity = '1';

      // Update counter
      counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
    }, 150);
  }

  // Navigation functions
  function goNext() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    updateImage();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    updateImage();
  }

  // Event listeners
  prevButton.addEventListener('click', goPrev);
  nextButton.addEventListener('click', goNext);

  // Hover effects for buttons
  [prevButton, nextButton].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'rgba(255, 255, 255, 0.9)';
      btn.style.transform = btn === prevButton ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(1.1)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'rgba(255, 255, 255, 0.8)';
      btn.style.transform = 'translateY(-50%) scale(1)';
    });
  });

  // Keyboard navigation
  function handleKeyPress(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      goPrev();
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      goNext();
    } else if (e.key === 'Escape') {
      exitSlideshow();
    }
  }

  document.addEventListener('keydown', handleKeyPress);

  // Controls container
  const controlsContainer = document.createElement('div');
  controlsContainer.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  `;

  // Image counter
  const counter = document.createElement('span');
  counter.style.cssText = `
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
    border-radius: 20px;
  `;

  // Exit button
  const exitButton = document.createElement('button');
  exitButton.textContent = 'Back to Grid';
  exitButton.style.cssText = `
    background: rgba(220, 220, 220, 0.9);
    border: none;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgb(147, 147, 147);
    cursor: pointer;
    transition: all 0.2s ease;
  `;

  function exitSlideshow() {
    document.removeEventListener('keydown', handleKeyPress);
    // Recreate the appropriate overlay based on context
    if (folderContext) {
      // We're in a folder, so recreate folder overlay
      const imageId = getCurrentImageKey()?.split('_')[0];
      const dataIndex = getCurrentImageKey()?.split('_')[1];
      if (imageId && dataIndex) {
        const key = `${imageId}_${dataIndex}`;
        const refs = referenceImages[key] || [];
        const { folders } = separateFilesAndFolders(refs);

        // Find the folder object with our context name
        const targetFolder = folders.find(folder => getFolderName(folder) === folderContext);
        if (targetFolder) {
          const folderContents = getFolderContents(targetFolder);
          showFolderOverlay(imageId, dataIndex, folderContext, folderContents);
        }
      }
    } else {
      // We're in main reference view
      const imageId = getCurrentImageKey()?.split('_')[0];
      const dataIndex = getCurrentImageKey()?.split('_')[1];
      if (imageId && dataIndex) {
        showReferenceOverlay(imageId, dataIndex);
      }
    }
  }

  exitButton.addEventListener('click', exitSlideshow);
  exitButton.addEventListener('mouseenter', () => {
    exitButton.style.background = 'rgba(200, 200, 200, 0.9)';
    exitButton.style.transform = 'scale(1.05)';
  });
  exitButton.addEventListener('mouseleave', () => {
    exitButton.style.background = 'rgba(220, 220, 220, 0.9)';
    exitButton.style.transform = 'scale(1)';
  });

  // Assemble slideshow
  slideshowContainer.appendChild(mainImage);
  slideshowContainer.appendChild(prevButton);
  slideshowContainer.appendChild(nextButton);

  controlsContainer.appendChild(counter);
  controlsContainer.appendChild(exitButton);

  container.appendChild(slideshowContainer);
  container.appendChild(controlsContainer);

  // Initialize with current image
  mainImage.src = imageUrls[currentIndex];
  counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
}

// Fullscreen functionality for reference images
function openFullscreen(imageSrc) {
  // Create fullscreen overlay
  const fullscreenOverlay = document.createElement('div');
  fullscreenOverlay.id = 'fullscreen-overlay';
  fullscreenOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
  `;

  // Create fullscreen image
  const fullscreenImage = document.createElement('img');
  fullscreenImage.src = imageSrc;
  fullscreenImage.style.cssText = `
    max-width: 95vw;
    max-height: 95vh;
    object-fit: contain;
    transition: transform 0.3s ease;
    pointer-events: none;
  `;

  // Add image protection to fullscreen image
  fullscreenImage.setAttribute('draggable', 'false');
  fullscreenImage.addEventListener('contextmenu', (e) => e.preventDefault());
  fullscreenImage.addEventListener('selectstart', (e) => e.preventDefault());

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.className = 'fullscreen-close-button';
  closeButton.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Close button hover effects
  closeButton.addEventListener('mouseenter', () => {
    closeButton.style.background = 'rgba(255, 255, 255, 0.9)';
    closeButton.style.transform = 'scale(1.1)';
  });

  closeButton.addEventListener('mouseleave', () => {
    closeButton.style.background = 'rgba(255, 255, 255, 0.8)';
    closeButton.style.transform = 'scale(1)';
  });

  // Function to close fullscreen
  function closeFullscreen() {
    fullscreenOverlay.style.opacity = '0';
    setTimeout(() => {
      fullscreenOverlay.remove();
      document.removeEventListener('keydown', handleFullscreenKeyPress);
    }, 300);
  }

  // Event listeners for closing
  fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
      closeFullscreen();
    }
  });

  closeButton.addEventListener('click', closeFullscreen);

  // Keyboard navigation for fullscreen
  function handleFullscreenKeyPress(e) {
    if (e.key === 'Escape') {
      closeFullscreen();
    }
  }

  document.addEventListener('keydown', handleFullscreenKeyPress);

  // Assemble and show fullscreen
  fullscreenOverlay.appendChild(fullscreenImage);
  fullscreenOverlay.appendChild(closeButton);
  document.body.appendChild(fullscreenOverlay);

  // Trigger animation
  setTimeout(() => {
    fullscreenOverlay.style.opacity = '1';
  }, 10);
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
    referenceButton.addEventListener('click', () => {
      const activeImg = document.querySelector('.carousel-item.active img');
      if (activeImg) {
        const imageId = activeImg.id;
        const dataIndex = activeImg.getAttribute('data-index');
        showReferenceOverlay(imageId, dataIndex);
      }
    });

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

// Additional cleanup for scroll navigation - ensure clean state when reaching home
window.addEventListener('scroll', () => {
  const homeCarousel = document.querySelector('div#page-home');
  if (homeCarousel) {
    const rect = homeCarousel.getBoundingClientRect();
    // Check if home is in viewport (same logic as in carousels.js)
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const blurringLayer = document.getElementById('blurringLayer');
      if (blurringLayer && blurringLayer.classList.contains('active')) {
        blurringLayer.classList.remove('active');
        blurringLayer.style.filter = '';
        const oldContainer = document.getElementById('reference-flex-container');
        if (oldContainer) oldContainer.remove();
      }
    }
  }
});

// Listen for Bootstrap offcanvas events to hide references when about is opened
document.addEventListener('DOMContentLoaded', () => {
  const aboutOffcanvas = document.getElementById('offcanvasWithBothOptions');
  if (aboutOffcanvas) {
    // Hide references overlay when about offcanvas is shown
    aboutOffcanvas.addEventListener('show.bs.offcanvas', () => {
      const blurringLayer = document.getElementById('blurringLayer');
      if (blurringLayer && blurringLayer.classList.contains('active')) {
        blurringLayer.classList.remove('active');
        blurringLayer.style.filter = '';
        const oldContainer = document.getElementById('reference-flex-container');
        if (oldContainer) oldContainer.remove();
      }
    });
  }
});

// Make showReferenceOverlay globally accessible for the new dynamic button system
window.showReferenceOverlay = showReferenceOverlay;

// Global image protection - prevent saving and opening in new tabs
document.addEventListener('DOMContentLoaded', () => {
  // Function to apply protection to images
  function protectImage(img) {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', (e) => e.preventDefault());
    img.addEventListener('selectstart', (e) => e.preventDefault());
    img.addEventListener('dragstart', (e) => e.preventDefault());

    // Prevent opening in new tab/window
    img.addEventListener('click', (e) => {
      // Only prevent default if it's not already handled by other systems
      if (!img.closest('#reference-flex-container') && !img.closest('.slideshow-container')) {
        e.preventDefault();
      }
    });

    // Prevent keyboard shortcuts for saving
    img.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
    });
  }

  // Apply protection to existing images
  const allImages = document.querySelectorAll('img');
  allImages.forEach(protectImage);

  // Apply protection to dynamically added images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          if (node.tagName === 'IMG') {
            protectImage(node);
          }
          // Also check for images within added elements
          const images = node.querySelectorAll?.('img');
          if (images) {
            images.forEach(protectImage);
          }
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// Additional protection: disable common keyboard shortcuts globally
document.addEventListener('keydown', (e) => {
  // Prevent Ctrl+S (Save), Ctrl+A (Select All), F12 (DevTools), etc.
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'a')) {
    e.preventDefault();
  }

  // Prevent F12, Ctrl+Shift+I, Ctrl+U
  if (e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.key === 'u')) {
    e.preventDefault();
  }
});
