mod commands;
mod models;
mod storage;

use commands::config::{get_config, set_config};
use commands::goals::{
    add_subtask, create_goal, delete_goal, get_goal, get_goals, increment_goal_progress,
    remove_subtask, toggle_goal_completion, toggle_subtask, update_goal,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            // Config (FR-10, FR-11)
            get_config,
            set_config,
            // Goals
            create_goal,
            get_goals,
            get_goal,
            update_goal,
            delete_goal,
            increment_goal_progress,
            toggle_subtask,
            add_subtask,
            remove_subtask,
            toggle_goal_completion,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
