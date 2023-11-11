
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
  
    function handleScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition === 0) {
        header.classList.add('fondo-inicial');
        header.classList.remove('fondo-scroll');
      } else {
        header.classList.remove('fondo-inicial');
        header.classList.add('fondo-scroll');
      }
    }
  
    window.addEventListener('scroll', handleScroll);
  });
  