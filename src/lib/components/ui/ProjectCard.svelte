<script lang="ts">
  interface Props {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    link?: string;
    featured?: boolean;
    year?: string;
    color?: string;
    image?: string;
  }

  let { slug, title, description, tags, featured = false, year, color = '#6366f1', image }: Props = $props();
</script>

<a href="/projects/{slug}" class="card" class:featured>
  {#if image}
    <div class="card-image">
      <img src={image} alt={title} loading="lazy" />
    </div>
  {:else}
    <div class="card-image card-image--placeholder" style="--c: {color}"></div>
  {/if}

  <div class="card-head">
    <div class="card-meta">
      {#if year}<span class="year">{year}</span>{/if}
      {#if featured}
        <span class="badge-feat">★ Featured</span>
      {/if}
    </div>
    <div class="arrow">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
      </svg>
    </div>
  </div>

  <div class="card-body">
    <div class="color-dot" style="background:{color}"></div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>

  <div class="card-foot">
    {#each tags.slice(0,4) as tag}
      <span class="tag">{tag}</span>
    {/each}
  </div>
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
  }

  .card:hover {
    border-color: var(--border-strong);
  }

  .card-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    flex-shrink: 0;
    border-bottom: 1px solid var(--border);
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .card:hover .card-image img {
    transform: scale(1.04);
  }

  .card-image--placeholder {
    background: linear-gradient(135deg, color-mix(in srgb, var(--c) 12%, var(--bg-secondary)), color-mix(in srgb, var(--c) 4%, var(--bg-secondary)));
    position: relative;
  }

  .card-image--placeholder::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 50%, color-mix(in srgb, var(--c) 20%, transparent), transparent 60%);
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem 0;
  }

  .card-meta { display: flex; align-items: center; gap: 0.5rem; }

  .year {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .badge-feat {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    background: var(--accent-soft);
    border-radius: 99px;
    color: var(--accent-color);
  }

  .arrow {
    color: var(--text-muted);
  }

  .card-body {
    flex: 1;
    padding: 1rem 1.25rem;
  }

  .color-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .card-foot {
    padding: 0.875rem 1.25rem;
    border-top: 1px solid var(--border);
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    border-radius: 0.25rem;
  }
</style>
