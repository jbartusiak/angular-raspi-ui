import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { IFeatureRoute, IServicesState } from "../../../services/state/services.reducer";
import { Subscription } from "rxjs";
import * as servicesSelectors from './../../../services/state/service.selectors';
import { flatMap } from "rxjs/operators";
import { LoadingService } from "../../services/loading.service";

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
})
export class NavbarComponent implements AfterContentInit, OnDestroy {
  items: IFeatureRoute[];
  name = 'Raspberry PI';
  panelOpened = false;
  theme = (window.localStorage.getItem('__raspi-theme__') || 'light') === 'light';
  isLoading: boolean;

  servicesSub$: Subscription;
  loadingSub$: Subscription;

  constructor(private store: Store<IServicesState>, private loading: LoadingService) {
  }

  ngAfterContentInit(): void {
    this.servicesSub$ = this.store.pipe(
      select(servicesSelectors.getServices),
      flatMap(res => Object.values(res).map(el=>el.featureRoutes)),
    ).subscribe(res => this.items = res);

    this.loadingSub$ = this.loading.queriesInProgress$.subscribe(
      value => {
        console.log(value);
        this.isLoading = !!value;
      }
    );

    if (!this.theme)
      window.document.body.classList.add('theme-dark');
  }

  ngOnDestroy(): void {
    this.servicesSub$.unsubscribe();
    this.loadingSub$.unsubscribe();
  }

  swapTheme(): void {
    if (this.theme) {
      window.localStorage.setItem('__raspi-theme__', 'dark');
    }
    else {
      window.localStorage.setItem('__raspi-theme__', 'light');
    }
    this.theme = !this.theme;
    window.document.body.classList.toggle('theme-dark');
  }
}
