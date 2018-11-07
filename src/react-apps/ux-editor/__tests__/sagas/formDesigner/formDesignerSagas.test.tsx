import { cloneableGenerator } from 'redux-saga/utils';
import { SagaIterator } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import '../../../src/types/global';
import { IFormDesignerState } from '../../../src/reducers/formDesignerReducer';
import { addActiveFormContainerSaga } from '../../../src/sagas/formDesigner/formDesignerSagas';
import FormDesignerActionDispatchers from '../../../src/actions/formDesignerActions/formDesignerActionDispatcher';

describe('>>> sagas/formDesigner/formDesignerSagas.tsx', () => {

  const containerId = '';
  const component = {
    title: 'title',
    component: '123abc',
  }
  const store = {
    getState: jest.fn(() => ({
      formDesignerState: {
        layout: {
          components: {},
          containers: {},
          order: {},
          fetching: false,
          fetched: false,
          error: null,
          saving: false,
          unSavedChanges: false,
          activeContainer: '',
        }
      }
    })),
    dispatch: jest.fn()
  }

  describe('>>>addActiveFormContainerSaga', () => {
    const selectFormDesigner = (state: IAppState): IFormDesignerState => state.formDesigner;
    const action = FormDesignerActionDispatchers.addActiveFormContainer('');
    const iterator: SagaIterator = cloneableGenerator(addActiveFormContainerSaga)(action);

    let next = iterator.next();

    it('should select then call', () => {
      expect(JSON.stringify(next.value)).toEqual(JSON.stringify((select(selectFormDesigner))));

      next = iterator.next(store.getState().formDesignerState);
      expect(JSON.stringify(next.value))
        .toEqual(JSON.stringify(call(FormDesignerActionDispatchers.addActiveFormContainer,
          containerId === store.getState().formDesignerState.layout.activeContainer ? '' : containerId)));

    });
  });

  describe('>>>addFormComponentSaga', () => {
    const selectFormDesigner = (state: IAppState) => state.formDesigner.layout.activeContainer;
    const selectActiveContainer = (state: IAppState) => state.formDesigner.layout.activeContainer;
    const action = FormDesignerActionDispatchers.addFormComponent(component);
    const iterator: SagaIterator = cloneableGenerator(addActiveFormContainerSaga)(action);

    let next = iterator.next();
    it('should select ', () => {
      expect(JSON.stringify(next.value)).toEqual(JSON.stringify((select(selectActiveContainer))));
      expect(JSON.stringify(next.value)).toEqual(JSON.stringify((select(selectFormDesigner))));


    });

  });
});