use serde::{Deserialize, Serialize};

/// The type of goal, defining how progress is tracked.
/// FR-06: user chooses one of these on creation.
#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum GoalType {
    /// FR-06.1: text-only objective with complete/incomplete status.
    Simple,
    /// FR-06.2: numeric counter toward a target value.
    Numeric,
    /// FR-06.3: list of sub-tasks with weighted progress.
    Checklist,
}

/// A sub-task belonging to a Checklist goal.
/// FR-06.3 / FR-06.3.1: supports equal or custom weight distribution.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SubTask {
    pub id: String,
    pub title: String,
    pub completed: bool,
}

/// A single goal tracked by the user.
/// Fields cover FR-01 (creation), FR-06 (type-specific data),
/// FR-08 (numeric tracking), and FR-09/10 (checklist tracking).
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Goal {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    /// ISO 8601 timestamp, set automatically on creation (FR-01).
    pub created_at: String,
    pub goal_type: GoalType,

    // --- Simple goal fields (GoalType::Simple) ---
    /// Whether the simple goal is marked as complete.
    pub completed: Option<bool>,

    // --- Numeric goal fields (GoalType::Numeric) ---
    /// FR-08: target value the user is counting toward.
    pub target: Option<i64>,
    /// FR-08: current progress value.
    pub current: Option<i64>,

    // --- Checklist goal fields (GoalType::Checklist) ---
    /// FR-09/FR-10: sub-tasks with individual weights.
    pub subtasks: Option<Vec<SubTask>>,
}

impl Goal {
    /// Calculates the total completion percentage (0.0 - 100.0)
    /// based on the goal's type.
    pub fn progress_percentage(&self) -> f32 {
        match self.goal_type {
            GoalType::Simple => {
                if self.completed.unwrap_or(false) {
                    100.0
                } else {
                    0.0
                }
            }
            GoalType::Numeric => {
                let target = self.target.unwrap_or(0);
                let current = self.current.unwrap_or(0);
                if target <= 0 {
                    0.0
                } else {
                    ((current as f32 / target as f32) * 100.0).clamp(0.0, 100.0)
                }
            }
            GoalType::Checklist => {
                match &self.subtasks {
                    Some(subtasks) if !subtasks.is_empty() => {
                        let completed = subtasks.iter().filter(|t| t.completed).count();
                        (completed as f32 / subtasks.len() as f32 * 100.0).clamp(0.0, 100.0)
                    }
                    _ => 0.0,
                }
            }
        }
    }
}