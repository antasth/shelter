export const getElement = <T extends HTMLElement>(selector: string): T => {
    const element = document.querySelector<T>(selector);
    if (!element) {
        console.log(selector);
        throw new TypeError('Type Error');
    }
    return element;
};

export const createElement = (
    tagName: string,
    className: string,
    innerText: string,
    parentNode: HTMLElement | null
): HTMLElement => {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(className);
    element.innerText = innerText;
    if (parentNode) {
        parentNode.append(element);
    }
    return element;
};

export const createNumbersList = (): HTMLUListElement => {
    const editorNumbers = document.createElement('ul');
    editorNumbers.classList.add('editor__numbers');
    editorNumbers.innerHTML = [...Array(13)].map((_, i) => `<li>${i + 1}</li>`).join('');
    return editorNumbers;
};

export const writeAnswerToInput = (input: HTMLInputElement, answer: string, speed: number): void => {
    let i = 0;
    if (i < answer.length) {
        input.innerText += answer.charAt(i);
        i += 1;
        setTimeout(writeAnswerToInput, speed);
    }
};
