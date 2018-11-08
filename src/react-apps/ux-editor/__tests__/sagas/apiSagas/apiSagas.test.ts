import { SagaIterator } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import {
  addApiConnectionSaga,
  delApiConnectionSaga,
  checkIfApisShouldFetchSaga,
  checkIfApisShouldFetch,
  apiCheckValue,
} from '../../../src/sagas/api/apiSagas';
import ApiActionDispatchers from '../../../src/actions/apiActions/apiActionDispatcher';
import * as ApiActionTypes from '../../../src/actions/apiActions/actions/index';
import { ICheckIfApiShouldFetchAction } from '../../../src/actions/apiActions/actions/checkApiParams';
import { IApiState } from '../../../src/reducers/apiReducer';
import { IFormDesignerState } from '../../../src/reducers/formDesignerReducer';
import { IFormFillerState } from '../../../src/reducers/formFillerReducer';
import { IAppDataState } from '../../../src/reducers/appDataReducer';
import apiActionDispatcher from '../../../src/actions/apiActions/apiActionDispatcher';
import { TestHelper } from '../../TestHelper';
import '../../../src/types/global';
import 'jest';

describe('>>> apiSagas', () => {
  describe('>>> appApiConnectionSaga', () => {
    const mockConnection: any = {
      test: 'test'
    };
    const action: ApiActionTypes.IAddApiConnection = ApiActionDispatchers.addApiConnection(mockConnection);
    const iterator: SagaIterator = cloneableGenerator(addApiConnectionSaga)(action);

    it('+++ should trigger add api connection fulfilled action', () => {
      expect(iterator.next(action).value).toEqual(call(ApiActionDispatchers.addApiConnectionFulfilled, action.newConnection) as any);
    });
  });

  describe('>>> delApiConnectionSaga', () => {
    const mockConnectionId: string = 'test-connection';
    const action: ApiActionTypes.IDelApiConnection = ApiActionDispatchers.delApiConnection(mockConnectionId);
    const iterator: SagaIterator = cloneableGenerator(delApiConnectionSaga)(action);
    const mockConnectionsArray = {
      connections: {
        [mockConnectionId]: {
          test: 'test',
        },
        "should-be-here-after-delete": {
          test: 'test',
        }
      }
    };
    const mockNewConnectionsArray = {
      "should-be-here-after-delete": {
        test: 'test',
      }
    };

    it('+++ should get the state', () => {
      expect(JSON.stringify(iterator.next(action).value)).toEqual(JSON.stringify(select(function selectApi(state: IAppState) { return state.serviceConfigurations.APIs }) as any));
    });

    it('+++ should remove connection id provided', () => {
      expect(iterator.next(mockConnectionsArray).value).toEqual(call(ApiActionDispatchers.delApiConnectionFulfilled, mockNewConnectionsArray) as any);
    });
  });

  describe('>>> checkIfApisShouldFetchSaga', () => {
    let mockState: TestHelper;
    let mockApiState: IApiState;
    let mockConnection: string;
    let mockFormFillerState: IFormFillerState;
    let mockAppDataState: IAppDataState;
    let mockFormDesignerState: IFormDesignerState;
    let mockUpdatedComponent: IFormComponent;
    let mockUpdatedDataModelField: IDataModelFieldElement;
    let mockUpdatedValue: string;
    let mockRepeating: boolean;
    let action: ICheckIfApiShouldFetchAction;
    let iterator: SagaIterator;

    beforeEach(() => {
      mockState = new TestHelper();
      mockApiState = mockState.getState().serviceConfigurations.APIs;
      mockConnection = Object.keys(mockApiState.connections)[0];
      mockFormFillerState = mockState.getFormFillerState();
      mockAppDataState = mockState.getAppDataState();
      mockFormDesignerState = mockState.getFormDesignerState();
      mockUpdatedComponent = mockFormDesignerState.layout.components[
        Object.keys(mockFormDesignerState.layout.components)
          .find(
            id => mockFormDesignerState.layout.components[id].dataModelBinding !== null
          )
      ];
      mockUpdatedDataModelField = mockAppDataState.dataModel.model.find(field => field.ID === mockUpdatedComponent.dataModelBinding);
      mockUpdatedValue = 'test';
      mockRepeating = false;

      action = apiActionDispatcher.checkIfApiShouldFetch(
        mockUpdatedComponent.id,
        mockUpdatedDataModelField,
        mockUpdatedValue,
        mockRepeating,
      );
    });

    it('+++ should fetch state and check if api should fetch', () => {
      iterator = cloneableGenerator(checkIfApisShouldFetchSaga)(action);
      expect(JSON.stringify(iterator.next(action).value)).toEqual(JSON.stringify(select(function selectFormFiller(state: IAppState) { return state.formFiller })));
      expect(JSON.stringify(iterator.next(mockFormFillerState).value)).toEqual(JSON.stringify(select(function selectApi(state: IAppState) { return state.serviceConfigurations.APIs })));
      expect(JSON.stringify(iterator.next(mockApiState).value)).toEqual(JSON.stringify(select(function selectAppData(state: IAppState) { return state.appData })));
      expect(JSON.stringify(iterator.next(mockAppDataState).value)).toEqual(JSON.stringify(select(function selectFormDesigner(state: IAppState) { return state.formDesigner })));
      expect(iterator.next(mockFormDesignerState).value).toEqual(call(
        checkIfApisShouldFetch,
        mockApiState,
        mockConnection,
        mockFormFillerState,
        mockUpdatedDataModelField,
        mockUpdatedValue,
        mockFormDesignerState,
        mockAppDataState,
        mockRepeating,
        action.dataModelGroup,
        action.index
      ) as any);
      expect(iterator.next().done).toBeTruthy();
    });
  });

  describe('>>> checkIfApisShouldFetch', () => {
    let mockState: TestHelper;
    let mockApiState: IApiState;
    let mockConnection: string;
    let mockFormFillerState: IFormFillerState;
    let mockLastUpdatedDataBinding: IDataModelFieldElement;
    let mockLastUpdatedDataValue: string;
    let mockFormDesignerState: IFormDesignerState;
    let mockAppDataState: IAppDataState;
    let mockRepeating: boolean;
    let mockDataModelGroup: string;
    let mockIndex: number;

    let iterator: SagaIterator;

    beforeEach(() => {
      mockState = new TestHelper();
      mockApiState = mockState.getApiState();
      mockConnection = Object.keys(mockApiState.connections)[0];
      mockFormFillerState = mockState.getFormFillerState();
      mockLastUpdatedDataBinding = null;
      mockLastUpdatedDataValue = 'test';
      mockFormDesignerState = mockState.getFormDesignerState();
      mockAppDataState = mockState.getAppDataState();
      mockRepeating = false;
      mockDataModelGroup = null;
      mockIndex = 0;
    });

    it('+++ should do call apiCheckValue', () => {
      iterator = cloneableGenerator(
        checkIfApisShouldFetch
      )(
        mockApiState,
        mockConnection,
        mockFormFillerState,
        mockLastUpdatedDataBinding,
        mockLastUpdatedDataValue,
        mockFormDesignerState,
        mockAppDataState,
        mockRepeating,
        mockDataModelGroup,
        mockIndex
      );
      expect(iterator.next().value).toEqual(call(
        apiCheckValue,
        mockApiState.connections[mockConnection],
        mockLastUpdatedDataBinding,
        mockLastUpdatedDataValue,
        mockFormFillerState.formData,
        mockApiState.externalApisById,
        mockFormDesignerState.layout.components,
        mockAppDataState.dataModel.model,
        mockRepeating,
        mockDataModelGroup,
        mockIndex,
      ));
      expect(iterator.next().done).toBeTruthy();
    });
  });
});
