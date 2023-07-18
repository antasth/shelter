import * as engineRequest from '../../api/engine';
import { startCarAnimation, stopCarAnimation } from '../../functions/carAnimations';

export const startCar = async (id: number): Promise<void> => {
  const { velocity } = await engineRequest.startEngine(id);
  startCarAnimation(velocity * 50);
};
export const stopCar = async (id: number): Promise<void> => {
  await engineRequest.stopEngine(id);
  stopCarAnimation();
};
