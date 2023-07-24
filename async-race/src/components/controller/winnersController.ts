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
      winnersRequest.createWinner(winnerObject);
    }
  }

  public async getWinnersFromServer() {
    await winnersRequest.getWinners();
    this.winnersView.redrawWinnersTable();
  }

  public async sortWinnersByWins(page: number) {
    appData.sortOrder = appData.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    await winnersRequest.getWinners(page, 'wins', appData.sortOrder);
    this.winnersView.redrawWinnersTable();
  }

  public async sortWinnersByTime(page: number) {
    appData.sortOrder = appData.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    await winnersRequest.getWinners(page, 'time', appData.sortOrder);
    this.winnersView.redrawWinnersTable();
  }
}

export default WinnersController;
