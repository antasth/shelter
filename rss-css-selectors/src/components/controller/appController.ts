import ButtonListeners from './listeners/buttonListeners';

class AppController {
    private buttonListeners: ButtonListeners;
    constructor(level: number) {
        this.buttonListeners = new ButtonListeners(level);
    }
    public nextLevel(level: number) {
        this.buttonListeners.nextLevel(level);
    }
    public prevLevel(level: number) {
        this.buttonListeners.prevLevel(level);
    }
    public addListenersToNavButtons() {
        this.buttonListeners.addListenersToNavButtons();
    }
}

export default AppController;
