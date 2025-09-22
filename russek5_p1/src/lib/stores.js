import { writable } from 'svelte/store';

export const currentPage = writable(0);
export const expenses = writable([]);