import levels from '../../../data/levels';
import { createElement, createNumbersList, getElement } from '../../../functions/functions';

class Editor {
    private data: Array<string>;
    private level: number;

    constructor(level: number) {
        this.level = level;
        this.data = levels[level].htmlContent;
    }
    public drawEditor(): void {
        const editor: HTMLDivElement = getElement('.editor__wrapper');
        editor.append(this.drawCssEditor(), this.drawHtmlEditor());
        this.createHtmlContent(this.level);
    }
    private drawCssEditor(): HTMLElement {
        const cssEditor = createElement('div', 'editor__css', '', null);
        createElement('div', 'editor__header', 'CSS', cssEditor);
        const cssEditorContent = createElement('div', 'editor__content-css', '', cssEditor);

        const inputContent = createElement('div', 'editor__input__content', '', cssEditorContent);
        createElement('div', 'editor__input-color', 'введите CSS селектор', inputContent);
        const editorInput = createElement('input', 'editor__input', '', inputContent);
        editorInput.setAttribute('placeholder', 'введите CSS селектор');
        editorInput.setAttribute('type', 'text');
        createElement('button', 'editor__button', 'enter', inputContent);

        const listNumbers = createNumbersList();
        cssEditorContent.append(listNumbers, inputContent);
        return cssEditor;
    }
    private drawHtmlEditor(): HTMLElement {
        const htmlEditor = createElement('div', 'editor__html', '', null);
        createElement('div', 'editor__header', 'HTML', htmlEditor);
        const editorContent = createElement('div', 'editor__content-html', '', htmlEditor);
        const listNumbers = createNumbersList();
        editorContent.append(listNumbers);
        return htmlEditor;
    }

    public createHtmlContent(level: number): void {
        this.data = levels[level].htmlContent;
        if (document.querySelector('.editor__content')) this.clearHtmlContent();
        const editorHtml: HTMLDivElement = getElement('.editor__content-html');
        const editorHtmlContent = createElement('div', 'editor__content', '', editorHtml);
        this.createHtmlContentTags(this.data, editorHtmlContent);
    }

    private createHtmlContentTags(data: Array<string>, parentElement: HTMLElement): void {
        data.forEach((item: string, index: number) => {
            const dataIndex = String(index + 1);
            console.log(dataIndex);
            parentElement.insertAdjacentHTML('beforeend', item);
        });
    }

    private clearHtmlContent(): void {
        const editorHtml: HTMLDivElement = getElement('.editor__content-html');
        const editorContent: HTMLDivElement = getElement('.editor__content');
        if (editorHtml && editorContent) editorHtml.removeChild(editorContent);
    }
}
export default Editor;
