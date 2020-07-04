import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torrent-search',
  template: `
    <app-layout>
      <app-providers-container column-a></app-providers-container>
      <app-search-container column-b></app-search-container>
    </app-layout>
  `,
  styleUrls: [ './torrent-search.component.scss' ]
})
export class TorrentSearchComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
