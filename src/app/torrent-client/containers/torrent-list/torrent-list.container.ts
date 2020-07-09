import { Component } from "@angular/core";

@Component({
  selector: 'app-torrent-list',
  template: `
    <mat-list class="mat-elevation-z5 Container">
      <app-torrent-item *ngFor="let item of [1,2,3]"></app-torrent-item>
    </mat-list>
  `,
  styles: [`
    .Container {
      margin: 16px auto;
    }
  `]
})
export class TorrentListContainer {

}
