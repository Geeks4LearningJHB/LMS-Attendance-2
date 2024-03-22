import { goalStatus } from "src/app/goal-management/models/goal-model";

const backlogState: goalStatus = 'backlog';
const startedState: goalStatus = 'started';
const pausedState: goalStatus = 'paused';
const completedState: goalStatus = 'completed';
const archivedState: goalStatus = 'archived';

export { backlogState, startedState, pausedState, completedState, archivedState }
