import { RaceData } from '../interfaces/interfaces';
import { DEFAULT_PAGE } from './constants';

const raceData: RaceData = {
  carsCount: 0,
  currentPage: DEFAULT_PAGE,
  garagePagesCount: 1,
  updateCarId: 0,
  carsData: [],
  winnersData: [],
  winnersCount: 0,
  winnersPagesCount: 1
};
export default raceData;
