import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as fromProduct from './state/services.reducer';
import * as productActions from './state/services.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-homepage',
  templateUrl: './services.component.html',
  styleUrls: [ './services.component.scss' ]
})
export class ServicesComponent implements OnInit, AfterViewInit {

  constructor(private store: Store<fromProduct.State>) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new productActions.Load());
  }

}
