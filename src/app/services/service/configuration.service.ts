import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IService } from '../state/services.reducer';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  constructor(private http: HttpClient) {
  }

  $fetchConfiguration(): Observable<{ [name: string]: IService }> {
    return this.http
      .get<{ services: { [name: string]: IService } }>('http://192.168.0.254:8888/configuration/raspi-ui-dev.json')
      .pipe(
        map(result => result.services),
        catchError(ConfigurationService.handleError),
      );
  }

  private static handleError(err) {
    return throwError(err.message)
  }
}
