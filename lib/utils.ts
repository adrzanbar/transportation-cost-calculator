import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// export const getFixedNumber = (number: number, round: number) =>
//     parseFloat(Number(number).toFixed(round));

// export const nanFallback = (value: any, fallback: any) =>
//     isNaN(value) ? fallback : value;

// export const getFixedNumberWithFallback = (
//     number: number,
//     round: number,
//     fallback: any
// ) => {
//     return nanFallback(getFixedNumber(number, round), fallback);
// };
