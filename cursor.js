const cursorTag = document.querySelector("div.cursors");
const ball = cursorTag.querySelector("div");

const cursorProject = cursorTag.querySelector("span#cursor-text");
const cursorCount = cursorTag.querySelector("span#image-count");

const images = document.querySelectorAll("div#carouselExampleDarkAi, div#carouselExampleDarkCgi, div#carouselExampleDarkPhoto");
const carouselContainer = document.querySelector("div.carousel-dark"); // Assuming this is the carousel container
const navBtns = document.querySelectorAll('.carousel-button-container-prev, .carousel-button-container-next');
const emptyString = "";

const descrList = document.querySelectorAll('div.prj-description');

// tracking mouse cursor in order to place image count
document.addEventListener("mousemove", function (event) {
  ball.style.left = event.pageX + "px";
  ball.style.top = event.pageY + "px";
});

// same logic for both mouse hover and clicks
images.forEach(image => {
  image.addEventListener("mousemove", function () {
    const tagContainer = image.querySelector('div.carousel-dark div.carousel-inner div.active img');
    if (tagContainer) { // Check if tagContainer exists
      const tagged = tagContainer.getAttribute('data-hover');
      const arrayElements = document.querySelectorAll(`img[data-hover="${tagged}"]`);
      const elementsCount = arrayElements.length;
      // Find the index of the active image within the group
      const activeIndex = Array.from(arrayElements).indexOf(tagContainer) + 1; // +1 to make it 1-based
      cursorCount.innerHTML = `${activeIndex}/${elementsCount}`; // Update the cursor with the current index and total count
      const tag = tagContainer.getAttribute('data-hover');
      cursorProject.innerHTML = tag.split('-')[1] || ""; // Update the tag dynamically
    } else {
      cursorCount.innerHTML = ""; // Clear the count if no tagContainer is found
      cursorProject.innerHTML = ""; // Clear the tag if no tagContainer is found
    };
  });


// same logic for both mouse hover and clicks
  image.addEventListener("click", function () {
    const tagContainer = image.querySelector('div.carousel-dark div.carousel-inner div.active img');
    if (tagContainer) { // Check if tagContainer exists
      const tagged = tagContainer.getAttribute('data-hover'); //! image tag
      // check the data-hover tag from the selected picture and select the relative project description 
      descrList.forEach(element => {
        const descrTag = element.getAttribute('data-prj'); //! description tag 
        if (tagged === descrTag) {
          element.style.display = 'block';
        }
      });
      

      const arrayElements = document.querySelectorAll(`img[data-hover="${tagged}"]`);
      const elementsCount = arrayElements.length;
      // Find the index of the active image within the group
      const activeIndex = Array.from(arrayElements).indexOf(tagContainer) + 1; // +1 to make it 1-based
      cursorCount.innerHTML = `${activeIndex}/${elementsCount}`; // Update the cursor with the current index and total count
      // inject the above in current project #title instead on cursorCount => <span id="image-count">

      // select the current project 
      // select current project #title element
      // inject the image-count #title HTML


      const tag = tagContainer.getAttribute('data-hover');
      cursorProject.innerHTML = tag.split('-')[1]  || ""; // Update the tag dynamically
    } else {
      cursorCount.innerHTML = ""; // Clear the count if no tagContainer is found
      cursorProject.innerHTML = ""; // Clear the tag if no tagContainer is found
    }
  });
});


// Clearing the cursor image count while not hovering over nav-buttons
navBtns.forEach(button => {
  button.addEventListener('mouseleave', function() {
    cursorProject.innerText = emptyString;
    cursorCount.innerText = emptyString;
  });
});


