export const getElement = <T extends HTMLElement>(selector: string): T => {
    const element = document.querySelector<T>(selector);
    if (!element) {
        throw new TypeError('Type Error');
    }
    return element;
};
