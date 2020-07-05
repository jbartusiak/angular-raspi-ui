import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOptions, ITorrentProvider } from "../../state";

@Component({
  selector: 'app-providers-component',
  templateUrl: './providers.component.html',
  styleUrls: [ './providers.component.scss' ]
})
export class ProvidersComponent {
  @Input() providers: ITorrentProvider[];
  @Input() enabledProviders: string[];
  @Output() onChecked = new EventEmitter<IOptions>();

  handleChange(name: string, value: boolean) {
    const newState: IOptions = {};
    this.enabledProviders.forEach(el => newState[el] = true);
    newState[name] = value;

    this.onChecked.emit(newState);
  }
}
