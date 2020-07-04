import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ITorrentProvider } from "../state/torrent-search.reducer";

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
}
