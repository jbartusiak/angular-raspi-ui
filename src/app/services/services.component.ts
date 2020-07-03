import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as fromService from './state/services.reducer';
import * as servicesActions from './state/services.actions';
import * as servicesSelectors from './state/service.selectors';
import { select, Store } from '@ngrx/store';
import { Subscription } from "rxjs";
import { IService } from "./state/services.reducer";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-homepage',
  templateUrl: './services.component.html',
  styleUrls: [ './services.component.scss' ]
})
export class ServicesComponent implements OnInit, OnDestroy, AfterViewInit {

  services$: Subscription;
  services: IService[] = [];
  server: IService;

  constructor(private store: Store<fromService.State>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.services$.unsubscribe();
  }

  ngAfterViewInit(): void {
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
