import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { BackdropComponent } from './components/backdrop/backdrop.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlinkerComponent } from './components/blinker/blinker.component';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import * as fromServices from './../services/state/services.reducer';

@NgModule({
  declarations: [
    BackdropComponent,
    BlinkerComponent,
    NavbarComponent,
  ],
  exports: [
    BackdropComponent,
    BlinkerComponent,
    FlexLayoutModule,
    NavbarComponent,
    CommonModule,
    HttpClientModule,
  ],
  imports: [
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    StoreModule.forFeature('services', fromServices.reducer)
  ]
})
export class SharedModule {
}
