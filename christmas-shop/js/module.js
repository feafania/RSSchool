const burgerMenu = document.querySelector('.burger-menu');

const navigationMenu = document.querySelector('.nav-menu');
const navigationLinks = document.querySelectorAll('.nav-menu-item');

let modalWindow;
let modalCloseButton;

function setInactive(elementActive, variant = 1) {
    if (variant === 1) {
        elementActive.classList.add('inactive');
    } else {
        elementActive.classList.remove('inactive');
    }
}

function openModalWindow(numberArray) {
    if (overlay) {
        overlay.classList.add('active');
        document.body.classList.add('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.add('active');
        fillModalWindow(numberArray);
    }
    burgerMenu.style.zIndex = '800';
}

function closeModalWindow() {
    if (overlay) {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.remove('active');
    }
    burgerMenu.style.zIndex = '999';
}

function hideMenu() {
    if (burgerMenu) {
        burgerMenu.classList.remove('active');
    }
    if (navigationMenu) {
        navigationMenu.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.classList.remove('no-scroll');
}

document.addEventListener('DOMContentLoaded', () => {
    function handleClickOutside(event) {
        if (navigationMenu.classList.contains('active')) {
            if (modalWindow) {
                if (modalWindow.classList.contains('active')) {
                    return;
                }
            }
            if (!navigationMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
                hideMenu();
            }
        }
    }

    function toggleMenu() {
        if (window.innerWidth <= 768) {
            if (modalWindow) {
             if (modalWindow.classList.contains('active')) {
                 return;
             }
            }
            burgerMenu.classList.toggle('active');
            if (navigationMenu) {
                navigationMenu.classList.toggle('active');
            }
            if (navigationMenu.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }
    }

    function handleResize() {
        calculateCards(); // Пересчитать количество карточек
        if (window.innerWidth > 768) {
            if (modalWindow) {
                if (modalWindow.classList.contains('active')) {
                    return;
                }
            }
            if (navigationMenu) {
                navigationMenu.classList.remove('action-large');
            }
            hideMenu()
        }
        else {
            if (navigationMenu) {
                navigationMenu.classList.add('action-large');
            }
        }
        if (modalWindow) {
            const screenWidthMinus16 = window.innerWidth - 16;
            modalWindow.style.maxWidth = `${Math.min(screenWidthMinus16, 400)}px`;
        }
    }

    calculateCards();
    loadGifts()
        .then(data => {
            gifts = data;
            calculateCards();
            createCards();
        });
    createCards();

    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    handleResize();
    document.addEventListener('click', handleClickOutside);
    navigationLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeModalWindow);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModalWindow();
        }
    })
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching footer:', error));

    fetch('modal.html')
        .then(response => response.text())
        .then(data => {
            const template = document.createElement('template');
            template.innerHTML = data;
            document.body.appendChild(template.content.cloneNode(true));
            const skillElement = document.getElementById('skill-template');
            const originalSnowflake = skillElement.content.querySelector('.modal-superpowers__snowflake');
            if (originalSnowflake) {
                for (let i = 0; i < 4; i++) {
                    const clone = originalSnowflake.cloneNode(true);
                    originalSnowflake.insertAdjacentElement('afterend', clone);
                }
            }
            modalWindow = document.querySelector('.modal-window');
            modalCloseButton = document.querySelector('.modal-close-button');
            if (modalCloseButton) {
                modalCloseButton.addEventListener('click', closeModalWindow);
            }

        });
});