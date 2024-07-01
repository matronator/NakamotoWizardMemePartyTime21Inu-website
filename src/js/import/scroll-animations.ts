import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function register() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function revealHeadings() {
    gsap.utils.toArray("section > h2.display-2").forEach(heading => {
        gsap.from(heading as gsap.TweenTarget, {
            scrollTrigger: {
                trigger: heading as gsap.DOMTarget,
                scrub: false,
                start: "bottom bottom",
                immediateRender: true,
                once: true,
            } as ScrollTrigger.Vars,
            translateX: -50,
            rotateY: 90,
            transformOrigin: "left center",
            ease: "bounce.out",
        });
    });
}

export function revealLetters() {
    const words: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-reveal-letters]`);

    words.forEach(el => {
        const text = el.textContent ?? '';
        el.innerHTML = text.replace(/\S/g, '<span class="letter" data-letter-reveal>$&</span>');
        
        const letters: NodeListOf<HTMLSpanElement> = el.querySelectorAll(`span[data-letter-reveal]`);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                once: true,
                immediateRender: false,
                scrub: true,
                start: 'center 90%',
                end: '+=200',
            },
        });

        letters.forEach(letter => {
            letter.style.display = 'inline-block';
            tl.from(letter, {
                duration: 0.1,
                opacity: 0,
                scale: 0,
                rotateY: -90,
                translateX: -100,
                ease: 'expo.out',
                transformOrigin: "left center",
            });
        });
    });
}

export function revealParagraphs() {
    gsap.utils.toArray("p[data-reveal-paragraph]").forEach(p => {
        gsap.from(p as gsap.TweenTarget, {
            scrollTrigger: {
                trigger: p as gsap.DOMTarget,
                scrub: false,
                start: "bottom bottom",
                end: '+=100',
                immediateRender: true,
                once: true,
            } as ScrollTrigger.Vars,
            opacity: 0,
            rotateX: 90,
            transformOrigin: 'center top',
            duration: 1.5,
            ease: "power3.in",
        });
    });
}

export function getScrollSpeed(settings = {delay: undefined}) {
    let lastPos, newPos, timer, delta,
        delay = settings.delay ?? 50;

    function clear() {
        lastPos = null;
        delta = 0;
    }

    clear();

    return function () {
        newPos = window.scrollY;
        if (lastPos != null) {
            delta = newPos - lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
    };
}
