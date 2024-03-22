import { Injectable } from '@angular/core';
import { maxToastrTimeout } from 'src/app/shared/constants/goal-boundaries';
import { ToastrMessagesService } from 'src/app/shared/global/toastr-messages.service';
import { GoalModel, GoalTaskModel } from '../../models/goal-model';

@Injectable({
  providedIn: 'root'
})
export class GoalValidationHandlerService {

  constructor(private toastrMessagesService: ToastrMessagesService) { }

  public canGoalBeStarted(startedList: Array<GoalModel>): boolean {
    if (startedList.length === 0) return true;

    this.toastrMessagesService
      .showErrorMessage(
        "Start Goal",
        "You cannot cannot begin working on this goal while you still have another goal in-progress.",
        maxToastrTimeout);
    return false;
  }

  public canCompleteGoal(completedTasks: Array<GoalTaskModel>, allGoalTasks: Array<GoalTaskModel>): boolean {
    if (completedTasks.length === allGoalTasks?.length) return true;

    this.toastrMessagesService
      .showErrorMessage(
        "Complete Goal",
        "This goal cannot be completed while it still has outstanding tasks.",
        maxToastrTimeout)
    return false;
  }
}
