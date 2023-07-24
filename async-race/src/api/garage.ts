import appData from '../data/appData';
import { CARS_ON_PAGE, GARAGE_PATH } from '../data/constants';
import { getCarsData } from '../functions/functions';
import { CarObject, ResponseCarObject } from '../interfaces/interfaces';

export const getCars = async (page: number = appData.garagePage, limit: number = CARS_ON_PAGE): Promise<void> => {
  try {
    const response = await fetch(`${GARAGE_PATH}?_page=${page}&_limit=${limit}`);
    const data: Array<ResponseCarObject> = await response.json();
    const carsCount = Number(response.headers.get('x-total-count'));
    getCarsData(carsCount, data);
  } catch (error) {
    console.log('Сервер недоступен, попробуйте позже');
  }
};

export const getCar = async (id: number): Promise<ResponseCarObject> => {
  let car;
  try {
    const response = await fetch(`${GARAGE_PATH}/${id}`);
    car = await response.json();
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
  return car;
};

export const postCar = async (data: CarObject): Promise<void> => {
  try {
    await fetch(GARAGE_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

export const deleteCar = async (id: number): Promise<void> => {
  try {
    await fetch(`${GARAGE_PATH}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

export const updateCar = async (id: number, data: CarObject): Promise<ResponseCarObject> => {
  let result;
  try {
    const response = await fetch(`${GARAGE_PATH}/${id}`, {
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
