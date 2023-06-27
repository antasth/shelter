export const getElement = <T extends HTMLElement>(selector: string): T => {
    const element = document.querySelector<T>(selector);
    if (!element) {
        throw new TypeError('Type Error');
    }
    return element;
};

export const createElement = (
    tagName: string,
    className: string,
    textContent: string,
    parentNode: HTMLElement | null
): HTMLElement => {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.textContent = textContent;
    if (parentNode) {
        parentNode.append(element);
    }
    return element;
};
