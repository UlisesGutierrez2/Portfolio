// Datos de las habilidades técnicas
const skillsData = {
    'web-dev': {
        title: 'Web Development',
        description: 'Desarrollo de aplicaciones web full stack utilizando tecnologías modernas. Capaz de crear interfaces responsivas y backends robustos que funcionen en cualquier dispositivo.'
    },
    'git': {
        title: 'Git & Version Control',
        description: 'Gestión avanzada de repositorios y control de versiones. Manejo de workflows colaborativos, merge strategy y buenas prácticas en equipo.'
    },
    'api': {
        title: 'APIs RESTful',
        description: 'Diseño e implementación de servicios escalables siguiendo principios REST. Creación de endpoints seguros, documentados y fáciles de consumir.'
    },
    'database': {
        title: 'Bases de Datos',
        description: 'Definición de tablas, relaciones entre entidades y optimización de queries. Experiencia con SQLite y manejo eficiente de datos.'
    },
    'spring': {
        title: 'Spring Boot',
        description: 'Framework Java para desarrollo de aplicaciones backend. Experiencia con JPA, inyección de dependencias y arquitectura de microservicios.'
    },
    'express': {
        title: 'Express.js',
        description: 'Framework minimalista de Node.js para crear APIs y aplicaciones web. Manejo de rutas, middleware y validación de datos.'
    },
    'testing': {
        title: 'Testing Unitario',
        description: 'Pruebas unitarias y automatizadas para garantizar la calidad del código. Cobertura de código y detección temprana de bugs.'
    },
    'scrum': {
        title: 'Scrum',
        description: 'Capacidad para trabajar con metodologías ágiles (Scrum). Sprints, retrospectivas y entregas iterativas de valor.'
    },
    'docker': {
        title: 'Docker',
        description: 'Containerización de aplicaciones. Creación de imágenes optimizadas, multi-stage builds y gestión eficiente de contenedores.'
    },
    'microservicios': {
        title: 'Microservicios',
        description: 'Despliegue y configuración de microservicios utilizando contenedores con buenas prácticas de integración y escalabilidad.'
    },
    'cicd': {
        title: 'CI/CD GitLab',
        description: 'Implementación de pipelines CI/CD en GitLab para automatizar pruebas, builds y despliegues de microservicios de forma continua.'
    },
    'ssl': {
        title: 'SSL Automation',
        description: 'Automatización de certificados SSL en Dockerfile para builds seguros. Manejo de secretos y buenas prácticas de seguridad sin exposición de claves.'
    }
};

// Datos de las habilidades blandas
const softSkillsData = {
    'teamwork': {
        title: 'Trabajo en Equipo',
        description: 'Capacidad para colaborar efectivamente con otros, compartir responsabilidades y alcanzar objetivos comunes. Experiencia trabajando en proyectos grupales con metodologías ágiles.'
    },
    'time-management': {
        title: 'Gestión del Tiempo',
        description: 'Habilidad para organizar y priorizar tareas, cumplir deadlines y optimizar el uso del tiempo en proyectos con múltiples responsabilidades.'
    },
    'adaptability': {
        title: 'Adaptabilidad',
        description: 'Flexibilidad para aprender nuevas metodologías, lenguajes de programación y tecnologías según las necesidades del proyecto o contexto laboral.'
    },
    'problem-solving': {
        title: 'Resolución de Problemas',
        description: 'Pensamiento crítico para analizar problemas complejos, identificar soluciones efectivas y tomar decisiones fundamentadas bajo presión.'
    },
    'creativity': {
        title: 'Creatividad e Innovación',
        description: 'Capacidad para pensar fuera de lo convencional, proponer soluciones innovadoras ante problemáticas complejas y mejorar procesos existentes.'
    },
    'learning': {
        title: 'Disposición al Aprendizaje',
        description: 'Motivación constante por adquirir nuevos conocimientos, mantenerse actualizado con tendencias tecnológicas y desarrollar nuevas competencias.'
    },
    'leadership': {
        title: 'Liderazgo',
        description: 'Capacidad para guiar equipos, tomar decisiones estratégicas, inspirar a otros y asumir responsabilidades en contextos colaborativos.'
    },
    'communication': {
        title: 'Comunicación Efectiva',
        description: 'Habilidad para expresar ideas de forma clara, escuchar activamente a otros y facilitar la comprensión en diferentes contextos profesionales.'
    }
};

// Elementos del DOM - Habilidades T�cnicas
const skillTags = document.querySelectorAll('.skill-tag[data-skill]');
const skillModal = document.getElementById('skill-modal');
const skillModalTitle = document.getElementById('skill-modal-title');
const skillModalDescription = document.getElementById('skill-modal-description');
const skillModalClose = document.querySelector('.skill-modal-close');

// Elementos del DOM - Habilidades Blandas
const softSkillTags = document.querySelectorAll('.skill-tag[data-soft-skill]');
const softSkillModal = document.getElementById('soft-skill-modal');
const softSkillModalTitle = document.getElementById('soft-skill-modal-title');
const softSkillModalDescription = document.getElementById('soft-skill-modal-description');
const softSkillModalClose = document.querySelector('.skill-modal-close');

// Event listeners - Habilidades T�cnicas
skillTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        const skillId = tag.getAttribute('data-skill');
        const skill = skillsData[skillId];
        
        if (skill) {
            skillModalTitle.textContent = skill.title;
            skillModalDescription.textContent = skill.description;
            skillModal.classList.add('active');
        }
    });
});

// Event listeners - Habilidades Blandas
softSkillTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        const softSkillId = tag.getAttribute('data-soft-skill');
        const softSkill = softSkillsData[softSkillId];
        
        if (softSkill) {
            softSkillModalTitle.textContent = softSkill.title;
            softSkillModalDescription.textContent = softSkill.description;
            softSkillModal.classList.add('active');
        }
    });
});

// Cerrar modales - Habilidades T�cnicas
skillModalClose.addEventListener('click', () => {
    skillModal.classList.remove('active');
});

skillModal.addEventListener('click', (e) => {
    if (e.target === skillModal) {
        skillModal.classList.remove('active');
    }
});

// Cerrar modales - Habilidades Blandas
const softSkillModalCloseBtn = document.querySelector('#soft-skill-modal .skill-modal-close');
if (softSkillModalCloseBtn) {
    softSkillModalCloseBtn.addEventListener('click', () => {
        softSkillModal.classList.remove('active');
    });
}

if (softSkillModal) {
    softSkillModal.addEventListener('click', (e) => {
        if (e.target === softSkillModal) {
            softSkillModal.classList.remove('active');
        }
    });
}

// Cerrar modales con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        skillModal.classList.remove('active');
        if (softSkillModal) {
            softSkillModal.classList.remove('active');
        }
    }
});
