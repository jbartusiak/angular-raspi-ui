import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torrent-client',
  template: `
    <app-tools></app-tools>
  `,
  styleUrls: ['./torrent-client.component.scss']
})
export class TorrentClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
