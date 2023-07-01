import AppController from '../controller/appController';
import AppView from '../view/appview';

class App {
    private controller: AppController;
    private view: AppView;
    private level: number;

    constructor() {
        this.level = 0;
        this.controller = new AppController(this.level);
        this.view = new AppView(this.level);
    }

    public start(): void {
        this.view.drawBoard(this.level);
        this.view.drawMenu(this.level);
        this.view.drawHelpButton();
        this.view.drawResetButton();
        this.view.drawEditor();
        this.controller.addListenersToButtons();
        this.controller.addHoverListeners();
    }
}

export default App;
