export function initHighligthsMenu() {
  let allSubLists = document.querySelectorAll('.sub-list-link'); // Declare var with all list elements in it
  let selection; // Declare selection in a higher scope as empty

  allSubLists.forEach(item => {
    item.addEventListener("click", function () {
      selection = this.id; // Assign the clicked element's ID to selection
      let categoryClass = selection.slice(0, 2);
      // Removing the .active just from the sublist containing the clicked item
      document.querySelectorAll(`.${categoryClass}`).forEach(item => {
        if (item.classList.contains('active'))
          item.classList.remove('active');
      });

      // Get the active element based on the updated selection
      let active = document.querySelector(`div#${selection}`);
      if (active) { // Check if the element exists
        active.classList.add('active'); // Add the 'active' class
      } else {
        console.error(`No element found for selector: div#${selection}`);
      }

      // Update the highlight for the clicked sub-list link
      updateSublistHighlightFromClick(this.id);
    });
  });

  // Add event listeners to all carousel controls
  document.querySelectorAll('.carousel').forEach(carousel => {
    const carouselId = carousel.id;

    // Add event listeners to the previous and next buttons
    carousel.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(control => {
      control.addEventListener('click', () => {
        setTimeout(() => {
          updateSublistHighlight(carouselId);
        }, 500); // Delay to allow the carousel transition to complete
      });
    });
  });

  // Add event listeners to main category buttons
  document.querySelectorAll('#menu > li > a').forEach(mainCategory => {
    mainCategory.addEventListener('click', function () {
      const targetCarouselId = this.getAttribute('href').replace('#', ''); // Get the target carousel ID
      const activeItem = document.querySelector(`#${targetCarouselId} .carousel-item.active`);
      if (activeItem) {
        const activeId = activeItem.id;
        updateSublistHighlightFromClick(activeId); // Update the highlight for the active project in the target category
      }
    });
  });
}
// changing highlighted project based on scrolling
export function changeHighligthedPrjOnScroll(carousel) {
  const activeItem = carousel.querySelector('.carousel-item.active');
  if (activeItem) {
    const activePrjId = activeItem.id;
    if (activePrjId) { // Only proceed if we have a valid ID
      updateSublistHighlightFromScroll(activePrjId); // Use the new function
    }
  }
}

function highlightSelectedLink(projectId) {
  if (!projectId) { // Safety check for empty/undefined projectId
    return;
  }
  const activeLink = document.querySelector(`#${projectId}`);
  if (activeLink) {
    activeLink.style.backgroundColor = 'rgba(125, 233, 152, 0.7)';
    activeLink.style.color = 'white';
    activeLink.style.fontWeight = '600';
    activeLink.style.borderRadius = '12px'
    activeLink.style.padding = '0.1rem 0.5rem 0.2rem 0.5rem';
    activeLink.classList.add('pulse');
  }
}
// Function to update the background color of the corresponding sublist link
function updateSublistHighlight(carouselId) {
  const activeItem = document.querySelector(`#${carouselId} .carousel-item.active`);
  if (activeItem) {
    const activeId = activeItem.id;

    // Remove styles from all sublist links
    document.querySelectorAll('.sub-list-link').forEach(link => {
      link.style.backgroundColor = ''; // Reset background color
      link.style.color = ''; // Reset font color
      link.style.borderRadius = ''; // Reset rounded edges
      link.style.padding = ''; // Reset padding
      link.style.margin = ''; // Reset margin
      link.style.fontWeight = '';
      link.classList.remove('pulse'); // Remove pulsing animation
    });

    // Highlight the corresponding sublist link
    highlightSelectedLink(activeId)
  }
}
// Function to update the highlight when clicking on a sub-list link
function updateSublistHighlightFromClick(subListId) {
  // Remove styles from all sublist links
  document.querySelectorAll('.sub-list-link').forEach(link => {
    link.style.backgroundColor = ''; // Reset background color
    link.style.color = ''; // Reset font color
    link.style.borderRadius = ''; // Reset rounded edges
    link.style.fontWeight = '';  // Reset font weight
    link.style.padding = ''; // Reset padding
    link.style.margin = ''; // Reset margin
    link.classList.remove('pulse'); // Remove pulsing animation
  });

  // Highlight the clicked sublist link
  highlightSelectedLink(subListId)
}
// Function to update the highlight when scrolling to a project
function updateSublistHighlightFromScroll(projectId) {
  if (!projectId) { // Safety check for empty/undefined projectId
    return;
  }
  // Remove styles from all sublist links
  document.querySelectorAll('.sub-list-link').forEach(link => {
    link.style.backgroundColor = '';
    link.style.color = '';
    link.style.borderRadius = '';
    link.style.padding = '';
    link.style.margin = '';
    link.style.fontWeight = '';
    link.classList.remove('pulse');
  });

  // Highlight the corresponding sublist link
  highlightSelectedLink(projectId)
}
