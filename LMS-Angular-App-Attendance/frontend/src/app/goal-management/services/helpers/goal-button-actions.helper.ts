import * as lodash from "lodash-es";
import { GoalModel, GoalTaskModel, goalStatus } from "../../models/goal-model";
let goalProgress: number = 0

export function calculateTaskCompletionPercentage(goalObject: GoalModel): void {
    if (goalObject?.tasks && goalObject?.tasks?.length > 0) {
        const completedTasks = goalObject?.tasks?.filter(
            (task) => task.complete
        );
        goalProgress = completedTasks.length / goalObject?.tasks?.length;
    } else goalProgress = 0;
}

export function getGoalProgress(): number {
    return goalProgress;
}

export function resetGoalMetadata(goalObject: GoalModel): void {
    // Changing the goal metadata
    goalObject.pausedCount = 0;
    goalObject.timeRemaining = goalObject.duration;
    goalObject?.tasks?.forEach((element: GoalTaskModel) => {
        element.complete = false;
    });
}

export function incrementArchiveCount(goalObject: GoalModel): void {
    goalObject.archiveCount += 1;
}

export function incrementPausedCount(goalObject: GoalModel): void {
    goalObject.pausedCount += 1;
}

export function changeGoalState(goalObject: GoalModel, newState: goalStatus): void {
    goalObject.goalStatus = newState;
}

export function createGoalObjectDeepCopy(goalObject: GoalModel): GoalModel {
    return lodash.cloneDeep(goalObject);
}

