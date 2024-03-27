import { Injectable } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, Subscription } from 'rxjs';
import { CommentComponent } from '../../modals/comment/comment.component';
import {
  GoalCommentModel,
  GoalModel,
  goalStatus,
} from '../../models/goal-model';
import { GoalManagementApiService } from '../api/goal-management-api.service';
import { GoalModalHandlerService } from '../modals/goal-modal-handler.service';

@Injectable({
  providedIn: 'root',
})
export class GoalCommentService {
  commentModalReference!: MdbModalRef<CommentComponent>;
  commentSubject!: Subject<string | null>;

  constructor(
    private mdbModalService: GoalModalHandlerService<any>,
    private goalService: GoalManagementApiService
  ) {
    this.commentSubject = new Subject<string | null>();
  }

  onCapturedUserComment(commentType: goalStatus): Subject<string | null> {
    this.commentModalReference =
      this.mdbModalService.openMdbModal<CommentComponent>({
        component: CommentComponent,
        data: { commentType: commentType },
        ignoreBackdropClick: true,
        width: 50,
      });

    // Because of the [async] nature of Subject, the return value will be executed first!
    return this.commentSubject;
  }

  getUserGoalCommentActionByGoalStatus(
    goalState: goalStatus,
    goalObject: GoalModel,
    callback: Function
  ) {
    const onCommentResponse: Subscription = this.onCapturedUserComment(
      goalState
    ).subscribe((userComment: string | null) => {
      //TODO check this function and add it where it has to
      if (goalObject.id) {
        this.saveCommentToDB(goalObject.id, goalState, userComment!);
      }
      onCommentResponse.unsubscribe();
      callback(userComment, goalObject);
    });
  }

  emitUserCommentResponseAction(action: string | null) {
    // Emit user-action
    this.commentSubject.next(action);
  }

  onCloseUserCommentModal(userResponse: string | null) {
    this.emitUserCommentResponseAction(userResponse);
    this.closeCommentModal();
  }

  closeCommentModal(): void {
    this.commentModalReference?.close();
  }

  saveCommentToDB(goalId: string, goalStatus: goalStatus, comment: string) {
    const commentModel: GoalCommentModel = {
      goalId: goalId,
      comment: comment,
      commentType: goalStatus === 'archived' ? goalStatus : 'paused',
    };
    this.goalService.addGoalComment(commentModel).subscribe();
  }
}
