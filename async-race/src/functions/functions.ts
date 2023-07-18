import { CAR_BRANDS, CAR_MODELS, CAR_WIDTH } from '../data/constants';
import { CarObject } from '../interfaces/interfaces';

export const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new TypeError('Type Error');
  }
  return element;
};

export const createElement = (
  tagName: string,
  className: string[],
  innerText: string,
  parentNode: HTMLElement | null
): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);
  element.classList.add(...className);
  element.innerText = innerText;
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

export const animateCar = (duration: number): void => {
  const placeToStop = getElement('.garage__item__content__track').clientWidth - CAR_WIDTH;
  const car = getElement('.garage__item__car');
  car.animate(
    [
      {
        transform: `translateX(${placeToStop}px)`
      }
    ],
    {
      duration,
      fill: 'forwards'
    }
  );
};
