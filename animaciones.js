// ==========================================
// 1. EFECTOS VISUALES (Se ejecutan siempre)
// ==========================================

// Efecto de fondo interactivo
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.backgroundPosition = `${x}% ${y}%`;
});

// Reducir cabecera al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const firstSection = document.querySelector("section");
    
    if (window.scrollY > 50) {
        if(header) header.classList.add('smaller');
        if(firstSection) firstSection.style.paddingTop = "150px"; 
    } else {
        if(header) header.classList.remove('smaller');
        if(firstSection) firstSection.style.paddingTop = "300px"; 
    }
});

// ==========================================
// 2. LÓGICA PRINCIPAL (Al cargar la página)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    console.log("Scripts inicializados correctamente.");

    // ---------------------------------------------
    // A. GALERÍA DE PROYECTOS (MODAL LIGHTBOX)
    // ---------------------------------------------
    const projModal = document.getElementById("galleryModal");
    
    // Solo ejecutamos esto si el modal existe en el HTML
    if (projModal) {
        const projImg = projModal.querySelector("#modalImage");
        const projTitle = projModal.querySelector("#modalTitle");
        const projCountCurrent = projModal.querySelector("#currentIndex");
        const projCountTotal = projModal.querySelector("#totalImages");
        
        // Buscamos los botones DENTRO del modal para no afectar a "Acerca de mí"
        const projCloseBtn = projModal.querySelector(".close-modal");
        const projPrevBtn = projModal.querySelector(".prev-btn");
        const projNextBtn = projModal.querySelector(".next-btn");

        let currentGallery = [];
        let currentIndex = 0;

        // Función para pintar la imagen
        function showProjectImage() {
            if (!projImg || currentGallery.length === 0) return;
            projImg.src = currentGallery[currentIndex];
            if (projCountCurrent) projCountCurrent.textContent = currentIndex + 1;
            if (projCountTotal) projCountTotal.textContent = currentGallery.length;
        }

        // Función para mover (Next/Prev)
        function moveProjectGallery(direction) {
            if (currentGallery.length === 0) return;
            currentIndex += direction;
            // Bucle infinito
            if (currentIndex >= currentGallery.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = currentGallery.length - 1;
            showProjectImage();
        }

        // 1. Detectar clic en botones "Ver Más"
        document.querySelectorAll('.open-gallery').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.getAttribute('data-title');
                const galleryRaw = this.getAttribute('data-gallery');

                try {
                    currentGallery = JSON.parse(galleryRaw) || [];
                } catch (error) {
                    console.error("Error al leer imágenes:", error);
                    return;
                }

                if (currentGallery.length === 0) {
                    alert("No hay imágenes para mostrar.");
                    return;
                }

                // Configurar y abrir
                currentIndex = 0;
                if (projTitle) projTitle.textContent = title;
                showProjectImage();
                projModal.style.display = "flex"; 
            });
        });

        // 2. Eventos de controles (Flechas dentro del modal)
        if (projPrevBtn) projPrevBtn.addEventListener("click", () => moveProjectGallery(-1));
        if (projNextBtn) projNextBtn.addEventListener("click", () => moveProjectGallery(1));
        
        // 3. Cerrar modal
        const closeProjectModal = () => { projModal.style.display = "none"; };
        
        if (projCloseBtn) projCloseBtn.addEventListener("click", closeProjectModal);
        projModal.addEventListener("click", (e) => {
            if (e.target === projModal) closeProjectModal();
        });

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (projModal.style.display === "flex") {
                if (e.key === "Escape") closeProjectModal();
                if (e.key === "ArrowRight") moveProjectGallery(1);
                if (e.key === "ArrowLeft") moveProjectGallery(-1);
            }
        });
    }

    // ---------------------------------------------
    // B. MODAL DE CERTIFICADOS
    // ---------------------------------------------
    const certModal = document.getElementById("modal-certificado");
    
    if (certModal) {
        const certCaption = document.getElementById("caption-certificado");
        const certCloseBtn = certModal.querySelector(".close-certificado");

        document.querySelectorAll(".certificados-container .certificado img").forEach(img => {
            img.addEventListener("click", () => {
                certModal.style.display = "flex";
                
                let certModalImg = document.getElementById("modal-image-certificado");
                if (!certModalImg) {
                    certModalImg = document.createElement("img");
                    certModalImg.id = "modal-image-certificado";
                    // Insertar antes del texto si existe
                    if (certCaption) certModal.insertBefore(certModalImg, certCaption);
                    else certModal.appendChild(certModalImg);
                }
                
                certModalImg.src = img.src;
                certModalImg.alt = img.alt;
            });
        });

        const closeCertModal = () => { certModal.style.display = "none"; };

        if (certCloseBtn) certCloseBtn.addEventListener("click", closeCertModal);
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) closeCertModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (certModal.style.display === "flex" && e.key === "Escape") closeCertModal();
        });
    }

    // ---------------------------------------------
    // C. SLIDER DE ICONOS (Solución al problema de flechas)
    // ---------------------------------------------
    // Solo ejecutamos esto si existe un elemento .slider en el HTML
    // Esto evita que aparezcan flechas o errores en "Acerca de mí"
    const sliderContainer = document.querySelector('.slider');
    
    if (sliderContainer) {
        let sliderIndex = 0;
        const itemsToShow = 2;
        const sliderImages = document.querySelectorAll('.icon');
        const totalImages = sliderImages.length;

        // Solo si hay imágenes para mover
        if (totalImages > 0) {
            // Función interna para recalcular posición
            const updateSliderPosition = () => {
                const offset = -sliderIndex * (sliderImages[0].offsetWidth + 20);
                sliderContainer.style.transform = `translateX(${offset}px)`;
            };

            // Aquí puedes agregar lógica de botones SI tu HTML tiene botones para este slider específico
            // Si no, no agregamos nada para evitar conflictos.
            
            window.addEventListener("resize", updateSliderPosition);
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Inicializando Portfolio...");

    // ==========================================
    // 1. GALERÍA DE PROYECTOS (BOTÓN VER MÁS)
    // ==========================================
    const projModal = document.getElementById("galleryModal");
    
    // Solo ejecutamos si el modal existe (seguridad)
    if (projModal) {
        const projImg = projModal.querySelector("#modalImage");
        const projTitle = projModal.querySelector("#modalTitle");
        const projCountCurrent = projModal.querySelector("#currentIndex");
        const projCountTotal = projModal.querySelector("#totalImages");
        const projCloseBtn = projModal.querySelector(".close-modal");
        const projPrevBtn = projModal.querySelector(".prev-btn");
        const projNextBtn = projModal.querySelector(".next-btn");

        let currentGallery = [];
        let currentIndex = 0;

        // Mostrar imagen
        function showProjectImage() {
            if (!projImg || currentGallery.length === 0) return;
            projImg.src = currentGallery[currentIndex];
            if (projCountCurrent) projCountCurrent.textContent = currentIndex + 1;
            if (projCountTotal) projCountTotal.textContent = currentGallery.length;
        }

        // Mover galería
        function moveGallery(dir) {
            if (currentGallery.length === 0) return;
            currentIndex += dir;
            if (currentIndex >= currentGallery.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = currentGallery.length - 1;
            showProjectImage();
        }

        // Detectar CLIC en "Ver Más"
        document.querySelectorAll('.open-gallery').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.getAttribute('data-title');
                const galleryRaw = this.getAttribute('data-gallery');

                try {
                    currentGallery = JSON.parse(galleryRaw) || [];
                } catch (err) {
                    console.error("Error leyendo imágenes:", err);
                    return;
                }

                if (currentGallery.length === 0) {
                    alert("No hay imágenes cargadas.");
                    return;
                }

                currentIndex = 0;
                if (projTitle) projTitle.textContent = title;
                showProjectImage();
                projModal.style.display = "flex"; // Abre el modal
            });
        });

        // Controles dentro del modal
        if(projPrevBtn) projPrevBtn.addEventListener("click", () => moveGallery(-1));
        if(projNextBtn) projNextBtn.addEventListener("click", () => moveGallery(1));
        
        // Cerrar modal
        const closeProj = () => { projModal.style.display = "none"; };
        if(projCloseBtn) projCloseBtn.addEventListener("click", closeProj);
        projModal.addEventListener("click", (e) => {
            if (e.target === projModal) closeProj();
        });
    }

    // ==========================================
    // 2. MODAL DE CERTIFICADOS
    // ==========================================
    const certModal = document.getElementById("modal-certificado");
    if (certModal) {
        const certClose = certModal.querySelector(".close-certificado");
        
        document.querySelectorAll(".certificados-container .certificado img").forEach(img => {
            img.addEventListener("click", () => {
                certModal.style.display = "flex";
                let certImg = document.getElementById("modal-image-certificado");
                if (!certImg) {
                    certImg = document.createElement("img");
                    certImg.id = "modal-image-certificado";
                    certModal.appendChild(certImg);
                }
                certImg.src = img.src;
            });
        });

        const closeCert = () => { certModal.style.display = "none"; };
        if(certClose) certClose.addEventListener("click", closeCert);
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) closeCert();
        });
    }

    // ==========================================
    // 3. EFECTOS GLOBALES (Scroll y Fondo)
    // ==========================================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const firstSec = document.querySelector("section");
        if (window.scrollY > 50) {
            if(header) header.classList.add('smaller');
            if(firstSec) firstSec.style.paddingTop = "150px"; 
        } else {
            if(header) header.classList.remove('smaller');
            if(firstSec) firstSec.style.paddingTop = "300px"; 
        }
    });

    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.body.style.backgroundPosition = `${x}% ${y}%`;
    });
});