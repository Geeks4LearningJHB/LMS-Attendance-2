import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-create-goal-task',
  templateUrl: './create-goal-task.component.html',
  styleUrls: ['./create-goal-task.component.css']
})
export class CreateGoalTaskComponent implements OnInit {
  taskFormGroup: UntypedFormGroup = new UntypedFormGroup({
    Task: new UntypedFormControl(null, [Validators.required])
  })

  constructor(private taskModalRef: MdbModalRef<CreateGoalTaskComponent>) { }

  ngOnInit(): void {}

  getFormControl(name: string): AbstractControl {
    return this.taskFormGroup.controls[name];
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  addNewTask(): void {
    this.taskFormGroup.markAllAsTouched();
    if(this.taskFormGroup.invalid) return;

    this.closeAddTaskModal(this.getFormControl('Task').value);
  }

  closeAddTaskModal(task?: string): void {
    this.taskModalRef.close(task)
  }
}
