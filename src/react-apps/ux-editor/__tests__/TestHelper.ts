import 'jest';
import { mockState } from '../__mocks__/mockState';
import '../src/types/global';

// Since the file is located in the __tests__ folder, it has to have a test associated to it.
it('should pass test', () => {
  expect(true).toBeTruthy(); // Pass no matter what
})

export class TestHelper {
  private state: IAppState;

  constructor() {
    this.state = mockState;
  }

  public getState = () => this.state;
  public getApiState = () => this.state.serviceConfigurations.APIs;
  public getFormFillerState = () => this.state.formFiller;
  public getFormDesignerState = () => this.state.formDesigner;
  public getAppDataState = () => this.state.appData;
}
