import { Component } from "@angular/core";

@Component({
  template: `
    <h1>Providers</h1>
    <span>Select torrent providers from the list below. Note that default, tested providers are already selected.</span>
    <app-providers-component>

    </app-providers-component>
  `,
  selector: 'app-providers-container'
})
export class ProvidersContainer {

}
