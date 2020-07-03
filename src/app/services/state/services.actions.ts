import { Action } from '@ngrx/store';
import { IService } from "./services.reducer";

export enum ServiceActionTypes {
  Load = '[SERVICES] Load',
  LoadSuccess = '[SERVICES] Load Success',
  LoadFail = '[SERVICES] Load Fail'
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

export type ServicesActions =
  Load | LoadSuccess | LoadFail;
