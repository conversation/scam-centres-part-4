import { atom } from "jotai";

const headerHeight = atom<number | null>(window.innerHeight);

export { headerHeight };
