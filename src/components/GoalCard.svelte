<script>
  import { incrementGoalProgress, toggleSubtask , toggleGoalCompletion} from '$lib/api.js';

  /** @type {{ goal: any, onUpdate: (updated: any) => void, onOpen: () => void }} */
  let { goal, onUpdate, onOpen } = $props();

  /** @param {MouseEvent} e */
  async function handleIncrement(e) {
    e.stopPropagation();
    try {
      const updated = await incrementGoalProgress(goal.id);
      onUpdate(updated);
    } catch (err) {
      console.error(err);
    }
  }

  /** @param {MouseEvent} e */
  /** @param {string} subtaskId */
  async function handleToggle(e, subtaskId) {
    e.stopPropagation();
    try {
      const updated = await toggleSubtask(goal.id, subtaskId);
      onUpdate(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggleCompletion(e) {
  e.stopPropagation();

  try {
    const updated = await toggleGoalCompletion(goal.id);
    onUpdate(updated);
  } catch (err) {
    console.error(err);
  }
}
</script>

<div class="card" role="button" tabindex="0" onclick={onOpen} onkeydown={(e) => e.key === 'Enter' && onOpen()}>
  <h3>{goal.name}</h3>

  {#if goal.goal_type === 'simple'}
    <p class="status">{goal.completed ? '✅ Completed' : '⬜ Pending'}</p>
     <button
    class="toggle-simple"
    onclick={handleToggleCompletion}
  >
    ✓
  </button>
  {:else if goal.goal_type === 'numeric'}
    <p class="counter">{goal.current} / {goal.target}</p>
    <button class="increment" onclick={handleIncrement} disabled={goal.current >= goal.target}>
      +1
    </button>
  {:else if goal.goal_type === 'checklist'}
    <ul>
      {#each goal.subtasks as task (task.id)}
        <li>
          <input
            type="checkbox"
            checked={task.completed}
            onclick={(e) => handleToggle(e, task.id)}
          />
          {task.title}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .card {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-card);
    padding: 1rem;
    text-align: left;
    height:360px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;
    transition: background 0.15s, transform 0.15s, border-color 0.15s;
  }

  .card:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-border);
  transform: translateY(-3px);
}
  .card h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  .status,
  .counter {
    font-size: 1.1rem;
  }

  .increment {
    align-self: flex-start;
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-btn);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-size: 0.9rem;
  }

  .increment:hover:not(:disabled) {
    background: var(--color-bg-hover);
  }

  .increment:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .toggle-simple {
    opacity: 0;
    align-self: flex-start;
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-btn);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .card:hover .toggle-simple {
    opacity: 1;
  }
</style>