// Efecto Typewriter para títulos de "Acerca de mí"

class TypewriterEffect {
    constructor(elementSelector, speed = 50, delay = 0) {
        this.elements = document.querySelectorAll(elementSelector);
        this.speed = speed; // ms entre caracteres
        this.delay = delay; // ms antes de empezar
        this.hasAnimated = new Set(); // Track qué elementos ya se animaron
    }

    async typeText(element) {
        const originalText = element.textContent;
        element.textContent = ''; // Limpiar contenido
        
        // Wait for delay
        await new Promise(resolve => setTimeout(resolve, this.delay));

        // Tipear cada carácter
        for (let i = 0; i < originalText.length; i++) {
            element.textContent += originalText[i];
            await new Promise(resolve => setTimeout(resolve, this.speed));
        }
    }

    async animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Cuando el elemento entra al viewport
                if (entry.isIntersecting && !this.hasAnimated.has(entry.target)) {
                    this.hasAnimated.add(entry.target);
                    this.typeText(entry.target);
                    // Dejar de observar después de animar
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Trigger cuando está 50% visible

        this.elements.forEach(element => observer.observe(element));
    }

    // Opción: animar todos inmediatamente (sin esperar scroll)
    async animateAll() {
        for (let element of this.elements) {
            if (!this.hasAnimated.has(element)) {
                this.hasAnimated.add(element);
                await this.typeText(element);
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Typewriter para el h3 principal (título profesional)
    const mainTitle = new TypewriterEffect('.about-intro h3', 40, 100);
    mainTitle.animateOnScroll();

    // Typewriter para los h4 (títulos de highlights)
    const highlightTitles = new TypewriterEffect('.highlight-item h4', 35, 50);
    highlightTitles.animateOnScroll();
});
