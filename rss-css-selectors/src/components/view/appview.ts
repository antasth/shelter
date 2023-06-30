import Board from './modules/board';
import Editor from './modules/editor';
import HelpButton from './modules/helpButton';
import Menu from './modules/menu';

export class AppView {
    private board: Board;
    private menu: Menu;
    private editor: Editor;
    private help: HelpButton;

    constructor(level: number) {
        this.board = new Board(level);
        this.menu = new Menu(level);
        this.editor = new Editor(level);
        this.help = new HelpButton(level);
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
    public drawHelpButton() {
        this.help.drawHelpButton();
    }
    public createHtmlContent(level: number) {
        this.editor.createHtmlContent(level);
    }
}

export default AppView;
