import * as React from 'react';
import '../../styles/InputComponent.css';

export interface IInputProps {
  id: string;
  component: IFormComponent;
  formData: any;
  handleDataChange: (value: any) => void;
  isValid?: boolean;
}

export interface IInputState {
  value: string;
}

export class InputComponent
  extends React.Component<IInputProps, IInputState> {

  constructor(_props: IInputProps, _state: IInputState) {
    super(_props, _state);

    this.state = {
      value: _props.formData ? _props.formData : '',
    };
  }

  public onDataChanged = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  }

  public onDataChangeSubmit = () => {
    this.props.handleDataChange(this.state.value);
  }

  public renderDateInput() {
  }

  public render() {
    
    return (
      <div className='input-group'>
        <input
          id={this.props.id}
          type={this.getInputType()}
          onBlur={this.onDataChangeSubmit}
          onChange={this.onDataChanged}
          disabled={this.props.component.disabled}
          required={this.props.component.required}
          className={this.getClassNames()}
          value={this.state.value}
        />
        <div className='input-group-prepend a-icon-right'>
          <i className='ai ai-date' aria-hidden='true'/>
        </div>
      </div>
    );
  }

  private getInputType = (): string => {
    if (this.props.component.type === 'date') {
      return 'text';
    }

    return this.props.component.type;
  }

  private getClassNames = (): string => {
    let classNames = 'form-control';
    if (!this.props.isValid) {
      classNames += ' validation-error';
    }
    if (this.props.component.type === 'date') {
      classNames += ' a-hasButton date js-period';
    }

    return classNames;
  }
}
