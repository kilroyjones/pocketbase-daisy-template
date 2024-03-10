import type { AuthModel } from 'pocketbase';
import { writable } from 'svelte/store';

export const user = writable<AuthModel | undefined>();
