import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {
  @Input() tableData!: any[];
  @Input() columnHeader!: any;

  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();

  objectKeys = Object.keys;

  dataSource!: MatTableDataSource<any>;
  selectedRow: any;

  constructor(private _announcer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  displayRow(row: any) {
    this.selectedRow = row;
    this.rowClicked.emit(row);
  }
}
