import { createElement, getElement } from '../../../functions/functions';

class HelpButton {
    public drawHelpButton(): void {
        const board = getElement('.levels__top');
        createElement('button', 'help__button', 'need help?', board);
    }
}
export default HelpButton;
