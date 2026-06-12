<script>
  import { onMount } from 'svelte';
  import { getGoals } from '$lib/api.js';
  import GoalCard from '../components/GoalCard.svelte';
  import CreateGoalModal from '../components/CreateGoalModal.svelte';
  import GoalDetail from '../components/GoalDetail.svelte';

  /** @type {any[]} */
  let goals = $state([]);
  let loading = $state(true);
  /** @type {string | null} */
  let error = $state(null);
  let showCreateModal = $state(false);
  /** @type {any | null} */
  let selectedGoal = $state(null);

  onMount(async () => {
    try {
      goals = await getGoals();
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  });
</script>

<div class="app">
  <nav class="navbar">
    <button class="nav-btn">Config</button>
    <button class="nav-btn active">Goals</button>
    <button class="nav-btn" onclick={() => (showCreateModal = true)}>New</button>
  </nav>

  <main class="container">
    {#if loading}
      <p>Cargando...</p>
    {:else if error}
      <p class="error">Error: {error}</p>
    {:else if goals.length === 0}
      <p>No tienes goals todavía.</p>
    {:else}
      <div class="grid">
        {#each goals as goal (goal.id)}
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

{#if showCreateModal}
  <CreateGoalModal
    onClose={() => (showCreateModal = false)}
    onCreated={(created) => {
      goals = [...goals, created];
    }}
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
  }

  .navbar {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }

  .nav-btn {
    padding: 0.5rem 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-size: 1rem;
  }

  .nav-btn.active {
    background: #c8f0c8;
    border-color: #9bd89b;
  }

  .nav-btn:hover {
    filter: brightness(0.97);
  }

  .container {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error {
    color: #d32f2f;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
    width: 100%;
    max-width: 900px;
  }
</style>