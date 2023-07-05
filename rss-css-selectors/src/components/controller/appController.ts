import Listeners from './listeners/buttonListeners';

class AppController {
    private listeners: Listeners;
    constructor(level: number) {
        this.listeners = new Listeners(level);
    }
    public addHoverListeners() {
        this.listeners.addHoverListeners();
    }
    public addBurgerListener() {
        this.listeners.addBurgerListener();
    }
}

export default AppController;
