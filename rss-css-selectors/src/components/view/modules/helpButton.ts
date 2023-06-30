import { createElement, getElement } from '../../../functions/functions';

class HelpButton {
    public drawHelpButton(): void {
        const board: HTMLDivElement = getElement('.board');
        createElement('button', 'help__button', 'Need Help?', board);
    }
}
export default HelpButton;
