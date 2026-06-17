<script>
  import { setConfig } from '$lib/api.js';
  import { fade } from 'svelte/transition';

  /** @type {{ currentTheme: string, onSave: (theme: string) => void, onBack: () => void }} */
  let { currentTheme, onSave, onBack } = $props();

  const THEMES = [
    { id: 'default', label: 'Default', description: 'Clean light theme' },
    { id: 'dark',    label: 'Dark',    description: 'Easy on the eyes' },
  ];

  let error = $state('');

  /** @param {string} themeId */
  async function handleSelect(themeId) {
    if (themeId === currentTheme) return;
    error = '';
    try {
      await setConfig(themeId);
      onSave(themeId);
    } catch (e) {
      error = String(e);
    }
  }
</script>

<div class="config-screen" transition:fade={{ duration: 350 }}>
  <div class="header">
    <button class="back-btn" onclick={onBack}>← Back</button>
    <h1>Settings</h1>
  </div>

  <section class="section">
    <h2>Theme</h2>
    <div class="theme-list">
      {#each THEMES as theme}
        <button
          class="theme-option"
          class:active={currentTheme === theme.id}
          onclick={() => handleSelect(theme.id)}
        >
          <div class="theme-swatch theme-swatch--{theme.id}"></div>
          <div class="theme-info">
            <span class="theme-label">{theme.label}</span>
            <span class="theme-desc">{theme.description}</span>
          </div>
          {#if currentTheme === theme.id}
            <span class="checkmark">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  </section>

  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<style>
  .config-screen {
    min-height: 100vh;
    padding: 2rem;
    background: var(--color-bg);
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 480px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-btn {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-btn);
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    color: var(--color-text);
    font-size: 0.9rem;
  }

  .back-btn:hover { background: var(--color-bg-hover); }

  h1 { margin: 0; font-size: 1.5rem; }

  .section h2 {
    margin: 0 0 0.75rem 0;
    font-size: 1rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .theme-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .theme-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
    cursor: pointer;
    text-align: left;
    color: var(--color-text);
    transition: border-color 0.15s;
  }

  .theme-option:hover { background: var(--color-bg-hover); }

  .theme-option.active {
    border-color: var(--color-accent-border);
    background: var(--color-accent);
  }

  .theme-swatch {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-badge);
    border: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  .theme-swatch--default { background: #ffffff; border-color: #cccccc; }
  .theme-swatch--dark    { background: #1a1a1a; border-color: #444444; }

  .theme-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex: 1;
  }

  .theme-label { font-weight: 600; font-size: 0.95rem; }
  .theme-desc { font-size: 0.8rem; color: var(--color-text-subtle); }

  .checkmark {
    color: var(--color-accent-border);
    font-weight: 700;
    font-size: 1.1rem;
  }

  .error { color: var(--color-danger-text); margin: 0; font-size: 0.9rem; }
</style>