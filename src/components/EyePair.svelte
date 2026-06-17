<script>
  import { onMount, onDestroy } from 'svelte';

  const EYE_SIZE = 204;
  const PUPIL_RADIUS = 38;
  const SCALE = 80 / EYE_SIZE; // 0.392

  const leftDefault = { x: (74.8272 - 102) * SCALE, y: (78.3184 - 102) * SCALE };
  const rightDefault = { x: (119.032 - 102) * SCALE, y: (117.787 - 102) * SCALE };

  let leftPos = $state({ ...leftDefault });
  let rightPos = $state({ ...rightDefault });

  let leftTarget = { ...leftDefault };
  let rightTarget = { ...rightDefault };

  /** @type {HTMLDivElement | null} */
  let leftEyeEl = $state(null);
  /** @type {HTMLDivElement | null} */
  let rightEyeEl = $state(null);

  let rafId = 0;
  const EASE = 0.12; // lower = slower/smoother, higher = snappier

  /**
   * @param {number} a
   * @param {number} b
   * @param {number} t
   */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /**
   * @param {HTMLDivElement} eyeEl
   * @param {{x: number, y: number}} defaultPos
   * @param {number} clientX
   * @param {number} clientY
   */
  function computePupil(eyeEl, defaultPos, clientX, clientY) {
    const rect = eyeEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const PUPIL_RADIUS_SCALED = PUPIL_RADIUS * SCALE;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const eyeRadius = rect.width / 2;
    const maxMovement = eyeRadius - PUPIL_RADIUS_SCALED - 5;

    if (distance < 1) {
      return { x: defaultPos.x, y: defaultPos.y };
    }

    const nx = dx / distance;
    const ny = dy / distance;

    let moveX = Math.min(distance, maxMovement) * nx + defaultPos.x;
    let moveY = Math.min(distance, maxMovement) * ny + defaultPos.y;

    const totalDistance = Math.sqrt(
      Math.pow(moveX - defaultPos.x, 2) + Math.pow(moveY - defaultPos.y, 2)
    );

    if (totalDistance > maxMovement) {
      const scale = maxMovement / totalDistance;
      moveX = defaultPos.x + (moveX - defaultPos.x) * scale;
      moveY = defaultPos.y + (moveY - defaultPos.y) * scale;
    }

    return { x: moveX, y: moveY };
  }

  function tick() {
    leftPos = {
      x: lerp(leftPos.x, leftTarget.x, EASE),
      y: lerp(leftPos.y, leftTarget.y, EASE),
    };
    rightPos = {
      x: lerp(rightPos.x, rightTarget.x, EASE),
      y: lerp(rightPos.y, rightTarget.y, EASE),
    };
    rafId = requestAnimationFrame(tick);
  }

  /** @param {MouseEvent} e */
  function handleMouseMove(e) {
    if (leftEyeEl) leftTarget = computePupil(leftEyeEl, leftDefault, e.clientX, e.clientY);
    if (rightEyeEl) rightTarget = computePupil(rightEyeEl, rightDefault, e.clientX, e.clientY);
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(rafId);
  });
</script>

<div class="eyes-row">
  <div bind:this={leftEyeEl} class="eye">
    <div
      class="pupil"
      style="transform: translate(-50%, -50%) translate({leftPos.x}px, {leftPos.y}px)"
    ></div>
  </div>
  <div bind:this={rightEyeEl} class="eye">
    <div
      class="pupil"
      style="transform: translate(-50%, -50%) translate({rightPos.x}px, {rightPos.y}px)"
    ></div>
  </div>
</div>

<style>
  .eyes-row {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
  }

  .eye {
    position: relative;
    flex-shrink: 0;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background: var(--eyes-bg);
    overflow: hidden;
  }

  .pupil {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--eyes-pupil);
  }
</style>