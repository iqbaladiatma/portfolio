<script lang="ts">
  interface Props {
    cols?: number;
    rows?: number;
    size?: number;
    gap?: number;
    opacity?: number;
  }
  let props: Props = $props();

  const cols = $derived(props.cols ?? 12);
  const rows = $derived(props.rows ?? 8);
  const size = $derived(props.size ?? 1.5);
  const gap = $derived(props.gap ?? 24);
  const opacity = $derived(props.opacity ?? 0.35);

  const w = $derived(cols * gap);
  const h = $derived(rows * gap);
  const id = `dg-${Math.random().toString(36).slice(2, 7)}`;
</script>

<svg
  class="dot-grid"
  width={w}
  height={h}
  viewBox="0 0 {w} {h}"
  aria-hidden="true"
  style="opacity: {opacity}"
>
  <defs>
    <pattern id={id} x="0" y="0" width={gap} height={gap} patternUnits="userSpaceOnUse">
      <circle cx={gap / 2} cy={gap / 2} r={size} fill="currentColor" />
    </pattern>
  </defs>
  <rect width={w} height={h} fill="url(#{id})" />
</svg>

<style>
  .dot-grid {
    color: var(--text-muted);
    pointer-events: none;
    user-select: none;
  }
</style>
