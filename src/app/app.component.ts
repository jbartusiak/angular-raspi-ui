import { Component } from '@angular/core';
import { NavbarItem } from './shared/components/navbar/navbar.types';

@Component({
  selector: 'app-root',
  template: `
    <navbar-component></navbar-component>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  navitems: NavbarItem[] = [
    {
      label: 'Homepage',
      link: '',
      disabled: false,
    },
    {
      label: 'Torrent Client',
      link: '/pi-tor',
      disabled: true,
    },
    {
      label: 'Torrent Search',
      link: '/torrent-search',
      disabled: true,
    },
  ];
}
