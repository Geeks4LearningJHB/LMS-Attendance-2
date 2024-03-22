import { Component, OnInit } from '@angular/core';
import * as lodash from 'lodash-es';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ActiveGoalService } from 'src/app/goal-management/services/logic-handlers/active-goal.service';
import { GoalButtonActionService } from 'src/app/goal-management/services/logic-handlers/goal-button-action.service';
import { ViewGoalService } from 'src/app/goal-management/services/logic-handlers/view-goal.service';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { getStringDate, getStringTimeFromDateObject, getTimeFormattedString } from 'src/app/shared/global/utils';
import { activeGoalPopupWindowState, goalButtonAction, GoalModel, goalStatus } from '../../../models/goal-model';
import { AddExtraGoalTimeComponent } from '../../add-extra-goal-time/add-extra-goal-time.component';
import { GoalManagementApiService } from 'src/app/goal-management/services/api/goal-management-api.service';
import { calculateTaskCompletionPercentage, getGoalProgress } from 'src/app/goal-management/services/helpers/goal-button-actions.helper';

@Component({
  selector: 'app-view-selected-goal',
  templateUrl: './view-selected-goal.component.html',
  styleUrls: ['./view-selected-goal.component.css'],
})
export class ViewSelectedGoalComponent implements OnInit {
  goalObject!: GoalModel;
  allowModalClosure!: boolean;
  goalStatus!: goalStatus;
  progressState: "danger" | "warning" | "success" | "primary" = 'danger'
  addTimeModalReference!: MdbModalRef<AddExtraGoalTimeComponent>

  constructor(
    private viewGoalService: ViewGoalService,
    private activeGoalService: ActiveGoalService,
    private goalButtonActonService: GoalButtonActionService,
    private mdbModalService: GoalModalHandlerService<any>,
    private goalManagementApiService: GoalManagementApiService
  ) { }

  ngOnInit(): void {
    this.getGoalColor();
    calculateTaskCompletionPercentage(this.goalObject);
  }

  getProgress(): number {
    return getGoalProgress();
  }

  getProgressValue(): number {
    const percentage = this.getProgress() * 100;

    if (percentage === 100) this.progressState = "success"
    else if (percentage >= 75) this.progressState = "primary"
    else if (percentage >= 50) this.progressState = "warning"
    else this.progressState = "danger"

    return percentage;
  }

  getGoalColor() {
    if (this.goalObject?.goalStatus) this.goalStatus = this.goalObject?.goalStatus;
  }

  closeViewGoalModal(): void {
    this.viewGoalService.closeViewedGoal();
  }

  isGoalStarted(): activeGoalPopupWindowState {
    return this.activeGoalService.getActiveGoalPopupWindowState();
  }

  onGoalAction(actionType: goalButtonAction, goalObject: GoalModel) {
    this.goalButtonActonService.performButtonAction({
      actionType: actionType,
      goalObject: goalObject,
      modalReference: this.viewGoalService.getViewedGoalModalReference()
    });
  }

  addMoreTime() {
    this.mdbModalService.openMdbModal<AddExtraGoalTimeComponent>({
      component: AddExtraGoalTimeComponent,
      data: null,
      ignoreBackdropClick: false,
      width: 50
    }).onClose.subscribe((userExtraTime: string | null) => {
      if (userExtraTime) {
        this.goalObject.duration = this.getAddedTime(this.goalObject.duration, userExtraTime)
        this.goalObject.timeRemaining = this.getAddedTime(this.goalObject.timeRemaining, userExtraTime)
        this.updateGoalExtraTimeAndRestartGoal(this.goalObject);
      }
    })
  }

  getAddedTime(prevTime: string, extraTime: string): string {
    const [newHours, newMinutes] = extraTime.split(':');

    const durationDateObject = new Date(`${getStringDate()}T${prevTime}`)

    durationDateObject.setHours(durationDateObject.getHours() + lodash.toNumber(newHours));
    durationDateObject.setMinutes(durationDateObject.getMinutes() + lodash.toNumber(newMinutes));

    return getStringTimeFromDateObject(durationDateObject);
  }

  updateGoalExtraTimeAndRestartGoal(goalObject: GoalModel) {
    // Update goal in the database
    this.goalManagementApiService.updateGoal(goalObject)
      .subscribe((response: GoalModel) => {
        console.log(response)

        this.activeGoalService.activateGoalCountDown(goalObject);
        this.viewGoalService.closeViewedGoal();
      })
  }

  hasTasks(){
    if(this.goalObject?.tasks && this.goalObject.tasks?.length > 0) return true;
    return false;
  }
}
