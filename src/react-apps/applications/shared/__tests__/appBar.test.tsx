import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import AppBarComponent from '../src/navigation/main-header/appBar';
import altinnTheme from '../src/theme/altinnStudioTheme';

import * as AppBarConfig from '../src/navigation/main-header/appBarConfig';

describe('AppBarComponent - src/navigation/main-header/appBar', () => {

  describe('Snapshot', () => {
    let mockOrg: string;
    let mockService: string;
    let mockActiveSubHeaderSelection: string;
    let mockShowSubheader: boolean;

    beforeEach(() => {
      mockOrg = 'jest-test-org';
      mockService = 'jest-test-service';
      mockActiveSubHeaderSelection = 'Lage';
      mockShowSubheader = true;

    });

    it('should match snapshot', () => {
      const rendered = renderer.create(
        <MemoryRouter>
          <AppBarComponent
            org={mockOrg}
            service={mockService}
            showSubHeader={mockShowSubheader}
            activeSubHeaderSelection={mockActiveSubHeaderSelection}
          />
        </MemoryRouter>,
      );
      expect(rendered).toMatchSnapshot();
    });

    it('should match snapshot with subHeader and Publisere selection active', () => {
      mockOrg = 'other-org';
      mockService = 'other-service';
      mockActiveSubHeaderSelection = 'Publisere';
      const rendered = renderer.create(
        <MemoryRouter>
          <AppBarComponent
            org={mockOrg}
            service={mockService}
            showSubHeader={mockShowSubheader}
            activeSubHeaderSelection={mockActiveSubHeaderSelection}
          />
        </MemoryRouter>,
      );
      expect(rendered).toMatchSnapshot();
    });

    it('should match snapshot with subHeader and Publisere selection active', () => {
      mockOrg = 'other-org';
      mockService = 'other-service';
      mockActiveSubHeaderSelection = 'Publisere';
      const wrapper = renderer.create(
        <MemoryRouter>
          <AppBarComponent
            org={mockOrg}
            service={mockService}
            showSubHeader={mockShowSubheader}
            activeSubHeaderSelection={mockActiveSubHeaderSelection}
          />
        </MemoryRouter>,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot and not render subHeader menu', () => {
      const rendered = renderer.create(
        <MemoryRouter>
          <AppBarComponent
            org={mockOrg}
            service={mockService}
            showSubHeader={false}
          />
        </MemoryRouter>,
      );
      expect(rendered).toMatchSnapshot();
    });

    it('should match snapshot with no service or org', () => {
      const rendered = renderer.create(
        <MemoryRouter>
          <AppBarComponent
            showSubHeader={false}
          />
        </MemoryRouter>,
      );
      expect(rendered).toMatchSnapshot();
    });

    it('should match snapshot with backgroundColor prop', () => {
      const wrapper = renderer.create(
        <MemoryRouter>
          <AppBarComponent
            showSubHeader={false}
            backgroundColor={'pink'}
          />
        </MemoryRouter>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Responsive design', () => {
    let app: any;
    const desktopWidth: number = 1025;
    const desktopHeight: number = 800;
    const tabletWidth: number = 1024;
    const tabletHeight: number = 768;

    const theme = createMuiTheme(altinnTheme);

    beforeEach(() => {
      window.resizeTo(desktopWidth, desktopHeight);
    });

    it(`should render desktop header when (${desktopWidth}x${desktopHeight})`, () => {
      const mockOrg = 'myDesktopOrg';
      const mockService = 'myDesktopService';
      const mockActiveSubHeaderSelection = 'subHeaderSelection';
      const mockActiveLeftMenuSelection = 'leftmenuselection';

      app = mount(
        <MemoryRouter>
          <MuiThemeProvider theme={theme}>
            <AppBarComponent
              org={mockOrg}
              service={mockService}
              showSubHeader={false}
              activeSubHeaderSelection={mockActiveSubHeaderSelection}
              activeLeftMenuSelection={mockActiveLeftMenuSelection}
            />
          </MuiThemeProvider>
        </MemoryRouter>, { attachTo: document.getElementById('root') },
      );
      expect(app.text()).not.toMatch(`/ ${mockActiveSubHeaderSelection} / ${mockActiveLeftMenuSelection}`);
      expect(app.text()).toMatch(`${mockService}${mockOrg}`);
      app.unmount();
    });

    it(`should render tablet header (${tabletWidth}x${tabletHeight})`, () => {
      const mockOrg = 'myTabletOrg';
      const mockService = 'myTabletService';
      const mockActiveSubHeaderSelection = 'subHeaderSelection';
      const mockActiveLeftMenuSelection = 'leftmenuselection';

      window.resizeTo(tabletWidth, tabletHeight);

      app = mount(
        <MemoryRouter>
          <MuiThemeProvider theme={theme}>
            <AppBarComponent
              org={mockOrg}
              service={mockService}
              showBreadcrumbOnTablet={true}
              showSubHeader={false}
              activeSubHeaderSelection={mockActiveSubHeaderSelection}
              activeLeftMenuSelection={mockActiveLeftMenuSelection}
            />
          </MuiThemeProvider>
        </MemoryRouter>, { attachTo: document.getElementById('root') },
      );
      expect(app.text()).toMatch(`/ ${mockActiveSubHeaderSelection} / ${mockActiveLeftMenuSelection}`);
      expect(app.text()).not.toMatch(`${mockService}${mockOrg}`);
      app.unmount();
    });

    it(`should not render breadcrumb when tablet header (${tabletWidth}x${tabletHeight})
          and no prop.activeSubHeaderSelection is undefined`, () => {
        const mockOrg = 'myTabletOrg';
        const mockService = 'myTabletService';
        const mockActiveSubHeaderSelection = 'subHeaderSelection';
        const mockActiveLeftMenuSelection = 'leftmenuselection';

        window.resizeTo(tabletWidth, tabletHeight);

        app = mount(
          <MemoryRouter>
            <MuiThemeProvider theme={theme}>
              <AppBarComponent
                org={mockOrg}
                service={mockService}
                showBreadcrumbOnTablet={false}
                showSubHeader={false}
                activeSubHeaderSelection={mockActiveSubHeaderSelection}
                activeLeftMenuSelection={mockActiveLeftMenuSelection}
              />
            </MuiThemeProvider>
          </MemoryRouter>, { attachTo: document.getElementById('root') },
        );

        expect(app.text()).not.toMatch(`/`);
        expect(app.text()).toMatch(`${mockService}`);
        app.unmount();

      });

    it(`should render logout menu when logoutButton prop is true`, () => {
      const mockOrg = 'myTabletOrg';
      const mockService = 'myTabletService';
      const mockActiveSubHeaderSelection = 'subHeaderSelection';
      const mockActiveLeftMenuSelection = 'leftmenuselection';

      window.resizeTo(tabletWidth, tabletHeight);

      app = mount(
        <MemoryRouter>
          <MuiThemeProvider theme={theme}>
            <AppBarComponent
              logoutButton={true}
              org={mockOrg}
              service={mockService}
              showBreadcrumbOnTablet={false}
              showSubHeader={false}
              activeSubHeaderSelection={mockActiveSubHeaderSelection}
              activeLeftMenuSelection={mockActiveLeftMenuSelection}
            />
          </MuiThemeProvider>
        </MemoryRouter>, { attachTo: document.getElementById('root') },
      );

      expect(app.text()).toMatch(`logout`);
      expect(app.text()).not.toMatch(`meny`);
      app.unmount();
    });

  });

  describe('When using AppBarConfig', () => {
    let app: any;
    const mockOrg: string = 'mock-org';
    const mockService: string = 'mock-service';
    const mockShowSubheader: boolean = true;

    const theme = createMuiTheme(altinnTheme);

    const tabletWidth: number = 1024;
    const tabletHeight: number = 768;

    window.resizeTo(tabletWidth, tabletHeight);

    AppBarConfig.menu.map((entry) => {
      it(`should render ${entry.key}`, () => {
        app = mount(
          <MemoryRouter>
            <MuiThemeProvider theme={theme}>
              <AppBarComponent
                org={mockOrg}
                service={mockService}
                showBreadcrumbOnTablet={true}
                showSubHeader={mockShowSubheader}
                activeSubHeaderSelection={entry.activeSubHeaderSelection}
              />
            </MuiThemeProvider>
          </MemoryRouter>, { attachTo: document.getElementById('root') },
        );
        expect(app.text()).toMatch(`/ ${entry.activeSubHeaderSelection} / `);
      });
    });
  });

});
