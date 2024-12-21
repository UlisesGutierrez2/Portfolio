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


document.addEventListener("DOMContentLoaded", function() {
    const images = [
        "https://img.freepik.com/vector-premium/alquiler-bicicletas-ciudad-sistema-electronico-alquiler-bicicletas-alquiler-personas-bicicletas-servicio-inteligente-ilustracion-dibujos-animados_169479-332.jpg", // Imagen 1
        "images/Swagger.png" // Imagen 2
    ];
    let currentIndex = 0; // Índice de la imagen actual

    // Mostrar la imagen inicial al hacer clic en la miniatura
    document.querySelector('.thumbnail').addEventListener("click", () => {
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-img");
        const caption = document.getElementById("caption");

        modal.style.display = "flex"; // Mostrar el modal
        modalImg.src = images[currentIndex]; // Establecer la imagen en el modal
        caption.textContent = `Imagen ${currentIndex + 1}`; // Mostrar descripción
    });

    // Función para cerrar el modal
    function closeModal(event) {
        const modal = document.getElementById("image-modal");

        // Si el clic es fuera de la imagen, se cierra el modal
        if (event.target === modal || event.target.classList.contains('close')) {
            modal.style.display = "none";
        }
    }
    // Asignar la función de cerrar a los eventos de clic en el modal
    const modal = document.getElementById("image-modal");
    modal.addEventListener("click", closeModal); // Cerrar si se hace clic fuera de la imagen


    // Función para cambiar la imagen (siguiente o anterior)
    function changeImage(direction) {
        const modalImg = document.getElementById("modal-img");
        const caption = document.getElementById("caption");

        // Actualizar el índice de la imagen actual
        currentIndex = (currentIndex + direction + images.length) % images.length;

        // Establecer la nueva imagen en el modal
        modalImg.src = images[currentIndex];
        caption.textContent = `Imagen ${currentIndex + 1}`; // Actualizar descripción
    }

    // Asignar la función de cambio a los botones de navegación
    document.getElementById("prevBtn").addEventListener("click", function() {
        changeImage(-1);
    });
    document.getElementById("nextBtn").addEventListener("click", function() {
        changeImage(1);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const images1 = [
        "images/proyecto localidades inicio.png", // Imagen 1
        "images/proyecto localidades vencimientos.png", // Imagen 2
        "images/proyecto localidades buscar inmuebles.png", // Imagen 3
        "images/proyecto localidades contribuyentes.png", // Imagen 4
        "images/proyecto localidades buscar localidades.png", // Imagen 5
        "images/proyecto localidades login.png"  // Imagen 6
    ];

    let currentIndex = 0; // Índice de la imagen actual

    // Mostrar la imagen seleccionada al hacer clic en la miniatura
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function(event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado
            currentIndex = index; // Actualiza el índice al hacer clic en la miniatura
            const modal = document.getElementById("image-modal");
            const modalImg = document.getElementById("modal-img");
            const caption = document.getElementById("caption");

            modal.style.display = "flex"; // Mostrar el modal
            modalImg.src = images1[currentIndex]; // Establecer la imagen en el modal
            caption.textContent = `Imagen ${currentIndex + 1}`; // Mostrar descripción
        });
    });

    // Función para cerrar el modal
    function closeModal(event) {
        const modal = document.getElementById("image-modal");

        // Si el clic es fuera de la imagen, se cierra el modal
        if (event.target === modal || event.target.classList.contains('close')) {
            modal.style.display = "none";
        }
        event.preventDefault(); // Evitar el comportamiento predeterminado
    }

    // Asignar la función de cerrar a los eventos de clic en el modal
    const modal = document.getElementById("image-modal");
    modal.addEventListener("click", closeModal); // Cerrar si se hace clic fuera de la imagen

    // Función para cambiar la imagen (siguiente o anterior)
    function changeImage(direction) {
        const modalImg = document.getElementById("modal-img");
        const caption = document.getElementById("caption");

        // Actualizar el índice de la imagen actual
        currentIndex = (currentIndex + direction + images1.length) % images1.length;

        // Establecer la nueva imagen en el modal
        modalImg.src = images1[currentIndex];
        caption.textContent = `Imagen ${currentIndex + 1}`; // Actualizar descripción
    }

    // Asignar la función de cambio a los botones de navegación
    document.getElementById("prevBtn").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar comportamiento predeterminado
        changeImage(-1);
    });
    document.getElementById("nextBtn").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar comportamiento predeterminado
        changeImage(1);
    });
});
