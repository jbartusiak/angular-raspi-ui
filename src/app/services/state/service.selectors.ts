import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IServicesState } from "./services.reducer";

const getServiceFeatureState= createFeatureSelector<IServicesState>('services');

export const getError = createSelector(
  getServiceFeatureState,
  state => state.error,
);

export const getServices = createSelector(
  getServiceFeatureState,
  state => Object.values(state.list),
);

export const getServerService = createSelector(
  getServiceFeatureState,
  state => state.server,
);
