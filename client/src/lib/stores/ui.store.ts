import type { NodeBase, NodeTitle } from '$lib/types';
import { type Writable, writable } from 'svelte/store';

export const showContentEditor = writable(true);

// TODO: Come back to this to see a better way of managing these types
export const currentSelection: Writable<NodeTitle | undefined> = writable(undefined);
export const useSnapGrid: Writable<boolean> = writable(false);
export const snapGrid: Writable<Array<number>> = writable([25, 25]);
