import * as engineRequest from '../../api/engine';
import { BASE_CAR_SPEED } from '../../data/constants';
import { startCarAnimation, stopCarAnimation } from '../../functions/carAnimations';

export const startCar = async (id: number): Promise<void> => {
  const { velocity } = await engineRequest.startEngine(id);
  startCarAnimation(velocity * BASE_CAR_SPEED);
  try {
    await engineRequest.switchToDriveMode(id);
  } catch (error) {
    stopCarAnimation(true);
  }
};
export const stopCar = async (id: number): Promise<void> => {
  await engineRequest.stopEngine(id);
  stopCarAnimation();
};
