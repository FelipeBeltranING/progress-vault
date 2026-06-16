// src/lib/themes.js

/** @type {Record<string, Record<string, string>>} */
export const THEMES = {
  dark: {
    '--color-bg':            '#0f0f0f',
    '--color-bg-secondary':  '#1a1a1a',
    '--color-bg-hover':      '#222222',
    '--color-surface':       '#141414',

    '--color-border':        '#bdbaba',
    '--color-border-muted':  '#333333',
    '--color-border-accent': '#bdbaba',

    '--color-text':          '#ffffff',
    '--color-text-muted':    '#aaaaaa',
    '--color-text-subtle':   '#666666',

    '--color-accent':        '#1a1a1a',
    '--color-accent-border': '#bdbaba',
    '--color-danger':        '#1a0000',
    '--color-danger-border': '#ff4444',
    '--color-danger-text':   '#ff6666',

    '--color-progress-bg':   '#222222',
    '--color-progress-fill': '#ffffff',

    '--radius-card':  '12px',
    '--radius-btn':   '999px',
    '--radius-input': '8px',
    '--radius-badge': '4px',

    '--border-width': '2px',

    '--font-base': "'Inter', system-ui, sans-serif",
    
    // Eyes theme
    '--eyes-bg': '#ffffff',
    '--eyes-pupil': '#000000',
  },
};

/**
 * Applies a theme by injecting a <style> tag into <head>.
 * If the theme is 'default', clears any overrides and lets
 * app.html's base :root variables take effect.
 * @param {string} themeName
 */
export function applyTheme(themeName) {
  const id = 'pv-theme';
  let styleEl = document.getElementById(id);

  if (themeName === 'default') {
    // Default theme is defined in app.html — just clear any previous overrides.
    if (styleEl) styleEl.textContent = '';
    return;
  }

  const vars = THEMES[themeName];
  if (!vars) return;

  const css = `:root {\n${
    Object.entries(vars).map(([p, v]) => `  ${p}: ${v};`).join('\n')
  }\n}`;

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = id;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}