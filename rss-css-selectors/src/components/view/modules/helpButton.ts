import levels from '../../../data/levels';
import { createElement, getElement, writeAnswerToInput } from '../../../functions/functions';

class HelpButton {
    private answer: string;

    constructor(level: number) {
        this.answer = levels[level].answer;
    }

    public drawHelpButton() {
        const board: HTMLDivElement = getElement('.board');
        createElement('button', 'help__button', 'Need Help?', board);
    }
    public showAnswer(): void {
        const input: HTMLInputElement = getElement('.editor__input');
        writeAnswerToInput(input, this.answer, 100);
    }
}
export default HelpButton;
