import ScrollTrigger from 'gsap/ScrollTrigger';

export class InfiniteScroll {
    containers: HTMLElement[] = [];

    constructor() {
        const memeWrapperEl = document.querySelector(`.meme-wrapper[data-meme-wrapper="${this.containers.length}"]`) as HTMLElement;
        if (!memeWrapperEl) return;

        this.containers.push(memeWrapperEl);
        this.duplicateWrapper();
    }

    duplicateWrapper() {
        const selector = `.meme-wrapper[data-meme-wrapper="${this.containers.length - 1}"]`;
        const wrapper = document.querySelector(selector) as HTMLElement;
        if (!wrapper) return;

        const duplicate = document.createElement(`masonry-layout`);
        duplicate.innerHTML = wrapper.innerHTML;
        duplicate.classList.add('meme-wrapper');
        duplicate.setAttribute(`data-meme-wrapper`, this.containers.length.toString());

        this.containers.push(duplicate);
        ScrollTrigger.create({
            trigger: selector,
            start: 'top top',
            end: 'top top',
            once: true,
            id: `memeWrapper-${this.containers.length}`,
            onEnter: () => {
                if (this.containers.length < 5) {
                    this.duplicateWrapper();
                }
                this.duplicateWrapper();
            }
        });

        wrapper.insertAdjacentElement('afterend', duplicate);
    }
}
