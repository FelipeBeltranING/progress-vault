<script>
  import { setConfig } from '$lib/api.js';
  import { fade } from 'svelte/transition';

  /** @type {{ currentTheme: string, onSave: (theme: string) => void, onBack: () => void }} */
  let { currentTheme, onSave, onBack } = $props();

  const THEMES = [
    { id: 'default', label: 'Default', description: 'Clean light theme' },
    { id: 'dark',    label: 'Dark',    description: 'Easy on the eyes' },
    { id: 'rosewood', label: 'Rosewood', description: 'Like pressed flowers on paper' },
    { id: 'deep-ocean', label: 'Deep Ocean', description: 'Where the ocean meets the night' },
    { id: 'paper', label: 'Paper', description: 'Warm paper tones with a notebook feel' },
    { id: 'forest', label: 'Forest', description: 'A quiet walk through the woods' },
    { id: 'sunset', label: 'Sunset', description: 'Like the sky before nightfall' },
    { id: 'garnet', label: 'Garnet', description: 'Like glowing embers beneath the ash' },
    { id: 'aurora', label: 'Aurora', description: 'Like dancing lights across the night sky' },
    { id: 'lavender', label: 'Lavender', description: 'Like lavender fields at sunset' },
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
   height: 100vh;
   padding: 2rem;
    background: var(--color-bg);
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 480px;
    margin: 0 auto;

    overflow-y: auto;
    scrollbar-gutter: stable;
  }

  .section {
    display: flex;
    flex-direction: column;
    min-height: 0;
    flex: 1;
    position: relative;
  }

  .section::after {
  content: "";
  position: absolute;
  left: 0;
  right: 12px;
  bottom: -4px;   
  height: 20px;   
  pointer-events: none;

  background: linear-gradient(
    to bottom,
    transparent,
    var(--color-bg)
  );
}

.theme-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  overflow-y: auto;
  min-height: 0;
  flex: 1;
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

  overflow-y: auto;
  flex: 1;
  min-height: 0;

  padding-right: 10px;
  scrollbar-width: none;
}

.theme-list::-webkit-scrollbar {
  display: none;
}

.theme-list::-webkit-scrollbar-track {
  background: transparent;
}

.theme-list::-webkit-scrollbar-thumb {
  background: var(--color-border-muted);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.theme-list::-webkit-scrollbar-thumb:hover {
  background: var(--color-border);
  background-clip: padding-box;
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
  .theme-swatch--rosewood { background: #fff0f3; border-color: #c4687a; }
  .theme-swatch--deep-ocean { background: #0b1220; border-color: #4d7ff2; }
  .theme-swatch--paper {background: #f7f3eb; border-color: #b38b63;}
  .theme-swatch--forest { background: #273629; border-color: #81ad74; }
  .theme-swatch--sunset { background: #2a1f22; border-color: #c97852; }
  .theme-swatch--garnet { background: #301416; border-color: #f05a45; }
  .theme-swatch--aurora {background: #1b1d36;border-color: #5ed7b8;}
  .theme-swatch--lavender {background: #f5f0fb;border-color: #8f6cc7;}

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