<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'none';
    children: import('svelte').Snippet;
  }

  let { delay = 0, direction = 'up', children }: Props = $props();

  let el = $state<HTMLElement | null>(null);
  let visible = $state(false);

  onMount(() => {
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { visible = true; obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<div
  bind:this={el}
  class="reveal"
  class:visible
  class:up={direction === 'up'}
  class:left={direction === 'left'}
  class:right={direction === 'right'}
  style="transition-delay: {delay}ms"
>
  {@render children()}
</div>

<style>
  .reveal {
    opacity: 0;
    transition:
      opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .reveal.up    { transform: translateY(28px); }
  .reveal.left  { transform: translateX(-28px); }
  .reveal.right { transform: translateX(28px); }

  .reveal.visible {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  }
</style>
