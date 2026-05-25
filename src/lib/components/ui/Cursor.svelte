<script lang="ts">
  import { onMount } from 'svelte';

  let ring: HTMLDivElement;
  let dot: HTMLDivElement;

  onMount(() => {
    // Gunakan DOM langsung — hindari Svelte reactivity di hot path
    let x = 0, y = 0, dotX = 0, dotY = 0;
    let visible = false, raf: number;
    let lastTarget: EventTarget | null = null;

    const show = () => {
      if (!visible) {
        visible = true;
        ring.style.opacity = '1';
        dot.style.opacity = '1';
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      show();
      
      // Gunakan translate3d untuk akselerasi hardware
      ring.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;

      // Optimasi: Hanya cek hover jika element target berubah (menghindari traversal DOM terus menerus)
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const el = e.target as HTMLElement;
        const isHover = !!(el?.closest('a, button, [role="button"], input, textarea, select, label'));
        ring.classList.toggle('hovering', isHover);
      }
    };

    const onDown = () => { dot.classList.add('clicking'); ring.classList.add('clicking'); };
    const onUp   = () => { dot.classList.remove('clicking'); ring.classList.remove('clicking'); };
    const onLeave = () => { ring.style.opacity = '0'; dot.style.opacity = '0'; visible = false; };
    const onEnter = () => show();

    const animate = () => {
      dotX += (x - dotX) * 0.15;
      dotY += (y - dotY) * 0.15;
      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  });
</script>

<div bind:this={dot} class="cursor-dot" aria-hidden="true"></div>
<div bind:this={ring} class="cursor-ring" aria-hidden="true"></div>

<style>
  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    border-radius: 50%;
    will-change: transform;
    opacity: 0;
  }

  .cursor-dot {
    width: 8px; height: 8px;
    background: var(--cursor-color);
    transition: transform 0ms, opacity 150ms ease, width 150ms ease, height 150ms ease;
  }

  .cursor-ring {
    width: 40px; height: 40px;
    border: 1.5px solid var(--cursor-color);
    opacity: 0;
    /* transform: no transition — ring segera ikut mouse */
    transition: opacity 150ms ease, width 200ms ease, height 200ms ease, border-color 200ms ease;
  }

  :global(.cursor-dot.clicking) { width: 5px; height: 5px; }

  :global(.cursor-ring.hovering) { width: 52px; height: 52px; opacity: 0.5 !important; }
  :global(.cursor-ring.clicking) { width: 30px; height: 30px; }

  :global(.cursor-ring) { opacity: 0.35; }

  @media (pointer: coarse) {
    .cursor-dot, .cursor-ring { display: none; }
  }
</style>
