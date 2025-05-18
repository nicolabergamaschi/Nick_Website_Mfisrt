document.addEventListener('DOMContentLoaded', function () {
  // Only enable on mobile
  if (window.matchMedia('(max-width: 414px)').matches) {
    const prevBtn = document.getElementById('mobile-prev');
    const nextBtn = document.getElementById('mobile-next');
    const descriptionTitle = document.getElementById('title');
    console.log(descriptionTitle);
    

    // Helper: get the visible carousel
    function getActiveCarousel() {
      // All carousels
      const carousels = [
        document.getElementById('carouselExampleDarkAi'),
        document.getElementById('carouselExampleDarkCgi'),
        document.getElementById('carouselExampleDarkPhoto')
      ];
      // Find the one in viewport (or visible)
      for (const carousel of carousels) {
        if (!carousel) continue;
        const rect = carousel.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          return carousel;
        }
      }
      return null;
    }

    prevBtn.addEventListener('click', function () {
      const carousel = getActiveCarousel();
      if (!carousel) return;
      const prev = carousel.querySelector('.carousel-control-prev');
      if (prev) prev.click();
      setTimeout(updateImageCountInTitle, 350); // Wait for carousel to update
    });

    nextBtn.addEventListener('click', function () {
      const carousel = getActiveCarousel();
      if (!carousel) return;
      const next = carousel.querySelector('.carousel-control-next');
      if (next) next.click();
      setTimeout(updateImageCountInTitle, 350); // Wait for carousel to update
    });
  }
});




