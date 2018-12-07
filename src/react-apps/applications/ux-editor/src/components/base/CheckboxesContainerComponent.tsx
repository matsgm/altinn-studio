import * as React from 'react';

export interface ICheckboxContainerProps {
  id: string;
  component: IFormComponent;
  formData: any;
  handleDataChange: (value: any) => void;
  getTextResource: (resourceKey: string) => string;
  isValid: boolean;
  designMode: boolean;
}

export interface ICheckboxContainerState {
  selected: boolean;
}

export class CheckboxContainerComponent extends React.Component<ICheckboxContainerProps, ICheckboxContainerState> {

  public onDataChanged = (selectedValue: any) => {
    const formData = this.props.formData === '' ? [] : (this.props.formData as string).split(',');
    if (formData.find((f) => f === selectedValue)) {
      formData.splice(formData.findIndex((f) => f === selectedValue), 1);
    } else {
      formData.push(selectedValue);
    }
    this.props.handleDataChange(formData.join(','));
  }

  public render() {
    const { options } = this.props.component;
    return (
      <div className={this.props.isValid ? 'form-group' : 'form-group validation-error'} id={this.props.id}>
        {options.map((option, index) => (
          <div
            className='custom-control custom-checkbox pl-0 a-custom-checkbox custom-control-stacked'
            key={index}
            onClick={this.onDataChanged.bind(this, option.value)}
          >
            <input
              type='checkbox'
              name={'checkbox-' + this.props.id}
              checked={(this.props.formData as string).includes(option.value)}
              className={this.props.isValid ? 'custom-control-input' : 'custom-control-input validation-error'}
            />
            <label className='custom-control-label pl-3 a-checkboxes-title'>
              {this.props.designMode ? option.label : this.props.getTextResource(option.label)}
            </label>
          </div>
        ))}
      </div>
    );
    // return (
    //   <div className='form-group'>
    //     <div className='pl-0 custom-control custom-control-stacked custom-checkbox a-custom-checkbox'>
    //       {this.props.component.options ? this.props.component.options.map((option: IOptions) => {
    //         return (
    //           <label key={this.props.component.id + '_' + option.value} className='custom-control custom-checkbox'>
    //             <input type='checkbox' className='custom-control-input'/>
    //             <span className='custom-control-indicator'/>
    //             <span className='ml-1'>{option.value}</span>
    //           </label>
    //         );
    //       })
    //         : null}
    //     </div>
    //   </div>
    // );
  }
}
