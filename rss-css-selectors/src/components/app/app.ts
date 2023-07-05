import { getFromLocalStorage } from '../../functions/functions';
import { GameData } from '../../interfaces/interfaces';
import AppController from '../controller/appController';
import AppView from '../view/appview';

class App {
    private controller: AppController;
    private view: AppView;
    private level: number;
    private storageData: GameData;

    constructor() {
        this.storageData = getFromLocalStorage();
        this.level = this.storageData ? this.storageData.currentLevel : 0;
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
        this.controller.addBurgerListener();
    }
}

export default App;
