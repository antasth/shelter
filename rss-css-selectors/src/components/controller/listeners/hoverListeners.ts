import { createElement, getElement, getSelector } from '../../../functions/functions';

class HoverListeners {
    public addHoverListeners(): void {
        const board = getElement('.board');
        const editor = getElement('.editor__content');
        this.addListener(board, editor);
        this.addListener(editor, board);
    }
    private addListener(parent: HTMLElement, child: HTMLElement): void {
        parent.addEventListener('mouseover', (event: Event) => {
            const childElement = this.getChildElement(event, child);
            if (childElement) this.toggleActiveClass('mouseover', childElement);
        });
        parent.addEventListener('mouseout', (event: Event) => {
            const childElement = this.getChildElement(event, child);
            if (childElement) this.toggleActiveClass('mouseout', childElement);
        });
    }
    private toggleActiveClass(eventType: string, element: HTMLElement): void {
        if (eventType === 'mouseover') {
            if (element && element.parentNode instanceof HTMLElement) {
                if (element.parentNode.classList.contains('board') || element.parentNode.classList.contains('cup')) {
                    element.classList.add('active-element');
                    const tooltip = element.dataset.tooltip;
                    if (tooltip) {
                        createElement('div', 'tooltip', tooltip, element);
                    }
                } else element.classList.add('active-line');
            }
        }
        if (eventType === 'mouseout') {
            if (element && element.parentNode instanceof HTMLElement) {
                if (element.parentNode.classList.contains('board') || element.parentNode.classList.contains('cup')) {
                    element.classList.remove('active-element');
                    const tooltip = getElement('.tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                } else element.classList.remove('active-line');
            }
        }
    }
    private getChildElement(event: Event, child: HTMLElement): HTMLElement | null {
        if (event.target && event.target instanceof HTMLElement) {
            const target: HTMLElement = event.target;
            const elementId = target.dataset.index;
            const selector = getSelector(target, child);
            if (elementId && child.classList.contains('editor__content')) {
                return getElement(`.editor__content ${selector}[data-index="${elementId}"]`);
            } else if (elementId) {
                return getElement(`.${selector}[data-index="${elementId}"]`);
            }
        }
        return null;
    }
}

export default HoverListeners;
