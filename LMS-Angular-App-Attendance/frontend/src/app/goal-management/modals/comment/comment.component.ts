import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { goalStatus } from '../../models/goal-model';
import { GoalCommentService } from '../../services/logic-handlers/goal-comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentType!: goalStatus;

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    comment: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(private goalCommentService: GoalCommentService) {}

  ngOnInit(): void {}

  getFormControl(name: string): AbstractControl {
    return this.formGroup.controls[name];
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  saveUserComment(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }
    this.closeCommentDialog(this.getFormControl('comment').value);
  }

  closeCommentDialog(userResponse: string | null = null) {
    this.goalCommentService.onCloseUserCommentModal(userResponse);
  }
}
