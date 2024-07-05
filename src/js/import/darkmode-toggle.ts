import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class DarkModeToggle extends HTMLElement {
    siteBg: HTMLDivElement;

    constructor() {
        super();
        this.siteBg = document.getElementById('site-bg') as HTMLDivElement;
    }

    static observedAttributes = ['state'];

    connectedCallback() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('sky-switch-wrapper');

        wrapper.innerHTML = `<style>
    :root {
        --px-color-bodybg: rgb(235, 240, 250);
        --px-shadow-app: inset 5px 5px 3px 0px rgba(210, 220, 240, 1), inset -5px -5px 3px 0px rgba(255, 255, 255, 1);
        --px-color-skyday: linear-gradient(0deg, rgb(0, 162, 213) 0%, rgb(0, 224, 255) 100%);
        --px-color-skynight: linear-gradient(0deg, rgb(0, 20, 70) 0%, rgb(0, 70, 150) 100%);
        --px-color-btnbg: rgb(255, 246, 193);
        --px-color-btnbg-active: rgb(245, 245, 245);
        --px-shadow-btn: inset 1px 1px 1px 0px rgba(255, 255, 255, 1), inset -1px -1px 1px 0px rgba(0, 0, 0, 0.3);
        --px-skyswitch-width: 70px;
        --px-skyswitch-height: 35px;
    }

    body {
        width: 100%;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        background-color: var(--px-color-bodybg);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .px-app,
    .px-app *,
    .px-app *::before,
    .px-app *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        --px-skyswitch-gap: calc(var(--px-skyswitch-height) / 10);
    }

    .px-app {
        position: relative;
        width: calc(var(--px-skyswitch-width) + (var(--px-skyswitch-gap) * 4));
        height: calc(var(--px-skyswitch-height) + (var(--px-skyswitch-gap) * 4));
        padding: calc(var(--px-skyswitch-gap) * 2);
        border-radius: calc((var(--px-skyswitch-height) + (var(--px-skyswitch-gap) * 4) / 2));
        box-shadow: var(--px-shadow-app);
    }

    .px-skyswitch {
        position: relative;
        width: var(--px-skyswitch-width);
        height: var(--px-skyswitch-height);
    }

    .px-skyswitch>input[type=checkbox] {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }

    .px-skyswitch>.px-skyswitch-sky {
        position: relative;
        width: 100%;
        height: 100%;
        padding: var(--px-skyswitch-gap);
        border-radius: calc(var(--px-skyswitch-height) / 2);
        pointer-events: none;
        overflow: hidden;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-day {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: var(--px-color-skyday);
        opacity: 1;
        transition: opacity 300ms ease-in-out;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-day {
        opacity: 0;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-day>div {
        position: absolute;
        width: calc(var(--px-skyswitch-height) / 2);
        height: calc(var(--px-skyswitch-height) / 2);
        transition: top 500ms cubic-bezier(.36, 1.02, .52, 1.45);
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-day>div:nth-child(1) {
        left: 50%;
        top: 45%;
        font-size: calc(var(--px-skyswitch-width) / 4);
        color: rgba(255, 255, 255, 0.7);
        transition-delay: 150ms;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-day>div:nth-child(1) {
        top: 100%;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-day>div:nth-child(2) {
        left: 40%;
        top: 10%;
        font-size: calc(var(--px-skyswitch-width) / 5);
        color: rgba(255, 255, 255, 0.5);
        transition-delay: 200ms;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-day>div:nth-child(2) {
        top: 100%;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-day>div:nth-child(3) {
        left: 75%;
        top: 20%;
        font-size: calc(var(--px-skyswitch-width) / 6);
        color: rgba(255, 255, 255, 0.3);
        transition-delay: 100ms;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-day>div:nth-child(3) {
        top: 100%;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-night {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: var(--px-color-skynight);
        opacity: 0;
        transition: opacity 300ms ease-in-out;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-night {
        opacity: 1;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-night>div {
        position: absolute;
        width: calc(var(--px-skyswitch-height) / 2);
        height: calc(var(--px-skyswitch-height) / 2);
        transition: top 500ms cubic-bezier(.36, 1.02, .52, 1.45);
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-night>div:nth-child(1) {
        left: 40%;
        top: 100%;
        font-size: calc(var(--px-skyswitch-width) / 10);
        color: rgba(255, 255, 255, 0.8);
        transition-delay: 100ms;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-night>div:nth-child(1) {
        top: 20%;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-night>div:nth-child(2) {
        left: 10%;
        top: 100%;
        font-size: calc(var(--px-skyswitch-width) / 9);
        color: rgba(255, 255, 255, 0.75);
        transition-delay: 200ms;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-night>div:nth-child(2) {
        top: 30%;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-night>div:nth-child(3) {
        left: 25%;
        top: 100%;
        font-size: calc(var(--px-skyswitch-width) / 8);
        color: rgba(255, 255, 255, 0.7);
        transition-delay: 150ms;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-night>div:nth-child(3) {
        top: 50%;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-track {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .px-skyswitch>.px-skyswitch-sky>.px-skyswitch-track>.px-skyswitch-btn {
        position: absolute;
        width: calc(var(--px-skyswitch-height) - (var(--px-skyswitch-gap) * 2));
        height: calc(var(--px-skyswitch-height) - (var(--px-skyswitch-gap) * 2));
        left: 0;
        top: 0;
        border-radius: 50%;
        background-color: var(--px-color-btnbg);
        box-shadow: var(--px-shadow-btn);
        transition: left 300ms ease-in-out, background-color 300ms ease-in-out;
    }

    .px-skyswitch>input[type=checkbox]:checked~.px-skyswitch-sky>.px-skyswitch-track>.px-skyswitch-btn {
        left: calc(100% - (var(--px-skyswitch-height) - (var(--px-skyswitch-gap) * 2)));
        background-color: var(--px-color-btnbg-active);
    }
</style>

<div class="px-app">
    <div class="px-skyswitch">
        <input type="checkbox" checked id="dark-mode-toggle-checkbox">
        <div class="px-skyswitch-sky">
            <div class="px-skyswitch-day">
                <div>
                    <iconify-icon icon="line-md:cloud-loop"></iconify-icon>
                </div>
                <div>
                    <iconify-icon icon="line-md:cloud-loop"></iconify-icon>
                </div>
                <div>
                    <iconify-icon icon="line-md:cloud-loop"></iconify-icon>
                </div>
            </div>
            <div class="px-skyswitch-night">
                <div>
                    <iconify-icon icon="mdi:star"></iconify-icon>
                </div>
                <div>
                    <iconify-icon icon="mdi:star"></iconify-icon>
                </div>
                <div>
                    <iconify-icon icon="mdi:star"></iconify-icon>
                </div>
            </div>
            <div class="px-skyswitch-track">
                <div class="px-skyswitch-btn"></div>
            </div>
        </div>
    </div>
</div>`;

        gsap.registerPlugin(ScrollTrigger);

        const input = wrapper.querySelector('#dark-mode-toggle-checkbox') as HTMLInputElement;
        input.addEventListener('change', () => {
            this.setAttribute('state', input.checked ? 'on' : 'off');
        });

        if (localStorage.getItem('dark-mode') === null || localStorage.getItem('dark-mode') === 'on') {
            localStorage.setItem('dark-mode', 'on');
            document.body.classList.add('dark');
            input.checked = true;
            input.value = 'on';
            this.setAttribute('state', 'on');
            this.renderDarkmodeBackground();
        } else {
            document.body.classList.remove('dark');
            input.checked = false;
            input.value = 'off';
            this.setAttribute('state', 'off');
            this.renderLightmodeBackground();
        }

        this.appendChild(wrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'state') {
            const input = this.querySelector('#dark-mode-toggle-checkbox') as HTMLInputElement;
            if (!input) return;
            input.checked = newValue === 'on';
            localStorage.setItem('dark-mode', newValue);
            if (newValue === 'on' && oldValue !== 'on') {
                document.body.classList.add('dark');
                this.siteBg.innerHTML = '';
                this.renderDarkmodeBackground();
            } else if (newValue === 'off' && oldValue !== 'off') {
                document.body.classList.remove('dark');
                this.siteBg.innerHTML = '';
                this.renderLightmodeBackground();
            }
        }
    }

    private renderDarkmodeBackground() {
        const darkmodeBg = document.getElementById('darkmode-bg') as HTMLTemplateElement;
        const clone = darkmodeBg.content.cloneNode(true);
        this.siteBg.appendChild(clone);
    }

    private renderLightmodeBackground() {
        const lightmodeBg = document.getElementById('lightmode-bg') as HTMLTemplateElement;
        const clone = lightmodeBg.content.cloneNode(true) as HTMLElement;
        clone.querySelectorAll<HTMLElement>('.cloud').forEach((cloud, index) => {
            cloud.style.setProperty('--top', `${Math.floor(Math.random() * 100)}%`);
            cloud.style.setProperty('--delay', `-${Math.floor(Math.random() * 20) + 20}s`);
            cloud.style.setProperty('--duration', `${Math.floor(Math.random() * 20) + 20}s`);
            cloud.style.setProperty('--opacity', `${((Math.random() * 30) + 70) / 100}`);

        });

        const clouds = clone.querySelector('.clouds') as HTMLElement;
        
        gsap.to(clouds, {
            scrollTrigger: {
                scrub: 1,
            },
            y: '-100vh',
            ease: "none",
        });

        const sun = clone.querySelector('.sun') as HTMLElement;
        gsap.to(sun, {
            scrollTrigger: {
                scrub: 1,
            },
            y: '-75vh',
            ease: "none",
        });

        this.siteBg.appendChild(clone);
    }
}

customElements.define('dark-mode-toggle', DarkModeToggle);
