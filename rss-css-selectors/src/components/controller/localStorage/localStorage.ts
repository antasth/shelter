import gameData from '../../../data/gamedata';

class LocalStorage {
    public saveToLocalStorage(): void {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    }
    public getFromLocalStorage() {
        return localStorage.gameData ? JSON.parse(localStorage.gameData) : gameData;
    }
}
export default LocalStorage;
