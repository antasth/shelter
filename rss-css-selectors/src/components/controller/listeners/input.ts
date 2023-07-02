import gameData from '../../../data/gamedata';
import { createElement, getElement, writeAnswerToInput } from '../../../functions/functions';

class InputListener {
    public writeToFakeInput(str: string): void {
        const fakeInput: HTMLDivElement = getElement('.editor__input-color');
        fakeInput.replaceChildren();
        const inputString: string = str;
        const separators: string[] = ['.', '#'];

        const dotIndex: number = inputString.indexOf(separators[0]);
        const hashIndex: number = inputString.indexOf(separators[1]);

        if (dotIndex >= 0 && hashIndex === -1) {
            createElement('span', 'span-purple', inputString.slice(0, dotIndex), fakeInput);
            createElement('span', 'span-blue', inputString.slice(dotIndex), fakeInput);
        } else if (hashIndex >= 0 && dotIndex === -1) {
            createElement('span', 'span-purple', inputString.slice(0, hashIndex), fakeInput);
            createElement('span', 'span-green', inputString.slice(hashIndex), fakeInput);
        } else if (dotIndex >= 0 && hashIndex >= 0) {
            if (dotIndex < hashIndex) {
                createElement('span', 'span-purple', inputString.slice(0, dotIndex), fakeInput);
                createElement('span', 'span-blue', inputString.slice(dotIndex, hashIndex), fakeInput);
                createElement('span', 'span-green', inputString.slice(hashIndex), fakeInput);
            } else if (hashIndex < dotIndex) {
                createElement('span', 'span-purple', inputString.slice(0, hashIndex), fakeInput);
                createElement('span', 'span-green', inputString.slice(hashIndex, dotIndex), fakeInput);
                createElement('span', 'span-blue', inputString.slice(dotIndex), fakeInput);
            }
        } else {
            createElement('span', 'span-purple', inputString, fakeInput);
        }
    }
    public clearInput(): void {
        const fakeInput: HTMLDivElement = getElement('.editor__input-color');
        fakeInput.innerText = '';
        fakeInput.replaceChildren();
    }
    public restoreInput(): void {
        const fakeInput: HTMLDivElement = getElement('.editor__input-color');
        const realInput: HTMLInputElement = getElement('.editor__input');
        realInput.value = '';
        fakeInput.replaceChildren();
        fakeInput.innerText = 'Введите CSS селектор';
    }
    public showAnswer(answer: string): void {
        const fakeInput: HTMLDivElement = getElement('.editor__input-color');
        writeAnswerToInput(fakeInput, answer);
        setTimeout(() => {
            this.writeToFakeInput(answer);
        }, gameData.writeAnswerDelay);
    }
}

export default InputListener;
