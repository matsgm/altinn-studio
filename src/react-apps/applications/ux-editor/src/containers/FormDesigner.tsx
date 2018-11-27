import * as React from 'react';
import { connect } from 'react-redux';
import AppDataActionDispatcher from '../actions/appDataActions/appDataActionDispatcher';
import FormDesignerActionDispatchers from '../actions/formDesignerActions/formDesignerActionDispatcher';
import ManageServiceConfigurationDispatchers from '../actions/manageServiceConfigurationActions/manageServiceConfigurationActionDispatcher';
import { Preview } from './Preview';
import { Toolbar } from './Toolbar';

export interface IFormDesignerProps {
  language: any;
}
export interface IFormDesignerState { }

class FormDesigner extends React.Component<
  IFormDesignerProps,
  IFormDesignerState
  > {
  public componentDidMount() {
    const altinnWindow: IAltinnWindow = window as IAltinnWindow;
    const { org, service } = altinnWindow;
    const servicePath = `${org}/${service}`;

    FormDesignerActionDispatchers.fetchFormLayout(
      `${altinnWindow.location.origin}/designer/${servicePath}/UIEditor/GetFormLayout`);
    AppDataActionDispatcher.setDesignMode(true);
  }

  public renderSaveButton = (): JSX.Element => {
    const altinnWindow: IAltinnWindow = window as IAltinnWindow;

    const handleSaveButton: any = (): any => {
      ManageServiceConfigurationDispatchers.saveJsonFile(
        `${altinnWindow.location.origin}/designer/${altinnWindow.org}/${
        altinnWindow.service}/UIEditor/SaveJsonFile?fileName=ServiceConfigurations.json`);

      FormDesignerActionDispatchers.saveFormLayout(
        `${altinnWindow.location.origin}/designer/${altinnWindow.org}/${
        altinnWindow.service
        }/UIEditor/SaveFormLayout`,
      );
    };

    return (
      <button type='button' className='a-btn a-btn-success' onClick={handleSaveButton}>
        {this.props.language.general.save}
      </button>
    );
  }

  public render() {
    return (
      <div style={{ display: 'flex', width: '100%', alignItems: 'stretch' }}>
        <div style={{ paddingLeft: 72 }}>

          <div className='container mb-3'>
            <div className='row mt-3'>
              <h1>{this.props.language.ux_editor.form_designer}</h1>
            </div>
            <div className='row bigger-container mt-3'>
              <Toolbar />
              <div className='col'>
                <Preview />
                <div className='col-12 justify-content-center d-flex mt-3'>
                  {this.renderSaveButton()}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (
  state: IAppState,
): IFormDesignerProps => {
  return {
    language: state.appData.language.language,
  };
};

export default connect(mapsStateToProps)(FormDesigner);
