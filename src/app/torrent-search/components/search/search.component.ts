import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent {
  @Input() query: string;
  @Input() categories: string[];
  @Input() selectedCategory: string;

  @Output() onQueryChanged = new EventEmitter<string>();

  private $interval: Subscription;

  handleChange() {
    if (this.$interval) {
      this.$interval.unsubscribe();
    }
    this.$interval = interval(1000)
      .pipe(take(1))
      .subscribe(() => this.onQueryChanged.emit(this.query));
  }
}
