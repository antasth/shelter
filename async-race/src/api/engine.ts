import { engine } from '../data/constants';
import { CarObject } from '../interfaces/interfaces';

export const startEngine = async (id: number): Promise<void> => {
  const response = await fetch(`${engine}?id=${id}&status=started`, {
    method: 'PATCH'
  });
  const result = await response.json();
  console.log(result);
};
export const stopEngine = async (): Promise<CarObject[]> => {
  const response = await (await fetch(engine)).json();
  return response;
};
