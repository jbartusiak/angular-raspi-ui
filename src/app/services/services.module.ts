import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';

import { ServicesComponent } from './services.component';
import { StatusTileComponent } from './status-tile/status-tile.component';

import { routes } from './routes';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from "./state/services.reducer";

@NgModule({
  declarations: [
    ServicesComponent,
    StatusTileComponent,
  ],
  imports: [
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('services', [reducer]),
    RouterModule.forChild(routes),
  ]
})
export class ServicesModule { }
