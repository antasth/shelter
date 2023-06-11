export const getElement = <T extends HTMLElement>(root: HTMLElement | DocumentFragment, selector: string): T => {
    const element = root.querySelector<T>(selector);
    if (!element) {
        throw new TypeError('Type Error');
    }
    return element;
};
