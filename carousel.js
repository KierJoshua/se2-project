const carousel = document.querySelector('.carousel');
        let currentIndex = 0;
        let startX = 0;
        let currentTranslate = 0;
        let isDragging = false;
        let isPlaying = true;
      
        function prevImage() {
          currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
          updateCarousel();
        }
      
        function nextImage() {
          currentIndex = (currentIndex + 1) % carousel.children.length;
          updateCarousel();
        }
      
        function updateCarousel() {
          const translateX = -currentIndex * 50 + "%";
          carousel.style.transform = `translateX(${translateX})`;
        }
      
        function playCarousel() {
          if (isPlaying) {
            nextImage();
          }
        }
      
        
        function toggleAutoPlay() {
          isPlaying = !isPlaying;
        }
      
        
        const autoPlayInterval = setInterval(playCarousel, 3000); // Change slide every 3 seconds
      
        carousel.addEventListener('mousedown', (e) => {
          isDragging = true;
          startX = e.clientX - carousel.getBoundingClientRect().left;
          currentTranslate = -currentIndex * carousel.offsetWidth;
      
          // Clear the auto-play interval when the user interacts with the carousel
          clearInterval(autoPlayInterval);
        });
      
        carousel.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          const x = e.clientX - carousel.getBoundingClientRect().left;
          const diff = x - startX;
          carousel.style.transform = `translateX(${currentTranslate + diff}px)`;
        });
      
        carousel.addEventListener('mouseup', () => {
          isDragging = false;
          const threshold = carousel.offsetWidth / 4;
          if (Math.abs(currentTranslate) + threshold < currentIndex * carousel.offsetWidth) {
            currentIndex++;
          } else if (Math.abs(currentTranslate) - threshold > currentIndex * carousel.offsetWidth) {
            currentIndex--;
          }
          updateCarousel();
      
          // Restart the auto-play interval after user interaction
          autoPlayInterval = setInterval(playCarousel, 3000); // Change slide every 3 seconds
        });
      
        carousel.addEventListener('mouseleave', () => {
          isDragging = false;
          updateCarousel();
        });