import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITorrentItem } from "../state/torrent-client.reducer";
import { LoadTorrentResponse } from "../models/LoadTorrentResponse";
import { map } from "rxjs/operators";
import { NewTorrentForm } from "../models/NewTorrentForm";
import { DeleteTorrentsForm } from "../models/DeleteTorrentsForm";
import { TorrentItemDetailsResponse } from "../models/TorrentItemDetailsResponse";

@Injectable({
  providedIn: 'root',
})
export class TorrentClientService {

  constructor(private http: HttpClient) {
  }

  loadTorrents$ = (): Observable<ITorrentItem[]> => {
    const url = `http://192.168.0.254:3001/transmission/active`;
    return this.http.get<LoadTorrentResponse>(url).pipe(
      map(result => result.torrents)
    );
  }

  addNewTorrent$ = ({autostart, category, directory, magnet}: NewTorrentForm) => {
    const url = `http://192.168.0.254:3001/transmission/new`;

    const requestBody = {
      magnet,
      autostart,
      downloadDir: `/mount/${ directory }/Media/${ category }`,
    };
    console.log('adding new torrent');

    return this.http.post(url, requestBody);
  }

  getTorrentDetails$ = (torrentId: number):Observable<TorrentItemDetailsResponse> => {
    const url = `http://192.168.0.254:3001/transmission/all?id=${torrentId}`;
    return this.http.get<TorrentItemDetailsResponse>(url);
  }

  startTorrents$ = (ids: number[]) => {
    const url = `http://192.168.0.254:3001/transmission/start`;
    const requestBody = {
      ids,
    }
    return this.http.post(url, requestBody);
  }

  stopTorrents$ = (ids: number[]) => {
    const url = `http://192.168.0.254:3001/transmission/stop`;
    const requestBody = {
      ids,
    }
    return this.http.post(url, requestBody);
  }

  deleteTorrents$ = ({ids, deleteLocalData}: DeleteTorrentsForm) => {
    const url = `http://192.168.0.254:3001/transmission/remove`;
    const requestBody = {
      ids,
      deleteLocalData,
    }
    return this.http.post(url, requestBody);
  }
}
