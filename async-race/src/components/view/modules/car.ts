class Car {
  private name: string;

  private color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  public drawCar(): void {
    console.log('car');
  }
}

export default Car;
