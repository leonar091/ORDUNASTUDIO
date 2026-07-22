// Menú hamburguesa para móvil
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header .contenedor');
    
    // Crear el botón hamburguesa
    if (!document.querySelector('.menu-toggle')) {
        const toggle = document.createElement('span');
        toggle.className = 'menu-toggle';
        toggle.textContent = '☰';
        toggle.style.fontSize = '30px';
        toggle.style.color = '#fff';
        toggle.style.cursor = 'pointer';
        
        const navElement = document.querySelector('nav');
        header.insertBefore(toggle, navElement);
        
        toggle.addEventListener('click', function() {
            nav.classList.toggle('activo');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('activo');
        });
    });
});

// Desplazamiento suave al hacer clic en los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('🚀 ¡Bienvenido a TuAgencia! Web creada desde cero con ❤️');