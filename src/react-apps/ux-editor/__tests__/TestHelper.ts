import { mockState } from '../__mocks__/mockState';
import '../src/types/global';

export class TestHelper {
  state: IAppState;

  constructor() {
    this.state = mockState;
  }

  public getState = () => this.state;

}
