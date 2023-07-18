import { ENGINE_PATH } from '../data/constants';
import { EngineStatus } from '../interfaces/enum';

export const startEngine = async (id: number): Promise<void> => {
  const response = await fetch(`${ENGINE_PATH}?id=${id}&status=${EngineStatus.start}`, {
    method: 'PATCH'
  });
  const result = await response.json();
  console.log(result);
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
