import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITorrentItem } from '../state/torrent-client.reducer';
import { LoadTorrentResponse } from '../models/LoadTorrentResponse';
import { map } from 'rxjs/operators';
import { NewTorrentForm } from '../models/NewTorrentForm';
import { DeleteTorrentsForm } from '../models/DeleteTorrentsForm';
import { TorrentItemDetailsResponse } from '../models/TorrentItemDetailsResponse';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TorrentClientService {

  private baseUrl = `http://${environment.serverIp}:3001`;

  constructor(private http: HttpClient) {
  }

  loadTorrents$ = (): Observable<ITorrentItem[]> => {
    const url = `${this.baseUrl}/transmission/active`;
    return this.http.get<LoadTorrentResponse>(url).pipe(
      map(result => result.torrents)
    );
  }

  addNewTorrent$ = ({autostart, category, directory, magnet}: NewTorrentForm) => {
    const url = `${this.baseUrl}/transmission/new`;

    const requestBody = {
      magnet,
      autostart,
      downloadDir: `/mount/${ directory }/Media/${ category }`,
    };
    console.log('adding new torrent');

    return this.http.post(url, requestBody);
  }

  getTorrentDetails$ = (torrentId: number): Observable<TorrentItemDetailsResponse> => {
    const url = `${this.baseUrl}/transmission/all?id=${torrentId}`;
    return this.http.get<TorrentItemDetailsResponse>(url);
  }

  startTorrents$ = (ids: number[]) => {
    const url = `${this.baseUrl}/transmission/start`;
    const requestBody = {
      ids,
    };
    return this.http.post(url, requestBody);
  }

  stopTorrents$ = (ids: number[]) => {
    const url = `${this.baseUrl}/transmission/stop`;
    const requestBody = {
      ids,
    };
    return this.http.post(url, requestBody);
  }

  deleteTorrents$ = ({ids, deleteLocalData}: DeleteTorrentsForm) => {
    const url = `${this.baseUrl}/transmission/remove`;
    const requestBody = {
      ids,
      deleteLocalData,
    };
    return this.http.post(url, requestBody);
  }
}
