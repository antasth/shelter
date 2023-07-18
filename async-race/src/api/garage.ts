import { GARAGE_PATH } from '../data/constants';
import raceData from '../data/raceData';
import { CarObject } from '../interfaces/interfaces';

export const getCars = async (page: number, limit: number): Promise<CarObject[]> => {
  const response = await fetch(`${GARAGE_PATH}?_page=${page}&_limit=${limit}`);
  raceData.carsInGarage = Number(response.headers.get('x-total-count'));
  const data = await response.json();
  console.log(data);
  return data;
};
export const postCar = async (data: CarObject): Promise<void> => {
  const response = await fetch(GARAGE_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result);
};

export const deleteCar = async (id: number): Promise<void> => {
  fetch(`${GARAGE_PATH}/${id}`, {
    method: 'DELETE'
  });
};
