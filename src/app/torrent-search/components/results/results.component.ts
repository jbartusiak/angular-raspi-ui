import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Torrent } from "../../state";
import { resultsFadeInAnimation } from "../../animations/torrent-search.animations";

/*
* TODO Fix table sorting
*  */

@Component({
  selector: 'app-results-component',
  templateUrl: './results.component.html',
  styleUrls: [ './results.component.scss' ],
  animations: [ resultsFadeInAnimation ],
})
export class ResultsComponent implements OnChanges {

  @Input() results: Torrent[];
  @Input() error: string;
  @Output() download = new EventEmitter<Torrent>();

  sortedResults: Torrent[];

  displayedColumns: string[] = [ 'title', 'magnet', 'uploaded', 'size', 'condition', 'provider' ];
  dataSource = new MatTableDataSource(this.results);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Torrent>(this.results);
    this.dataSource.sort = this.sort;
    this.sortedResults = [ ...this.results ];
  }


  ngOnInit(): void {
  }

  sortChange({active, direction}: Sort) {
    this.sortedResults = this.sortedResults.sort((t1, t2) => {
      if (t1[active]>t2[active]) return 1;
      else if (t1[active] === t2[active]) return 0;
      else return -1;
    })
  }
}
