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

    '--eyes-bg': '#ffffff',
'--eyes-pupil': '#0f0f0f',
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
  '--color-bg':            '#f7efde',
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
sunset: {
  '--color-bg':            '#2a1f22',
  '--color-bg-secondary':  '#37282d',
  '--color-bg-hover':      '#443238',
  '--color-surface':       '#312428',

  '--color-border':        '#a36d56',
  '--color-border-muted':  '#6d4b3d',
  '--color-border-accent': '#d28b62',

  '--color-text':          '#fff5ef',
  '--color-text-muted':    '#d9c2b5',
  '--color-text-subtle':   '#a38b81',

  '--color-accent':        '#51353a',
  '--color-accent-border': '#c97852',

  '--color-danger':        '#4a2225',
  '--color-danger-border': '#d46b63',
  '--color-danger-text':   '#f1a49b',

  '--color-progress-bg':   '#51353a',
  '--color-progress-fill': '#d28b62',

  '--color-success':        '#51353a',
  '--color-success-hover':  '#634147',
  '--color-success-border': '#c97852',

  '--radius-card':  '14px',
  '--radius-btn':   '999px',
  '--radius-input': '10px',
  '--radius-badge': '6px',

  '--border-width': '1px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg':    '#ffffff',
  '--eyes-pupil': '#2a1f22',
},
garnet: {
  '--color-bg':            '#301517',
  '--color-bg-secondary':  '#2b1b1d',
  '--color-bg-hover':      '#382326',
  '--color-surface':       '#251718',

  '--color-border':        '#8f3e3e',
  '--color-border-muted':  '#5c2b2d',
  '--color-border-accent': '#d75a4a',

  '--color-text':          '#fff4f2',
  '--color-text-muted':    '#d7b7b3',
  '--color-text-subtle':   '#9d7b77',

  '--color-accent':        '#4a2427',
  '--color-accent-border': '#c84a3a',

  '--color-danger':        '#5b1818',
  '--color-danger-border': '#f04b4b',
  '--color-danger-text':   '#ffb1a7',

  '--color-progress-bg':   '#4a2427',
  '--color-progress-fill': '#d75a4a',

  '--color-success':        '#4a2427',
  '--color-success-hover':  '#5a2d31',
  '--color-success-border': '#c84a3a',

  '--radius-card':  '14px',
  '--radius-btn':   '999px',
  '--radius-input': '10px',
  '--radius-badge': '6px',

  '--border-width': '1px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg':    '#ffffff',
  '--eyes-pupil': '#1f1415',
},
aurora: {
  '--color-bg':            '#16182b',
  '--color-bg-secondary':  '#1d2138',
  '--color-bg-hover':      '#262b47',
  '--color-surface':       '#1a1d33',

  '--color-border':        '#4f8d8d',
  '--color-border-muted':  '#355d63',
  '--color-border-accent': '#5ed7b8',

  '--color-text':          '#f7f8ff',
  '--color-text-muted':    '#bcc6dd',
  '--color-text-subtle':   '#8d99b6',

  '--color-accent':        '#2a3352',
  '--color-accent-border': '#7f7dff',

  '--color-danger':        '#432734',
  '--color-danger-border': '#cf6d8b',
  '--color-danger-text':   '#f2a9be',

  '--color-progress-bg':   '#2a3352',
  '--color-progress-fill': '#5ed7b8',

  '--color-success':        '#233b46',
  '--color-success-hover':  '#2b4b58',
  '--color-success-border': '#5ed7b8',

  '--radius-card':  '14px',
  '--radius-btn':   '999px',
  '--radius-input': '10px',
  '--radius-badge': '6px',

  '--border-width': '1px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg':    '#ffffff',
  '--eyes-pupil': '#16182b',
},
lavender: {
  '--color-bg':            '#e7d4ff',
  '--color-bg-secondary':  '#ece3f8',
  '--color-bg-hover':      '#e4d8f4',
  '--color-surface':       '#fbf8fe',

  '--color-border':        '#b393d3',
  '--color-border-muted':  '#d7c3eb',
  '--color-border-accent': '#8f6cc7',

  '--color-text':          '#2f243f',
  '--color-text-muted':    '#6e5c88',
  '--color-text-subtle':   '#9d8bb8',

  '--color-accent':        '#ece3f8',
  '--color-accent-border': '#8f6cc7',

  '--color-danger':        '#f8dfe7',
  '--color-danger-border': '#cb6f91',
  '--color-danger-text':   '#a84f74',

  '--color-progress-bg':   '#ddd0ef',
  '--color-progress-fill': '#8f6cc7',

  '--color-success':        '#ddd0ef',
  '--color-success-hover':  '#d2c1ea',
  '--color-success-border': '#8f6cc7',

  '--radius-card':  '14px',
  '--radius-btn':   '999px',
  '--radius-input': '10px',
  '--radius-badge': '6px',

  '--border-width': '1px',

  '--font-base': "'Inter', system-ui, sans-serif",

  '--eyes-bg':    '#ffffff',
  '--eyes-pupil': '#2f243f',
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