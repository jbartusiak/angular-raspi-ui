import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IOptions, ITorrentProvider, Torrent } from "../state";
import { Observable } from "rxjs";
import { GetTorrentMagnetResponse } from "../models";

const host = '192.168.0.254';
const port = '3001';
const uri = 'providers';

@Injectable({
  providedIn: 'root'
})
export class TorrentSearchService {

  constructor(private http: HttpClient) {
  }

  $getAllProviders = () => {
    const url = `http://${ host }:${ port }/${ uri }`;
    return this.http.get<{ providers: ITorrentProvider[] }>(url).pipe(
      map(result => result.providers)
    );
  }

  $getEnabledProviders = () => {
    const url = `http://${ host }:${ port }/providers/enabled`;
    return this.http.get<{ enabledProviders: ITorrentProvider[] }>(url).pipe(
      map(result => result.enabledProviders)
    );
  }

  $updateEnabledProviders = (options: IOptions) => {
    const url = `http://${ host }:${ port }/providers`;
    return this.http.post(url, options).pipe(
      map<{ enabledProviders: string[] }, string[]>(result => result.enabledProviders)
    )
  }

  $performSearch = (query: string, categories?: string | string[], limit = 40) => {
    const url = `http://${ host }:${ port }/torrent/search`;
    return this.http
      .post(url, {
        categories: Array.isArray(categories) ? categories : [ categories ],
        limit,
        query,
      })
      .pipe(
        map<{ results: Torrent[] }, Torrent[]>(
          next => next.results
        )
      );
  }

  getTorrentMagnet$ = (torrent: Torrent): Observable<string> => {
    const url = `http://${ host }:${ port }/torrent/magnet`;
    return this.http.post<GetTorrentMagnetResponse>(url, torrent).pipe(
      map(next => next.magnet)
    );
  }
}
