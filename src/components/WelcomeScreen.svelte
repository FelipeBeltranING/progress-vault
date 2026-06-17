<script>
  
  import EyePair from './EyePair.svelte';
  /** @type {{ onGoals: () => void, onSettings: () => void, navGoalsRect: () => DOMRect | null }} */
  let { onGoals, onSettings, navGoalsRect } = $props();

  let animating = $state(false);
  let translateX = $state(0);
  let translateY = $state(0);

  /** @type {HTMLButtonElement | null} */
  let btnEl = $state(null);

  function handleGoals() {
    if (btnEl) {
      const btnRect = btnEl.getBoundingClientRect();
      const target = navGoalsRect();

      if (target) {
        const btnCenterY = btnRect.top + btnRect.height / 2;
        const targetCenterY = target.top + target.height / 2;
        translateX = 0;
        translateY = targetCenterY - btnCenterY;
      }
    }

    animating = true;
    setTimeout(() => {
      onGoals();
      animating = false;
    }, 350);
  }
</script>

<div class="screen" >

  <div class="inner" class:fading={animating}>
  <div class="flap">
    <svg
      viewBox="0 0 1000 210"
      preserveAspectRatio="none"
      aria-hidden="true"
      class="flap-svg"
    >
      <path
        d="M 0 0 C 0 175, 100 175, 220 175 L 780 175 C 900 175, 1000 175, 1000 0"
        fill="none"
        stroke="var(--color-border)"
        stroke-width="2.5"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
      />
    </svg>

  <button
  bind:this={btnEl}
  class="goals-btn"
  class:animating
  style="--translate-x: {translateX}px; --translate-y: {translateY}px"
  onclick={handleGoals}
>
  Goals
</button>
  </div>

  <!-- Content -->
  <main class="content">
    <h1 class="welcome-text">
      <span class="welcome-bold">Progress Vault</span>
    </h1>

    <!-- Eyes that follow the mouse -->
<div class="placeholder">
  <EyePair />
</div>

  </main>
    </div>

  <!-- Settings gear -->
  <button class="settings-btn" onclick={onSettings} aria-label="Settings">
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33
               1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33
               l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4
               h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06
               A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51
               a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9
               a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  </button>

</div>



<style>
 .screen {
  height: 100vh;
  width: 100vw;
  background: var(--color-bg);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

  .flap {
    position: relative;
    flex-shrink: 0;
    height: 200px;
  }

  .flap-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }

  .goals-btn {
     min-width: 160px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px 52px;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-btn);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-base);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.12em;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

.goals-btn:hover {
  background: var(--color-bg-hover);
  transform: translate(-50%, -50%) scale(1.04);
}

.goals-btn:active {
  transform: translate(-50%, -50%) scale(0.97);
}

/* Animation: button floats up to where the navbar will be */
.goals-btn.animating {
  transform: translate(
    calc(-50% + var(--translate-x)),
    calc(-50% + var(--translate-y))
  );
  pointer-events: none;
}

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding-bottom: 48px;
  }

  .welcome-text {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -0.01em;
    color: var(--color-text);
    text-align: center;
    margin: 1rem;
    line-height: 5;
  }

  .welcome-bold {
    font-weight: 700;
  }

  .placeholder {
  width: 240px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .settings-btn {
    position: fixed;
    bottom: 22px;
    right: 22px;
    width: 42px;
    height: 42px;
    border: var(--border-width) solid var(--color-border);
    border-radius: 50%;
    background: var(--color-bg);
    color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.35s ease;
    z-index: 50;
  }

  .settings-btn:hover {
    transform: rotate(60deg);
  }

</style>