import { CARS_ON_PAGE, CAR_BRANDS, CAR_MODELS } from '../data/constants';
import raceData from '../data/raceData';
import { CarObject, ResponseCarObject } from '../interfaces/interfaces';

export const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new TypeError('Type Error');
  }
  return element;
};

// export const getElements = (selector: string): NodeList => {
//   const elements = document.querySelectorAll(selector);
//   if (!elements) {
//     throw new TypeError('Type Error');
//   }
//   return elements;
// };

export const createElement = (
  tagName: string,
  className: string[],
  innerText: string | number,
  parentNode: HTMLElement | null
): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);
  element.classList.add(...className);
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

export const getRaceData = (carsCount: number, data: Array<ResponseCarObject>) => {
  if (carsCount) {
    raceData.carsInGarageCount = carsCount;
    raceData.countOfPages = Math.ceil(carsCount / CARS_ON_PAGE);
  }
  raceData.carsData = data;
};

export const getCarsOnPageId = () => {
  const carsOnPageId = raceData.carsData.map((car) => {
    return car.id;
  });
  return carsOnPageId;
};
