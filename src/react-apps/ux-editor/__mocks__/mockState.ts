import '../src/types/global';
import { IFormDesignerState } from '../src/reducers/formDesignerReducer';
import { IFormFillerState } from '../src/reducers/formFillerReducer';
import { IServiceConfigurationState } from '../src/reducers/serviceConfigurationReducer';


const mockFormDesignerState: IFormDesignerState = {
  layout: {
    fetching: false,
    fetched: true,
    error: null,
    saving: false,
    unSavedChanges: false,
    activeContainer: null,
    components: {
      'component1': {
        id: 'component1',
        component: 'Header',
        type: 'HeaderComponent',
        title: 'Header1',
      }
    },
    containers: {
      'container1': {
        repeating: false,
        index: 0,
        dataModelGroup: null,
      }
    },
    order: {
      'container1': [
        'component1'
      ]
    }
  }
}
const mockFormFillerState: IFormFillerState = {
  formData: {

  },
  validationErrors: null,
  unsavedChanges: false,
}
const mockServiceConfiguration: IServiceConfigurationState = {
  APIs: {
    connections: null,
    externalApisById: {
      id1: {
        id: 'id1',
        name: 'Bring postnummer API',
        type: 'value',
        shortname: 'Postnummer',
        uri: 'https://api.bring.com/shippingguide/api/postalCode.json?',
        description: 'Api for å hente poststed basert på postnummer',
        clientParams: {
          pnr: {
            type: 'queryString',
            name: 'pnr',
            value: '',
            required: true,
            example: 'Example: 2050',
          },
        },
        metaParams: {
          clientUrl: {
            type: 'queryString',
            name: 'clientUrl',
            value: '',
            required: true,
            example: 'Example: http://www.sitename.com',
            urlEncode: true,
          },
        },
      },
      id2: {
        id: 'id2',
        name: 'SSB kommuneliste API',
        type: 'list',
        shortname: 'Kommuneliste',
        uri: 'http://data.ssb.no/api/klass/v1/classifications/131/codes?',
        description: 'Api for å hente liste over kommuner i Norge gylidig i gitt tidsrom',
        clientParams: {},
        metaParams: {
          from: {
            type: 'queryString',
            name: 'from',
            value: '2018-01-01',
            required: true,
            example: '2018-01-01',
            urlEncode: false,
          },
          to: {
            type: 'queryString',
            name: 'to',
            value: '2018-08-01',
            required: true,
            example: '2018-08-01',
            urlEncode: false,
          },
        },
      },
    },
    externalApisIds: ['id1', 'id2'],
    availableCodeLists: null,
  },
  ruleConnection: null,
  conditionalRendering: null,
  manageServiceConfiguration: null,
}


export const mockState: IAppState = {
  formDesigner: mockFormDesignerState,
  formFiller: mockFormFillerState,
  serviceConfiguration: mockServiceConfiguration,
} as any;
