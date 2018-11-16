import { SagaIterator } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import manageServiceConfigurationActionDispatcher from '../../../src/actions/manageServiceConfigurationActions/manageServiceConfigurationActionDispatcher';
import { fetchJsonFileSaga, saveJsonFileSaga } from '../../../src/sagas/manageServiceConfiguration/manageServiceConfigurationSagas';
import { get, post } from '../../../src/utils/networking';

import 'jest';

describe('>>> manageServiceConfigurationSagas', () => {
  const url = 'test-url';

  describe('>>> fetchJsonFileSaga', () => {
    const action = manageServiceConfigurationActionDispatcher.fetchJsonFile(url);
    const mockServiceConfiguration = {
      data: {
        test: 'test',
      },
    };

    it('+++ should fetch service and fire off event for successfull fetch', () => {
      const iterator: SagaIterator = cloneableGenerator(fetchJsonFileSaga)(action);
      expect(
        iterator.next(action).value)
        .toEqual(call(get, url));
      expect(
        iterator.next(mockServiceConfiguration).value)
        .toEqual(
          call(manageServiceConfigurationActionDispatcher.fetchJsonFileFulfilled, mockServiceConfiguration.data)
        );
      expect(iterator.next().done).toBeTruthy();
    });
  });

  describe('>>> saveJsonFileSaga', () => {
    const action = manageServiceConfigurationActionDispatcher.saveJsonFile(url);
    const selectServiceConfiguration = (state: any) => state.serviceConfiguration
    const mockServiceConfigurationState = {
      manageServiceConfiguration: {
        test1: 1,
        test2: 2,
      },
    };
    const iterator: SagaIterator = cloneableGenerator(saveJsonFileSaga)(action);

    it('+++ should select current data from state', () => {
      expect(JSON.stringify(iterator.next(action).value)).toEqual(JSON.stringify(select(selectServiceConfiguration)));
    });

    it('+++ should loop through selected state and post it to the api', () => {
      expect(
        JSON.stringify(
          iterator.next(mockServiceConfigurationState).value)).toEqual(JSON.stringify(call(post, url, {
            data: {},
          })));
    });

    it('+++ should fire of the event of successfull save', () => {
      expect(
        JSON.stringify(
          iterator.next().value))
        .toEqual(
          JSON.stringify(
            call(manageServiceConfigurationActionDispatcher.saveJsonFileFulfilled, 'data')
          ));
    });
  });
});
