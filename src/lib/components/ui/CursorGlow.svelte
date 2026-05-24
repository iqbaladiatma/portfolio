<script lang="ts">
  import { onMount } from 'svelte';

  let x = $state(-999);
  let y = $state(-999);
  let active = $state(false);

  onMount(() => {
    let nx = 0, ny = 0;
    let pending = false;
    const flush = () => { x = nx; y = ny; active = true; pending = false; };
    const onMove = (e: MouseEvent) => {
      nx = e.clientX; ny = e.clientY;
      if (!pending) { pending = true; requestAnimationFrame(flush); }
    };
    const onLeave = () => { active = false; };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  });
</script>

<div
  class="cursor-glow"
  class:active
  style="transform: translate({x - 300}px, {y - 300}px)"
  aria-hidden="true"
></div>

<style>
  .cursor-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%);
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    will-change: transform;
    transition: opacity 0.5s ease;
  }

  .cursor-glow.active { opacity: 1; }

  :global([data-theme="dark"]) .cursor-glow {
    background: radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 65%);
  }

  @media (prefers-reduced-motion: reduce) {
    .cursor-glow { display: none; }
  }
</style>
