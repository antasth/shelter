import * as engineRequest from '../../api/engine';
import { animateCar } from '../../functions/functions';

export const startCar = async (id: number) => {
  const { velocity } = await engineRequest.startEngine(id);
  console.log(velocity);
  animateCar(velocity * 50);
};
