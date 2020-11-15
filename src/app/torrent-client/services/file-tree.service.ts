import { Injectable } from '@angular/core';
import { TorrentItemDetails } from '../models/TorrentDetails';
import { TorrentFile, TorrentFolder } from '../models/TorrentFile';
import { partition } from 'lodash';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileTreeService {
  generateFileSummary$(torrent: TorrentItemDetails): Observable<TorrentFolder> {
    if (!torrent) {
      return of({
        name: '',
        folders: [],
        files: []
      });
    }
    const {
      files, fileStats
    } = torrent;
    const torrentFiles = files.map((item, index) => ({
      ...item,
      ...fileStats[index],
    })) as TorrentFile[];
    const torrentFolder: TorrentFolder = {
      name: './',
      folders: [],
      files: torrentFiles,
    };
    const torrentFolderObservable = this.mapToFileListing(torrentFolder);
    return of(torrentFolderObservable);
  }

  private mapToFileListing(folder: TorrentFolder): TorrentFolder {
    const {folders, files} = folder;

    const [ inSubdirectory, flat ] = partition(files, (file) => file.name.includes('/'));
    files.length = 0;

    files.push(...flat);

    inSubdirectory.forEach(file => {
      const [ folderName, ...fileName ] = file.name.split('/');
      const existingFolder = folders.find(f => f.name === folderName);
      if (existingFolder) {
        existingFolder.parent = folder;
        existingFolder.files.push({
          name: fileName.join('/'),
          wanted: file.wanted,
          priority: file.priority,
          length: file.length,
          bytesCompleted: file.bytesCompleted,
        });
      } else {
        folders.push({
          name: folderName,
          parent: folder,
          folders: [],
          files: [ {
            name: fileName.join('/'),
            wanted: file.wanted,
            priority: file.priority,
            length: file.length,
            bytesCompleted: file.bytesCompleted,
          } ],
        });
      }
    });

    folders.forEach(f => this.mapToFileListing(f));

    return folder;
  }

}
