import { CAR_WIDTH } from '../data/constants';
import { getElement } from './functions';

export const startCarAnimation = (carId: number, duration: number): void => {
  const placeToStop = getElement('.garage__item__content__track').clientWidth - CAR_WIDTH;
  const car = getElement(`.garage__item__car[data-index="${carId}"]`);
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
export const stopCarAnimation = (carId: number, isEngineBroken = false): void => {
  const car = getElement(`.garage__item__car[data-index="${carId}"]`);
  const position = isEngineBroken ? car.offsetWidth : 0;
  car.style.animationPlayState = 'paused';
  car.animate(
    [
      {
        transform: `translateX(${position}px)`
      }
    ],
    {
      duration: 1,
      fill: 'forwards'
    }
  );
};
