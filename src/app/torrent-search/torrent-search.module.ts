import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { TorrentSearchComponent } from './torrent-search.component';
import { RouterModule } from "@angular/router";
import { routes } from "./routes";

@NgModule({
  declarations: [TorrentSearchComponent],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class TorrentSearchModule { }
