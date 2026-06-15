// src/lib/themes.js

/** @type {Record<string, Record<string, string>>} */
export const THEMES = {
  dark: {
    '--color-bg':            '#1a1a1a',
    '--color-bg-secondary':  '#2a2a2a',
    '--color-bg-hover':      '#333333',
    '--color-surface':       '#242424',
    '--color-border':        '#444444',
    '--color-border-accent': '#4a9e4a',

    '--color-text':          '#eeeeee',
    '--color-text-muted':    '#aaaaaa',
    '--color-text-subtle':   '#777777',

    '--color-accent':        '#2d5a2d',
    '--color-accent-border': '#4a9e4a',
    '--color-danger':        '#5a2d2d',
    '--color-danger-border': '#9e4a4a',
    '--color-danger-text':   '#f28b82',

    '--color-progress-bg':   '#333333',
    '--color-progress-fill': '#4a9e4a',

    '--radius-card':  '12px',
    '--radius-btn':   '8px',
    '--radius-input': '6px',
    '--radius-badge': '4px',
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