import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IServicesState } from "./services.reducer";

const getServiceFeatureState= createFeatureSelector<IServicesState>('services');

export const getError = createSelector(
  getServiceFeatureState,
  res => res.error,
);

export const getServices = createSelector(
  getServiceFeatureState,
  res => res.list,
);

export const getServerService = createSelector(
  getServices,
  res => Object.values(res).find(el => el.name === 'Raspi Backend Service')
);
