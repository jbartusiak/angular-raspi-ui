import { Component, OnInit } from '@angular/core';
import { TorrentClientService } from "../../services/torrent-client.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  template: `
    <h1>hello from torrent detail</h1>
    <div>{{ torrentItem$ | async | json }}</div>
  `,
  styles: []
})
export class TorrentDetailContainer implements OnInit {

  torrentItem$: Observable<any>;


  constructor(private service: TorrentClientService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const torrentId = this.route.snapshot.paramMap.get('id');
    this.torrentItem$ = this.service.getTorrentDetails$(Number.parseInt(torrentId)).pipe(
      map(next => next.torrents[0])
    );
  }

}
