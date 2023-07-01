import gameData from '../../../data/gamedata';

class ResetListener {
    public resetGameProgress(): void {
        gameData.completedLevels = [];
    }
}
export default ResetListener;
