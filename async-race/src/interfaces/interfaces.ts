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
}

export interface RaceData {
  carsCount: number;
  currentPage: number;
  garagePagesCount: number;
  updateCarId: number;
  carsData: Array<ResponseCarObject>;
  winnersCount: number;
  winnersPagesCount: number;
  winnersData: Array<ResponseWinnersObject>;
}
