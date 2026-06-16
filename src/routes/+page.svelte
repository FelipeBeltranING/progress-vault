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
  import WelcomeScreen from '../components/WelcomeScreen.svelte';
  import { fade } from 'svelte/transition';

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

  /** @type {string} */
  let sort = $state('date_desc');
  /** @type {string} */
  let statusFilter = $state('all');
  /** @type {string} */
  let typeFilter = $state('all');

  let visibleGoals = $derived(applyPrefs(goals, sort, statusFilter, typeFilter));

  /** @type {HTMLButtonElement | null} */
  let navGoalsBtnEl = $state(null);

  onMount(async () => {
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

   let transitioning = $state(false);
  let displayView = $state('welcome');

  /** @param {'welcome' | 'goals' | 'config'} view */
  async function navigateTo(view) {
    transitioning = true;
    await new Promise(r => setTimeout(r, 300));
    displayView = view;
    transitioning = false;
  }

  let returningAnimating = $state(false);
  let returnTranslateY = $state(0);

  function handleGoHome() {
    if (navGoalsBtnEl) {
      const navRect = navGoalsBtnEl.getBoundingClientRect();
      // Target: where the button sits in WelcomeScreen — roughly vertical center of flap (105px from top)
      const targetCenterY = 100;
      const navCenterY = navRect.top + navRect.height / 2;
      returnTranslateY = targetCenterY - navCenterY;
    }

    returningAnimating = true;
    setTimeout(() => {
    currentView = 'welcome';
    returningAnimating = false;
  }, 350);
  }
</script>


{#key currentView}
  <div in:fade={{ duration: 350 }} out:fade={{ duration:350}} style="position: fixed; inset: 0;">

    <!-- Navbar always in DOM so navGoalsBtnEl has real coordinates for the animation -->
    <nav class="navbar" class:hidden={currentView !== 'goals'}>
      <button class="nav-btn" onclick={() => (showDashboardView = true)}>View</button>
      <button bind:this={navGoalsBtnEl} class="nav-btn active" class:returning={returningAnimating} style="--return-y: {returnTranslateY}px" onclick={handleGoHome}>Home</button>
      <button class="nav-btn" onclick={() => (showCreateModal = true)}>New</button>
      <div class="navbar-line" class:returning={returningAnimating} style="--return-y: {returnTranslateY}px"></div>
    </nav>

    {#if currentView === 'config'}
      <ConfigScreen
        {currentTheme}
        onSave={handleThemeSaved}
        onBack={() => (currentView = 'welcome')}
      />

    {:else if currentView === 'welcome'}
      <WelcomeScreen
        onGoals={() => (currentView = 'goals')}
        onSettings={() => (currentView = 'config')}
        navGoalsRect={() => navGoalsBtnEl?.getBoundingClientRect() ?? null}
      />

    {:else}
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

    {/if}

  </div>
{/key}

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
 .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: var(--color-bg);
  z-index: 20;
  transition: opacity 0.35s ease, visibility 0.35s ease;
}

  .navbar-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--border-width);
  background: var(--color-border);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  } 

  .navbar-line.returning {
    transform: translateY(var(--return-y));
  } 

  .navbar.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .nav-btn {
  min-width: 160px;
  text-align: center;
  padding: 14px 52px;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.12em;
  font-family: var(--font-base);
  transition: background 0.15s, transform 0.1s;
}

.nav-btn:hover {
  background: var(--color-bg-hover);
  transform: scale(1.04);
}

.nav-btn:active {
  transform: scale(0.97);
}
  .nav-btn.returning {
    transform: translateY(var(--return-y));
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 30;
  }
  
  .container {
  height: calc(100vh - 96px);
  margin-top: 96px;
  padding: 5rem;
  padding-right: calc(5rem - 8px); /* compensa el ancho del scrollbar */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
  .error { color: var(--color-danger-text); }

  .empty {
    color: var(--color-text-muted);
    margin-top: 3rem;
  }

  .grid {
   display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 100%;
  max-width: 1100px;
  }
</style>