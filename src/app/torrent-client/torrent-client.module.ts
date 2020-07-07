import { NgModule } from '@angular/core';
import { TorrentClientComponent } from './torrent-client.component';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";

@NgModule({
  declarations: [TorrentClientComponent],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class TorrentClientModule { }
