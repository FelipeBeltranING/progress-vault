use serde::{Deserialize, Serialize};

/// User preferences persisted in config.json.
/// FR-11: theme selection saved locally and auto-applied on launch.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Config {
    /// The active theme name. Must match a bundled CSS file in src/themes/.
    /// e.g. "default" | "dark"
    pub theme: String,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            theme: "default".to_string(),
        }
    }
}
