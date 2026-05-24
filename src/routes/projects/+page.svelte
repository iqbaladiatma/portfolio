<script lang="ts">
  import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { portfolioData } from '$lib/data/portfolio';

  const allTags = [...new Set(portfolioData.projects.flatMap(p => p.tags))];
  let activeTag = $state('All');

  const filtered = $derived(
    activeTag === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter(p => p.tags.includes(activeTag))
  );
</script>

<svelte:head>
  <title>Projects | Iqbal Muhammad Adiatma</title>
  <meta name="description" content="Explore projects built by Iqbal Muhammad Adiatma using SvelteKit, Laravel, and Flutter.">
</svelte:head>

<div class="page">
  <Reveal>
    <div class="page-header">
      <span class="label">Portfolio</span>
      <h1>Projects</h1>
      <p>A collection of work spanning web, mobile, and blockchain development.</p>
    </div>
  </Reveal>

  <Reveal delay={100}>
    <div class="filter-bar" role="group" aria-label="Filter by tag">
      <button
        class="filter-btn"
        class:active={activeTag === 'All'}
        onclick={() => activeTag = 'All'}
      >
        All <span class="count">{portfolioData.projects.length}</span>
      </button>
      {#each allTags as tag}
        <button
          class="filter-btn"
          class:active={activeTag === tag}
          onclick={() => activeTag = tag}
        >
          {tag}
        </button>
      {/each}
    </div>
  </Reveal>

  <div class="grid">
    {#each filtered as project, i (project.title)}
      <Reveal delay={i * 60}>
        <ProjectCard {...project} />
      </Reveal>
    {/each}
  </div>

  {#if filtered.length === 0}
    <div class="empty">No projects found for this filter.</div>
  {/if}
</div>

<style>
  .page {
    padding: 4rem 0 6rem;
  }

  .page-header {
    margin-bottom: 3rem;
    max-width: 560px;
  }

  .label {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-color);
    margin-bottom: 0.75rem;
    font-family: var(--font-mono);
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border);
  }

  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.9rem;
    border-radius: 99px;
    font-size: 0.8125rem;
    font-weight: 500;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    background: transparent;
    transition: var(--transition-fast);
    cursor: pointer;
    font-family: inherit;
  }

  .filter-btn:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
    background: var(--bg-secondary);
  }

  .filter-btn.active {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }

  .count {
    font-size: 0.7rem;
    font-family: var(--font-mono);
    opacity: 0.7;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .empty {
    text-align: center;
    padding: 4rem 0;
    color: var(--text-muted);
    font-size: 0.9375rem;
  }

  @media (max-width: 640px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
