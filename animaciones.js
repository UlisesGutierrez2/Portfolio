// Índice inicial y configuración del slider
let index = 0;
const itemsToShow = 2; // Número de iconos visibles a la vez
const slider = document.querySelector('.slider');
const sliderImages = document.querySelectorAll('.icon');
const totalImages = sliderImages.length;

// Función para mover el slider
function moveSlide(direction) {
    index += direction;

    // Si llega al final, volver al inicio
    if (index >= totalImages - itemsToShow + 1) {
        index = 0; // Reiniciar al inicio
    } else if (index < 0) {
        index = totalImages - itemsToShow; // Mover al último conjunto
    }

    // Calcular el desplazamiento en píxeles
    const offset = -index * (sliderImages[0].offsetWidth + 20); // 20px es el margen entre las imágenes
    slider.style.transform = `translateX(${offset}px)`;
}

// Función para abrir el modal y mostrar la imagen
function openModal(img) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Reducir tamaño del encabezado al hacer scroll
window.onscroll = function () {
    const header = document.querySelector(".header");
    const firstSection = document.querySelector("section");

    if (window.scrollY > 50) {
        header.classList.add("smaller"); // Reducir el tamaño de la cabecera
        firstSection.style.paddingTop = "150px"; // Ajusta este valor según el diseño
    } else {
        header.classList.remove("smaller"); // Restaurar tamaño original
        firstSection.style.paddingTop = "300px"; // Ajusta este valor según el diseño
    }
};

// Ajustar el slider al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
    const offset = -index * (sliderImages[0].offsetWidth + 20);
    slider.style.transform = `translateX(${offset}px)`;
});

// Efecto interactivo de fondo con el movimiento del mouse
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    document.body.style.backgroundPosition = `${x}% ${y}%`;
});

// Detecta el scroll y aplica la clase "smaller" al header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('smaller');  // Agrega la clase cuando haga scroll
    } else {
        header.classList.remove('smaller');  // Elimina la clase cuando vuelva al inicio
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const galleries = {
        "gallery-1": [
            "https://img.freepik.com/vector-premium/alquiler-bicicletas-ciudad-sistema-electronico-alquiler-bicicletas-alquiler-personas-bicicletas-servicio-inteligente-ilustracion-dibujos-animados_169479-332.jpg",
            "images/Swagger.png"
        ],
        "gallery-2": [
            "images/proyecto localidades inicio.png",
            "images/proyecto localidades vencimientos.png",
            "images/proyecto localidades buscar inmuebles.png",
            "images/proyecto localidades contribuyentes.png",
            "images/proyecto localidades buscar localidades.png",
            "images/proyecto localidades login.png"
        ]
    };

    let currentGallery = [];
    let currentIndex = 0;

    // Asocia eventos de clic a cada galería
    Object.keys(galleries).forEach((galleryId) => {
        const thumbnails = document.querySelectorAll(`#${galleryId} .thumbnail`);
        const images = galleries[galleryId];

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", function (event) {
                event.preventDefault();
                currentGallery = images;
                currentIndex = index;

                const modal = document.getElementById("image-modal");
                const modalImg = document.getElementById("modal-img");
                const caption = document.getElementById("caption");

                modal.style.display = "flex";
                modalImg.src = currentGallery[currentIndex];
                caption.textContent = `Imagen ${currentIndex + 1}`;
            });
        });
    });

    // Cierra el modal
    function closeModal(event) {
        const modal = document.getElementById("image-modal");
        if (event.target === modal || event.target.classList.contains("close")) {
            modal.style.display = "none";
        }
    }
    document.getElementById("image-modal").addEventListener("click", closeModal);

    // Cambia la imagen en el modal
    function changeImage(direction) {
        const modalImg = document.getElementById("modal-img");
        const caption = document.getElementById("caption");

        currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
        modalImg.src = currentGallery[currentIndex];
        caption.textContent = `Imagen ${currentIndex + 1}`;
    }

    document.getElementById("prevBtn").addEventListener("click", function (event) {
        event.preventDefault();
        changeImage(-1);
    });
    document.getElementById("nextBtn").addEventListener("click", function (event) {
        event.preventDefault();
        changeImage(1);
    });
});

// Asegurarse de que el DOM está cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    const modalCertificado = document.getElementById("modal-certificado");
    const captionCertificado = document.getElementById("caption-certificado");
  
    // Seleccionar todas las imágenes dentro de .certificados-container
    document.querySelectorAll(".certificados-container .certificado img").forEach(img => {
      img.addEventListener("click", () => {
        modalCertificado.style.display = "flex"; // Mostrar el modal
        let modalImg = document.getElementById("modal-image-certificado");
  
        // Si la imagen modal no existe, crearla
        if (!modalImg) {
          modalImg = document.createElement("img");
          modalImg.id = "modal-image-certificado";
          modalCertificado.insertBefore(modalImg, captionCertificado);
        }
  
        // Actualizar la fuente y el alt de la imagen modal
        modalImg.src = img.src;
        modalImg.alt = img.alt;
  
        // Agregar texto de subtítulo
//       captionCertificado.textContent = img.alt;
      });
    });
  
    // Función para cerrar el modal
    function closeModalCertificado() {
      modalCertificado.style.display = "none";
    }
  
    // Vincular el cierre del modal al clic fuera de la imagen
    modalCertificado.addEventListener("click", event => {
      if (event.target === modalCertificado) {
        closeModalCertificado();
      }
    });
  
    // Asignar función de cierre al botón
    document.querySelector(".close-certificado").addEventListener("click", closeModalCertificado);
  });
  