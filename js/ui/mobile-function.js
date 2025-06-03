export function updateMobileImageCount(carousel) {
  if (!window.matchMedia('(max-width: 768px)').matches) return;

  // Remove any previous injected count
  document.querySelectorAll('.mobile-image-count').forEach(el => el.remove());

  // Find all carousel items and the active one
  const items = Array.from(carousel.querySelectorAll('.carousel-item'));
  const activeIndex = items.findIndex(item => item.classList.contains('active'));

  // Find the visible project title (use class, not id)
  const visibleTitle = Array.from(document.querySelectorAll('h4.title'))
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
    const activeProjectId = items[activeIndex].id;
    const projectItems = items.filter(item => item.id === activeProjectId);
    const projectIndex = projectItems.indexOf(items[activeIndex]);

    // Remove any previous inline count (split at ' | ')
    visibleTitle.textContent = visibleTitle.textContent.split(' | ')[0];
    visibleTitle.textContent += ` | ${projectIndex + 1} / ${projectItems.length}`;
  }
}

export function initMobileImageCount() {
  document.addEventListener('DOMContentLoaded', imageCountToTitleMobile);
};

function imageCountToTitleMobile() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    const imageCount = document.getElementById('image-count');
    const title = document.getElementById('title');
    if (imageCount && title) {
      // Move image count text to title
      title.textContent += ' ' + imageCount.textContent;
      // Optionally hide the original image count
      imageCount.style.display = 'none';
    }
  }
};

export function removeImageCount() {
    // Remove any previous injected count
  document.querySelectorAll('.mobile-image-count').forEach(el => el.remove());
};

export function turnOffMobileArrows() {
  document.querySelectorAll('.mobile-nav-buttons').forEach(el => el.style.display = 'none');
};

export function turnOnMobileArrows() {
  document.querySelectorAll('.mobile-nav-buttons').forEach(el => el.style.display = 'flex');
};

