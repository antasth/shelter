import * as garageRequest from '../../api/garage';
import * as winnersRequest from '../../api/winners';
import appData from '../../data/appData';
import { WINNERS_ON_PAGE } from '../../data/constants';
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

  public async getWinnersFromServer(
    page: number = appData.winnersPage,
    sort: string = appData.lastSort.sort,
    order: string = appData.lastSort.sortOrder,
    limit: number = WINNERS_ON_PAGE
  ) {
    await winnersRequest.getWinners(page, sort, order, limit);
  }

  public async showPrevPage(): Promise<void> {
    if (appData.winnersPage > 1) appData.winnersPage -= 1;
    await winnersRequest.getWinners(appData.winnersPage);
    await garageRequest.getWinnersCarsList();
    this.winnersView.redrawWinnersTable();
  }

  public async showNextPage(): Promise<void> {
    if (appData.winnersPage < appData.winnersPagesCount) appData.winnersPage += 1;
    await winnersRequest.getWinners(appData.winnersPage);
    await garageRequest.getWinnersCarsList();
    this.winnersView.redrawWinnersTable();
  }

  public redrawWinnersTable(): void {
    this.winnersView.redrawWinnersTable();
  }

  public async sortWinnersByWins(page: number) {
    appData.sortOrder = appData.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    appData.lastSort = {
      sortOrder: appData.sortOrder,
      sort: 'wins'
    };
    await winnersRequest.getWinners(page, 'wins', appData.sortOrder);
    await garageRequest.getWinnersCarsList();
    this.winnersView.redrawWinnersTable();
  }

  public async sortWinnersByTime(page: number) {
    appData.sortOrder = appData.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    appData.lastSort = {
      sortOrder: appData.sortOrder,
      sort: 'time'
    };
    await winnersRequest.getWinners(page, 'time', appData.sortOrder);
    await garageRequest.getWinnersCarsList();
    this.winnersView.redrawWinnersTable();
  }

  public async deleteWinnerFromServer(winnerId: number) {
    await winnersRequest.deleteWinner(winnerId);
  }
}

export default WinnersController;
