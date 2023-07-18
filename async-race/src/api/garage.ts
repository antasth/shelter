import { GARAGE_PATH } from '../data/constants';
import { CarObject } from '../interfaces/interfaces';

export const getCars = async (): Promise<CarObject[]> => {
  const response = await (await fetch(GARAGE_PATH)).json();
  console.log(response);

  return response;
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
