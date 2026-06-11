mod commands;
mod models;
mod storage;

use commands::goals::{create_goal, delete_goal, get_goal, get_goals, update_goal};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            create_goal,
            get_goals,
            get_goal,
            update_goal,
            delete_goal,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}