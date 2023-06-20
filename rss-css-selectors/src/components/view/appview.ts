import Board from './modules/board';
import Menu from './modules/menu';

export class AppView {
    private board: Board;
    private menu: Menu;

    constructor() {
        this.board = new Board();
        this.menu = new Menu(0);
    }

    public drawBoard() {
        this.board.drawBoard(1);
    }
    public drawMenu() {
        this.menu.drawMenu();
    }
}

export default AppView;
