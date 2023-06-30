import Listeners from './listeners/listeners';

class AppController {
    private listeners: Listeners;
    constructor(level: number) {
        this.listeners = new Listeners(level);
    }
    public nextLevel(level: number) {
        this.listeners.nextLevel(level);
    }
    public prevLevel(level: number) {
        this.listeners.prevLevel(level);
    }
    public addListenersToButtons() {
        this.listeners.addListenersToButtons();
    }
    public addHoverListeners() {
        this.listeners.addHoverListeners();
    }
}

export default AppController;
