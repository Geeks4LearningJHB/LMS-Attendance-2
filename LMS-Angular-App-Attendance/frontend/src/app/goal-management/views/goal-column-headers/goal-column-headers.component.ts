import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-column-headers',
  templateUrl: './goal-column-headers.component.html',
  styleUrls: ['./goal-column-headers.component.css']
})
export class GoalColumnHeadersComponent implements OnInit {
  @Input()
  backlogCount!: number;

  @Input()
  startedCount!: number;

  @Input()
  pausedCount!: number;

  @Input()
  completedCount!: number;

  @Input()
  archivedCount!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
