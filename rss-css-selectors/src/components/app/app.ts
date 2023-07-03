import { GameData } from '../../interfaces/interfaces';
import AppController from '../controller/appController';
import LocalStorage from '../controller/localStorage/localStorage';
import AppView from '../view/appview';

class App {
    private controller: AppController;
    private view: AppView;
    private level: number;
    private storage: LocalStorage;
    private storageData: GameData;

    constructor() {
        this.storage = new LocalStorage();
        this.storageData = this.storage.getFromLocalStorage();
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
    }
}

export default App;
