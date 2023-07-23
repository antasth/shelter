import appData from '../data/appData';
import { CARS_ON_PAGE, GARAGE_PATH } from '../data/constants';
import { getCarsData } from '../functions/functions';
import { CarObject, ResponseCarObject } from '../interfaces/interfaces';

export const getCars = async (page: number = appData.garagePage, limit: number = CARS_ON_PAGE): Promise<void> => {
  console.log(page);
  const response = await fetch(`${GARAGE_PATH}?_page=${page}&_limit=${limit}`);
  const data: Array<ResponseCarObject> = await response.json();
  const carsCount = Number(response.headers.get('x-total-count'));
  getCarsData(carsCount, data);
};

export const postCar = async (data: CarObject): Promise<void> => {
  await fetch(GARAGE_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${GARAGE_PATH}/${id}`, {
    method: 'DELETE'
  });
};

export const updateCar = async (id: number, data: CarObject): Promise<ResponseCarObject> => {
  const response = await fetch(`${GARAGE_PATH}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();

  return result;
};
