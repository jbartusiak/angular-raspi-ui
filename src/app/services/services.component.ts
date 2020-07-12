import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import * as fromService from './state/services.reducer';
import { IService } from './state/services.reducer';
import * as servicesActions from './state/services.actions';
import * as servicesSelectors from './state/service.selectors';
import { select, Store } from '@ngrx/store';
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  templateUrl: './services.component.html',
  styleUrls: [ './services.component.scss' ]
})
export class ServicesComponent implements OnDestroy, AfterContentInit {

  services$: Subscription;
  services: IService[] = [];
  server: IService;

  constructor(private store: Store<fromService.State>) {
  }

  ngOnDestroy(): void {
    this.services$.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.store.dispatch(new servicesActions.Load());
    this.services$ = this.store.pipe(
      select(servicesSelectors.getServices)
    ).subscribe(next => {
      this.services = Object.values(next).filter(s => s.name !== 'Raspi Backend Service');
    });
    this.store.pipe(
      select(servicesSelectors.getServerService),
      take(1)
    ).subscribe(next => this.server = next);
  }

  createURL(service: IService) {
    return `http://${service?.uri}:${service?.port}`;
  }

}
