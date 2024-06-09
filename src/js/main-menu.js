import { Wheel } from '../../node_modules/spin-wheel/dist/spin-wheel-esm.js';

const menuItems = [
    {
        label: 'Home',
    },
    {
        label: 'About',
    },
    {
        label: 'Buy',
    },
    {
        label: 'Tokenomics',
    },
    {
        label: 'Team',
    },
    {
        label: 'Memes',
    },
];

export function mainMenu() {
    const mainMenu = document.querySelector('.main-menu');

    if (!mainMenu) return;

    const menuToggle = mainMenu.querySelector('.main-menu-toggle');
    /** @type {HTMLDialogElement} */
    const menuWheelWrapper = mainMenu.querySelector('.main-menu-wheel-wrapper');
    const menuWheel = mainMenu.querySelector('.main-menu-wheel');

    if (!menuWheel || !menuToggle) return;
    
    menuToggle.addEventListener('click', () => {
        if (mainMenu.dataset.menuOpen !== 'true') {
            mainMenu.dataset.menuOpen = 'true';
            menuWheelWrapper.showModal();
            } else {
            mainMenu.dataset.menuOpen = 'false';
            menuWheelWrapper.close();
        }
    });

    const menuCloseButton = mainMenu.querySelector('.main-menu-close');
    if (menuCloseButton) {
        menuCloseButton.addEventListener('click', () => {
            mainMenu.dataset.menuOpen = 'false';
            menuWheelWrapper.close();
        });
    }

    /** @type {Wheel} */
    const wheel = initWheel();

    wheel.onRest = function(event) {
        const index = event.currentIndex;
        const item = menuItems[index];
        const itemEl = document.getElementById(item.label.toLowerCase());
        if (itemEl) {
            itemEl.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

/** @returns {Wheel} */
function initWheel() {
    const wheelURL = new URL('../../assets/wheel.png', import.meta.url);
    const props = {
        items: menuItems,
        overlayImage: wheelURL.toString(),
        radius: 0.68,
        borderWidth: 0,
        lineWidth: 0,
        itemBackgroundColors: ['#fff', '#eee', '#ddd'],
        rotationResistance: -175,
        rotationSpeedMax: 750,
        pixelRatio: devicePixelRatio,
    };

    const container = document.querySelector('.main-menu-wheel');

    return new Wheel(container, props);
}
