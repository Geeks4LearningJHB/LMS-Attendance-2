import { Component, Input, OnInit } from '@angular/core';
import { activeGoalPopupWindowState, GoalModel } from '../../models/goal-model';
import { ActiveGoalService } from '../../services/logic-handlers/active-goal.service';
import { ViewGoalService } from '../../services/logic-handlers/view-goal.service';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.css'],
})
export class GoalCardComponent implements OnInit {
  @Input()
  goal!: GoalModel;

  constructor(
    private activeGoalService: ActiveGoalService,
    private viewGoalService: ViewGoalService
  ) { }

  ngOnInit(): void { }

  grab(event: any) {
    const { target } = event;
    target.style.cursor = 'grabbing';
  }

  release(event: any) {
    const { target } = event;
    target.style.cursor = 'grab';
  }

  isGoalStarted(): activeGoalPopupWindowState {
    return this.activeGoalService.getActiveGoalPopupWindowState();
  }

  onViewGoal(goal?: GoalModel): void {
    this.viewGoalService.viewSelectedGoal(goal!)
  }

  onCloseGoal(): void {
    this.viewGoalService.closeViewedGoal()
  }

  getActiveState(): activeGoalPopupWindowState {
    return this.activeGoalService.getActiveGoalPopupWindowState()
  }
}
