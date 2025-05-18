document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('carouselExampleDarkCgi');
  const showReelSlide = document.querySelector('#cg-ShowReel.carousel-item');
  const prevBtnContainer = carousel.querySelector('.carousel-button-container-prev');
  const nextBtnContainer = carousel.querySelector('.carousel-button-container-next');
  const prevBtn = prevBtnContainer.querySelector('.carousel-control-prev');
  const nextBtn = nextBtnContainer.querySelector('.carousel-control-next');

  function adjustButtonWidth() {
    if (showReelSlide.classList.contains('active')) {
      prevBtnContainer.style.width = '10%';
      nextBtnContainer.style.width = '10%';
      prevBtnContainer.style.transition = 'width 0.3s';
      nextBtnContainer.style.transition = 'width 0.3s';

      // Shrink the actual buttons and make them less intrusive
      prevBtn.style.width = '10%';
      nextBtn.style.width = '10%';
      prevBtn.style.height = '100%';
      nextBtn.style.height = '100%';
      prevBtn.style.background = 'transparent';
      nextBtn.style.background = 'transparent';
      prevBtn.style.pointerEvents = 'auto';
      nextBtn.style.pointerEvents = 'auto';
    } else {
      prevBtnContainer.style.width = '';
      nextBtnContainer.style.width = '';
      prevBtnContainer.style.transition = '';
      nextBtnContainer.style.transition = '';

      prevBtn.style.width = '';
      nextBtn.style.width = '';
      prevBtn.style.height = '';
      nextBtn.style.height = '';
      prevBtn.style.background = '';
      nextBtn.style.background = '';
      prevBtn.style.pointerEvents = '';
      nextBtn.style.pointerEvents = '';
    }
  }

  // On slide change
  carousel.addEventListener('slid.bs.carousel', adjustButtonWidth);

  // On page load
  adjustButtonWidth();
});