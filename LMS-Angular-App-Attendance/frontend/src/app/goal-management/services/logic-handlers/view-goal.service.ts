import { Injectable } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ViewSelectedGoalComponent } from '../../modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel } from '../../models/goal-model';
import { GoalModalHandlerService } from '../modals/goal-modal-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ViewGoalService {
  viewSelectedGoalModalRef!: MdbModalRef<ViewSelectedGoalComponent>

  constructor(
    private mdbModalService: GoalModalHandlerService<any>
  ) { }

  viewSelectedGoal(goal: GoalModel, ignoreBackdropClick: boolean = false): void {
    this.viewSelectedGoalModalRef = this.mdbModalService.openMdbModal<ViewSelectedGoalComponent>({
      component: ViewSelectedGoalComponent,
      data: {
        goalObject: goal,
        allowModalClosure: !ignoreBackdropClick
      },
      ignoreBackdropClick: ignoreBackdropClick,
      width: 50
    })
  }

  getViewedGoalModalReference(): MdbModalRef<ViewSelectedGoalComponent> {
    return this.viewSelectedGoalModalRef;
  }

  closeViewedGoal() {
    this.getViewedGoalModalReference()?.close()
  }
}
