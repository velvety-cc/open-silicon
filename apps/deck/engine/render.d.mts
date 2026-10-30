export type Deck = { id: string; title: string; classification: string; revision: string; canvas: { width: number; height: number }; slides: { page: number; title: string }[] };
export function loadDeck(id?: string): Promise<Deck>;
export function renderSlide(page: number, options?: { reading?: boolean; interactive?: boolean }): Promise<string>;
export function renderDeck(): Promise<string>;
export function deckSourceHash(): Promise<string>;
export function canvasCSS(css: string): string;
