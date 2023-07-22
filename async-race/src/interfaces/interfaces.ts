export interface CarObject {
  name: string;
  color: string;
}

export interface ResponseCarObject {
  id: number;
  name: string;
  color: string;
}

export interface Cars {
  items: Array<CarObject>;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface RaceData {
  carsInGarageCount: number;
  currentPage: number;
  countOfPages: number;
  updateCarId: number;
  carsData: Array<ResponseCarObject>;
}
