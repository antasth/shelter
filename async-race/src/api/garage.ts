import { garage, winners } from '../data/constants';
import { CarObject } from '../interfaces/interfaces';

export const getCars = async (): Promise<CarObject[]> => {
  const response = await (await fetch(garage)).json();
  console.log(response);

  return response;
};
export const getWinners = async (): Promise<CarObject[]> => {
  const response = await (await fetch(winners)).json();
  return response;
};
export const postCar = async (data: CarObject): Promise<void> => {
  const response = await fetch(garage, {
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
  fetch(`${garage}/${id}`, {
    method: 'DELETE'
  });
};
