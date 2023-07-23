import { WINNERS_PATH } from '../data/constants';
import { getWinnersData } from '../functions/functions';
import { ResponseWinnersObject } from '../interfaces/interfaces';

export const getWinners = async (page: number, limit: number, sort: string, order: string): Promise<void> => {
  const response = await fetch(`${WINNERS_PATH}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const data: Array<ResponseWinnersObject> = await response.json();
  const winnersCount = Number(response.headers.get('x-total-count'));
  getWinnersData(winnersCount, data);
};
