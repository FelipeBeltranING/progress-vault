use crate::models::config::Config;
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

const CONFIG_FILE: &str = "config.json";

/// Returns the full path to config.json inside the app's data directory.
/// Creates the directory if it doesn't exist yet.
fn config_file_path(app: &AppHandle) -> Result<PathBuf, String> {
    let app_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Could not resolve app data dir: {e}"))?;

    if !app_dir.exists() {
        fs::create_dir_all(&app_dir)
            .map_err(|e| format!("Could not create app data dir: {e}"))?;
    }

    Ok(app_dir.join(CONFIG_FILE))
}

/// Loads config from config.json.
/// If the file doesn't exist yet, returns the default config (NFR-11:
/// backward compatibility — existing installs without config.json work fine).
pub fn load_config(app: &AppHandle) -> Result<Config, String> {
    let path = config_file_path(app)?;

    if !path.exists() {
        return Ok(Config::default());
    }

    let content = fs::read_to_string(&path)
        .map_err(|e| format!("Could not read {CONFIG_FILE}: {e}"))?;

    if content.trim().is_empty() {
        return Ok(Config::default());
    }

    serde_json::from_str::<Config>(&content)
        .map_err(|e| format!("Could not parse {CONFIG_FILE}: {e}"))
}

/// Saves config to config.json in pretty-printed format.
pub fn save_config(app: &AppHandle, config: &Config) -> Result<(), String> {
    let path = config_file_path(app)?;

    let content = serde_json::to_string_pretty(config)
        .map_err(|e| format!("Could not serialize config: {e}"))?;

    fs::write(&path, content)
        .map_err(|e| format!("Could not write {CONFIG_FILE}: {e}"))
}
