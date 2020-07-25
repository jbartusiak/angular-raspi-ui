import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-torrent-summary',
  templateUrl: './torrent-summary.component.html',
  styleUrls: [ './torrent-summary.component.scss' ]
})
export class TorrentSummaryComponent {

  @Input() name: string;
  @Input() totalSize: number;
  @Input() addedDate: number;
  @Input() eta: number;
  @Input() downloaded: number;
  @Input() rateDownload: number;
  @Input() rateUpload: number;
  @Input() queuePosition: number;
  @Input() error: number;
  @Input() errorString: string;
  @Input() seeds: number;
  @Input() leeches: number;
  @Input() percentDone: number;

  dateFromNumber(input: number) {
    console.log(input);
    return new Date(input*1000);
  }

}
