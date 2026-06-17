<script>
  import { SORT_OPTIONS, STATUS_FILTERS, TYPE_FILTERS } from '$lib/dashboardPrefs.js';
  import { fade } from 'svelte/transition';
  const APP_VERSION = '0.2.0';

  /**
   * @type {{
   *   sort: string,
   *   statusFilter: string,
   *   typeFilter: string,
   *   onSort: (v: string) => void,
   *   onStatusFilter: (v: string) => void,
   *   onTypeFilter: (v: string) => void,
   *   onClose: () => void
   * }}
   */
  let { sort, statusFilter, typeFilter, onSort, onStatusFilter, onTypeFilter, onClose } = $props();
</script>

<div
  class="overlay" transition:fade={{ duration: 200 }}
  role="presentation"
  onclick={onClose}
  onkeydown={(e) => e.key === 'Escape' && onClose()}
>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="dashboard-config-title"
    onclick={(e) => e.stopPropagation()}
  >
    <div class="modal-header">
      <h2 id="dashboard-config-title">View Settings</h2>
      <button class="close-btn" onclick={onClose}>✕</button>
    </div>

    <!-- Sort -->
    <section class="section">
      <h3>Sort by</h3>
      <div class="option-group">
        {#each SORT_OPTIONS as option}
          <button
            class="option-btn"
            class:active={sort === option.value}
            onclick={() => onSort(option.value)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </section>

    <!-- Filter by status -->
    <section class="section">
      <h3>Status</h3>
      <div class="option-group">
        {#each STATUS_FILTERS as option}
          <button
            class="option-btn"
            class:active={statusFilter === option.value}
            onclick={() => onStatusFilter(option.value)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </section>

    <!-- Filter by type -->
    <section class="section">
      <h3>Type</h3>
      <div class="option-group">
        {#each TYPE_FILTERS as option}
          <button
            class="option-btn"
            class:active={typeFilter === option.value}
            onclick={() => onTypeFilter(option.value)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </section>

    <!-- Info -->
    <section class="section info-section">
      <h3>About</h3>
      <p class="info-row"><span>Version</span><span>{APP_VERSION}</span></p>
    </section>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .modal {
    background: var(--color-surface);
    border-radius: var(--radius-card);
    padding: 1.5rem;
    width: 90%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    color: var(--color-text);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--color-text-muted);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-btn);
  }

  .close-btn:hover {
    background: var(--color-bg-hover);
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 1px solid var(--color-border);
    padding-top: 1rem;
  }

  .section h3 {
    margin: 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }

  .option-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .option-btn {
    padding: 0.35rem 0.85rem;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-btn);
    background: var(--color-bg-secondary);
    color: var(--color-text);
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.1s, border-color 0.1s;
  }

  .option-btn:hover {
    background: var(--color-bg-hover);
  }

  .option-btn.active {
    background: var(--color-accent);
    border-color: var(--color-accent-border);
  }

  .info-section {
    gap: 0.4rem;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }
</style>
