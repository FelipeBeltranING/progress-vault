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
 * FR-07: Add a new sub-task to an existing checklist goal.
 * @param {string} goalId
 * @param {string} title
 * @returns {Promise<Object>}
 */
export async function addSubtask(goalId, title) {
  return invoke('add_subtask', { goalId, title });
}

/**
 * FR-08: Remove a sub-task from an existing checklist goal.
 * @param {string} goalId
 * @param {string} subtaskId
 * @returns {Promise<Object>}
 */
export async function removeSubtask(goalId, subtaskId) {
  return invoke('remove_subtask', { goalId, subtaskId });
}

/**
 * FR-06.2: Increment a Numeric goal's current progress by 1.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function incrementGoalProgress(id) {
  return invoke('increment_goal_progress', { id });
}

/**
 * FR-06.3.1: Toggle a sub-task's completed status within a Checklist goal.
 * @param {string} goalId
 * @param {string} subtaskId
 * @returns {Promise<Object>}
 */
export async function toggleSubtask(goalId, subtaskId) {
  return invoke('toggle_subtask', { goalId, subtaskId });
}

/**
 * FR-12: Toggle completion status of a Simple goal.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function toggleGoalCompletion(id) {
  return invoke('toggle_goal_completion', { id });
}

/**
 * FR-10/FR-11: Get the current user config (theme, etc.).
 * @returns {Promise<{ theme: string }>}
 */
export async function getConfig() {
  return invoke('get_config');
}

/**
 * FR-11: Save the user config with the selected theme.
 * @param {string} theme
 * @returns {Promise<{ theme: string }>}
 */
export async function setConfig(theme) {
  return invoke('set_config', { theme });
}
