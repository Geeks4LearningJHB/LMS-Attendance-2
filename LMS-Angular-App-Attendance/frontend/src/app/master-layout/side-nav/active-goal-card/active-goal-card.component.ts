import { Component, OnInit } from '@angular/core';
import { toNumber } from 'lodash';
import * as lodash from 'lodash-es';
import { ActiveGoalService } from 'src/app/goal-management/services/logic-handlers/active-goal.service';
import { ViewGoalService } from 'src/app/goal-management/services/logic-handlers/view-goal.service';
import { goalDangerTime, goalWarningTime, maxToastrTimeout } from 'src/app/shared/constants/goal-boundaries';
import { ToastrMessagesService } from 'src/app/shared/global/toastr-messages.service';
import { getSessionStorageValue, setSessionStoragePairs } from 'src/app/shared/global/utils';
import { goalStageStatus } from './models/active-goal-model';

@Component({
  selector: 'app-active-goal-card',
  templateUrl: './active-goal-card.component.html',
  styleUrls: ['./active-goal-card.component.css']
})
export class ActiveGoalCardComponent implements OnInit {
  activeGoalStatus!: goalStageStatus
  remainingTime!: string

  constructor(
    private activeGoalPopupService: ActiveGoalService,
    private viewGoalService: ViewGoalService,
    private toastrMessageService: ToastrMessagesService
  ) { }

  ngOnInit(): void {
    this.activeGoalPopupService.getCountDownTimerBehaviourSubject()
      .subscribe((timeRemaining: string) => {
        this.remainingTime = timeRemaining;

        if (this.activeGoalPopupService.getActiveGoalPopupWindowState() === "open")
          this.changeCardState(this.remainingTime.split(":"))
      })
  }

  changeCardState(timeparts: Array<string>): void {
    const [hours, minutes, _s] = timeparts
    
    if (lodash.toNumber(hours) === 0 && lodash.toNumber(minutes) < goalDangerTime) {
      this.activeGoalStatus = "danger";

      if (!getSessionStorageValue("warningShown")) {
        setSessionStoragePairs("warningShown", 'true')
        this.toastrMessageService.showWarningMessage(
          "Time Limit Warning",
          `Your time for the ${this.activeGoal()?.title} goal is almost up.`,
          maxToastrTimeout
        )
      }
    }
    else if (lodash.toNumber(hours) === 0 && lodash.toNumber(minutes) < goalWarningTime) this.activeGoalStatus = "warning"
    else this.activeGoalStatus = "good"
  }

  activeGoal() {
    return this.activeGoalPopupService.getActiveGoalObject();
  }

  getActiveGoalPopupState() {
    return this.activeGoalPopupService.getActiveGoalPopupWindowState();
  }

  viewGoal() {
    this.viewGoalService.viewSelectedGoal(this.activeGoal());
  }
}
