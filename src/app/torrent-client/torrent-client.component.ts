import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torrent-client',
  template: `
    <p>
      torrent-client works!
    </p>
  `,
  styleUrls: ['./torrent-client.component.scss']
})
export class TorrentClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
