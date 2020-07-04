import { Action } from '@ngrx/store';
import { IService, ServiceStatus } from "./services.reducer";

export enum ServiceActionTypes {
  Load = '[SERVICES] Load',
  LoadSuccess = '[SERVICES] Load Success',
  LoadFail = '[SERVICES] Load Fail',
  GetServiceStatus = '[SERVICES] Get Status',
  GetServiceStatusSuccess = '[SERVICES] Get Status Success',
  GetServiceStatusFail = '[SERVICES] Get Status Fail',
}

export class Load implements Action {
  readonly type = ServiceActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ServiceActionTypes.LoadSuccess;

  constructor(public payload: { [name: string]: IService }) {
  }
}

export class LoadFail implements Action {
  readonly type = ServiceActionTypes.LoadFail;

  constructor(public payload: string) {
  }
}

export class GetServiceStatus implements Action {
  readonly type = ServiceActionTypes.GetServiceStatus;
  constructor(public payload: IService) {
  }
}

export class GetServiceStatusSuccess implements Action {
  readonly type = ServiceActionTypes.GetServiceStatusSuccess;
  constructor(public payload: ({service: IService, status: ServiceStatus})) {
  }
}

export class GetServiceStatusFail implements Action {
  readonly type = ServiceActionTypes.GetServiceStatusFail;

  constructor(public payload: string) {
  }
}

export type ServicesActions =
  Load | LoadSuccess | LoadFail | GetServiceStatus | GetServiceStatusSuccess | GetServiceStatusFail;
