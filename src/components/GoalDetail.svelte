<script>
  import { updateGoal, deleteGoal, addSubtask, removeSubtask  } from '$lib/api.js';
  import { fade } from 'svelte/transition';   

  /** @type {{ goal: any, onClose: () => void, onUpdated: (g: any) => void, onDeleted: (id: string) => void }} */
  let { goal, onClose, onUpdated, onDeleted } = $props();

  let editing = $state(false);
  let confirmingDelete = $state(false);
  let saving = $state(false);
  let deleting = $state(false);
  let error = $state('');

  let editName = $state(goal.name);
  let editDescription = $state(goal.description ?? '');
  let newSubtaskTitle = $state('');
  let subtaskLoading = $state(false);

  function startEdit() {
    editName = goal.name;
    editDescription = goal.description ?? '';
    error = '';
    editing = true;
  }

  function cancelEdit() {
    editing = false;
    error = '';
  }

  async function saveEdit() {
    if (!editName.trim()) {
      error = 'Name is required.';
      return;
    }

    saving = true;
    error = '';

    try {
      const updated = await updateGoal(goal.id, editName.trim(), editDescription.trim() || null);
      onUpdated(updated);
      editing = false;
    } catch (e) {
      error = String(e);
    } finally {
      saving = false;
    }
  }

  async function confirmDelete() {
    deleting = true;
    error = '';

    try {
      await deleteGoal(goal.id);
      onDeleted(goal.id);
      onClose();
    } catch (e) {
      error = String(e);
      deleting = false;
    }
  }

  async function handleAddSubtask() {
  if (!newSubtaskTitle.trim()) return;

  subtaskLoading = true;
  error = '';

  try {
    const updated = await addSubtask(
      goal.id,
      newSubtaskTitle.trim()
    );

    goal = updated;
    onUpdated(updated);

    newSubtaskTitle = '';
  } catch (e) {
    error = String(e);
  } finally {
    subtaskLoading = false;
  }
}

async function handleRemoveSubtask(subtaskId) {
  subtaskLoading = true;
  error = '';

  try {
    const updated = await removeSubtask(
      goal.id,
      subtaskId
    );

    goal = updated;
    onUpdated(updated);
  } catch (e) {
    error = String(e);
  } finally {
    subtaskLoading = false;
  }
}

  function formatDate(iso) {
    return new Date(iso).toLocaleString();
  }
</script>

<div
  class="overlay"  transition:fade={{ duration: 200 }}
  role="presentation"
  onclick={onClose}
  onkeydown={(e) => e.key === 'Escape' && onClose()}
>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onclick={(e) => e.stopPropagation()}>
    {#if editing}
      <label>
        Name
        <input type="text" bind:value={editName} />
      </label>
      <label>
        Description
        <textarea bind:value={editDescription}></textarea>
      </label>
    {:else}
      <h2 id="detail-title">{goal.name}</h2>
      {#if goal.description}
        <p class="description">{goal.description}</p>
      {/if}
    {/if}

    <p class="meta">
      <span class="type-badge">{goal.goal_type}</span>
      <span class="date">Created: {formatDate(goal.created_at)}</span>
    </p>

    <div class="content">
      {#if goal.goal_type === 'simple'}
  <p class="status">
    {goal.completed ? '✅ Completed' : '⬜ Pending'}
  </p>
      {:else if goal.goal_type === 'numeric'}
        <p class="counter">{goal.current} / {goal.target}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {(goal.current / goal.target) * 100}%"></div>
        </div>
      {:else if goal.goal_type === 'checklist'}

  {#if editing}
    <div class="subtask-editor">

      <div class="add-subtask">
        <input
          type="text"
          bind:value={newSubtaskTitle}
          placeholder="New sub-task"
        />

        <button
          type="button"
          onclick={handleAddSubtask}
          disabled={subtaskLoading}
        >
          Add
        </button>
      </div>

      <ul>
        {#each goal.subtasks as task}
          <li>
            <input
              type="checkbox"
              checked={task.completed}
              disabled
            />

            <span>{task.title}</span>

            <button
              type="button"
              class="remove-subtask"
              onclick={() => handleRemoveSubtask(task.id)}
              disabled={subtaskLoading}
            >
              Remove
            </button>
          </li>
        {/each}
      </ul>

    </div>

  {:else}

    <ul>
      {#each goal.subtasks as task}
        <li>
          <input
            type="checkbox"
            checked={task.completed}
            disabled
          />
          {task.title}
        </li>
      {/each}
    </ul>

  {/if}

{/if}

    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    {#if confirmingDelete}
      <div class="confirm-delete">
        <p>Are you sure you want to delete this goal?</p>
        <div class="confirm-actions">
          <button class="cancel" onclick={() => (confirmingDelete = false)} disabled={deleting}>
            Cancel
          </button>
          <button class="danger" onclick={confirmDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Yes, delete'}
          </button>
        </div>
      </div>
    {:else}
      <div class="actions">
        {#if editing}
          <button class="cancel" onclick={cancelEdit} disabled={saving}>Cancel</button>
          <button class="submit" onclick={saveEdit} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        {:else}
          <button class="danger-outline" onclick={() => (confirmingDelete = true)}>Delete</button>
          <button class="submit" onclick={startEdit}>Edit</button>
          <button class="cancel" onclick={onClose}>Close</button>
        {/if}
      </div>
    {/if}
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
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 85vh;
    overflow-y: auto;
  }

  h2 { margin: 0; }

  .description {
    margin: 0;
    color: var(--color-text-muted);
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.9rem;
    font-weight: 600;
  }

  input,
  textarea {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-input);
    background: var(--color-bg);
    color: var(--color-text);
  }

  textarea {
    resize: vertical;
    min-height: 60px;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: var(--color-text-subtle);
    margin: 0;
  }

  .type-badge {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--color-bg-secondary);
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius-badge);
  }

  .content {
    border-top: 1px solid var(--color-border);
    padding-top: 0.75rem;
  }

  .status,
  .counter {
    font-size: 1.2rem;
    margin: 0;
  }

  .progress-bar {
    background: var(--color-progress-bg);
    border-radius: 999px;
    height: 10px;
    overflow: hidden;
    margin-top: 0.5rem;
  }

  .progress-fill {
    background: var(--color-progress-fill);
    height: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .error {
    color: var(--color-danger-text);
    margin: 0;
    font-size: 0.9rem;
  }

  .confirm-delete {
    background: var(--color-danger);
    border: 1px solid var(--color-danger-border);
    border-radius: var(--radius-btn);
    padding: 0.75rem;
  }

  .confirm-delete p {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
  }

  .confirm-actions,
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .actions button,
  .confirm-actions button {
    padding: 0.5rem 1.2rem;
    border-radius: var(--radius-btn);
    border: 2px solid var(--color-border);
    cursor: pointer;
    font-size: 1rem;
    background: var(--color-surface);
    color: var(--color-text);
  }

  .submit {
    background: var(--color-accent);
    border-color: var(--color-accent-border);
  }

  .danger {
    background: var(--color-danger);
    border-color: var(--color-danger-border);
  }

  .danger-outline {
    background: var(--color-surface);
    border-color: var(--color-danger-border);
    color: var(--color-danger-text);
    margin-right: auto;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .subtask-editor {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .add-subtask {
    display: flex;
    gap: 0.5rem;
  }

  .add-subtask input { flex: 1; }

  .remove-subtask { margin-left: auto; font-size: 0.85rem; }
</style>