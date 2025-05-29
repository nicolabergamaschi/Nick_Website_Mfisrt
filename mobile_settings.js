//! TURN OFF NAV OVERLAY BUTTONS

function updateImageCountInTitle() {
  if (!window.matchMedia('(max-width: 414px)').matches) return;
  navBtns.forEach((button) => {button.display = 'none'})
}

const OverlayButtons = document.querySelectorAll('.carousel-button-container-next .carousel-button-container-prev')

function navButtonsOverlayOff(elements) {
  elements.forEach((el) => {
    el.style.display = 'none';
  })
}

navButtonsOverlayOff(OverlayButtons);