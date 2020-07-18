import { Component } from '@angular/core';

/*
* TODO add snackbars to indicate state changes
* */

@Component({
  selector: 'app-torrent-client',
  template: `
    <div class="Container">
      <app-tools></app-tools>
      <app-torrent-list>
      </app-torrent-list>
    </div>
  `,
  styles: [ `
    .Container {
      margin: 32px;
      transition: background-color 250ms ease-in;
    }
  ` ]
})
export class TorrentClientComponent {
}
