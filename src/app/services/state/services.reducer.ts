import * as fromRoot from '../../state/app.state';
import * as Actions from "./services.actions";
import { createReducer, on } from "@ngrx/store";

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
  server: IService;
  list: {
    [name: string]: IService;
  }
}

const initialState: IServicesState = {
  error: null,
  server: {
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
  list: {}
};

export const reducer = createReducer(
  initialState,
  on(Actions.loadServicesSuccess, (state, {type, ...rest}) =>({
    ...state,
    list: {
      ...state.list,
      ...rest,
    }
  })),
  on(Actions.loadServicesFailed, (state, {error}) => ({
    ...state,
    error,
  })),
  on(Actions.getServiceStatusSuccess, (state, {service, status}) => {
    const newService: IService = {
      ...service,
      actuator: {
        ...service.actuator,
        status,
      }
    }

    return {
      ...state,
      list: {
        ...state.list,
        [service.name]: newService
      },
    };
  })
);
