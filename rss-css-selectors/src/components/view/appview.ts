import Board from './modules/board';
import Menu from './modules/menu';

export class AppView {
    private board: Board;
    private menu: Menu;
    // private level: number;

    constructor(level: number) {
        // this.level = level;
        this.board = new Board(level);
        this.menu = new Menu(level);
    }

    public drawBoard(level: number) {
        // this.level = lvl;
        this.board.drawBoard(level);
    }
    public drawMenu() {
        this.menu.drawMenu();
    }
}

export default AppView;
