import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ViewSelectedGoalComponent } from "../../modals/views/view-selected-goal/view-selected-goal.component";
import { goalButtonAction, GoalModel } from "../../models/goal-model";

export interface ButtonActionParameters {
    actionType: goalButtonAction,
    goalObject: GoalModel,
    modalReference: MdbModalRef<ViewSelectedGoalComponent>
}