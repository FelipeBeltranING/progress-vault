// src/lib/themes.js

/** @type {Record<string, Record<string, string>>} */
export const THEMES = {
  dark: {
    '--color-bg':            '#0f0f0f',
    '--color-bg-secondary':  '#1a1a1a',
    '--color-bg-hover':      '#222222',
    '--color-surface':       '#141414',

    '--color-border':        '#ffffff',
    '--color-border-muted':  '#333333',
    '--color-border-accent': '#ffffff',

    '--color-text':          '#ffffff',
    '--color-text-muted':    '#aaaaaa',
    '--color-text-subtle':   '#666666',

    '--color-accent':        '#1a1a1a',
    '--color-accent-border': '#ffffff',
    '--color-danger':        '#1a0000',
    '--color-danger-border': '#ff4444',
    '--color-danger-text':   '#ff6666',

    '--color-progress-bg':   '#222222',
    '--color-progress-fill': '#4caf50',

    '--color-success':        '#1a3d20',
    '--color-success-hover':  '#2f7140',
    '--color-success-border': '#4caf50',

    '--radius-card':  '12px',
    '--radius-btn':   '999px',
    '--radius-input': '8px',
    '--radius-badge': '4px',

    '--border-width': '2px',

    '--font-base': "'Inter', system-ui, sans-serif",
  },
  rosewood: {
  '--color-bg':            '#fff0f3',
  '--color-bg-secondary':  '#fde0e6',
  '--color-bg-hover':      '#fad0da',
  '--color-surface':       '#fff5f7',

  '--color-border':        '#c4687a',
  '--color-border-muted':  '#f0b8c4',
  '--color-border-accent': '#c4687a',

  '--color-text':          '#2d1018',
  '--color-text-muted':    '#7a3a48',
  '--color-text-subtle':   '#b07080',

  '--color-accent':        '#fde0e6',
  '--color-accent-border': '#c4687a',
  '--color-danger':        '#ffd0d0',
  '--color-danger-border': '#cc2244',
  '--color-danger-text':   '#aa1133',

  '--color-progress-bg':   '#f0c0cc',
  '--color-progress-fill': '#c4687a',

  '--color-success':        '#f0b0c0',
  '--color-success-hover':  '#e898ac',
  '--color-success-border': '#a04060',

  '--radius-card':  '12px',
  '--radius-btn':   '999px',
  '--radius-input': '8px',
  '--radius-badge': '4px',

  '--border-width': '2px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg': '#e4e4e4',
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