import { CAR_OFFSET, CAR_WIDTH } from '../data/constants';
import { getElement } from './functions';

export const startCarAnimation = (carId: number, duration: number): void => {
  try {
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
  } catch (error) {
    console.log('stop animation');
  }
};

export const stopCarAnimation = (carId: number, isEngineBroken = false): void => {
  try {
    const car = getElement(`.garage__item__car[data-index="${carId}"]`);

    const position = isEngineBroken ? car.getBoundingClientRect().x - CAR_OFFSET : 0;
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
  } catch (error) {
    console.log('stop animation');
  }
};
