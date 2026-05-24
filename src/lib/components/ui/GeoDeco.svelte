<!-- Floating geometric SVG decoration — abstract lines, circles, squares -->
<svg
  class="geo-deco"
  viewBox="0 0 400 400"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <!-- Outer ring -->
  <circle cx="200" cy="200" r="160" stroke="currentColor" stroke-width="0.75" stroke-dasharray="6 10" opacity="0.25"/>
  <!-- Inner ring -->
  <circle cx="200" cy="200" r="100" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
  <!-- Cross lines -->
  <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.12"/>
  <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" stroke-width="0.5" opacity="0.12"/>
  <!-- Diagonal lines -->
  <line x1="87" y1="87" x2="313" y2="313" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 8" opacity="0.1"/>
  <line x1="313" y1="87" x2="87" y2="313" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 8" opacity="0.1"/>
  <!-- Corner squares -->
  <rect x="170" y="170" width="60" height="60" stroke="currentColor" stroke-width="0.75" opacity="0.2" transform="rotate(45 200 200)"/>
  <!-- Small accent dots -->
  <circle cx="200" cy="40" r="3" fill="currentColor" opacity="0.3"/>
  <circle cx="200" cy="360" r="3" fill="currentColor" opacity="0.3"/>
  <circle cx="40" cy="200" r="3" fill="currentColor" opacity="0.3"/>
  <circle cx="360" cy="200" r="3" fill="currentColor" opacity="0.3"/>
  <!-- Arc segment -->
  <path d="M 200 60 A 140 140 0 0 1 340 200" stroke="currentColor" stroke-width="1" opacity="0.18" stroke-linecap="round"/>
</svg>

<style>
  .geo-deco {
    color: var(--text-muted);
    pointer-events: none;
    user-select: none;
    width: 100%;
    height: 100%;
  }
</style>
