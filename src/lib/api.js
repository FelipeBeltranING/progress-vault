import { invoke } from '@tauri-apps/api/core';

/**
 * FR-02: Get all goals for the dashboard.
 * @returns {Promise<Array>}
 */
export async function getGoals() {
  return invoke('get_goals');
}

/**
 * FR-03: Get a single goal by id.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getGoal(id) {
  return invoke('get_goal', { id });
}

/**
 * FR-01 + FR-06: Create a new goal.
 * @param {Object} params
 * @param {string} params.name
 * @param {string|null} [params.description]
 * @param {'simple'|'numeric'|'checklist'} params.goalType
 * @param {number} [params.target] - required for 'numeric'
 * @param {string[]} [params.subtaskTitles] - optional for 'checklist'
 * @returns {Promise<Object>}
 */
export async function createGoal({ name, description, goalType, target, subtaskTitles }) {
  return invoke('create_goal', {
    name,
    description: description ?? null,
    goalType,
    target: target ?? null,
    subtaskTitles: subtaskTitles ?? null,
  });
}

/**
 * FR-04: Edit a goal's name and description.
 * @param {string} id
 * @param {string} name
 * @param {string|null} [description]
 * @returns {Promise<Object>}
 */
export async function updateGoal(id, name, description) {
  return invoke('update_goal', { id, name, description: description ?? null });
}

/**
 * FR-05: Delete a goal by id.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteGoal(id) {
  return invoke('delete_goal', { id });
}

/**
 * FR-08: Increment a Numeric goal's current progress by 1.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function incrementGoalProgress(id) {
  return invoke('increment_goal_progress', { id });
}

/**
 * FR-09: Toggle a sub-task's completed status within a Checklist goal.
 * @param {string} goalId
 * @param {string} subtaskId
 * @returns {Promise<Object>}
 */
export async function toggleSubtask(goalId, subtaskId) {
  return invoke('toggle_subtask', { goalId, subtaskId });
}