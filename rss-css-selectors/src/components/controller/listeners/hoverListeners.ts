import { createElement, getElement, getSelector } from '../../../functions/functions';

class HoverListeners {
    public addHoverListeners(): void {
        const board: HTMLDivElement = getElement('.board');
        const editor: HTMLDivElement = getElement('.editor__content');
        this.addListener(board, editor);
        this.addListener(editor, board);
    }
    private addListener(parent: HTMLElement, child: HTMLElement): void {
        parent.addEventListener('mouseover', (event: Event) => {
            const childElement: HTMLElement = this.getChildElement(event, child);
            this.toggleActiveClass('mouseover', childElement);
        });
        parent.addEventListener('mouseout', (event: Event) => {
            const childElement: HTMLElement = this.getChildElement(event, child);
            this.toggleActiveClass('mouseout', childElement);
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
                    const tooltip: HTMLDivElement = getElement('.tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                } else element.classList.remove('active-line');
            }
        }
    }
    private getChildElement(event: Event, child: HTMLElement): HTMLElement {
        let childElement: Element | null = null;
        if (event.target && event.target instanceof HTMLElement) {
            const target: HTMLElement = event.target;
            const elementId = target.dataset.index;
            const selector = getSelector(target, child);
            if (elementId && child.classList.contains('editor__content')) {
                childElement = getElement(`.editor__content ${selector}[data-index="${elementId}"]`);
            } else if (elementId) {
                childElement = getElement(`.${selector}[data-index="${elementId}"]`);
            }
        }

        return childElement as HTMLElement;
    }
}

export default HoverListeners;
