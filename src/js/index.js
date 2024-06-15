/* Dependencies:
    spin-wheel https://github.com/CrazyTim/spin-wheel
    sparkly-view https://github.com/myway42/sparkly
    night-sky https://github.com/H0rn0chse/NightSky
*/
import '@myway42/sparkly';
import { mainMenu } from './main-menu.js';
import { LettersAnimator } from './animate-letters.ts';

document.addEventListener('DOMContentLoaded', () => {
    mainMenu();
    const lettersAnimator = new LettersAnimator();
    lettersAnimator.animate();
});
