export interface CarObject {
  id?: number;
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
  carsData: Array<CarObject>;
}
