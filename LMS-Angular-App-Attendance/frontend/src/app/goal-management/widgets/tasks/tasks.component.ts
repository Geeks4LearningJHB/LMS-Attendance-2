import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CreateGoalTaskComponent } from '../../modals/create-goal-task/create-goal-task.component';
import {
  GoalModel,
  GoalTaskModel,
  goalStatus,
  viewType,
} from '../../models/goal-model';
import { GoalManagementApiService } from '../../services/api/goal-management-api.service';
import { calculateTaskCompletionPercentage } from '../../services/helpers/goal-button-actions.helper';
import { GoalModalHandlerService } from '../../services/modals/goal-modal-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  taskModalReference!: MdbModalRef<CreateGoalTaskComponent>;
  newGoalTask!: GoalTaskModel;

  @Input()
  goalObject!: GoalModel;

  @Input()
  viewType!: viewType;

  @Input()
  goalStatus!: goalStatus;

  constructor(
    private goalManagementApiService: GoalManagementApiService,
    private mdbModalService: GoalModalHandlerService<any>
  ) {}

  ngOnInit(): void {}

  toggleTaskForCompletion(element: any) {
    const {
      target: { id },
    } = element;

    if (this.goalObject.tasks) {
      const taskToUpdate: GoalTaskModel = {
        title: this.goalObject?.tasks[id]?.title,
        complete: !this.goalObject?.tasks[id]?.complete,
        goalId: this.goalObject?.id,
        id: this.goalObject?.tasks[id]?.id,
      };

      if (this.viewType === 'view') {
        this.updateTaskOnDB(id, taskToUpdate);
      }
    }
  }

  removeTask(element: any): void {
    const {
      target: { id },
    } = element;

    if (this.goalObject.tasks) {
      if (this.viewType === 'view') {
        this.deleteTaskFromDB(this.goalObject.tasks, id);
      } else {
        this.goalObject.tasks.splice(id, 1)[0];
      }
    }
  }

  addMoreTasks() {
    this.mdbModalService
      .openMdbModal<CreateGoalTaskComponent>({
        component: CreateGoalTaskComponent,
        data: null,
        ignoreBackdropClick: false,
        width: 50,
      })
      .onClose.subscribe((newTask: string | null) => {
        if (newTask) {
          const taskToAdd: GoalTaskModel = {
            title: newTask,
            complete: false,
            goalId: this.goalObject.id,
          };
          this.addTaskToDB(taskToAdd);
        }
      });
  }

  addTaskToDB(newTask: GoalTaskModel) {
    this.goalManagementApiService
      .addGoalTask(newTask)
      .subscribe((response: any) => {
        console.log(response);
        this.goalObject?.tasks?.push(response);
      });
  }

  deleteTaskFromDB(taskList: Array<GoalTaskModel>, task_id: number) {
    this.goalManagementApiService
      .removeGoalTask(taskList[task_id])
      .subscribe(() => {
        this.goalObject.tasks?.splice(task_id, 1);
      });
  }

  updateTaskOnDB(id: number, taskToUpdate: GoalTaskModel) {
    // Since we have an interceptor, do we really need the error method on the subscribe?
    this.goalManagementApiService.updateGoalTask(taskToUpdate).subscribe(() => {
      if (this.goalObject.tasks) {
        this.goalObject.tasks[id] = taskToUpdate;
      }
      calculateTaskCompletionPercentage(this.goalObject);
    });
  }

  updateDBGoal(goalObject: GoalModel) {
    this.goalManagementApiService
      .updateGoal(goalObject)
      .subscribe((updatedGoal: GoalModel) => {
        goalObject = updatedGoal;
        calculateTaskCompletionPercentage(goalObject);
      });
  }

  onDropTask(event: CdkDragDrop<Array<any> | undefined>): void {
    if (!event?.previousContainer) return;

    if (event?.previousContainer === event?.container) {
      moveItemInArray(
        event.previousContainer.data!,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
