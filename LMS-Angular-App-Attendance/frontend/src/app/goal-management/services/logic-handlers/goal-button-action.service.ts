import { Injectable } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {
  maxArchiveCount,
  maxCustomToastrTimeout,
  maxPauseCount,
  maxToastrTimeout,
} from 'src/app/shared/constants/goal-boundaries';
import {
  archivedState,
  backlogState,
  completedState,
  pausedState,
  startedState,
} from 'src/app/shared/constants/goal-states';
import { ToastrMessagesService } from 'src/app/shared/global/toastr-messages.service';
import { ViewSelectedGoalComponent } from '../../modals/views/view-selected-goal/view-selected-goal.component';
import {
  GoalModel,
  goalStatus,
  goalTypes,
} from '../../models/goal-model';
import {
  getCompletedTasks,
  getRandomCustomPauseMessage,
  getRandomCustomSuccessMessage,
  transferGoal,
} from '../helpers/goal-service.helpers';
import { ButtonActionParameters } from '../interfaces/view-goal.interface';
import { GoalValidationHandlerService } from '../validations/goal-validation-handler.service';
import { ActiveGoalService } from './active-goal.service';
import { GoalCommentService } from './goal-comment.service';
import { GoalManagementApiService } from '../api/goal-management-api.service';
import { changeGoalState, createGoalObjectDeepCopy, incrementArchiveCount, incrementPausedCount, resetGoalMetadata } from '../helpers/goal-button-actions.helper';

@Injectable({
  providedIn: 'root',
})
export class GoalButtonActionService {
  private viewGoalModalReference!: MdbModalRef<ViewSelectedGoalComponent>;
  private previousGoalContainer!: goalStatus;

  constructor(
    private goalManagementApiService: GoalManagementApiService,
    private toastrMessageService: ToastrMessagesService,
    private activeGoalService: ActiveGoalService,
    private goalCommentService: GoalCommentService,
    private goalValidationsService: GoalValidationHandlerService
  ) { }

  private setViewGoalModalReference(modalReference: MdbModalRef<ViewSelectedGoalComponent>): void {
    this.viewGoalModalReference = modalReference;
  }

  private getViewGoalModalReference(): MdbModalRef<ViewSelectedGoalComponent> {
    return this.viewGoalModalReference;
  }

  private closeViewGoalModal(): void {
    this.getViewGoalModalReference().close();
  }

  private getGoalTypeObjectList(): goalTypes {
    return this.goalManagementApiService.getGoalTypeObjectList();
  }

  public performButtonAction({
    actionType,
    goalObject,
    modalReference,
  }: ButtonActionParameters) {
    this.setViewGoalModalReference(modalReference);

    switch (actionType) {
      case 'start':
        this.startGoal(goalObject);
        break;
      case 'pause':
        this.pauseGoal(goalObject);
        break;
      case 'complete':
        this.completeGoal(goalObject);
        break;
      case 'archive':
        this.archiveGoal(goalObject);
        break;
      case 'restore':
        this.restoreGoal(goalObject);
        break;
      case 'resume':
        this.resumeGoal(goalObject);
        break;
    }
  }

  private startGoal(goalObject: GoalModel): void {
    /** 
     * [Guard condition]
     * This guard displays an error message if the goal cannot be started
     */
    if (!this.goalValidationsService.canGoalBeStarted(this.getGoalTypeObjectList().started)) return;

    // Store the previous status for later use 
    this.previousGoalContainer = goalObject.goalStatus;

    /**
     * Creating a deep copy of the goal object to send a request to the database 
     * and [if] request is successful, then update the original goal object.
     */
    const goalObjectDeepCopy: GoalModel = createGoalObjectDeepCopy(goalObject);
    changeGoalState(goalObjectDeepCopy, startedState);

    this.updateDatabaseGoalData(goalObjectDeepCopy, (updatedGoalObject: GoalModel) => {
      // Update the goal object
      this.updatedGoalPostActionCallback(Object.assign(goalObject, updatedGoalObject), startedState, this.previousGoalContainer);
    })
  }

  private pauseGoal(goalObject: GoalModel) {
    if (goalObject.pausedCount > 0 && (goalObject.pausedCount % maxPauseCount) === 0) {
      this.goalCommentService.getUserGoalCommentActionByGoalStatus(pausedState, goalObject,
        (userComment: string | null, goalToUpdate: GoalModel) => {
          if (userComment) {
            goalToUpdate.comments = [...goalToUpdate?.comments!, {
              comment: userComment,
              commentType: "paused",
              goalId: goalToUpdate.id
            }]

            this.pauseGoalDBUpdate(goalToUpdate);
          }
        });
    } else {
      this.pauseGoalDBUpdate(goalObject);
    }
  }

  private archiveGoal(goalObject: GoalModel) {
    this.goalCommentService.getUserGoalCommentActionByGoalStatus(archivedState, goalObject,
      (userComment: string | null, goalToUpdate: GoalModel) => {
        if (userComment) {
          goalToUpdate.comments = [...goalToUpdate?.comments!, {
            comment: userComment,
            commentType: "archived",
            goalId: goalObject.id
          }]

          this.archiveGoalDBUpdate(goalToUpdate);
        }
      });
  }

  private resumeGoal(goalObject: GoalModel) { this.startGoal(goalObject); }

  private completeGoal(goalObject: GoalModel) {
    if (goalObject?.tasks && goalObject?.tasks?.length > 0) {
      /**
       * [Guard Condition]
       * Displays an error when a goal connot yet be completed
       */
      if (!this.goalValidationsService.canCompleteGoal(getCompletedTasks(goalObject?.tasks), goalObject?.tasks)) return;
    }

    /**
     * Creating a deep copy of the goal object to send a request to the database 
     * and [if] request is successful, then update the original goal object.
     */
    const goalObjectDeepCopy: GoalModel = createGoalObjectDeepCopy(goalObject);
    changeGoalState(goalObjectDeepCopy, completedState);

    this.updateDatabaseGoalData(goalObjectDeepCopy, (updatedGoalObject: GoalModel) => {
      // Update goal object
      this.updatedGoalPostActionCallback(Object.assign(goalObject, updatedGoalObject), completedState);
    });
  }

  private restoreGoal(goalObject: GoalModel) {
    /**
     * Creating a deep copy of the goal object to send a request to the database 
     * and [if] request is successful, then update the original goal object.
     */
    const goalObjectDeepCopy: GoalModel = createGoalObjectDeepCopy(goalObject);
    changeGoalState(goalObjectDeepCopy, backlogState);

    this.updateDatabaseGoalData(goalObjectDeepCopy, (updatedGoalObject: GoalModel) => {
      // Update goal object
      this.updatedGoalPostActionCallback(Object.assign(goalObject, updatedGoalObject), backlogState)
    });
  }

  /******************************* Callback Function Handler *****************************/
  private updatedGoalPostActionCallback(goalObject: GoalModel, actionStateType: goalStatus, prevContainer?: goalStatus) {
    switch (actionStateType) {
      case startedState:
        transferGoal(
          prevContainer === backlogState ? this.getGoalTypeObjectList().backlog
            : prevContainer === pausedState ? this.getGoalTypeObjectList().paused
              : this.getGoalTypeObjectList().archived,
          this.getGoalTypeObjectList().started,
          goalObject
        );

        // Start the newly created goal in the started list
        this.activeGoalService.activateGoalCountDown(
          this.getGoalTypeObjectList().started[this.getGoalTypeObjectList().started.length - 1]
        );
        break;
      case pausedState:
        transferGoal(
          this.getGoalTypeObjectList().started,
          this.getGoalTypeObjectList().paused,
          goalObject
        );

        this.activeGoalService.deactivateCurrentActiveGoal();

        this.toastrMessageService.showInfoMessage(
          'Encouragement',
          getRandomCustomPauseMessage(),
          maxCustomToastrTimeout
        );
        break;
      case archivedState:
        if (prevContainer === startedState) { this.activeGoalService.deactivateCurrentActiveGoal(); }

        transferGoal(
          prevContainer === backlogState ? this.getGoalTypeObjectList().backlog
            : prevContainer === startedState ? this.getGoalTypeObjectList().started
              : this.getGoalTypeObjectList().paused,
          this.getGoalTypeObjectList().archived,
          goalObject
        );

        if (goalObject.archiveCount % maxArchiveCount === 0) {
          this.toastrMessageService.showInfoMessage(
            'Archive Goal',
            'Please note that frequent archiving of your goals may affect your progress tracking and hinder your ability to achieve your desired outcomes.',
            maxToastrTimeout
          );
        }
        break;
      case completedState:
        transferGoal(
          this.getGoalTypeObjectList().started,
          this.getGoalTypeObjectList().completed,
          goalObject
        );

        // Stop the countdown timer
        this.activeGoalService.deactivateCurrentActiveGoal();

        // Show an encouraging message
        this.toastrMessageService.showSuccessMessage(
          'Congradulations',
          getRandomCustomSuccessMessage(),
          maxCustomToastrTimeout
        );
        break;
      case backlogState:
        transferGoal(
          this.getGoalTypeObjectList().archived,
          this.getGoalTypeObjectList().backlog,
          goalObject
        );

        break;
    }

    // Close the modal!
    this.closeViewGoalModal();
  }

  /*********************************** Database helpers ****************************/

  private archiveGoalDBUpdate(goalObject: GoalModel) {
    this.previousGoalContainer = goalObject.goalStatus;

    /**
     * Creating a deep copy of the goal object to send a request to the database 
     * and [if] request is successful, then update the original goal object.
     */
    const goalObjectDeepCopy: GoalModel = createGoalObjectDeepCopy(goalObject);
    changeGoalState(goalObjectDeepCopy, archivedState);
    incrementArchiveCount(goalObjectDeepCopy);
    resetGoalMetadata(goalObjectDeepCopy);

    this.updateDatabaseGoalData(goalObjectDeepCopy, (updatedGoalObject: GoalModel) => {
      //Updating the goal object
      this.updatedGoalPostActionCallback(Object.assign(goalObject, updatedGoalObject), archivedState, this.previousGoalContainer)
    });
  }

  private pauseGoalDBUpdate(goalObject: GoalModel) {
    /**
     * Creating a deep copy of the goal object to send a request to the database 
     * and [if] request is successful, then update the original goal object.
     */
    const goalObjectDeepCopy: GoalModel = createGoalObjectDeepCopy(goalObject);
    changeGoalState(goalObjectDeepCopy, pausedState);
    incrementPausedCount(goalObjectDeepCopy);

    // Updating goal changes in the database
    this.updateDatabaseGoalData(goalObjectDeepCopy, (updatedGoalObject: GoalModel) => {
      // Update goal object
      this.updatedGoalPostActionCallback(Object.assign(goalObject, updatedGoalObject), pausedState)
    });
  }

  public updateDatabaseGoalData(goalObject: GoalModel, callback: Function): void {
    // Updating goal changes in the database
    this.goalManagementApiService
      .updateGoal(goalObject)
      .subscribe((updatedGoalObject: GoalModel) => {
        // Function callback
        callback(updatedGoalObject);
      });
  }
}
