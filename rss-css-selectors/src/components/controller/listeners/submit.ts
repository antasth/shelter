import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';

class Submit {
    checkAnswer(level: number) {
        const answer: HTMLInputElement = getElement('.editor__input');
        return answer.value === levels[level].answer;
    }
    clearInput() {
        const answer: HTMLInputElement = getElement('.editor__input');
        answer.value = '';
    }
}
export default Submit;
