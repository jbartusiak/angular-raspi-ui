import { Component, OnInit } from '@angular/core';
import { TorrentClientService } from "../../services/torrent-client.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { TorrentItemDetails } from "../../models/TorrentDetails";
import { TorrentFile } from "../../models/TorrentFile";

@Component({
  template: `
    <app-layout class="Container">
      <div class="Item" column-a>
        <app-torrent-summary
          [addedDate]="torrentItem?.addedDate"
          [downloaded]="torrentItem?.downloadedEver"
          [error]="torrentItem?.error"
          [errorString]="torrentItem?.errorString"
          [eta]="torrentItem?.eta"
          [leeches]="torrentItem?.peersGettingFromUs"
          [name]="torrentItem?.name"
          [percentDone]="torrentItem?.percentDone"
          [queuePosition]="torrentItem?.queuePosition"
          [rateDownload]="torrentItem?.rateDownload"
          [rateUpload]="torrentItem?.rateUpload"
          [seeds]="torrentItem?.peersSendingToUs"
          [totalSize]="torrentItem?.totalSize"
        >
        </app-torrent-summary>
        <mat-card class="Item">
          <mat-card-title>File wanted</mat-card-title>
          <mat-card-content class="FileListing">
            <p *ngFor="let file of torrentItem?.wanted">{{ file | json }}</p>
          </mat-card-content>
        </mat-card>
        <mat-card class="Item">
          <mat-card-title>Peers</mat-card-title>
          <mat-card-content class="FileListing">
            <p *ngFor="let peer of torrentItem?.peers">{{ peer | json }}</p>
          </mat-card-content>
          <mat-card-content>
            {{ torrentItem?.peersFrom | json }}
          </mat-card-content>
        </mat-card>
      </div>
      <div column-b class="Item">
        <app-file-summary
          [torrentFiles]="generateFileSummary(this.torrentItem)"
          ></app-file-summary>
        <div>{{ torrentItem?.webseeds| json }}</div>
      </div>
    </app-layout>
  `,
  styles: [ `
    .Container {
      margin: 32px;
      transition: background-color 250ms ease-in;
    }

    .Item {
      margin: 8px;
    }

    .FileListing {
      max-height: 300px;
      overflow-y: scroll;
    }
  ` ]
})
export class TorrentDetailContainer implements OnInit {

  torrentItem: TorrentItemDetails;
  private torrentSub: Subscription;

  constructor(private service: TorrentClientService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const torrentId = this.route.snapshot.paramMap.get('id');
    this.torrentSub = this.service.getTorrentDetails$(Number.parseInt(torrentId)).pipe(
      map(next => next.torrents[0])
    ).subscribe(next => this.torrentItem = next);
  }

  generateFileSummary(torrent: TorrentItemDetails): TorrentFile[] {
    const {
      files, fileStats
    } = torrent;
    return files.map((item, index) => ({
      ...item,
      ...fileStats[index],
    }));
  }

}
