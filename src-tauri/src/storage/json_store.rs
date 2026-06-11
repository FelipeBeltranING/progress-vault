use crate::models::goal::Goal;
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

const DATA_FILE: &str = "data.json";

/// Returns the full path to data.json inside the app's data directory.
/// Creates the directory if it doesn't exist yet.
fn data_file_path(app: &AppHandle) -> Result<PathBuf, String> {
    let app_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Could not resolve app data dir: {e}"))?;

    if !app_dir.exists() {
        fs::create_dir_all(&app_dir)
            .map_err(|e| format!("Could not create app data dir: {e}"))?;
    }

    Ok(app_dir.join(DATA_FILE))
}

/// Loads all goals from data.json.
/// If the file doesn't exist yet, returns an empty list (NFR-02 friendly:
/// no crash on first run).
pub fn load_goals(app: &AppHandle) -> Result<Vec<Goal>, String> {
    let path = data_file_path(app)?;

    if !path.exists() {
        return Ok(Vec::new());
    }

    let content = fs::read_to_string(&path)
        .map_err(|e| format!("Could not read {DATA_FILE}: {e}"))?;

    if content.trim().is_empty() {
        return Ok(Vec::new());
    }

    serde_json::from_str::<Vec<Goal>>(&content)
        .map_err(|e| format!("Could not parse {DATA_FILE}: {e}"))
}

/// Saves the full list of goals to data.json in pretty-printed format
/// (NFR-02: human-readable, manually editable).
pub fn save_goals(app: &AppHandle, goals: &[Goal]) -> Result<(), String> {
    let path = data_file_path(app)?;

    let content = serde_json::to_string_pretty(goals)
        .map_err(|e| format!("Could not serialize goals: {e}"))?;

    fs::write(&path, content)
        .map_err(|e| format!("Could not write {DATA_FILE}: {e}"))
}