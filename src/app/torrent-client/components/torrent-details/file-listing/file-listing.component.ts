import { Component, Input } from "@angular/core";
import { TorrentFolder } from "../../../models/TorrentFile";

@Component({
  selector: 'app-file-listing',
  templateUrl: './file-listing.component.html',
  styleUrls: ['./file-listing.component.scss']
})
export class FileListingComponent {
  @Input() fileListing: TorrentFolder;
  @Input() addMargin: boolean;
  @Input() isExpanded: boolean;

  folderWanted(folder: TorrentFolder): boolean {
    return folder.files.every(file => file.wanted) && folder.folders.every(folder => this.folderWanted(folder));
  }

  folderContentsSize(folder: TorrentFolder): number {
    return folder.files.reduce((prev, current) => prev+=current.length, 0) +
      folder.folders.map(folder => this.folderContentsSize(folder)).reduce((prev, curr) => prev +=curr, 0);
  }

  folderCompleted(folder: TorrentFolder): number {
    return folder.files.reduce((prev, current) => prev+=current.bytesCompleted, 0) +
      folder.folders.map(folder => this.folderContentsSize(folder)).reduce((prev, curr) => prev +=curr, 0);
  }
}
