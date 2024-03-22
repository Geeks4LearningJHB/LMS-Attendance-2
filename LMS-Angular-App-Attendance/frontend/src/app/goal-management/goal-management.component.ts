import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { archivedState, backlogState, completedState, pausedState, startedState } from '../shared/constants/goal-states';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { goalTypes } from './models/goal-model';
import { ActiveGoalService } from './services/logic-handlers/active-goal.service';
import { CaptureGoalService } from './services/logic-handlers/capture-goal.service';
import { GoalManagementApiService } from './services/api/goal-management-api.service';
import { GoalManagementDragDropService } from './services/logic-handlers/goal-management-drag-drop.service';

@Component({
  selector: 'app-goal-management',
  templateUrl: './goal-management.component.html',
  styleUrls: ['./goal-management.component.css'],
})
export class GoalManagementComponent implements OnInit, OnDestroy {
  modalRef: MdbModalRef<ViewSelectedGoalComponent> | null = null;
  goalStates = {
    backlog: backlogState,
    started: startedState,
    paused: pausedState,
    completed: completedState,
    archived: archivedState,
  };

  constructor(
    private goalManagementApiService: GoalManagementApiService,
    private activeGoalPopupService: ActiveGoalService,
    private captureGoalService: CaptureGoalService,
    private goalManagementDragNDropService: GoalManagementDragDropService
  ) { }

  ngOnInit(): void { }

  onDropGoal = (event: CdkDragDrop<Array<any>>): void => {
    if (event.previousContainer === event.container) {
      // If dropping a goal in the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    else {
      // Transferring a goal to a different list container
      this.goalManagementDragNDropService.onDropGoalTransferAction(event);
    }
  };

  isPopupOpen(containerId: string): boolean {
    return containerId === startedState;
  }

  addNewGoal() {
    this.captureGoalService.createNewGoal();
  }

  ngOnDestroy(): void {
    if (this.activeGoalPopupService.getActiveGoalObject())
      this.goalManagementApiService.updateGoal(
        this.activeGoalPopupService.getActiveGoalObject()
      );
  }

  getGoalTypeObjectList(): goalTypes {
    return this.goalManagementDragNDropService.getGoalTypeObjectList();
  }
}
