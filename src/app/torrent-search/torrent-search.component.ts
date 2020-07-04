import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torrent-search',
  template: `
    <app-layout>
      <div column-a>
        <div class="Heading">
          <h1>Providers</h1>
          <span>Select torrent providers from the list below. Note that default, tested providers are already selected.</span>
        </div>
        <app-providers class="ComponentContainer"></app-providers>
      </div>
      <div column-b>
        <div class="Heading">
          <h1>Search</h1>
          torrent-search works!
        </div>
        <app-search></app-search>
      </div>
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
