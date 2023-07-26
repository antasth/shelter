import appData from '../data/appData';
import { WINNERS_ON_PAGE, WINNERS_PATH } from '../data/constants';
import { SortOrder, WinnersSort } from '../interfaces/enum';
import { ResponseWinnersObject, UpdateWinnersObject } from '../interfaces/interfaces';
import { getWinnersData } from '../utils/utils';

export const getWinners = async (
  page: number = appData.winnersPage,
  sort: string = WinnersSort.id,
  order: string = SortOrder.asc,
  limit: number = WINNERS_ON_PAGE
): Promise<void> => {
  try {
    const response = await fetch(`${WINNERS_PATH}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const data: Array<ResponseWinnersObject> = await response.json();
    const winnersCount = Number(response.headers.get('x-total-count'));
    getWinnersData(winnersCount, data);
  } catch (error) {
    if (error instanceof Error) console.log('Server unavailable, please try again later');
  }
};

export const getWinner = async (id: number): Promise<ResponseWinnersObject> => {
  let result;
  try {
    const response = await fetch(`${WINNERS_PATH}/${id}`);
    result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return result;
};

export const createWinner = async (data: ResponseWinnersObject): Promise<ResponseWinnersObject> => {
  let result;
  try {
    const response = await fetch(`${WINNERS_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    result = await response.json();
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return result;
};

export const deleteWinner = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${WINNERS_PATH}/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 404) throw new Error('Winner not found');
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

export const updateWinner = async (id: number, data: UpdateWinnersObject): Promise<ResponseWinnersObject> => {
  let result;
  try {
    const response = await fetch(`${WINNERS_PATH}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    result = await response.json();
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return result;
};
