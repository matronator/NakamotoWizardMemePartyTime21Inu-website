export function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function shuffle<T extends unknown[]>(array: T): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
