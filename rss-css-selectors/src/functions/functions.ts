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

// function based on this example https://www.w3schools.com/howto/howto_js_typewriter.asp
export const writeAnswerToInput = (input: HTMLInputElement | HTMLDivElement, answer: string): void => {
    let i = 0;
    const write = (): void => {
        if (i < answer.length) {
            if (input instanceof HTMLInputElement) {
                input.value += answer[i];
            } else {
                input.innerText += answer[i];
            }
            i += 1;
            setTimeout(write, 200);
        }
    };
    write();
};
