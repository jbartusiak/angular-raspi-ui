import { Component, OnInit } from '@angular/core';
import { TorrentClientService } from '../../services/torrent-client.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TorrentItemDetails } from '../../models/TorrentDetails';
import { FileTreeService } from '../../services/file-tree.service';
import { TorrentFolder } from '../../models/TorrentFile';

@Component({
  template: `
    <app-layout class="Container">
      <div class="Item" column-a>
        <app-torrent-summary
          *ngIf="torrentItem"
          [addedDate]="torrentItem.addedDate"
          [downloaded]="torrentItem.downloadedEver"
          [error]="torrentItem.error"
          [errorString]="torrentItem.errorString"
          [eta]="torrentItem.eta"
          [leeches]="torrentItem.peersGettingFromUs"
          [name]="torrentItem.name"
          [percentDone]="torrentItem.percentDone"
          [queuePosition]="torrentItem.queuePosition"
          [rateDownload]="torrentItem.rateDownload"
          [rateUpload]="torrentItem.rateUpload"
          [seeds]="torrentItem.peersSendingToUs"
          [totalSize]="torrentItem.totalSize"
        >
        </app-torrent-summary>
      </div>
      <div column-b class="Item">
        <app-file-summary
          *ngIf="torrentFolder$ | async"
          [fileListing]="torrentFolder$ | async"></app-file-summary>
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
  ` ]
})
export class TorrentDetailContainer implements OnInit {

  torrentItem: TorrentItemDetails;
  torrentFolder$: Observable<TorrentFolder>;

  private torrentSub: Subscription;

  constructor(private service: TorrentClientService,
              private route: ActivatedRoute,
              private fileTreeService: FileTreeService) {
  }

  ngOnInit(): void {
    const torrentId = this.route.snapshot.paramMap.get('id');
    this.torrentSub = this.service.getTorrentDetails$(Number.parseInt(torrentId, 10))
      .pipe(
        map(next => next.torrents[0])
      )
      .subscribe(next => {
        this.torrentItem = next;
        this.torrentFolder$ = this.fileTreeService.generateFileSummary$(this.torrentItem);
      });
  }

}
