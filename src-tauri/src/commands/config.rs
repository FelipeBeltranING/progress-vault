use crate::models::config::Config;
use crate::storage::config_store::{load_config, save_config};
use tauri::AppHandle;

/// FR-10/FR-11: returns the current user config (theme, etc.).
/// Called on app startup so the frontend can apply the saved theme immediately.
#[tauri::command]
pub fn get_config(app: AppHandle) -> Result<Config, String> {
    load_config(&app)
}

/// FR-11: saves the user config.
/// Validates that the theme name is one of the known bundled themes.
#[tauri::command]
pub fn set_config(app: AppHandle, theme: String) -> Result<Config, String> {
    const VALID_THEMES: &[&str] = &["default", "dark"];

    if !VALID_THEMES.contains(&theme.as_str()) {
        return Err(format!(
            "Unknown theme '{}'. Valid themes: {}",
            theme,
            VALID_THEMES.join(", ")
        ));
    }

    let config = Config { theme };
    save_config(&app, &config)?;
    Ok(config)
}
