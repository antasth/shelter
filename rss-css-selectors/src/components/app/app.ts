import { getFromLocalStorage } from '../../functions/functions';
import { GameData } from '../../interfaces/interfaces';
import Listeners from '../controller/buttonListeners';
import HoverListeners from '../controller/hoverListeners';
import InputListener from '../controller/inputListeners';
import AppView from '../view/appview';

class App {
    private view: AppView;
    private level: number;
    private storageData: GameData;
    private buttonListeners: Listeners;
    private inputListeners: InputListener;
    private hoverListeners: HoverListeners;

    constructor() {
        this.storageData = getFromLocalStorage();
        this.level = this.storageData ? this.storageData.currentLevel : 0;
        this.view = new AppView(this.level);
        this.buttonListeners = new Listeners(this.level);
        this.inputListeners = new InputListener();
        this.hoverListeners = new HoverListeners();
    }

    public start(): void {
        this.view.drawBoard(this.level);
        this.view.drawMenu(this.level);
        this.view.drawEditor();
        this.buttonListeners.addButtonListeners();
        this.inputListeners.addInputListener();
        this.hoverListeners.addHoverListeners();
    }
}

export default App;
