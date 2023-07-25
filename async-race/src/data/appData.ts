import { AppData } from '../interfaces/interfaces';
import { DEFAULT_PAGE } from './constants';

const appData: AppData = {
  carsCount: 0,
  garagePage: DEFAULT_PAGE,
  garagePagesCount: 1,
  updateCarId: 0,
  carsData: [],
  winnersData: [],
  winnerCarsList: [],
  winnersCount: 0,
  winnersPagesCount: 1,
  sortOrder: 'ASC',
  winnersPage: DEFAULT_PAGE
};
export default appData;
