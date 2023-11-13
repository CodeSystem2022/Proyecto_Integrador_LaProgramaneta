document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');

  function handleScroll() {
      const scrollPosition = window.scrollY;

      // Verifica si la posición de desplazamiento es mayor que 0.
      if (scrollPosition <= 0) {
        // Estás en la parte superior de la página
        header.classList.add('fondo-inicial');
        header.classList.remove('fondo-scroll');
      } else {
        // Estás desplazándote hacia abajo
        header.classList.remove('fondo-inicial');
        header.classList.add('fondo-scroll');
      }
      
  }

  window.addEventListener('scroll', handleScroll);
});
