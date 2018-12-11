import update from 'immutability-helper';
import * as React from 'react';
import { connect } from 'react-redux';
import ApiActionDispatchers from '../actions/apiActions/apiActionDispatcher';
import ConditionalRenderingActionDispatcher from '../actions/conditionalRenderingActions/conditionalRenderingActionDispatcher';
import FormDesignerActionDispatchers from '../actions/formDesignerActions/formDesignerActionDispatcher';
import FormFillerActionDispatchers from '../actions/formFillerActions/formFillerActionDispatcher';
import RuleConnectionActionDispatchers from '../actions/ruleConnectionActions/ruleConnectionActionDispatcher';
import { FormComponentWrapper } from '../components/FormComponent';
import { SwitchComponent } from '../components/widget/SwitchComponent';
import { makeGetDesignModeSelector } from '../selectors/getAppData';
import { makeGetFormDataSelector } from '../selectors/getFormData';
import { makeGetActiveFormContainer, makeGetLayoutComponentsSelector, makeGetLayoutContainersSelector } from '../selectors/getLayoutData';
import '../styles/index.css';
import DroppableDraggableComponent from './DroppableDraggableComponent';
import DroppableDraggableContainer from './DroppableDraggableContainer';

export interface IProvidedContainerProps {
  id: string;
  baseContainer?: boolean;
  droppableId?: string;
  parentContainerId?: string;
}

export interface IContainerProps extends IProvidedContainerProps {
  dataModelGroup?: string;
  itemOrder: any;
  components: any;
  containers: any;
  repeating: boolean;
  designMode: boolean;
  formData: any;
  index?: number;
  formContainerActive?: boolean;
  language: any;
}

export interface IContainerState {
  itemOrder: any;
  currentlyDragging: boolean;
}

export class ContainerComponent extends React.Component<IContainerProps, IContainerState> {
  public static getDerivedStateFromProps(nextProps: IContainerProps, prevState: IContainerState) {
    if (prevState.currentlyDragging) {
      return {
        ...prevState,
      };
    }
    return {
      ...nextProps,
    };
  }

  constructor(_props: IContainerProps) {
    super(_props);

    this.state = {
      itemOrder: _props.itemOrder,
      currentlyDragging: false,
    };
  }

  public handleContainerDelete = (e: any) => {
    FormDesignerActionDispatchers.deleteFormContainer(this.props.id, this.props.index, this.props.parentContainerId);
    e.stopPropagation();
  }

  public handleComponentDataUpdate = (
    id: string,
    dataModelElement: IDataModelFieldElement,
    callbackValue: any,
  ): void => {
    const dataBindingName = this.isRepeating() ? dataModelElement.DataBindingName.replace(this.props.dataModelGroup,
      this.props.dataModelGroup + `[${this.props.index}]`) : dataModelElement.DataBindingName;
    FormFillerActionDispatchers.updateFormData(
      id,
      callbackValue,
      dataModelElement,
      dataBindingName,
    );
    const repeatingContainerId = this.isRepeating() ? this.props.id : null;

    ConditionalRenderingActionDispatcher.checkIfConditionalRulesShouldRun(repeatingContainerId);
    RuleConnectionActionDispatchers.checkIfRuleShouldRun(id, dataModelElement, callbackValue, repeatingContainerId);
    ApiActionDispatchers.checkIfApiShouldFetch(id, dataModelElement, callbackValue, this.props.repeating,
      this.props.dataModelGroup, this.props.index);
  }

  public isRepeating = (): boolean => {
    return (this.props.index || this.props.index > -1) && this.props.dataModelGroup && this.props.repeating;
  }

  public render() {
    const className: string = this.props.baseContainer ? 'col-12' :
      this.props.formContainerActive ? 'col-12 a-btn-action a-bgBlueLighter cursorPointer' :
        'col-12 a-btn-action cursorPointer';
    if (this.props.baseContainer) {
      return (
        <DroppableDraggableContainer
          id={this.props.id}
          notDroppable={false}
          canDrag={false}
        >
          <div
            className={className}
            onClick={this.changeActiveFormContainer}
          >
            {
              this.props.designMode && !this.props.baseContainer &&
              <div className='row'>
                <div className='col-1'>
                  {this.renderDeleteGroupButton()}
                </div>
                <div className='col-3 offset-8 row'>
                  <span className='col-6'>Repeating:</span>
                  <div className='col-5'>
                    <SwitchComponent isChecked={this.props.repeating} toggleChange={this.toggleChange} />
                  </div>
                </div>
              </div>
            }
            {this.state.itemOrder[this.props.id].length > 0 ?
              this.state.itemOrder[this.props.id]
                .map((id: string, index: number) => (
                  this.props.components[id] ?
                    this.renderFormComponent(id, index) :
                    this.props.containers[id] ?
                      this.renderContainer(id, index)
                      : id === 'temporary' ? 'Drop here' : null
                )) : null
            }
            {
              !this.props.designMode && this.props.index !== 0 && !this.props.baseContainer &&
              <button
                className={'a-btn a-btn-action offset-10'}
                onClick={this.handleContainerDelete}
              >
                <span>{this.props.language.ux_editor.repeating_group_delete}</span>
              </button>
            }
            {!this.props.designMode && this.renderNewGroupButton()}
          </div>
        </DroppableDraggableContainer>
      );
    }
    return (
      <div>
        {
          this.props.designMode && !this.props.baseContainer &&
          <div className='row'>
            <div className='col-1'>
              {this.renderDeleteGroupButton()}
            </div>
            <div className='col-3 offset-8 row'>
              <span className='col-6'>Repeating:</span>
              <div className='col-5'>
                <SwitchComponent isChecked={this.props.repeating} toggleChange={this.toggleChange} />
              </div>
            </div>
          </div>
        }
        {this.state.itemOrder[this.props.id].map((id: string, index: number) => (
          this.props.components[id] ?
            this.renderFormComponent(id, index) :
            this.props.containers[id] ?
              this.renderContainer(id, index)
              : id === 'temporary' ? 'Drop here' : null
        ))}
        {
          !this.props.designMode && this.props.index !== 0 && !this.props.baseContainer &&
          <button
            className={'a-btn a-btn-action offset-10'}
            onClick={this.handleContainerDelete}
          >
            <span>{this.props.language.ux_editor.repeating_group_delete}</span>
          </button>
        }
        {!this.props.designMode && this.renderNewGroupButton()}
      </div>
    );
  }

  public hoverOver = (
    draggedId: string,
    newPosition: number,
    oldPosition: number,
  ) => {
    const { itemOrder } = this.state;
    const updatedOrder = itemOrder[this.props.id];

    this.setState((state: IContainerState) => update(state, {
      currentlyDragging: {
        $set: !state.currentlyDragging,
      },
    }));

    if (newPosition === oldPosition) {
      return;
    }

    if (!draggedId) {
      if (updatedOrder.indexOf('temporary') > -1) {
        updatedOrder.splice(updatedOrder.indexOf('temporary'), 1);
      }
      updatedOrder.splice(newPosition, 0, 'temporary');
      return this.setState((state: IContainerState) => update(state, {
        itemOrder: {
          [this.props.id]: {
            $set: updatedOrder,
          },
        }
      }));
    }

    if (updatedOrder.indexOf(draggedId) < -1) {
      // Moving from another container
      return;
    }
    if (newPosition === updatedOrder.indexOf(draggedId)) {
      return;
    }

    if (!draggedId) {
      updatedOrder.splice(oldPosition, 1);

    } else {
      updatedOrder.splice(oldPosition, 1);
      updatedOrder.splice(newPosition, 0, draggedId);
    }

    this.setState((state: IContainerState) => update(state, {
      itemOrder: {
        [this.props.id]: {
          $set: updatedOrder,
        },
      },
    }));
  }

  public dropItem = (
    id: string,
    newPosition: number,
    oldPosition: number,
    destinationContainerId: string,
    sourceContainerId: string,
  ) => {
    FormDesignerActionDispatchers.updateFormComponentOrderAction(
      id,
      newPosition,
      oldPosition,
      destinationContainerId,
      sourceContainerId,
    );
    const { itemOrder } = this.state;
    const updatedOrder = itemOrder[this.props.id];

    if (updatedOrder.indexOf('temporary') > -1) {
      updatedOrder.splice(updatedOrder.indexOf('temporary'), 1);
    }

    return this.setState((state: IContainerState) => update(state, {
      itemOrder: {
        [this.props.id]: {
          $set: updatedOrder,
        },
      },
      currentlyDragging: {
        $set: !state.currentlyDragging,
      },
    }));
  }

  public renderContainer = (id: string, index: number) => {
    if (this.props.containers[id].hidden && !this.props.designMode) {
      return null;
    }
    if (this.props.designMode) {
      return (
        <DroppableDraggableContainer
          id={id}
          notDroppable={false}
          canDrag={true}
        >
          <Container
            id={id}
            baseContainer={false}
            parentContainerId={this.props.id}
          />
        </DroppableDraggableContainer>
      );
    } else {
      return (
        <Container
          id={id}
          key={id}
        />
      );
    }
  }

  public renderDeleteGroupButton = (): JSX.Element => {
    if (this.props.baseContainer) {
      return null;
    }
    return (
      <button
        type='button'
        className='a-btn a-btn-icon p-0'
        onClick={this.handleContainerDelete}
      >
        <i className='ai ai-circle-exit a-danger ai-left' />
      </button>
    );
  }

  public renderNewGroupButton = (): JSX.Element => {
    if (this.props.baseContainer || !this.props.repeating) {
      return null;
    }
    const repeatingGroupCount = Object.keys(this.props.containers).filter((id) => {
      return this.props.containers[id].dataModelGroup === this.props.dataModelGroup;
    }).length;

    if (repeatingGroupCount - 1 !== this.props.index) {
      return null;
    }

    return (
      <button
        className={'a-btn a-btn-action'}
        onClick={this.handleAddNewGroup}
      >
        <i className={'ai ai-plus'} />
        <span>
          {this.props.language.ux_editor.repeating_group_add}
        </span>
      </button>
    );
  }

  public renderFormComponent = (id: string, index: number): JSX.Element => {
    if (this.props.components[id].hidden && !this.props.designMode) {
      return null;
    }

    if (this.props.designMode) {
      return (
        <DroppableDraggableComponent
          id={id}
          index={index}
          containerId={this.props.id}
          onDropItem={this.dropItem}
          onHoverOver={this.hoverOver}
        >
          <FormComponentWrapper
            key={index}
            id={id}
            handleDataUpdate={this.handleComponentDataUpdate}
            formData={this.props.formData[this.props.components[id].dataModelBinding] ?
              this.props.formData[this.props.components[id].dataModelBinding] : ''}
          />
        </DroppableDraggableComponent>
      );
    }
    return (
      <FormComponentWrapper
        key={index}
        id={id}
        handleDataUpdate={this.handleComponentDataUpdate}
        formData={this.props.formData[this.props.components[id].dataModelBinding] ?
          this.props.formData[this.props.components[id].dataModelBinding] : ''}
      />
    );
  }

  public handleAddNewGroup = () => {
    FormDesignerActionDispatchers.createRepeatingGroup(this.props.id);
  }

  public changeActiveFormContainer = (e: any) => {
    e.stopPropagation();
  }
  public toggleChange = () => {
    FormDesignerActionDispatchers.toggleFormContainerRepeat(this.props.id);
  }
}

const makeMapStateToProps = () => {
  const GetFormDataSelector = makeGetFormDataSelector();
  const GetLayoutContainersSelector = makeGetLayoutContainersSelector();
  const GetLayoutComponentsSelector = makeGetLayoutComponentsSelector();
  const GetDesignModeSelector = makeGetDesignModeSelector();
  const GetActiveFormContainer = makeGetActiveFormContainer();
  // const GetLayoutContainerOrder = makeGetLayoutContainerOrder();
  const mapStateToProps = (state: IAppState, props: IProvidedContainerProps): IContainerProps => {
    const containers = GetLayoutContainersSelector(state);
    const container = containers[props.id];
    return {
      id: props.id,
      index: container.index,
      itemOrder: state.formDesigner.layout.order,
      components: GetLayoutComponentsSelector(state),
      containers,
      designMode: GetDesignModeSelector(state),
      repeating: container.repeating,
      formData: GetFormDataSelector(state, props, container.index),
      dataModelGroup: container.dataModelGroup,
      formContainerActive: GetActiveFormContainer(state, props),
      language: state.appData.language.language,
      droppableId: props.droppableId,
      parentContainerId: props.parentContainerId,
    };
  };
  return mapStateToProps;
};

export const Container = connect(makeMapStateToProps)(ContainerComponent);
