import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';

class Submit {
    public checkAnswer(level: number): boolean | null {
        const answer: HTMLInputElement = getElement('.editor__input');
        if (answer.value) {
            return answer.value === levels[level].answer;
        } else return null;
    }
    public clearInput(): void {
        const answer: HTMLInputElement = getElement('.editor__input');
        answer.value = '';
    }
}
export default Submit;
