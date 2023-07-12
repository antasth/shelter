import { SERVER_URL } from '../../data/constants';

class Loader {
  private garage = `${SERVER_URL}/garage`;

  private winners = `${SERVER_URL}/winners`;

  private engine = `${SERVER_URL}/engine`;

  public async getCars() {
    fetch(this.garage)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}

export default Loader;
