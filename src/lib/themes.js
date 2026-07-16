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

  '--eyes-bg': '#ffffff',
  '--eyes-pupil': '#000000',
  }, 
  'deep-ocean': {
  '--color-bg':            '#0b1220',
  '--color-bg-secondary':  '#111a2e',
  '--color-bg-hover':      '#17233d',
  '--color-surface':       '#0f1728',

  '--color-border':        '#2b4c7e',
  '--color-border-muted':  '#1c2f52',
  '--color-border-accent': '#6d9dff',

  '--color-text':          '#f3f7ff',
  '--color-text-muted':    '#a8bad9',
  '--color-text-subtle':   '#6f82a5',

  '--color-accent':        '#16284a',
  '--color-accent-border': '#426ed4',

  '--color-danger':        '#2b1417',
  '--color-danger-border': '#b94a48',
  '--color-danger-text':   '#e97b7b',

  '--color-progress-bg':   '#1b2945',
  '--color-progress-fill': '#4676c3',

  '--color-success':        '#1e3e64',
  '--color-success-hover':  '#2f568c',
  '--color-success-border': '#4676c3',

  '--radius-card':  '14px',
  '--radius-btn':   '999px',
  '--radius-input': '10px',
  '--radius-badge': '6px',

  '--border-width': '1px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg':    '#ffffff',
  '--eyes-pupil': '#000f2a',
},
paper: {
  '--color-bg':            '#f7f3eb',
  '--color-bg-secondary':  '#efe7da',
  '--color-bg-hover':      '#e7dccb',
  '--color-surface':       '#fcfaf5',

  '--color-border':        '#c9b79d',
  '--color-border-muted':  '#d9ccb9',
  '--color-border-accent': '#a8845c',

  '--color-text':          '#3b342d',
  '--color-text-muted':    '#6d645a',
  '--color-text-subtle':   '#9d9285',

  '--color-accent':        '#ede1cf',
  '--color-accent-border': '#b38b63',

  '--color-danger':        '#f5e3df',
  '--color-danger-border': '#c66d67',
  '--color-danger-text':   '#9c3e3e',

  '--color-progress-bg':   '#e5d8c4',
  '--color-progress-fill': '#a8845c',

  '--color-success':        '#e7b97a',
  '--color-success-hover':  '#ffcd88',
  '--color-success-border': '#a8845c',

  '--radius-card':  '14px',
  '--radius-btn':   '999px',
  '--radius-input': '10px',
  '--radius-badge': '6px',

  '--border-width': '1px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg':    '#ffffff',
  '--eyes-pupil': '#4a3f34',
},
forest: {
  '--color-bg':            '#273629',
  '--color-bg-secondary':  '#324236',
  '--color-bg-hover':      '#3c4f41',
  '--color-surface':       '#2d3d31',

  '--color-border':        '#6e9072',
  '--color-border-muted':  '#557159',
  '--color-border-accent': '#97c28a',

  '--color-text':          '#f5f9f3',
  '--color-text-muted':    '#c4d4c0',
  '--color-text-subtle':   '#90a58b',

  '--color-accent':        '#415845',
  '--color-accent-border': '#81ad74',

  '--color-danger':        '#432927',
  '--color-danger-border': '#c97267',
  '--color-danger-text':   '#efb1a8',

  '--color-progress-bg':   '#415845',
  '--color-progress-fill': '#97c28a',

  '--color-success':        '#415845',
  '--color-success-hover':  '#4d6852',
  '--color-success-border': '#81ad74',

  '--radius-card':  '14px',
  '--radius-btn':   '999px',
  '--radius-input': '10px',
  '--radius-badge': '6px',

  '--border-width': '1px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg':    '#ffffff',
  '--eyes-pupil': '#1f2c22',
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