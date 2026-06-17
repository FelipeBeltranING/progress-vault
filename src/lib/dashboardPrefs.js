// src/lib/dashboardPrefs.js
// Dashboard display preferences: sort and filter state.
// Kept separate from config.js (which handles persisted user settings)
// because these are session-only — they reset on every launch intentionally.

/**
 * @typedef {'date_desc' | 'date_asc' | 'type'} SortOption
 * @typedef {'all' | 'completed' | 'pending'} StatusFilter
 * @typedef {'all' | 'simple' | 'numeric' | 'checklist'} TypeFilter
 */

/** @type {SortOption[]} */
export const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Newest first' },
  { value: 'date_asc',  label: 'Oldest first' },
  { value: 'type',      label: 'By type'       },
];

/** @type {{ value: StatusFilter, label: string }[]} */
export const STATUS_FILTERS = [
  { value: 'all',       label: 'All'       },
  { value: 'pending',   label: 'Pending'   },
  { value: 'completed', label: 'Completed' },
];

/** @type {{ value: TypeFilter, label: string }[]} */
export const TYPE_FILTERS = [
  { value: 'all',       label: 'All'       },
  { value: 'simple',    label: 'Simple'    },
  { value: 'numeric',   label: 'Numeric'   },
  { value: 'checklist', label: 'Checklist' },
];

/** Type order used when sorting by type. */
const TYPE_ORDER = { simple: 0, numeric: 1, checklist: 2 };

/**
 * Returns true if a goal is considered "completed" regardless of type.
 * @param {any} goal
 * @returns {boolean}
 */
function isCompleted(goal) {
  if (goal.goal_type === 'simple')    return goal.completed === true;
  if (goal.goal_type === 'numeric')   return goal.current >= goal.target;
  if (goal.goal_type === 'checklist') {
    return goal.subtasks?.length > 0 && goal.subtasks.every((t) => t.completed);
  }
  return false;
}

/**
 * Applies sort and filter to a goals array.
 * Returns a new array — does not mutate the original.
 *
 * @param {any[]} goals
 * @param {SortOption} sort
 * @param {StatusFilter} statusFilter
 * @param {TypeFilter} typeFilter
 * @returns {any[]}
 */
export function applyPrefs(goals, sort, statusFilter, typeFilter) {
  let result = [...goals];

  // --- Filter by status ---
  if (statusFilter === 'completed') {
    result = result.filter(isCompleted);
  } else if (statusFilter === 'pending') {
    result = result.filter((g) => !isCompleted(g));
  }

  // --- Filter by type ---
  if (typeFilter !== 'all') {
    result = result.filter((g) => g.goal_type === typeFilter);
  }

  // --- Sort ---
result.sort((a, b) => {
  // Completed goals always sink to the bottom, regardless of active sort
  const aCompleted = isCompleted(a) ? 1 : 0;
  const bCompleted = isCompleted(b) ? 1 : 0;
  if (aCompleted !== bCompleted) return aCompleted - bCompleted;

  if (sort === 'date_asc')  return new Date(a.created_at) - new Date(b.created_at);
  if (sort === 'date_desc') return new Date(b.created_at) - new Date(a.created_at);
  if (sort === 'type')      return (TYPE_ORDER[a.goal_type] ?? 99) - (TYPE_ORDER[b.goal_type] ?? 99);
  return 0;
});

  return result;
}

