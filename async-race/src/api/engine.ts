import { ENGINE_PATH } from '../data/constants';
import { EngineStatus } from '../interfaces/enum';
import { Engine } from '../interfaces/interfaces';

export const startEngine = async (id: number): Promise<Engine> => {
  const response = await fetch(`${ENGINE_PATH}?id=${id}&status=${EngineStatus.start}`, {
    method: 'PATCH'
  });
  // const result = await response.json();
  // console.log(result);
  return response.json();
};
export const stopEngine = async (id: number): Promise<void> => {
  const response = await fetch(`${ENGINE_PATH}?id=${id}&status=${EngineStatus.stop}`, {
    method: 'PATCH'
  });
  const result = await response.json();
  console.log(result);
};
export const switchToDriveMode = async (id: number): Promise<void> => {
  const response = await fetch(`${ENGINE_PATH}?id=${id}&status=${EngineStatus.drive}`, {
    method: 'PATCH'
  });
  const result = await response.json();
  console.log(result);
};
