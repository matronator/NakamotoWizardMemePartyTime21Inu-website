import { shuffle } from '../utils';

class LogoElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const wrapper = document.createElement('span');
        wrapper.classList.add('logo-wrapper');

        const colors = [
            'text-orange-500',
            'text-sky-500',
            'text-black dark:text-white',
            'text-green-500',
            'text-red-500',
            'text-pink-600',
            'text-rose-500',
            'text-yellow-600 dark:text-yellow-400',
            'text-fuchsia-700 dark:text-fuchsia-300',
            'text-lime-600 dark:text-lime-400',
            'text-slate-700 dark:text-slate-300',
            'text-blue-500',
            'text-purple-600 dark:text-purple-400',
            'text-amber-600 dark:text-amber-400',
            'text-indigo-700 dark:text-indigo-300',
        ];

        shuffle(colors);

        wrapper.innerHTML = `<sparkly-view><span class="inline-flex ${colors[0]} ff-yatra-one -rotate-6" data-hover-letters="flip-back" data-animate-letters>Nakamoto</span><span class="inline-flex ff-jacquard-12 ${colors[1]} rotate-12" data-animate-letters data-hover-letters="flip-back">Wizard</span><span class="ff-anton ${colors[2]}" data-animate-letters data-hover-letters="flip-back">Meme</span><span class="inline-flex ${colors[3]} -rotate-6 ff-sriracha" data-animate-letters data-hover-letters="flip-back">PartyTime</span><span class="inline-flex ff-black-ops-one rotate-12 ${colors[4]}" data-animate-letters data-hover-letters="flip-back">21</span> <span class="inline-flex ${colors[5]} ff-comfortaa -rotate-6" data-animate-letters data-hover-letters="flip-back">Inu</span></sparkly-view>`;
        wrapper.querySelectorAll('span').forEach(el => {
            el.style.lineHeight = 'normal';
        });
        this.appendChild(wrapper);
    }
}

customElements.define('logo-element', LogoElement);
