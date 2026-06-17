<script>
  import { incrementGoalProgress, toggleSubtask, toggleGoalCompletion } from '$lib/api.js';

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

  /** @param {MouseEvent} e */
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

<div
  class="card"
  class:completed-card={
    (goal.goal_type === 'simple' && goal.completed) ||
    (goal.goal_type === 'numeric' && goal.current >= goal.target) ||
    (goal.goal_type === 'checklist' && goal.subtasks?.length > 0 && goal.subtasks.every((t) => t.completed))
  }
  role="button"
  tabindex="0"
  onclick={onOpen}
  onkeydown={(e) => e.key === 'Enter' && onOpen()}
>
  <div class="card-body" class:simple-centered={goal.goal_type === 'simple'}>
    <h3 class:centered={goal.goal_type === 'simple'}>{goal.name}</h3>

    {#if goal.goal_type === 'simple'}
      <button class="toggle-simple" onclick={handleToggleCompletion}>
        {goal.completed ? 'Done' : 'Done'}
      </button>

    {:else if goal.goal_type === 'numeric'}
      <div class="numeric-body">
        <div class="bar-container">
          <div
            class="bar-fill"
            style="height: {Math.min((goal.current / goal.target) * 100, 100)}%"
          ></div>
        </div>
        <p class="counter">{goal.current} / {goal.target}</p>
      </div>
      <button class="increment" onclick={handleIncrement} disabled={goal.current >= goal.target}>
        +1
      </button>

    {:else if goal.goal_type === 'checklist'}
  <ul>
    {#each goal.subtasks as task (task.id)}
      <li>
        <label class="checkbox-container" onclick={(e) => e.stopPropagation()}>
          <input
            class="custom-checkbox"
            type="checkbox"
            checked={task.completed}
            onchange={(e) => handleToggle(e, task.id)}
          />
          <span class="checkmark"></span>
          <span class="task-title">{task.title}</span>
        </label>
      </li>
    {/each}
  </ul>
    {/if}
  </div>
</div>

<style>
 .card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-card);
  padding: 1rem;
  text-align: left;
  height: 360px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.2s, transform 0.15s, border-color 0.15s;
}

  .card:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-border);
  transform: translateY(-3px);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 0;
}

.card-body.simple-centered {
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
}

.card h3 {
  margin: 0 0 0.4rem 0;
  font-size: 1.4rem;
}

.card h3.centered {
  text-align: center;
}

  .numeric-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }

  .bar-container {
    width: 56px;
    height: 140px;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-input);
    background: var(--color-bg);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    flex-shrink: 0;
  }

  .bar-fill {
    width: 100%;
    background: var(--color-progress-fill);
    border-radius: 0;
    transition: height 0.35s ease;
  }

  .counter {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
  }

  .increment {
    align-self: center;
    margin-top: auto;
    padding: 0.7rem 2.2rem;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-btn);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    transition: background 0.15s, transform 0.1s;
  }

  .increment:hover:not(:disabled) {
    background: var(--color-bg-hover);
    transform: scale(1.04);
  }

  .increment:active:not(:disabled) {
    transform: scale(0.97);
  }

  .increment:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

ul::-webkit-scrollbar {
  width: 8px;
}

ul::-webkit-scrollbar-track {
  background: var(--color-bg);
  border-radius: var(--radius-btn);
}

ul::-webkit-scrollbar-thumb {
  background: var(--color-border-muted);
  border-radius: var(--radius-btn);
}

ul::-webkit-scrollbar-thumb:hover {
  background: var(--color-border);
}
  li {
  display: flex;
  align-items: center;
}
  .toggle-simple {
  align-self: center;
  padding: 0.7rem 2rem;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  transition: background 0.15s, transform 0.1s;
}

.toggle-simple:hover {
  background: var(--color-bg-hover);
  transform: scale(1.04);
}

.card.completed-card {
  background: var(--color-success);
  border-color: var(--color-success-border);
}

.card.completed-card:hover {
  background: var(--color-success-hover);
}

.checkbox-container {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;
  color: var(--color-text);
}

.custom-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  box-shadow: 0 2px 5px var(--color-success-border);
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 22px;
  width: 22px;
  background-color: var(--color-bg);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-badge);
  transition: background-color 0.2s, border-color 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid var(--color-bg);
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
}

.custom-checkbox:checked ~ .checkmark {
  background-color: var(--color-success-border);
  border-color: var(--color-success-border);
  box-shadow: 0 2px 5px var(--color-success-border);
}

.custom-checkbox:checked ~ .checkmark::after {
  display: block;
}

.task-title {
  line-height: 1.3;
}
</style>