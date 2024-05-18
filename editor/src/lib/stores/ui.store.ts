import { type Writable, writable } from 'svelte/store';

export const mode = writable('editor');
export const showEditor = writable(true);
export const showContent = writable(false);
export const useSnapGrid: Writable<boolean> = writable(false);
export const snapGrid: Writable<Array<number>> = writable([25, 25]);
