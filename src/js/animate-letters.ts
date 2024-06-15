import { randomRange } from './utils';

interface Word {
    element: HTMLElement;
    text: string | null;
    letters: NodeListOf<HTMLElement>;
}

export class LettersAnimator {
    private elements: NodeListOf<Element>;
    private words: Word[];

    constructor() {
        this.elements = document.querySelectorAll('[data-animate-letters]');
        this.words = [];
        this.elements.forEach((el) => {
            const text = el.textContent ?? '';
            el.innerHTML = text.replace(/\S/g, '<span class="letter" data-animated-letter>$&</span>');
            this.words.push({
                element: el as HTMLElement,
                text: text,
                letters: el.querySelectorAll('[data-animated-letter]'),
            });
        });
    }
    
    animate() {
        this.words.forEach((word) => {
            word.element.style.setProperty('--letter-animation', word.element.getAttribute('data-animate-letters'));
            word.letters.forEach((letter, index) => {
                letter.classList.add('animate');
                letter.style.setProperty('--delay', `${index * 100}ms`);
                letter.style.setProperty('--value', `${randomRange(-200, -75)}%`);
                letter.style.setProperty('--duration', `${randomRange(0.5, 1.5)}s`);
            });
        })
    }
}
