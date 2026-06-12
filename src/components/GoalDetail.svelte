<script>
  import { updateGoal, deleteGoal } from '$lib/api.js';

  /** @type {{ goal: any, onClose: () => void, onUpdated: (g: any) => void, onDeleted: (id: string) => void }} */
  let { goal, onClose, onUpdated, onDeleted } = $props();

  let editing = $state(false);
  let confirmingDelete = $state(false);
  let saving = $state(false);
  let deleting = $state(false);
  let error = $state('');

  let editName = $state(goal.name);
  let editDescription = $state(goal.description ?? '');

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

  function formatDate(iso) {
    return new Date(iso).toLocaleString();
  }
</script>

<div
  class="overlay"
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
        <p class="status">{goal.completed ? '✅ Completed' : '⬜ Pending'}</p>
      {:else if goal.goal_type === 'numeric'}
        <p class="counter">{goal.current} / {goal.target}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {(goal.current / goal.target) * 100}%"></div>
        </div>
      {:else if goal.goal_type === 'checklist'}
        <ul>
          {#each goal.subtasks as task}
            <li>
              <input type="checkbox" checked={task.completed} disabled />
              {task.title}
            </li>
          {/each}
        </ul>
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
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    width: 90%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 85vh;
    overflow-y: auto;
  }

  h2 {
    margin: 0;
  }

  .description {
    margin: 0;
    color: #555;
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
    border: 1px solid #ccc;
    border-radius: 6px;
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
    color: #888;
    margin: 0;
  }

  .type-badge {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #eee;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  .content {
    border-top: 1px solid #eee;
    padding-top: 0.75rem;
  }

  .status,
  .counter {
    font-size: 1.2rem;
    margin: 0;
  }

  .progress-bar {
    background: #eee;
    border-radius: 999px;
    height: 10px;
    overflow: hidden;
    margin-top: 0.5rem;
  }

  .progress-fill {
    background: #9bd89b;
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

  .weight {
    margin-left: auto;
    font-size: 0.8rem;
    color: #999;
  }

  .error {
    color: #d32f2f;
    margin: 0;
    font-size: 0.9rem;
  }

  .confirm-delete {
    background: #fdecea;
    border: 1px solid #f5c6c4;
    border-radius: 8px;
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
    border-radius: 8px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 1rem;
  }

  .submit {
    background: #c8f0c8;
    border-color: #9bd89b;
  }

  .danger {
    background: #f5c6c4;
    border-color: #e89694;
  }

  .danger-outline {
    background: white;
    border-color: #e89694;
    color: #d32f2f;
    margin-right: auto;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>