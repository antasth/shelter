import appData from '../data/appData';
import { CARS_ON_PAGE, CAR_BRANDS, CAR_MODELS, RANDOM_CARS_COUNT, WINNERS_ON_PAGE } from '../data/constants';
import { CarObject, ResponseCarObject, ResponseWinnersObject } from '../interfaces/interfaces';

export const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    console.log(selector);

    throw new TypeError('Type Error');
  }
  return element;
};

export const createElement = (
  tagName: string,
  className: string[] | null,
  innerText: string | number,
  parentNode: HTMLElement | null
): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);
  if (className) element.classList.add(...className);
  element.innerText = String(innerText);
  if (parentNode) {
    parentNode.append(element);
  }
  return element;
};
export const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const getRandomColor = (): string => {
  return `#${getRandomNumber(0xffffff).toString(16).padStart(6, '0').toUpperCase()}`;
};

export const createRandomCarName = (): string => {
  const carNameIndex = getRandomNumber(CAR_BRANDS.length);
  const carModelIndex = getRandomNumber(CAR_MODELS.length);
  return `${CAR_BRANDS[carNameIndex]} ${CAR_MODELS[carModelIndex]}`;
};

export const createRandomCar = (): CarObject => {
  return {
    name: createRandomCarName(),
    color: getRandomColor()
  };
};

export const generateRandomCars = (numberOfCars = RANDOM_CARS_COUNT): CarObject[] => {
  const randomCars = [];
  for (let i = 0; i < numberOfCars; i += 1) {
    randomCars.push(createRandomCar());
  }
  return randomCars;
};

export const getCarsData = (carsCount: number, data: Array<ResponseCarObject>) => {
  if (carsCount) {
    appData.carsCount = carsCount;
    appData.garagePagesCount = Math.ceil(carsCount / CARS_ON_PAGE);
  }
  appData.carsData = data;
};
export const getWinnersData = (winnersCount: number, data: Array<ResponseWinnersObject>) => {
  if (winnersCount) {
    appData.winnersCount = winnersCount;
    appData.winnersPagesCount = Math.ceil(winnersCount / WINNERS_ON_PAGE);
  }
  appData.winnersData = data;
};

export const getCarsOnPageId = () => {
  const carsOnPageId = appData.carsData.map((car) => {
    return car.id;
  });
  return carsOnPageId;
};

export const getTimeInSeconds = (time: number): number => {
  return Math.ceil(time / 1000);
};

export const createWinnerObject = (winnerOnServer: ResponseWinnersObject, time: number) => {
  const winnerTime = getTimeInSeconds(time);
  const winner = {
    wins: winnerOnServer.wins + 1,
    time: winnerOnServer.time < winnerTime ? winnerOnServer.time : winnerTime
  };
  return winner;
};
