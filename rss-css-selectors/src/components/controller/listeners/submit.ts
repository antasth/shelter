import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';

class Submit {
    public checkAnswer(level: number): boolean {
        const answer: HTMLInputElement = getElement('.editor__input');
        return answer.value === levels[level].answer;
    }
    public clearInput(): void {
        const answer: HTMLInputElement = getElement('.editor__input');
        answer.value = '';
    }
}
export default Submit;
