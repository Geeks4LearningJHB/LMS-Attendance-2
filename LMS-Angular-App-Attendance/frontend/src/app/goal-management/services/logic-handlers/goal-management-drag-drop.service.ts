import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { maxPauseCount, maxCustomToastrTimeout, maxToastrTimeout } from 'src/app/shared/constants/goal-boundaries';
import { archivedState, startedState, pausedState, completedState, backlogState } from 'src/app/shared/constants/goal-states';
import { ToastrMessagesService } from 'src/app/shared/global/toastr-messages.service';
import { GoalModel, goalTypes } from '../../models/goal-model';
import { getRandomCustomPauseMessage, getCompletedTasks, getRandomCustomSuccessMessage, getPresentTenseFromGoalState, getPastTenseFromGoalState } from '../helpers/goal-service.helpers';
import { GoalValidationHandlerService } from '../validations/goal-validation-handler.service';
import { GoalCommentService } from './goal-comment.service';
import { GoalManagementApiService } from '../api/goal-management-api.service';
import { ActiveGoalService } from './active-goal.service';
import { GoalButtonActionService } from './goal-button-action.service';
import * as lodash from 'lodash-es';
import { changeGoalState, incrementPausedCount, resetGoalMetadata } from '../helpers/goal-button-actions.helper';


@Injectable({
  providedIn: 'root'
})
export class GoalManagementDragDropService {

  constructor(
    private goalCommentService: GoalCommentService,
    private toastrMessageService: ToastrMessagesService,
    private goalValidationsService: GoalValidationHandlerService,
    private goalManagementApiService: GoalManagementApiService,
    private activeGoalPopupService: ActiveGoalService,
    private goalButtonActionService: GoalButtonActionService
  ) { }

  getGoalTypeObjectList(): goalTypes {
    return this.goalManagementApiService.getGoalTypeObjectList();
  }

  updateGoalChanges(event: CdkDragDrop<any[], any[], any>) {
    this.goalManagementApiService.updateGoal(event.previousContainer.data[event.previousIndex])
      .subscribe(() => {
        // event.previousContainer.data[event.previousIndex] = updatedGoalObject;
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      });
  }

  getConnectedLinksArray(event: CdkDragDrop<Array<any>>): Array<string> {
    return event.previousContainer.connectedTo.toString().split(',');
  }

  defaultPausedGoalActionsHandler(goalObject: GoalModel): void {
    this.activeGoalPopupService.deactivateCurrentActiveGoal();
    changeGoalState(goalObject, pausedState);
    incrementPausedCount(goalObject);
  }

  onDropGoalTransferAction(event: CdkDragDrop<Array<any>>) {
    // Checking if the current card is movable to the target container
    if (this.getConnectedLinksArray(event).includes(event.container.id)) {
      /** 
       * [event.container.id] represent the container where a goal's status is being changed to!
      */
      switch (event.container.id) {
        case archivedState:
          this.goalCommentService.getUserGoalCommentActionByGoalStatus(archivedState, event.previousContainer.data[event.previousIndex],
            (userComment: string | null, goalObject: GoalModel) => {
              if (userComment) {
                if (goalObject.goalStatus === startedState) {
                  this.activeGoalPopupService.deactivateCurrentActiveGoal();
                }

                changeGoalState(goalObject, archivedState);
                resetGoalMetadata(goalObject);

                goalObject.comments = [...goalObject?.comments!, {
                  comment: userComment,
                  commentType: "archived",
                  goalId: goalObject.id
                }]

                this.updateGoalChanges(event);
              }
            })
          break;
        case pausedState:
          // If the [pauseLimit] has been reached!
          if (lodash.toNumber(event.previousContainer.data[event.previousIndex].pausedCount) > 0 && lodash.toNumber(event.previousContainer.data[event.previousIndex].pausedCount) % maxPauseCount === 0) {
            this.goalCommentService.getUserGoalCommentActionByGoalStatus(pausedState, event.previousContainer.data[event.previousIndex],
              (userComment: string | null, goalToUpdate: GoalModel) => {
                if (userComment) {
                  this.defaultPausedGoalActionsHandler(goalToUpdate);

                  goalToUpdate.comments = [...goalToUpdate?.comments!, {
                    comment: userComment,
                    commentType: "paused",
                    goalId: goalToUpdate.id
                  }]

                  this.updateGoalChanges(event);
                }
              })
          } else {
            this.defaultPausedGoalActionsHandler(event.previousContainer.data[event.previousIndex]);

            // Updating goal changes in the database
            this.updateGoalChanges(event);

            // Show an encouraging message to the geek!
            this.toastrMessageService.showInfoMessage('Encouragement', getRandomCustomPauseMessage(), maxCustomToastrTimeout);
          }
          break;
        case startedState:
          /** 
           * [Guard condition]
           * This guard displays an error message if the goal cannot be started
           */
          if (!this.goalValidationsService.canGoalBeStarted(this.getGoalTypeObjectList().started)) return;

          changeGoalState(event.previousContainer.data[event.previousIndex], startedState);

          // Starting the [Active Goal Popup] window
          this.activeGoalPopupService.activateGoalCountDown(event.previousContainer.data[event.previousIndex]);

          // Updating goal changes in the database
          this.updateGoalChanges(event);
          break;
        case completedState:
          /** 
           * [Guard condition]
           * This guard displays an error message if the goal cannot be completed
           */
          if (event.previousContainer.data[event.previousIndex]?.tasks && event.previousContainer.data[event.previousIndex]?.tasks?.length > 0) {
            if (!this.goalValidationsService.canCompleteGoal(getCompletedTasks(event.previousContainer.data[event.previousIndex]?.tasks), event.previousContainer.data[event.previousIndex]?.tasks)) return;
          }

          this.activeGoalPopupService.deactivateCurrentActiveGoal();
          changeGoalState(event.previousContainer.data[event.previousIndex], completedState);

          // Updating goal changes in the database
          this.updateGoalChanges(event);

          // Show a success message
          this.toastrMessageService.showSuccessMessage('Congradulations', getRandomCustomSuccessMessage(), maxCustomToastrTimeout);
          break;
        case backlogState:
          changeGoalState(event.previousContainer.data[event.previousIndex], backlogState);
          this.updateGoalChanges(event);
          break;
      }
    }
    else {
      this.toastrMessageService.showErrorMessage('Change Goal Status',
        `Invalid goal operation! You cannot ${getPresentTenseFromGoalState(event.container.id)} a goal that is ${getPastTenseFromGoalState(event.previousContainer.id)}`,
        maxToastrTimeout
      );
    }
  }
}
