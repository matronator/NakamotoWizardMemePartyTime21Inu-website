import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function register() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function scrollHeadings() {
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
