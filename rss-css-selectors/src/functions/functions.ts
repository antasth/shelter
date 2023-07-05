import { baseAnswerDelay, listNumbersArrayLength, symbolShowDelay } from '../data/constants';
import gameData from '../data/gamedata';
import levels from '../data/levels';
import { CompletedLevelObject } from '../interfaces/interfaces';

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
    const itemsArray = createArray(listNumbersArrayLength);
    editorNumbers.innerHTML = itemsArray.map((_, i) => `<li>${i + 1}</li>`).join('');
    return editorNumbers;
};

export const createArray = (length: number): Array<null> => {
    return new Array(length).fill(null);
};

// function based on this example https://www.w3schools.com/howto/howto_js_typewriter.asp
export const writeAnswerToInput = (input: HTMLElement, answer: string): void => {
    const delay = symbolShowDelay;
    gameData.writeAnswerDelay = answerDelay(delay, answer.length);
    let i = 0;
    const write = (): void => {
        if (i < answer.length) {
            if (input instanceof HTMLInputElement) {
                input.value += answer[i];
            } else {
                input.innerText += answer[i];
            }
            i += 1;
            setTimeout(write, delay);
        }
    };
    write();
};

export const answerDelay = (delay: number, length: number): number => {
    return length * delay + baseAnswerDelay;
};

export const filterCompletedLevels = (levels: CompletedLevelObject[], currentLevel: number): CompletedLevelObject[] => {
    return levels.filter((item) => item.level === currentLevel);
};

export const isCompletedByHelp = (isCompleted: boolean | null): string => {
    return isCompleted ? 'levels__button__help' : 'levels__button__self';
};

export const getDirectionSymbol = (direction: string): string => {
    return direction === 'left' ? '<' : '>';
};

export const getSelector = (target: HTMLElement, child: HTMLElement): string => {
    return child.classList.contains('editor__content') ? target.classList[0] : target.nodeName.toLowerCase();
};

export const getLevelHeader = (levelNumber: number, levelsLength: number): string => {
    return `LEVEL ${levelNumber} OF ${levelsLength}`;
};
export const saveToLocalStorage = (): void => {
    localStorage.setItem('gameData', JSON.stringify(gameData));
};
export const getFromLocalStorage = () => {
    return localStorage.gameData ? JSON.parse(localStorage.gameData) : gameData;
};

export const checkAnswer = (level: number): boolean | null => {
    const answer: HTMLInputElement = getElement('.editor__input');
    if (answer.value) {
        return levels[level].answer.includes(answer.value);
    } else return null;
};
export const clearInput = (): void => {
    const answer: HTMLInputElement = getElement('.editor__input');
    answer.value = '';
};
