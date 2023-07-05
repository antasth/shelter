import { getFromLocalStorage } from '../../functions/functions';
import { GameData } from '../../interfaces/interfaces';
import AppController from '../controller/appController';
import Listeners from '../controller/listeners/buttonListeners';
import AppView from '../view/appview';

class App {
    private view: AppView;
    private controller: AppController;
    private level: number;
    private storageData: GameData;
    private buttonListeners: Listeners;

    constructor() {
        this.storageData = getFromLocalStorage();
        this.level = this.storageData ? this.storageData.currentLevel : 0;
        this.view = new AppView(this.level);
        this.controller = new AppController(this.level);
        this.buttonListeners = new Listeners(this.level);
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
        this.buttonListeners.addButtonLeftListener();
        this.buttonListeners.addButtonRightListener();
        this.buttonListeners.addButtonResetListener();
    }
}

export default App;
