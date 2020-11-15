import { AfterContentInit, Component } from '@angular/core';
import { IFeatureRoute } from '../../../services/state/services.reducer';
import { Observable } from 'rxjs';
import { NavbarFacade } from '../../services/navbar.facade';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
})
export class NavbarComponent implements AfterContentInit {
  name = 'Raspberry PI';
  panelOpened = false;
  theme = (window.localStorage.getItem('__raspi-theme__') || 'light') === 'light';

  featureRoutes$: Observable<IFeatureRoute[]>;
  loading$: Observable<boolean>;

  constructor(private facade: NavbarFacade) {
    this.featureRoutes$ = facade.featureRoutes$;
    this.loading$ = facade.loading$;
  }

  ngAfterContentInit(): void {
    if (!this.theme) {
      window.document.body.classList.add('theme-dark');
    }
  }

  swapTheme(): void {
    if (this.theme) {
      window.localStorage.setItem('__raspi-theme__', 'dark');
    } else {
      window.localStorage.setItem('__raspi-theme__', 'light');
    }
    this.theme = !this.theme;
    window.document.body.classList.toggle('theme-dark');
  }
}
