import { Injectable } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AttendanceService } from 'src/app/attendance-register/services/attendance.service';
import { CaptureGoalsComponent } from '../../modals/capture-goals/capture-goals.component';
import { CreateGoalTaskComponent } from '../../modals/create-goal-task/create-goal-task.component';
import { GoalModel, viewType } from '../../models/goal-model';
import { GoalModalHandlerService } from '../modals/goal-modal-handler.service';
import { GoalButtonActionService } from './goal-button-action.service';
import { GoalManagementApiService } from '../api/goal-management-api.service';
import { calculateTaskCompletionPercentage } from '../helpers/goal-button-actions.helper';

@Injectable({
  providedIn: 'root',
})
export class CaptureGoalService {
  private currentGoal!: GoalModel;

  constructor(
    private attendanceService: AttendanceService,
    private goalManagementApiService: GoalManagementApiService,
    private mdbModalService: GoalModalHandlerService<any>,
    private goalButtonActionService: GoalButtonActionService
  ) { }

  public createNewGoal(attendance?: any) {
    this.mdbModalService.openMdbModal<CaptureGoalsComponent>({
      component: CaptureGoalsComponent,
      data: { attendance: attendance ? attendance : null },
      ignoreBackdropClick: false,
      width: 50
    })
  }

  public onTaskCreation(
    taskReference: MdbModalRef<CreateGoalTaskComponent>,
    goalObject: GoalModel,
    modalActionViewType: viewType = "create"
  ): void {
    taskReference.onClose.subscribe((newTask: string | null) => {
      // Check if user did capture a task on closed the modal
      if (newTask) {
        goalObject['tasks']?.push({
          title: newTask,
          complete: false,
          goalId: goalObject.id
        })

        // If updating a user goal task, then update the goal task table
        if (modalActionViewType === "view") {
          this.goalManagementApiService.updateGoal(this.currentGoal)
            .subscribe((updatedGoal: GoalModel) => {
              calculateTaskCompletionPercentage(this.currentGoal);
              console.log(updatedGoal)
            })
        }
      }
    })
  }
}
