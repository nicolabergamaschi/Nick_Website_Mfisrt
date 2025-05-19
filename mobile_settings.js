//! TURN OFF NAV OVERLAY BUTTONS

function updateImageCountInTitle() {
  if (!window.matchMedia('(max-width: 414px)').matches) return;
  navBtns.forEach((button) => {button.display = 'none'})
}

//!