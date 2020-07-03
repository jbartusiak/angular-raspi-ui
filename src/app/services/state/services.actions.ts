import { Action } from '@ngrx/store';

export enum ServiceActionTypes {
  FetchConfiguration = '[SERVICES] Fetch Configuration'
}

export class FetchConfiguration implements Action {
  readonly type = ServiceActionTypes.FetchConfiguration;
}

export type ServicesActions = FetchConfiguration;
