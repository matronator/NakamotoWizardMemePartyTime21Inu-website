import { Wheel } from '../../node_modules/spin-wheel/dist/spin-wheel-esm.js';
import ls from 'localstorage-slim';
import {Howl, Howler} from 'howler';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

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
    const menuDialog = mainMenu.querySelector('.main-menu-wheel-wrapper');
    const menuWheel = mainMenu.querySelector('.main-menu-wheel');

    if (!menuWheel || !menuToggle || !menuDialog) return;

    /** @type {Wheel} */
    const wheel = initWheel();

    menuToggle.addEventListener('click', () => {
        if (!menuDialog.open) {
            mainMenu.dataset.menuOpen = 'true';
            menuDialog.showModal();
            wheel.resize();
        } else {
            mainMenu.dataset.menuOpen = 'false';
            menuDialog.close();
        }
    });

    const menuCloseButton = mainMenu.querySelector('.main-menu-close');
    if (menuCloseButton) {
        menuCloseButton.addEventListener('click', () => {
            mainMenu.dataset.menuOpen = 'false';
            menuDialog.close();
        });
    }

    ['mousedown', 'touchstart'].forEach((event) => {
        menuDialog.addEventListener(event, (e) => {
            ls.set('wheelClickTarget', e.target.outerHTML);
        });
    });

    ['mouseup', 'touchend'].forEach((event) => {
        menuDialog.addEventListener(event, (e) => {
            const wheelClickTarget = ls.get('wheelClickTarget');
            if (e.target !== menuDialog || e.target.outerHTML !== wheelClickTarget) return;
            mainMenu.dataset.menuOpen = 'false';
            menuDialog.close();
        });
    });

    menuDialog.close();

    wheel.onRest = function(event) {
        const index = event.currentIndex;
        const item = menuItems[index];
        const itemEl = document.getElementById(item.label.toLowerCase());
        if (itemEl) {
            const linkST = ScrollTrigger.create({ trigger: itemEl, start: "top top" });
            gsap.to(window, { duration: 0.5, scrollTo: linkST.start, overwrite: "auto", ease: 'power4' });
        }
    }

    const tickSounds = [
        new URL('../../assets/audio/tick.mp3', import.meta.url).toString(),
        new URL('../../assets/audio/tick.ogg', import.meta.url).toString(),
        new URL('../../assets/audio/tick.webm', import.meta.url).toString(),
    ];
    const tickSound = new Howl({
        src: tickSounds,
    });

    wheel.onCurrentIndexChange = function() {
        tickSound.play();
    }

    setTimeout(() => {
        menuDialog.classList.remove('initializing');
    }, 500);
}

/** @returns {Wheel} */
function initWheel() {
    const wheelURL = new URL('../../assets/wheel2.png', import.meta.url);
    const props = {
        items: menuItems,
        overlayImage: wheelURL.toString(),
        radius: 0.68,
        borderWidth: 0,
        lineWidth: 0,
        itemBackgroundColors: ['#43a1cd', '#9ac147', '#639b47', '#e1e23b', '#f7941e', '#ba3e2e'],
        // itemLabelColors: ['#fff', '#eee', '#ddd'],
        itemLabelColors: ['#000'],
        // itemLabelStrokeColor: '#000',
        // itemLabelStrokeWidth: 1,
        itemLabelFont: "'Jost', sans-serif",
        rotationResistance: -150,
        rotationSpeedMax: 750,
        pixelRatio: devicePixelRatio,
    };

    const container = document.querySelector('.main-menu-wheel');

    return new Wheel(container, props);
}
