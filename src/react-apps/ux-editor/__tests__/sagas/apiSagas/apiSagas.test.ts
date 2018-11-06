import { SagaIterator } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { addApiConnectionSaga, delApiConnectionSaga } from '../../../src/sagas/api/apiSagas';
import ApiActionDispatchers from '../../../src/actions/apiActions/apiActionDispatcher';
// import * as ApiActions from '../../../src/actions/apiActions/apiActionTypes';
import * as ApiActionTypes from '../../../src/actions/apiActions/actions/index';

import 'jest';

describe('>>> apiSagas', () => {
  describe('>>> appApiConnectionSaga', () => {
    const mockConnection: any = {
      test: 'test'
    };
    const action: ApiActionTypes.IAddApiConnection = ApiActionDispatchers.addApiConnection(mockConnection);
    const iterator: SagaIterator = cloneableGenerator(addApiConnectionSaga)(action);

    it('+++ should trigger add api connection action', () => {
      expect(JSON.stringify(iterator.next(action).value)).toMatch(JSON.stringify(call(ApiActionDispatchers.addApiConnection, action.newConnection)));
    });
  });

  describe('>>> delApiConnectionSaga', () => {
    const mockConnectionId: string = 'test-connection';
    const action: ApiActionTypes.IDelApiConnection = ApiActionDispatchers.delApiConnection(mockConnectionId);
    const iterator: SagaIterator = cloneableGenerator(delApiConnectionSaga)(action);
    const mockSelectApi = (state: any) => state.serviceConfigurations.APIs;
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
      expect(JSON.stringify(iterator.next(action).value)).toMatch(JSON.stringify(select(mockSelectApi)));
    });

    it('+++ should remove connection id provided', () => {
      expect(JSON.stringify(iterator.next(mockConnectionsArray).value)).toMatch(JSON.stringify(call(ApiActionDispatchers.delApiConnectionFulfilled, mockNewConnectionsArray)));
    });
  });

  describe('>>> checkIfApisShouldFetchSaga', () => {

  });
});