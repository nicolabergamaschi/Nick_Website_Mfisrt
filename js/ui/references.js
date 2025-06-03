//! visualise references logic ---- TO BE TRIGGERED BY CLICKS ON NAV ARROWS RATHER THAN PAGE SCROLL -- as page scroll triggers functions just when scrolled and it is usefull in order to understand the active carousel but for active element/image we will need to eventListener for clicks of nav buttons

export function visualiseReferences(carousel) {
  // I should divide it in 4 steps
  // 1. select active CAROUSEL
  // 2. select img through active DIV
  // 3. add reference button to active image descriptions
  // 4. when clicking visualise overlay ref images on screen preferably using 'div.carousel-inner'

  const activeImage = carousel.querySelector('.active').children[0]
  //console.log(activeImage)
  if (activeImage.className.includes('ref')) {
    //console.log('this image has a reference attribute.')
  } else {
    //console.log('This image has no ref attribute')
  }
}


//! -------------------- WIP ------------------------------
const referencesButton = document.getElementById('references');
const blurringLayer = document.getElementById('blurringLayer');
// const activeImage = 


// show ref button if img has ref attribute in its html

function checkForRefAttr() {
  
}

// enable/disable blurring when clicking on button
referencesButton.addEventListener('click', function() {
  blurringLayer.classList.toggle('active');
});
