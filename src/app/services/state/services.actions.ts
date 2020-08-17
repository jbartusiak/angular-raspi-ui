import { createAction, props } from '@ngrx/store';
import { IService, ServiceStatus } from "./services.reducer";

export enum ServiceActionTypes {
  GetServices = '[SERVICES] Load',
  GetServicesSuccess = '[SERVICES] Load Success',
  GetServicesFailed = '[SERVICES] Load Fail',
  GetServerStatus = '[SERVICES] Get Server Status',
  GetServerStatusSuccess = '[SERVICES] Get Server Status Success',
  GetServerStatusFailed = '[SERVICES] Get Server Status Failed',
  GetServiceStatus = '[SERVICES] Get Status',
  GetServiceStatusSuccess = '[SERVICES] Get Status Success',
  GetServiceStatusFail = '[SERVICES] Get Status Fail',
}

export const loadServices =
  createAction(ServiceActionTypes.GetServices);
export const loadServicesSuccess =
  createAction(ServiceActionTypes.GetServicesSuccess, props<{ [name: string]: IService }>());
export const loadServicesFailed =
  createAction(ServiceActionTypes.GetServicesFailed, props<{ error: string }>());

export const getServerStatus =
  createAction(ServiceActionTypes.GetServerStatus);
export const getServerStatusSuccess =
  createAction(ServiceActionTypes.GetServerStatusSuccess, props<{ server: IService }>());
export const getServerStatusFailed =
  createAction(ServiceActionTypes.GetServerStatusFailed, props<{ error: string }>());

export const getServiceStatus =
  createAction(ServiceActionTypes.GetServiceStatus, props<{service: IService}>());
export const getServiceStatusSuccess =
  createAction(ServiceActionTypes.GetServiceStatusSuccess, props<{ service: IService, status: ServiceStatus }>())
export const getServiceStatusFailed =
  createAction(ServiceActionTypes.GetServiceStatusFail, props<{ error: string }>())
