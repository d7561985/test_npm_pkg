export type GAME = {
    demo: boolean
}

declare global {
    interface Window { GAME: GAME; }
}