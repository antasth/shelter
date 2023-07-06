import Board from './modules/board';
import Editor from './modules/editor';
import Menu from './modules/menu';
import ResetButton from './modules/resetButton';

export class AppView {
    private board: Board;
    private menu: Menu;
    private editor: Editor;
    private reset: ResetButton;

    constructor(level: number) {
        this.board = new Board(level);
        this.menu = new Menu(level);
        this.editor = new Editor(level);
        this.reset = new ResetButton();
    }

    public drawBoard(level: number) {
        this.board.drawBoard(level);
    }
    public drawMenu(level: number) {
        this.menu.drawMenu(level);
    }
    public drawEditor() {
        this.editor.drawEditor();
    }
    public drawResetButton() {
        this.reset.drawResetButton();
    }
    public createHtmlContent(level: number) {
        this.editor.createHtmlContent(level);
    }
    public showWinMessage() {
        this.board.showWinMessage();
    }
}

export default AppView;
