import { Component } from '@angular/core';
import { routerNavigationAnimation } from "./app.animations";

@Component({
  selector: 'app-root',
  template: `
    <navbar-component></navbar-component>
    <div [@routerNaviation]="o.isActivated ? o.activatedRoute : ''">
    <router-outlet #o="outlet" ></router-outlet>
    </div>
  `,
  animations: [routerNavigationAnimation],
})
export class AppComponent {
}
