/*parte las las fotos de la boda*/
let items = document.querySelectorAll('.slider .item');

let active = 3; // Índice del elemento activo
let startX = 0;
let isDragging = false;

function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

function handleGesture(deltaX) {
    if (deltaX > 50) {
        // Desplazar hacia la derecha
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    } else if (deltaX < -50) {
        // Desplazar hacia la izquierda
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
}

// Añadir funcionalidad de clic para mover
document.querySelector('.slider').addEventListener('click', (e) => {
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - sliderRect.left;

    if (clickX < sliderRect.width / 2) {
        // Si el clic está en la mitad izquierda, mover hacia la derecha
        active = active - 1 >= 0 ? active - 1 : active;
    } else {
        // Si el clic está en la mitad derecha, mover hacia la izquierda
        active = active + 1 < items.length ? active + 1 : active;
    }

    loadShow();
});

// Eventos táctiles para móviles
document.querySelector('.slider').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.slider').addEventListener('touchmove', (e) => {
    e.preventDefault(); // Evitar el scroll mientras se desliza
});

document.querySelector('.slider').addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    handleGesture(startX - endX);
});

// Eventos de mouse para escritorio
document.querySelector('.slider').addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

document.querySelector('.slider').addEventListener('mousemove', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
});

document.querySelector('.slider').addEventListener('mouseup', (e) => {
    if (isDragging) {
        const endX = e.clientX;
        handleGesture(startX - endX);
        isDragging = false;
    }
});

// Evitar la selección de texto mientras se arrastra
document.querySelector('.slider').addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
    }
});

loadShow();
/**************************************** */

