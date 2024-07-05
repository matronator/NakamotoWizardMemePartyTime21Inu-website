import gsap from 'gsap';

export function createCursor() {
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    cursor.classList.add('main-cursor');
    document.body.appendChild(cursor);

    const rings: HTMLElement[] = [];

    for (let i = 1; i <= 3; i++) {
        const ring = document.createElement('div');
        ring.classList.add('cursor-ring');
        ring.setAttribute('data-cursor-ring', `${i}`);
        ring.style.setProperty('--delay', `${500 * i}ms`);
        ring.style.setProperty('--opacity', `${1 - ((i / 3) * 0.75)}`);
        document.body.appendChild(ring);

        rings[i] = ring;
    }

    window.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
        });

        rings.forEach((el, index) => {
            gsap.to(el, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.75 / ((index) / (index + 1)),
            });
        });
    });
}
