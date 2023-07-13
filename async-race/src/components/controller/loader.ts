import { SERVER_URL } from '../../data/constants';
import { CarObject } from '../../interfaces/interfaces';

class Loader {
  private garage = `${SERVER_URL}/garage`;

  private winners = `${SERVER_URL}/winners`;

  private engine = `${SERVER_URL}/engine`;

  public async getCars(): Promise<CarObject[]> {
    const response = await (await fetch(this.garage)).json();
    return response;
  }
}

export default Loader;
