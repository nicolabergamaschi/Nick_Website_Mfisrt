const images = document.querySelectorAll('img');

// Create a blur overlay div
const blurOverlay = document.createElement('div');
blurOverlay.style.position = 'fixed';
blurOverlay.style.top = '0';
blurOverlay.style.left = '0';
blurOverlay.style.width = '100vw';
blurOverlay.style.height = '100vh';
blurOverlay.style.zIndex = '9999';
blurOverlay.style.backdropFilter = 'blur(10px)';
blurOverlay.style.pointerEvents = 'none'; // So clicks pass through if needed
blurOverlay.style.display = 'none';
document.body.appendChild(blurOverlay);

function showBlur() {
  blurOverlay.style.display = 'block';
}

function hideBlur() {
  blurOverlay.style.display = 'none';
}

// Show blur on image tap/click
images.forEach((image) => {
  image.addEventListener('click', showBlur);
  image.addEventListener('touchstart', showBlur);
});

// Hide blur when overlay is tapped/clicked
blurOverlay.addEventListener('click', hideBlur);
blurOverlay.addEventListener('touchstart', hideBlur);