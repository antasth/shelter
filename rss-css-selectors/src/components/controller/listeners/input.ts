import { createElement, getElement } from '../../../functions/functions';

class InputListener {
    public writeToFakeInput(str: string): void {
        const fakeInput: HTMLDivElement = getElement('.editor__input-color');
        const inputString: string = str;
        const separators = ['.', '#'];

        const dotIndex = inputString.indexOf(separators[0]);
        const hashIndex = inputString.indexOf(separators[1]);

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
    }
}

export default InputListener;
