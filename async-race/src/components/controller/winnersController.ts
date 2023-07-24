import * as winnersRequest from '../../api/winners';
import appData from '../../data/appData';
import { createWinnerObject, getTimeInSeconds } from '../../functions/functions';
import { EngineDriveResponse } from '../../interfaces/interfaces';
import Winners from '../view/winners';

class WinnersController {
  private winnersView: Winners;

  constructor() {
    this.winnersView = new Winners();
  }

  public async sendWinnerToServer(winner: EngineDriveResponse): Promise<void> {
    const winnerResponse = await winnersRequest.getWinner(winner.id);
    if (winnerResponse.id) {
      const winnerObject = createWinnerObject(winnerResponse, winner.time);
      winnersRequest.updateWinner(winnerResponse.id, winnerObject);
    } else {
      const winnerObject = {
        id: winner.id,
        wins: 1,
        time: getTimeInSeconds(winner.time)
      };
      console.log('winnerObject', winnerObject);
      winnersRequest.createWinner(winnerObject);
    }
  }

  public async getWinnersFromServer() {
    console.log('getwinners');

    await winnersRequest.getWinners();
    console.log('appData.winnersData', appData.winnersData);

    this.winnersView.redrawWinnersTable();
  }
}

export default WinnersController;
