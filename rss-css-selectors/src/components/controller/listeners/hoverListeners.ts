import { getElement } from '../../../functions/functions';

class HoverListeners {
    public addHoverListeners(): void {
        const board = getElement('.board');
        const editor = getElement('.editor__content');
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
            if (element?.classList.contains('editor__line') || element?.classList.contains('editor__block')) {
                element?.classList.add('active-line');
            } else element?.classList.add('active-element');
        }
        if (eventType === 'mouseout') {
            if (element?.classList.contains('editor__line') || element?.classList.contains('editor__block')) {
                element?.classList.remove('active-line');
            } else element?.classList.remove('active-element');
        }
    }
    private getChildElement(event: Event, child: HTMLElement): HTMLElement {
        let childElement: Element | null = null;
        if (event.target && event.target instanceof HTMLElement) {
            const target: HTMLElement = event.target;
            const elementId = target.dataset.index ? target.dataset.index : target.parentElement?.dataset.index;
            [childElement] = [...child.children].filter((item) => {
                if (item instanceof HTMLElement && item.dataset.index === elementId) {
                    return item;
                }
            });
        }
        return childElement as HTMLElement;
    }
}

export default HoverListeners;
