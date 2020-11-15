import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { BackdropComponent } from './components/backdrop/backdrop.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlinkerComponent } from './components/blinker/blinker.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromServices from './../services/state/services.reducer';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataVolumePipe } from './pipes/data-volume.pipe';
import { EstimatedTtaPipe } from './pipes/estimated-tta.pipe';
import { NavbarFacade } from './services/navbar.facade';

@NgModule({
  declarations: [
    BackdropComponent,
    BlinkerComponent,
    LayoutComponent,
    NavbarComponent,
    DataVolumePipe,
    EstimatedTtaPipe,
  ],
  exports: [
    BackdropComponent,
    BlinkerComponent,
    LayoutComponent,
    FlexLayoutModule,
    NavbarComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataVolumePipe,
    EstimatedTtaPipe,
  ],
  imports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    StoreModule.forFeature('services', fromServices.reducer)
  ],
  providers: [
    {provide: NavbarFacade, useClass: NavbarFacade}
  ]
})
export class SharedModule {
}
