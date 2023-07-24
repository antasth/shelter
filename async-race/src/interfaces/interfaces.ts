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

export interface UpdateWinnersObject {
  wins: number;
  time: number;
}

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

export interface AppData {
  carsCount: number;
  garagePage: number;
  garagePagesCount: number;
  updateCarId: number;
  carsData: Array<ResponseCarObject>;
  winnersCount: number;
  winnersPagesCount: number;
  winnersData: Array<ResponseWinnersObject>;
  winnersPage: number;
  sortOrder: string;
}
