import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { IService, ServiceStatus } from '../state/services.reducer';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  constructor(private http: HttpClient) {
  }

  fetchConfiguration$ = () => {
    return this.http
      .get<{ services: { [name: string]: IService } }>('http://192.168.0.254:8888/configuration/raspi-ui-dev.json')
      .pipe(
        map(result => Object.values(result.services)),
        catchError(ConfigurationService.handleError),
      );
  }

  getServiceStatus$ = (service: IService) => {
    if (service.actuator.health.constructor === String) {
      return this.handleHttpHealthCheck$(service);
    } else {
      return this.handleCommandHealthCheck$(service);
    }
  }

  private handleHttpHealthCheck$ = (service: IService) => {
    const {uri, port, actuator} = service;

    console.log(`Starting health check for ${ service.name }`);
    const url = `http://${ uri }:${ port }${ actuator.health }`;
    console.log('Using address: ', url);

    return this.http.get<object>(url).pipe(
      catchError(err => ConfigurationService.handleError(err)),
      map<object, ServiceStatus>(item => {
        const regex = new RegExp(actuator.parseStatus);
        const matchesRegex = regex.test(JSON.stringify(item));
        if (matchesRegex) {
          return ServiceStatus.UP;
        } else {
          return ServiceStatus.DOWN;
        }
      })
    );
  }

  private handleCommandHealthCheck$ = (service: IService) => {
    const {actuator} = service;
    const requestBody = {
      ...actuator.health as any,
      elevate: true,
    };

    return this.http.post('http://192.168.0.254:8888/execute', requestBody)
      .pipe(
        catchError(err => ConfigurationService.handleError(err)),
        map<object, ServiceStatus>(item => {
          const regex = new RegExp(actuator.parseStatus);
          if (regex.test(JSON.stringify(item))) {
            return ServiceStatus.UP;
          } else return ServiceStatus.DOWN;
        })
      );
  }

  private static handleError(err) {
    return throwError(err.message)
  }
}
