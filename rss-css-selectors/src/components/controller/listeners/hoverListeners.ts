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
            if (event.target && event.target instanceof HTMLElement) {
                const target = event.target;
                const elementId = target.dataset.index ? target.dataset.index : target.parentElement?.dataset.index;
                const [childElement] = [...child.children].filter((item) => {
                    if (item instanceof HTMLElement && item.dataset.index === elementId) {
                        return item;
                    }
                });
                if (
                    childElement?.classList.contains('editor__line') ||
                    childElement?.classList.contains('editor__block')
                ) {
                    childElement?.classList.add('active-line');
                } else childElement?.classList.add('active-element');
            }
        });
        parent.addEventListener('mouseout', (event: Event) => {
            if (event.target && event.target instanceof HTMLElement) {
                const target = event.target;
                const elementId = target.dataset.index ? target.dataset.index : target.parentElement?.dataset.index;
                const [childElement] = [...child.children].filter((item) => {
                    if (item instanceof HTMLElement && item.dataset.index === elementId) {
                        return item;
                    }
                });
                if (
                    childElement?.classList.contains('editor__line') ||
                    childElement?.classList.contains('editor__block')
                ) {
                    childElement?.classList.remove('active-line');
                } else childElement?.classList.remove('active-element');
            }
        });
    }
}

export default HoverListeners;
