import { createElement, getElement } from '../../../functions/functions';

class ResetButton {
    public drawResetButton(): void {
        const levels = getElement('.levels__top');
        createElement('button', 'reset__button', 'reset', levels);
    }
}
export default ResetButton;
