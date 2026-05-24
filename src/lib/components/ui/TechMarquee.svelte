<script lang="ts">
  const row1 = [
    { name: 'Laravel',     color: '#ef4444' },
    { name: 'SvelteKit',   color: '#ff6b35' },
    { name: 'TypeScript',  color: '#3b82f6' },
    { name: 'Flutter',     color: '#06b6d4' },
    { name: 'PostgreSQL',  color: '#6366f1' },
    { name: 'Redis',       color: '#ef4444' },
    { name: 'Docker',      color: '#2563eb' },
    { name: 'Tailwind',    color: '#0ea5e9' },
    { name: 'PHP',         color: '#8b5cf6' },
    { name: 'Go',          color: '#14b8a6' },
  ];

  const row2 = [
    { name: 'Solidity',    color: '#6366f1' },
    { name: 'Cosmos SDK',  color: '#8b5cf6' },
    { name: 'Solana',      color: '#10b981' },
    { name: 'Web3.js',     color: '#f59e0b' },
    { name: 'MySQL',       color: '#f59e0b' },
    { name: 'Nginx',       color: '#16a34a' },
    { name: 'Figma',       color: '#ec4899' },
    { name: 'Git',         color: '#ef4444' },
    { name: 'REST API',    color: '#0ea5e9' },
    { name: 'WebSocket',   color: '#8b5cf6' },
  ];
</script>

<div class="marquee-root" aria-label="Tech stack">
  <!-- Row 1 → forward -->
  <div class="track-wrap">
    <div class="track fwd">
      {#each [...row1, ...row1, ...row1] as t}
        <span class="chip" style="--c:{t.color}">
          <span class="dot" style="background:{t.color}"></span>
          {t.name}
        </span>
      {/each}
    </div>
  </div>

  <!-- Row 2 ← reverse -->
  <div class="track-wrap">
    <div class="track rev">
      {#each [...row2, ...row2, ...row2] as t}
        <span class="chip" style="--c:{t.color}">
          <span class="dot" style="background:{t.color}"></span>
          {t.name}
        </span>
      {/each}
    </div>
  </div>
</div>

<style>
  .marquee-root {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow: hidden;
    padding: 0.25rem 0;
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }

  .track-wrap { overflow: hidden; }

  .track {
    display: flex;
    gap: 0.625rem;
    width: max-content;
  }

  .fwd { animation: scrollFwd 28s linear infinite; }
  .rev { animation: scrollRev 32s linear infinite; }

  .marquee-root:hover .fwd,
  .marquee-root:hover .rev { animation-play-state: paused; }

  @keyframes scrollFwd {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); }
  }

  @keyframes scrollRev {
    from { transform: translateX(-33.333%); }
    to   { transform: translateX(0); }
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.875rem;
    border-radius: 99px;
    font-size: 0.78rem;
    font-weight: 500;
    white-space: nowrap;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    transition: border-color 0.2s ease, color 0.2s ease;
    cursor: default;
    user-select: none;
  }

  .chip:hover {
    border-color: var(--c);
    color: var(--c);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    opacity: 0.85;
  }

  @media (prefers-reduced-motion: reduce) {
    .fwd, .rev { animation: none; }
  }
</style>
