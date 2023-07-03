import gameData from '../../../data/gamedata';
import { GameData } from '../../../interfaces/interfaces';

class LocalStorage {
    public saveToLocalStorage(): void {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    }
    public getFromLocalStorage(): GameData {
        // console.log('localStorage', localStorage.gameData);
        return localStorage.gameData ? JSON.parse(localStorage.gameData) : gameData;
    }
}
export default LocalStorage;
