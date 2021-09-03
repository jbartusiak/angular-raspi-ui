import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IServicesState } from './services.reducer';
import { flatten } from 'lodash';

const getServiceFeatureState = createFeatureSelector<IServicesState>('services');

export const getError = createSelector(
  getServiceFeatureState,
  state => state.error,
);

export const getServices = createSelector(
  getServiceFeatureState,
  state => Object.values(state.list)
    .sort((first, second) => first.name.localeCompare(second.name)),
);

export const getServerService = createSelector(
  getServiceFeatureState,
  state => state.server,
);

export const getFeatureRoutes = createSelector(
  getServices,
  state => flatten(state.filter(element => element.featureRoutes?.length > 0).map(el => el.featureRoutes))
);
