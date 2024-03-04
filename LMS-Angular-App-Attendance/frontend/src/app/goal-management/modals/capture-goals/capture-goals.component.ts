import { Component } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import * as lodash from 'lodash-es';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { maxToastrTimeout, minGoalDuration } from 'src/app/shared/constants/goal-boundaries';
import { ToastrMessagesService } from 'src/app/shared/global/toastr-messages.service';
import { GoalCommentModel, GoalModel, GoalTaskModel } from '../../models/goal-model'
import { GoalModalHandlerService } from '../../services/modals/goal-modal-handler.service';
import { CreateGoalTaskComponent } from '../create-goal-task/create-goal-task.component';
import { GoalManagementApiService } from '../../services/api/goal-management-api.service';
import { backlogState } from 'src/app/shared/constants/goal-states';

@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',
  styleUrls: ['./capture-goals.component.css'],
})
export class CaptureGoalsComponent {
  attendanceId: any;
  minimumGoalDuration: number = minGoalDuration;

  formModel: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl('', [Validators.required]),
    duration: new UntypedFormControl(`00:${this.minimumGoalDuration}`, [Validators.required]),
    description: new UntypedFormControl(''),
  });

  goalObject: GoalModel = {
    title: String(),
    description: String(),
    duration: String('00:00:00'),
    pausedCount: 0,
    archiveCount: 0,
    goalStatus: backlogState,
    timeRemaining: String('00:00:00'),
    comments: new Array<GoalCommentModel>(),
    tasks: new Array<GoalTaskModel>(),
    userId: String(),
  };

  constructor(
    private captureGoalModalReference: MdbModalRef<CaptureGoalsComponent>,
    private goalManagementApiService: GoalManagementApiService,
    private toastrMessageService: ToastrMessagesService,
    private mdbModalService: GoalModalHandlerService<any>
  ) { }

  getFormControl(name: string): AbstractControl {
    return this.formModel.controls[name];
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  setGoalValues(title: string, duration: string, description: string): void {
    this.goalObject.title = title;
    this.goalObject.duration = duration.concat(':00');
    this.goalObject.description = description;
    this.goalObject.timeRemaining = duration.concat(':00');
  }

  closeCaptureGoalModal() { this.captureGoalModalReference.close(); }

  addGoalTask(): void {
    this.mdbModalService.openMdbModal<CreateGoalTaskComponent>({
      component: CreateGoalTaskComponent,
      data: null,
      ignoreBackdropClick: false,
      width: 50,
    }).onClose.subscribe((newTask: string | null) => {
      if (newTask) {
        this.goalObject.tasks = [...this.goalObject.tasks!, {
          title: newTask,
          complete: false,
          goalId: this.goalObject.id
        }]
      }
    });
  }

  addNewGoal() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) return;

    // Extracting duration timeparts (hours & minutes)
    const [hours, minutes] = this.getFormControl('duration').value.split(':');

    // Business rule [Goals must have a minumum duration of 25 minutes]
    if (lodash.toNumber(hours) === 0 && lodash.toNumber(minutes) < minGoalDuration) {
      this.toastrMessageService.showErrorMessage(
        'Create New Goal',
        `Cannot set a goal with a duration less than ${minGoalDuration} minutes`,
        maxToastrTimeout
      );
      return;
    }

    this.setGoalValues(
      this.getFormControl('title').value,
      this.getFormControl('duration').value,
      this.getFormControl('description').value
    );

    this.goalManagementApiService.insertNewGoal(this.goalObject);
    this.closeCaptureGoalModal();
  }
}
