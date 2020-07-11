import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITorrentItem } from "../state/torrent-client.reducer";
import { LoadTorrentResponse } from "../models/LoadTorrentResponse";
import { map } from "rxjs/operators";
import { NewTorrentForm } from "../models/NewTorrentForm";

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
}
