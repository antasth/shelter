import { getElement, writeAnswerToInput } from '../../../functions/functions';

class HelpListener {
    public showAnswer(answer: string): void {
        const input: HTMLInputElement = getElement('.editor__input');
        writeAnswerToInput(input, answer);
    }
}
export default HelpListener;
