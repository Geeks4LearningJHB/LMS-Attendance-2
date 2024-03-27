import { encouragingWords } from "src/app/shared/constants/encouragement";
import { archivedState, backlogState, completedState, pausedState, startedState } from "src/app/shared/constants/goal-states";
import { pauseEncouragement } from "src/app/shared/constants/pauseEncouragement";
import { GoalModel, GoalTaskModel } from "../../models/goal-model";

export const getCompletedTasks = (taskList: Array<GoalTaskModel>): Array<GoalTaskModel> => {
    return taskList?.filter((task: GoalTaskModel) => task.complete === true)
}

export const transferGoal = (fromList: Array<GoalModel>, toList: Array<GoalModel>, transferGoalID: GoalModel): void => {
    // Get backlog index
    const index = fromList.findIndex((goalToTransferObject: GoalModel) => goalToTransferObject.id === transferGoalID.id);

    // Add goal in the started list
    toList.push(fromList[index])

    // Remove the goal from the previous backlog list
    fromList.splice(index, 1);
}

export const getRandomCustomSuccessMessage = (): string => {
    return encouragingWords[Math.floor(Math.random() * encouragingWords.length)];
}

export const getRandomCustomPauseMessage = (): string => {
    return pauseEncouragement[Math.floor(Math.random() * pauseEncouragement.length)];
}

export const getPresentTenseFromGoalState = (state: any): string => {
    switch (state) {
        case startedState:
            return "start";
        case pausedState:
            return "pause";
        case completedState:
            return "complete";
        case archivedState:
            return "archive";
    }
    return backlogState;
}

export const getPastTenseFromGoalState = (state: any): string => {
    if (state === backlogState) return "backlogged";
    return state;
}