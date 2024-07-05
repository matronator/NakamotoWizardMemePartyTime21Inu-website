/* Dependencies:
    spin-wheel https://github.com/CrazyTim/spin-wheel
    sparkly-view https://github.com/myway42/sparkly
    night-sky https://github.com/H0rn0chse/NightSky
*/
import '@myway42/sparkly';
import '@vanillawc/wc-blink';
import 'iconify-icon';
import './import/logo.ts';
import './import/darkmode-toggle.ts';
import { LettersAnimator } from './import/animate-letters.ts';
import { createCursor } from './import/cursor.ts';
import { InfiniteScroll } from './import/infinite-scroll.ts';
import { mainMenu } from './import/main-menu.js';
import {
    register, revealHeadings, revealLetters, revealParagraphs
} from './import/scroll-animations.ts';

register();

document.addEventListener('DOMContentLoaded', () => {
    mainMenu();
    const lettersAnimator = new LettersAnimator();
    lettersAnimator.animate();
    revealHeadings();
    revealLetters();
    revealParagraphs();
    createCursor();

    const infiniteScroll = new InfiniteScroll();
});
