import { Component, Input, OnInit } from '@angular/core';
import { ApplicationIndicator } from 'src/app/shared/global/application-indicator';

@Component({
  selector: 'app-mini-table',
  templateUrl: './mini-table.component.html',
  styleUrls: ['./mini-table.component.css']
})
export class MiniTableComponent implements OnInit {

  @Input() ikmList: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
