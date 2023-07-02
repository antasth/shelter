import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';

class Submit {
    public checkAnswer(level: number): boolean | null {
        const answer: HTMLInputElement = getElement('.editor__input');
        if (answer.value) {
            return levels[level].answer.includes(answer.value);
        } else return null;
    }
    public clearInput(): void {
        const answer: HTMLInputElement = getElement('.editor__input');
        answer.value = '';
    }
}
export default Submit;
