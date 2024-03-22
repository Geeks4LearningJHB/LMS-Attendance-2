import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GoalModel } from '../../models/goal-model';

@Component({
  selector: 'app-add-extra-goal-time',
  templateUrl: './add-extra-goal-time.component.html',
  styleUrls: ['./add-extra-goal-time.component.css']
})
export class AddExtraGoalTimeComponent implements OnInit {
  extraTimeFormGroup: UntypedFormGroup = new UntypedFormGroup({
    Time: new UntypedFormControl(null, [Validators.required])
  })

  constructor(
    private extraTimeModalReference: MdbModalRef<AddExtraGoalTimeComponent>
  ) { }

  ngOnInit(): void {}

  getFormControl(name: string): AbstractControl {
    return this.extraTimeFormGroup.controls[name];
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  addExtraTime() {
    this.extraTimeFormGroup.markAllAsTouched();

    if (this.extraTimeFormGroup.invalid) return;

    this.extraTimeModalReference
      .close(this.getFormControl("Time").value)
  }

  closeModal() {
    this.extraTimeModalReference
      .close(null)
  }
}
