/* Dependencies:
    spin-wheel https://github.com/CrazyTim/spin-wheel
    sparkly-view https://github.com/myway42/sparkly
    night-sky https://github.com/H0rn0chse/NightSky
*/
import '@myway42/sparkly';
import '@appnest/masonry-layout';
import './import/logo.ts';
import { LettersAnimator } from './import/animate-letters.ts';
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

    const infiniteScroll = new InfiniteScroll();
});
