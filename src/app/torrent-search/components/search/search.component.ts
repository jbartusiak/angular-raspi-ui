import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

export interface PeriodicElement {
  uploaded: string;
  title: number;
  size: number;
  condition: string;
  provider: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: 1, uploaded: 'Hydrogen', size: 1.0079, condition: 'H', provider: '1337x'},
  {title: 2, uploaded: 'Helium', size: 4.0026, condition: 'He', provider: '1337x'},
  {title: 3, uploaded: 'Lithium', size: 6.941, condition: 'Li', provider: '1337x'},
  {title: 4, uploaded: 'Beryllium', size: 9.0122, condition: 'Be', provider: '1337x'},
  {title: 5, uploaded: 'Boron', size: 10.811, condition: 'B', provider: '1337x'},
  {title: 6, uploaded: 'Carbon', size: 12.0107, condition: 'C', provider: '1337x'},
  {title: 7, uploaded: 'Nitrogen', size: 14.0067, condition: 'N', provider: '1337x'},
  {title: 8, uploaded: 'Oxygen', size: 15.9994, condition: 'O', provider: '1337x'},
  {title: 9, uploaded: 'Fluorine', size: 18.9984, condition: 'F', provider: '1337x'},
  {title: 10, uploaded: 'Neon', size: 20.1797, condition: 'Ne', provider: '1337x'},
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['title', 'uploaded', 'size', 'condition', 'provider'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

}
