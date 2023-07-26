export interface CarObject {
  name: string;
  color: string;
}

export interface ResponseCarObject {
  id: number;
  name: string;
  color: string;
}

export interface ResponseWinnersObject {
  id: number;
  wins: number;
  time: number;
}

export type UpdateWinnersObject = Omit<ResponseWinnersObject, 'id'>;

export interface Cars {
  items: Array<CarObject>;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface EngineDriveResponse {
  success: boolean;
  id: number;
  time: number;
}

export interface LastSortObject {
  sortOrder: string;
  sort: string;
}
export interface AppData {
  carsCount: number;
  garagePage: number;
  garagePagesCount: number;
  updateCarId: number;
  carsData: Array<ResponseCarObject>;
  winnersCount: number;
  winnersPagesCount: number;
  winnersData: Array<ResponseWinnersObject>;
  winnerCarsList: Array<ResponseCarObject>;
  winnersPage: number;
  sortOrder: string;
  lastSort: LastSortObject;
}
