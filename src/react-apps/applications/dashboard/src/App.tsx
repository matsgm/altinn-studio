import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import OrganizationOverview from './services/servicesOverview';
import './App.css';
import fetchLanguageDispatcher from './fetchLanguage/fetchLanguageDispatcher';
import fetchServicesActionDispatchers from './Services/fetchDashboardDispatcher';
import altinnTheme from '../../shared/src/theme/altinnStudioTheme';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

export interface IDashboardState {
  drawerOpen: boolean;
}

export interface IDashboardProps { }

const theme = createMuiTheme(altinnTheme);

class App extends React.Component<IDashboardProps, IDashboardState> {
  state: IDashboardState = {
    drawerOpen: false,
  };

  public componentDidMount() {
    const altinnWindow: Window = window;
    fetchLanguageDispatcher.fetchLanguage(
      `${altinnWindow.location.origin}/designerapi/Language/GetLanguageAsJSON`, 'nb');

    fetchServicesActionDispatchers.fetchServices(
      `${altinnWindow.location.origin}/designerapi/Repository/Search`);

    fetchServicesActionDispatchers.fetchOrganizations(
      `${altinnWindow.location.origin}/designerapi/Repository/Organizations`);
    fetchServicesActionDispatchers.fetchCurrentUser(
      `${altinnWindow.location.origin}/designerapi/User/Current`);
  }

  public handleDrawerToggle = () => {
    this.setState((state: IDashboardState) => {
      return {
        drawerOpen: !state.drawerOpen,
      };
    });
  }

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container={true} justify='center' direction='row' className='block-with-text' >
          <Grid item={true} xs={10}>
            <OrganizationOverview />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
