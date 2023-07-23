import { ENGINE_PATH } from '../data/constants';
import { EngineStatus } from '../interfaces/enum';
import { Engine, EngineDriveResponse } from '../interfaces/interfaces';

export const startEngine = async (id: number): Promise<Engine> => {
  const response = await fetch(`${ENGINE_PATH}?id=${id}&status=${EngineStatus.start}`, {
    method: 'PATCH'
  });

  return response.json();
};
export const stopEngine = async (id: number): Promise<Engine> => {
  const response = await fetch(`${ENGINE_PATH}?id=${id}&status=${EngineStatus.stop}`, {
    method: 'PATCH'
  });
  return response.json();
};
export const switchToDriveMode = async (id: number): Promise<EngineDriveResponse> => {
  const response = await fetch(`${ENGINE_PATH}?id=${id}&status=${EngineStatus.drive}`, {
    method: 'PATCH'
  });
  const result = await response.json();
  result.id = id;

  return result;
};
