// document.addEventListener("DOMContentLoaded", function() {
//   const image1 = document.getElementById("image1");
//   const image2 = document.getElementById("image2");
//   const footer = document.getElementById("footer");
  
//   // Establecer la posición inicial de las imágenes
//   image1.style.left = `${Math.random() * (window.innerWidth - image1.width)}px`;
//   image1.style.top = `${Math.random() * (window.innerHeight - image1.height)}px`;
//   image2.style.left = `${Math.random() * (window.innerWidth - image2.width)}px`;
//   image2.style.top = `${Math.random() * (window.innerHeight - image2.height)}px`;

//   function moveImage(image) {
//     const newX = Math.random() * (window.innerWidth - image.width);
//     const newY = Math.random() * (window.innerHeight - image.height);
//     const deltaX = newX - parseFloat(image.style.left || 0);
//     const deltaY = newY - parseFloat(image.style.top || 0);
//     const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//     const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
//     const rotationChance = Math.random(); // Determina si se aplicará rotación
    
//     // Aplicar rotación de manera aleatoria
//     let rotation = 0;
//     if (rotationChance < 0.2) { // 20% de probabilidad de rotación
//       rotation = (Math.random() - 0.5) * 360; // Rotación aleatoria entre -180° y 180°
//     }
    
//     // Limitar la posición para mantener las imágenes dentro de la ventana del navegador
//     const maxX = window.innerWidth - image.width;
//     const maxY = window.innerHeight - image.height;
//     const boundedX = Math.max(0, Math.min(newX, maxX));
//     const boundedY = Math.max(0, Math.min(newY, maxY));
    
//     // Movimiento suave y deslizante con transición CSS
//     image.style.transition = "transform 5s ease-in-out"; // Ajusta la duración de la transición para que sea más lenta
//     image.style.transform = `translate(${boundedX}px, ${boundedY}px) rotate(${angle + rotation}deg) scale(${Math.random() * 1.5})`;
    
//     // Actualizar posición
//     image.style.left = boundedX + "px";
//     image.style.top = boundedY + "px";
//   }
  
//   function followScroll(event) {
//     const footerTop = footer.getBoundingClientRect().top;
//     if (footerTop <= window.innerHeight) {
//       window.scrollTo(0, footer.offsetTop);
//     }
//   }
  
//   window.addEventListener("scroll", followScroll);
  
//   setInterval(function() {
//     moveImage(image1);
//   }, 5000); // Cambia el número para ajustar la velocidad de movimiento de la primera imagen
  
//   setInterval(function() {
//     moveImage(image2);
//   }, 7000); // Cambia el número para ajustar la velocidad de movimiento de la segunda imagen
  
//   // Iniciar movimiento de las imágenes
//   moveImage(image1);
//   moveImage(image2);
// });







document.addEventListener("DOMContentLoaded", function() {
  const image1 = document.getElementById("image1");
  const image2 = document.getElementById("image2");
  const footer = document.getElementById("footer");
  
  // Establecer la posición inicial de las imágenes
  image1.style.left = `${Math.random() * (window.innerWidth - image1.width)}px`;
  image1.style.top = `${Math.random() * (window.innerHeight - image1.height)}px`;
  image2.style.left = `${Math.random() * (window.innerWidth - image2.width)}px`;
  image2.style.top = `${Math.random() * (window.innerHeight - image2.height)}px`;

  function moveImage(image) {
    const newX = Math.random() * (window.innerWidth - image.width);
    let newY = Math.random() * (window.innerHeight - image.height);
    const deltaY = newY - parseFloat(image.style.top || 0);
    
    // Limitar la posición para mantener las imágenes dentro de la ventana del navegador
    const maxX = window.innerWidth - image.width;
    const maxY = window.innerHeight - image.height;
    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));
    
    // Movimiento suave y deslizante con transición CSS
    image.style.transition = "transform 5s ease-in-out"; // Ajusta la duración de la transición para que sea más lenta
    image.style.transform = `translate(${boundedX}px, ${boundedY}px) scale(1)`; // Cambia la escala a 1 para mantener el tamaño original
    
    // Actualizar posición
    image.style.left = boundedX + "px";
    image.style.top = boundedY + "px";
  }
  
  function followScroll(event) {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (footerTop <= windowHeight) {
      window.scrollTo(0, footer.offsetTop);
    } else if (window.scrollY > 0) { // Si el usuario está desplazándose hacia arriba
      image1.style.transition = "transform 0.5s ease-in-out"; // Ajusta la duración de la transición para que sea más rápida
      image2.style.transition = "transform 0.5s ease-in-out"; // Ajusta la duración de la transición para que sea más rápida
      image1.style.transform = `translateY(${window.scrollY}px)`;
      image2.style.transform = `translateY(${window.scrollY}px)`;
    }
  }
  
  window.addEventListener("scroll", followScroll);
  
  setInterval(function() {
    moveImage(image1);
  }, 10000); // Cambia el número para ajustar la velocidad de movimiento de la primera imagen
  
  setInterval(function() {
    moveImage(image2);
  }, 10000); // Cambia el número para ajustar la velocidad de movimiento de la segunda imagen
  
  // Iniciar movimiento de las imágenes
  moveImage(image1);
  moveImage(image2);
});
