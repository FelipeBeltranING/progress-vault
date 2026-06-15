<script>
  import { onMount } from 'svelte';
  import { getGoals, getConfig } from '$lib/api.js';
  import { applyTheme } from '$lib/themes.js';
  import { applyPrefs } from '$lib/dashboardPrefs.js';
  import GoalCard from '../components/GoalCard.svelte';
  import CreateGoalModal from '../components/CreateGoalModal.svelte';
  import GoalDetail from '../components/GoalDetail.svelte';
  import ConfigScreen from '../components/ConfigScreen.svelte';
  import DashboardView from '../components/DashboardView.svelte';

  /** @type {any[]} */
  let goals = $state([]);
  let loading = $state(true);
  /** @type {string | null} */
  let error = $state(null);
  let showCreateModal = $state(false);
  let showDashboardView = $state(false);
  /** @type {any | null} */
  let selectedGoal = $state(null);

  /** @type {'welcome' | 'goals' | 'config'} */
  let currentView = $state('welcome');

  /** @type {string} */
  let currentTheme = $state('default');

  // --- Dashboard prefs (session-only, reset on launch) ---
  /** @type {string} */
  let sort = $state('date_desc');
  /** @type {string} */
  let statusFilter = $state('all');
  /** @type {string} */
  let typeFilter = $state('all');

  // Derived: filtered + sorted goals, recomputed reactively whenever
  // goals, sort, or filters change.
  let visibleGoals = $derived(applyPrefs(goals, sort, statusFilter, typeFilter));

  onMount(async () => {
    // FR-11: load and apply saved theme before rendering UI.
    try {
      const config = await getConfig();
      applyTheme(config.theme);
      currentTheme = config.theme;
    } catch {
      applyTheme('default');
    }

    try {
      goals = await getGoals();
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  });

  /** @param {string} theme */
  function handleThemeSaved(theme) {
    applyTheme(theme);
    currentTheme = theme;
    currentView = 'welcome';
  }
</script>

{#if currentView === 'config'}

  <ConfigScreen
    {currentTheme}
    onSave={handleThemeSaved}
    onBack={() => (currentView = 'welcome')}
  />

{:else if currentView === 'welcome'}

  <div class="welcome-screen">
    <div class="welcome-content">
      <h1>Progress Vault</h1>
      <p>Welcome back!</p>
      <button class="goals-button" onclick={() => (currentView = 'goals')}>
        Goals
      </button>
    </div>
    <button class="settings-button" onclick={() => (currentView = 'config')}>
      ⚙️
    </button>
  </div>

{:else}

  <div class="app">
    <nav class="navbar">
      <button class="nav-btn" onclick={() => (showDashboardView = true)}>View</button>
      <button class="nav-btn active" onclick={() => (currentView = 'welcome')}>Goals</button>
      <button class="nav-btn" onclick={() => (showCreateModal = true)}>New</button>
    </nav>

    <main class="container">
      {#if loading}
        <p>Loading...</p>
      {:else if error}
        <p class="error">Error: {error}</p>
      {:else if goals.length === 0}
        <p class="empty">No goals yet. Hit <strong>New</strong> to create one.</p>
      {:else if visibleGoals.length === 0}
        <p class="empty">No goals match the current filters.</p>
      {:else}
        <div class="grid">
          {#each visibleGoals as goal (goal.id)}
            <GoalCard
              {goal}
              onUpdate={(updated) => {
                goals = goals.map((g) => (g.id === updated.id ? updated : g));
                if (selectedGoal?.id === updated.id) selectedGoal = updated;
              }}
              onOpen={() => (selectedGoal = goal)}
            />
          {/each}
        </div>
      {/if}
    </main>
  </div>

{/if}

<!-- Modals — rendered outside view conditionals so they layer correctly -->

{#if showDashboardView}
  <DashboardView
    {sort}
    {statusFilter}
    {typeFilter}
    onSort={(v) => (sort = v)}
    onStatusFilter={(v) => (statusFilter = v)}
    onTypeFilter={(v) => (typeFilter = v)}
    onClose={() => (showDashboardView = false)}
  />
{/if}

{#if showCreateModal}
  <CreateGoalModal
    onClose={() => (showCreateModal = false)}
    onCreated={(created) => { goals = [...goals, created]; }}
  />
{/if}

{#if selectedGoal}
  <GoalDetail
    goal={selectedGoal}
    onClose={() => (selectedGoal = null)}
    onUpdated={(updated) => {
      goals = goals.map((g) => (g.id === updated.id ? updated : g));
      selectedGoal = updated;
    }}
    onDeleted={(id) => {
      goals = goals.filter((g) => g.id !== id);
      selectedGoal = null;
    }}
  />
{/if}

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--color-bg);
    color: var(--color-text);
  }

  .navbar {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-btn {
    padding: 0.5rem 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-btn);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-size: 1rem;
  }

  .nav-btn.active {
    background: var(--color-accent);
    border-color: var(--color-accent-border);
  }

  .nav-btn:hover { filter: brightness(0.97); }

  .container {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error { color: var(--color-danger-text); }

  .empty {
    color: var(--color-text-muted);
    margin-top: 3rem;
  }

  /* Welcome screen */
  .welcome-screen {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: var(--color-bg);
    color: var(--color-text);
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .welcome-content h1 { margin: 0; font-size: 3rem; }

  .welcome-content p {
    margin: 0;
    color: var(--color-text-muted);
  }

  .goals-button {
    padding: 0.8rem 2rem;
    border-radius: var(--radius-btn);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-size: 1rem;
  }

  .settings-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    cursor: pointer;
    font-size: 1.1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
    width: 100%;
    max-width: 900px;
  }
</style>
