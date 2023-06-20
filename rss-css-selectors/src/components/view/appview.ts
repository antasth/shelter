import Board from './modules/board';

export class AppView {
    private board: Board;

    constructor() {
        this.board = new Board();
    }

    public drawBoard() {
        this.board.drawBoard(1);
    }
}

export default AppView;
