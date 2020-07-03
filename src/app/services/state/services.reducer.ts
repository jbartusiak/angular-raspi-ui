import * as fromRoot from '../../app.state';
import { ServiceActionTypes, ServicesActions } from "./services.actions";

export enum ServiceStatus {
  UP,
  DOWN,
  UNKNOWN,
}

export interface ICommand {
  command: string;
}

export interface IFeatureRoute {
  name: string;
  route: string;
}

export interface IActuator {
  status: ServiceStatus;
  health: string | ICommand;
  parseStatus: RegExp | string;
}

export interface IService {
  name: string;
  uri: string;
  port: string;
  icon?: string;

  actuator: IActuator;

  start: string;
  stop: string;
  restart: string;
  dependsOn?: string;
  featureRoutes?: IFeatureRoute[];
  configuration?: { [name: string]: any };
}

export interface State extends fromRoot.State {
  services: IServicesState;
}

export interface IServicesState {
  error: string | null;
  list: {
    [name: string]: IService;
  }
}

const initialState: IServicesState = {
  error: null,
  list: {
    'Raspi Backend Service': {
      name: 'Raspi Backend Service',
      uri: '192.168.0.254',
      port: '8888',
      actuator: {
        status: ServiceStatus.UNKNOWN,
        health: '/actuator/health',
        parseStatus: /(status).*(UP)/,
      },
      start: '',
      stop: '',
      restart: '',
    },
  }
};

export const reducer = (state = initialState, action: ServicesActions): IServicesState => {
  switch (action.type) {
    case ServiceActionTypes.LoadSuccess:
      return {
        ...state,
        list: {
          ...action.payload
        }
      }
    case ServiceActionTypes.LoadFail:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return {...state};
  }
}
