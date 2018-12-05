const moduleName: string = 'APP_CONFIG';

/**
 * This file defines all action that will be triggered and listened on by SAGAS and REDUCERS
 */
// All fetch services actions
export const FETCH_SERVICES: string = `${moduleName}.FETCH_SERVICES`;
export const FETCH_SERVICES_FULFILLED: string = `${moduleName}.FETCH_SERVICES_FULFILLED`;
export const FETCH_SERVICES_REJECTED: string = `${moduleName}.FETCH_SERVICES_REJECTED`;

// All fetch organizations actions
export const FETCH_ORGANIZATIONS: string = `${moduleName}.FETCH_ORGANIZATIONS`;
export const FETCH_ORGANIZATIONS_FULFILLED: string = `${moduleName}.FETCH_ORGANIZATIONS_FULFILLED`;
export const FETCH_ORGANIZATIONS_REJECTED: string = `${moduleName}.FETCH_ORGANIZATIONS_REJECTED`;
