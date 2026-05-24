<script lang="ts">
  import { onMount } from 'svelte';

  let fill: HTMLDivElement;
  let backBtn: HTMLButtonElement;

  onMount(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;

      // DOM langsung — tidak trigger Svelte reactivity
      fill.style.width = `${pct}%`;

      if (scrolled > 400) {
        backBtn.style.opacity = '1';
        backBtn.style.pointerEvents = 'auto';
      } else {
        backBtn.style.opacity = '0';
        backBtn.style.pointerEvents = 'none';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div class="progress-bar" aria-hidden="true">
  <div class="progress-fill" bind:this={fill}></div>
</div>

<button
  bind:this={backBtn}
  class="back-top"
  onclick={scrollTop}
  aria-label="Back to top"
  style="opacity: 0; pointer-events: none;"
>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>
  </svg>
</button>

<style>
  .progress-bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    z-index: 200;
  }

  .progress-fill {
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, var(--accent-color), #9580ff, #ec4899);
    box-shadow: 0 0 8px rgba(124,106,247,0.6);
  }

  .back-top {
    position: fixed;
    bottom: 2rem; right: 2rem;
    width: 38px; height: 38px;
    border: 1px solid var(--border-strong);
    border-radius: 0.6rem;
    background: var(--bg-secondary);
    backdrop-filter: blur(12px);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 50;
    transition: opacity 200ms ease, transform 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  .back-top:hover {
    color: var(--accent-color);
    border-color: var(--accent-border);
    box-shadow: 0 4px 16px rgba(124,106,247,0.25);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .back-top { bottom: 1.5rem; right: 1.5rem; }
  }
</style>
