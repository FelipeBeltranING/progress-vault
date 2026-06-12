use crate::models::goal::{Goal, GoalType, SubTask};
use crate::storage::json_store::{load_goals, save_goals};
use chrono::Utc;
use tauri::AppHandle;
use uuid::Uuid;

/// FR-01 + FR-06: creates a new goal of the given type.
///
/// - `name`: required
/// - `description`: optional
/// - `goal_type`: "simple" | "numeric" | "checklist"
/// - `target`: required if goal_type is "numeric" (FR-06.2)
/// - `subtask_titles`: optional list of sub-task names if goal_type is
///   "checklist" (FR-06.3). Weights are distributed equally by default.
#[tauri::command]
pub fn create_goal(
    app: AppHandle,
    name: String,
    description: Option<String>,
    goal_type: GoalType,
    target: Option<i64>,
    subtask_titles: Option<Vec<String>>,
) -> Result<Goal, String> {
    if name.trim().is_empty() {
        return Err("Goal name cannot be empty".into());
    }

    let mut goals = load_goals(&app)?;

    let new_goal = match goal_type {
        GoalType::Simple => Goal {
            id: Uuid::new_v4().to_string(),
            name,
            description,
            created_at: Utc::now().to_rfc3339(),
            goal_type: GoalType::Simple,
            completed: Some(false),
            target: None,
            current: None,
            subtasks: None,
        },
        GoalType::Numeric => {
            let target = target.ok_or("Numeric goals require a target value")?;
            if target <= 0 {
                return Err("Target must be greater than zero".into());
            }
            Goal {
                id: Uuid::new_v4().to_string(),
                name,
                description,
                created_at: Utc::now().to_rfc3339(),
                goal_type: GoalType::Numeric,
                completed: None,
                target: Some(target),
                current: Some(0),
                subtasks: None,
            }
        }
        GoalType::Checklist => {
            let titles = subtask_titles.unwrap_or_default();
            let count = titles.len();
            // FR-06.3: equal distribution by default.
            let weight = if count > 0 { 100.0 / count as f32 } else { 0.0 };

            let subtasks = titles
                .into_iter()
                .map(|title| SubTask {
                    id: Uuid::new_v4().to_string(),
                    title,
                    completed: false,
                    weight,
                })
                .collect();

            Goal {
                id: Uuid::new_v4().to_string(),
                name,
                description,
                created_at: Utc::now().to_rfc3339(),
                goal_type: GoalType::Checklist,
                completed: None,
                target: None,
                current: None,
                subtasks: Some(subtasks),
            }
        }
    };

    goals.push(new_goal.clone());
    save_goals(&app, &goals)?;

    Ok(new_goal)
}

/// FR-02: returns all goals for the dashboard.
#[tauri::command]
pub fn get_goals(app: AppHandle) -> Result<Vec<Goal>, String> {
    load_goals(&app)
}

/// FR-03: returns a single goal by id for detailed inspection.
#[tauri::command]
pub fn get_goal(app: AppHandle, id: String) -> Result<Goal, String> {
    let goals = load_goals(&app)?;
    goals
        .into_iter()
        .find(|g| g.id == id)
        .ok_or_else(|| format!("Goal with id {id} not found"))
}

/// FR-04: edits the name and/or description of an existing goal.
#[tauri::command]
pub fn update_goal(
    app: AppHandle,
    id: String,
    name: String,
    description: Option<String>,
) -> Result<Goal, String> {
    if name.trim().is_empty() {
        return Err("Goal name cannot be empty".into());
    }

    let mut goals = load_goals(&app)?;

    let goal = goals
        .iter_mut()
        .find(|g| g.id == id)
        .ok_or_else(|| format!("Goal with id {id} not found"))?;

    goal.name = name;
    goal.description = description;

    let updated = goal.clone();
    save_goals(&app, &goals)?;

    Ok(updated)
}

/// FR-05: deletes a goal by id. The confirmation step (FR-05) happens
/// in the UI; this command performs the actual deletion.
#[tauri::command]
pub fn delete_goal(app: AppHandle, id: String) -> Result<(), String> {
    let mut goals = load_goals(&app)?;

    let original_len = goals.len();
    goals.retain(|g| g.id != id);

    if goals.len() == original_len {
        return Err(format!("Goal with id {id} not found"));
    }

    save_goals(&app, &goals)
}

/// FR-08: increments the current progress of a Numeric goal by 1,
/// capped at the target value.
#[tauri::command]
pub fn increment_goal_progress(app: AppHandle, id: String) -> Result<Goal, String> {
    let mut goals = load_goals(&app)?;

    let goal = goals
        .iter_mut()
        .find(|g| g.id == id)
        .ok_or_else(|| format!("Goal with id {id} not found"))?;

    if goal.goal_type != GoalType::Numeric {
        return Err("Only Numeric goals support incrementing progress".into());
    }

    let target = goal.target.unwrap_or(0);
    let current = goal.current.unwrap_or(0);

    goal.current = Some((current + 1).min(target));

    let updated = goal.clone();
    save_goals(&app, &goals)?;

    Ok(updated)
}

/// FR-09: toggles the completed status of a sub-task within a Checklist goal.
#[tauri::command]
pub fn toggle_subtask(app: AppHandle, goal_id: String, subtask_id: String) -> Result<Goal, String> {
    let mut goals = load_goals(&app)?;

    let goal = goals
        .iter_mut()
        .find(|g| g.id == goal_id)
        .ok_or_else(|| format!("Goal with id {goal_id} not found"))?;

    if goal.goal_type != GoalType::Checklist {
        return Err("Only Checklist goals support toggling sub-tasks".into());
    }

    let subtasks = goal
        .subtasks
        .as_mut()
        .ok_or("Checklist goal has no sub-tasks")?;

    let subtask = subtasks
        .iter_mut()
        .find(|t| t.id == subtask_id)
        .ok_or_else(|| format!("Sub-task with id {subtask_id} not found"))?;

    subtask.completed = !subtask.completed;

    let updated = goal.clone();
    save_goals(&app, &goals)?;

    Ok(updated)
}