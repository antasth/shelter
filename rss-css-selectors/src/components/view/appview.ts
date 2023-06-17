import Table from './modules/table';

export class AppView {
    private table: Table;

    constructor() {
        this.table = new Table();
    }

    public drawTable() {
        this.table.drawTable();
    }
    // public drawPicle() {
    //     console.log('picle');
    // }
    // public drawPlate() {
    //     console.log('plate');
    // }
}

export default AppView;
