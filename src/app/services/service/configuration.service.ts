import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IService } from '../state/services.reducer';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  constructor(private http: HttpClient) {
  }

  $fetchConfiguration(): Observable<IService[]> {
    return this.http
      .get<IService[]>('http://192.168.0.254:8888/configuration/raspi-ui-dev.json')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(err => throwError(err.message)),
      );
  }
}
