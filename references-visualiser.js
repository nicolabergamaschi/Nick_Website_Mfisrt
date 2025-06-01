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
