<script>
  import { createGoal } from '$lib/api.js';

  /** @type {{ onClose: () => void, onCreated: (goal: any) => void }} */
  let { onClose, onCreated } = $props();

  /** @type {'simple' | 'numeric' | 'checklist'} */
  let goalType = $state('simple');

  let name = $state('');
  let description = $state('');
  let target = $state(10);

  /** @type {string[]} */
  let subtasks = $state(['']);

  let error = $state('');
  let submitting = $state(false);

  function addSubtask() {
    subtasks = [...subtasks, ''];
  }

  /** @param {number} index */
  function removeSubtask(index) {
    subtasks = subtasks.filter((_, i) => i !== index);
  }

  async function handleSubmit() {
    error = '';

    if (!name.trim()) {
      error = 'Name is required.';
      return;
    }

    if (goalType === 'numeric' && (!target || target <= 0)) {
      error = 'Target must be greater than zero.';
      return;
    }

    submitting = true;

    try {
      /** @type {any} */
      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        goalType,
      };

      if (goalType === 'numeric') {
        payload.target = Number(target);
      }

      if (goalType === 'checklist') {
        const titles = subtasks.map((s) => s.trim()).filter((s) => s.length > 0);
        if (titles.length > 0) {
          payload.subtaskTitles = titles;
        }
      }

      const created = await createGoal(payload);
      onCreated(created);
      onClose();
    } catch (e) {
      error = String(e);
    } finally {
      submitting = false;
    }
  }
</script>

<div
  class="overlay"
  role="presentation"
  onclick={onClose}
  onkeydown={(e) => e.key === 'Escape' && onClose()}
>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onclick={(e) => e.stopPropagation()}>
    <h2 id="modal-title">New Goal</h2>

    <div class="tabs">
      <button
        class:active={goalType === 'simple'}
        onclick={() => (goalType = 'simple')}
      >
        Simple
      </button>
      <button
        class:active={goalType === 'numeric'}
        onclick={() => (goalType = 'numeric')}
      >
        Numeric
      </button>
      <button
        class:active={goalType === 'checklist'}
        onclick={() => (goalType = 'checklist')}
      >
        Checklist
      </button>
    </div>

    <label>
      Name
      <input type="text" bind:value={name} placeholder="e.g. Read 12 books" />
    </label>

    <label>
      Description (optional)
      <textarea bind:value={description} placeholder="Optional details..."></textarea>
    </label>

    {#if goalType === 'numeric'}
      <label>
        Target
        <input type="number" bind:value={target} min="1" />
      </label>
    {/if}

    {#if goalType === 'checklist'}
      <div class="subtasks">
        <span class="subtasks-label">Sub-tasks</span>
        {#each subtasks as _, i}
          <div class="subtask-row">
            <input type="text" bind:value={subtasks[i]} placeholder="Sub-task name" />
            {#if subtasks.length > 1}
              <button class="remove-btn" onclick={() => removeSubtask(i)}>✕</button>
            {/if}
          </div>
        {/each}
        <button class="add-btn" onclick={addSubtask}>+ Add sub-task</button>
      </div>
    {/if}

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <div class="actions">
      <button class="cancel" onclick={onClose} disabled={submitting}>Cancel</button>
      <button class="submit" onclick={handleSubmit} disabled={submitting}>
        {submitting ? 'Creating...' : 'Create'}
      </button>
    </div>
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
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 85vh;
    overflow-y: auto;
  }

  h2 {
    margin: 0;
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
  }

  .tabs button {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: white;
    cursor: pointer;
  }

  .tabs button.active {
    background: #c8f0c8;
    border-color: #9bd89b;
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

  .subtasks {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .subtasks-label {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .subtask-row {
    display: flex;
    gap: 0.4rem;
  }

  .subtask-row input {
    flex: 1;
  }

  .remove-btn,
  .add-btn {
    border: 1px solid #ccc;
    border-radius: 6px;
    background: white;
    cursor: pointer;
  }

  .remove-btn {
    padding: 0 0.6rem;
  }

  .add-btn {
    padding: 0.4rem;
    font-size: 0.9rem;
    align-self: flex-start;
  }

  .error {
    color: #d32f2f;
    margin: 0;
    font-size: 0.9rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .actions button {
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

  .actions button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>