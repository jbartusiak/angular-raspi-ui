import { Component, Input, OnInit } from '@angular/core';
import { TorrentFolder } from "../../../models/TorrentFile";

@Component({
  selector: 'app-file-summary',
  templateUrl: './file-summary.component.html',
  styleUrls: ['./file-summary.component.scss']
})
export class FileSummaryComponent implements OnInit {

  @Input() fileListing: TorrentFolder;

  constructor() { }

  ngOnInit(): void {

  }

}
