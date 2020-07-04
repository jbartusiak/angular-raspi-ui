import { Component, Input } from '@angular/core';
import { ITorrentProvider } from "../../state/torrent-search.reducer";

@Component({
  selector: 'app-providers-component',
  templateUrl: './providers.component.html',
  styleUrls: [ './providers.component.scss' ]
})
export class ProvidersComponent {
  @Input() providers: ITorrentProvider[];
}
