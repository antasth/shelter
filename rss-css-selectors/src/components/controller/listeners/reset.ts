import gameData from '../../../data/gamedata';
import { saveToLocalStorage } from '../../../functions/functions';

class ResetListener {
    public resetGameProgress(): void {
        gameData.completedLevels = [];
        saveToLocalStorage();
    }
}
export default ResetListener;
