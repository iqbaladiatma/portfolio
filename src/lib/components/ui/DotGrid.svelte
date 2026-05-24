<script lang="ts">
  interface Props {
    cols?: number;
    rows?: number;
    size?: number;
    gap?: number;
    opacity?: number;
  }
  let { cols = 12, rows = 8, size = 1.5, gap = 24, opacity = 0.35 }: Props = $props();

  const w = cols * gap;
  const h = rows * gap;
  // ID unik agar pattern tidak konflik kalau ada beberapa DotGrid
  const id = `dg-${Math.random().toString(36).slice(2, 7)}`;
</script>

<!-- Satu <pattern> jauh lebih ringan dari ratusan <circle> individual -->
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
