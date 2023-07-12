import { SERVER_URL } from '../../data/constants';
import { Cars } from '../../interfaces/interfaces';

class Loader {
  private garage = `${SERVER_URL}/garage`;

  private winners = `${SERVER_URL}/winners`;

  private engine = `${SERVER_URL}/engine`;

  public async getCars(): Promise<Cars> {
    const response = await (await fetch(this.garage)).json();
    console.log(response);
    return response;
  }
}

export default Loader;
