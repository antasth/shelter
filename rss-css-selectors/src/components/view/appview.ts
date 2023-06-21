import Board from './modules/board';
import Menu from './modules/menu';

export class AppView {
    private board: Board;
    private menu: Menu;

    constructor(level: number) {
        this.board = new Board(level);
        this.menu = new Menu(level);
    }

    public drawBoard(level: number) {
        this.board.drawBoard(level);
    }
    public drawMenu(level: number) {
        this.menu.drawMenu(level);
    }
}

export default AppView;
