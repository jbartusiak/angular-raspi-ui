import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Torrent } from "../../state";

@Component({
  selector: 'app-results-component',
  templateUrl: './results.component.html',
  styleUrls: [ './results.component.scss' ]
})
export class ResultsComponent implements OnChanges {

  @Input() results: Torrent[];
  @Output() download = new EventEmitter<Torrent>();

  displayedColumns: string[] = [ 'title', 'magnet', 'uploaded', 'size', 'condition', 'provider' ];
  dataSource = new MatTableDataSource(this.results);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Torrent>(this.results);
    this.dataSource.sort = this.sort;
  }
}
