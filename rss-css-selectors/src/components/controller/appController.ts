import NavButtonListeners from './listeners/buttonListeners';

class AppController {
    private navButtonListeners: NavButtonListeners;
    constructor(level: number) {
        this.navButtonListeners = new NavButtonListeners(level);
    }
    public nextLevel(level: number) {
        this.navButtonListeners.nextLevel(level);
    }
    public prevLevel(level: number) {
        this.navButtonListeners.prevLevel(level);
    }
    public addListenersToNavButtons() {
        this.navButtonListeners.addListenersToNavButtons();
    }
}

export default AppController;
