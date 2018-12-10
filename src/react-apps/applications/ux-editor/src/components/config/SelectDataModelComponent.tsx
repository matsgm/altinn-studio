import * as React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

export interface ISelectDataModelProps extends IProvidedProps {
  dataModelElements: IDataModelFieldElement[];
}

export interface IProvidedProps {
  selectedElement: string;
  onDataModelChange: (dataModelField: any) => void;
  hideRestrictions?: boolean;
  language: any;
}

export interface ISelectDataModelState {
  selectedElement: string;
}

const customInput = {
  control: (base: any) => ({
    ...base,
    borderRadius: '0 !important',
  })
};

export class SelectDataModel extends React.Component<
  ISelectDataModelProps,
  ISelectDataModelState
  > {
  constructor(_props: ISelectDataModelProps, _state: ISelectDataModelState) {
    super(_props, _state);

    this.state = {
      selectedElement: _props.selectedElement,
    };

    this.onDataModelChange = this.onDataModelChange.bind(this);
  }

  public onDataModelChange(e: any) {
    this.setState({ selectedElement: e.target.value });
    this.props.onDataModelChange(e);
  }

  public getRestrictions(selectedId: string): any {
    if (!selectedId) {
      return (
        <li className='a-dotted'>
          <div className='row'>
            <div className='col-12'>
              {this.props.language.ux_editor.modal_restrictions_helper}
            </div>
          </div>
        </li>
      );
    }
    const selected = this.props.dataModelElements.find(
      (modelBinding) => modelBinding.DataBindingName === selectedId);
    return (
      Object.keys(selected.Restrictions).length === 0 ? (
        <li className='a-dotted'>
          <div className='row'>
            <div className='col-12'>
              {this.props.language.ux_editor.modal_restrictions_empty}
            </div>
          </div>
        </li>)
        :
        Object.keys(selected.Restrictions).map(
          (key: string): React.ReactNode => (
            <li key={key} className='a-dotted'>
              <div className='row'>
                <div className='col-4'>{key}</div>
                <div className='col-8'>{selected.Restrictions[key].Value}</div>
              </div>
            </li>
          ),
        )
    );
  }

  public render() {
    const dataModelElementNames = [];
    for (const element of this.props.dataModelElements) {
      if (element.DataBindingName) {
        dataModelElementNames.push({value: element.DataBindingName, label: element.DataBindingName});
      }
    }
    return (
        <Select
          styles={customInput}
          options={dataModelElementNames}
          onChange={this.props.onDataModelChange}
          isClearable={true}
        />
    );
  }
}

const mapStateToProps = (
  state: IAppState,
  props: IProvidedProps,
): ISelectDataModelProps => {
  return {
    selectedElement: props.selectedElement,
    onDataModelChange: props.onDataModelChange,
    dataModelElements: state.appData.dataModel.model,
    language: state.appData.language.language,
  };
};

export const SelectDataModelComponent = connect(mapStateToProps)(
  SelectDataModel,
);
