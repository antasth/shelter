import levels from '../../../data/levels';

class Submit {
    checkAnswer(level: number) {
        const answer: HTMLInputElement | null = document.querySelector('.editor__input');
        if (answer) {
            return answer.value === levels[level].answer;
        }
    }
    clearInput() {
        const answer: HTMLInputElement | null = document.querySelector('.editor__input');
        if (answer) {
            answer.value = '';
        }
    }
}
export default Submit;
