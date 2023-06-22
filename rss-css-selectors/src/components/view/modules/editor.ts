import { getElement } from '../../../functions/functions';

class Editor {
    public drawEditor(): void {
        const editor = getElement('.editor__wrapper');
        editor.append(this.drawCssEditor(), this.drawHtmlEditor());
    }
    private drawCssEditor(): HTMLDivElement {
        const cssEditor = document.createElement('div');
        cssEditor.classList.add('editor__css');

        const cssEditorHeader = document.createElement('div');
        cssEditorHeader.classList.add('editor__header');
        cssEditorHeader.innerText = 'CSS';

        const editorContent = document.createElement('div');
        editorContent.classList.add('editor__content');

        const listNumbers = this.createListNumbers();

        const editorInput = document.createElement('input');
        editorInput.classList.add('editor__input');
        editorInput.setAttribute('placeholder', 'введите CSS селектор');
        editorInput.setAttribute('type', 'text');

        editorContent.append(listNumbers, editorInput);
        cssEditor.append(cssEditorHeader, editorContent);
        return cssEditor;
    }
    private drawHtmlEditor(): HTMLDivElement {
        const htmlEditor = document.createElement('div');
        htmlEditor.classList.add('editor__html');

        const cssEditorHeader = document.createElement('div');
        cssEditorHeader.classList.add('editor__header');
        cssEditorHeader.innerText = 'CSS';

        const editorContent = document.createElement('div');
        editorContent.classList.add('editor__content');

        const listNumbers = this.createListNumbers();

        const editorHtmlContent = document.createElement('div');
        const boardHtmlContent = getElement('.board');
        editorHtmlContent.textContent = boardHtmlContent.innerHTML;

        editorContent.append(listNumbers, editorHtmlContent);
        htmlEditor.append(cssEditorHeader, editorContent);
        return htmlEditor;
    }
    private createListNumbers(): HTMLUListElement {
        const editorNumbers = document.createElement('ul');
        editorNumbers.classList.add('editor__numbers');
        editorNumbers.innerHTML = [...Array(20)].map((_, i) => `<li>${i + 1}</li>`).join('');
        return editorNumbers;
    }
}
export default Editor;
