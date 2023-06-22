import Board from './modules/board';
import Editor from './modules/editor';
import Menu from './modules/menu';

export class AppView {
    private board: Board;
    private menu: Menu;
    private editor: Editor;

    constructor(level: number) {
        this.board = new Board(level);
        this.menu = new Menu(level);
        this.editor = new Editor();
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
}

export default AppView;
