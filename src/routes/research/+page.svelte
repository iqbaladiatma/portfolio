<script lang="ts">
  import { researchPapers } from '$lib/data/research';
  import Reveal from '$lib/components/ui/Reveal.svelte';

  const papers = researchPapers;
  let activeFilter = $state('All');

  const filteredPapers = $derived(
    activeFilter === 'All'
      ? papers
      : papers.filter(p => p.type === activeFilter)
  );

  const filters = ['All', 'Journal', 'Case Study', 'Technical Report'];
</script>

<svelte:head>
  <title>Research & Publications | Iqbal Muhammad Adiatma</title>
  <meta name="description" content="Explore academic papers, case studies, and technical reports on Vibe Coding, ISO 9001:2015 digitization, and Sharia fintech by Iqbal Muhammad Adiatma.">
</svelte:head>

<div class="page">
  <Reveal>
    <div class="page-header">
      <span class="label">Academic & Writing</span>
      <h1>Research</h1>
      <p>Investigating software engineering methodologies, quality systems, and sharia-compliant fintech structures.</p>
    </div>
  </Reveal>

  <Reveal delay={80}>
    <div class="filter-bar" role="group" aria-label="Filter by type">
      {#each filters as filter}
        <button
          class="filter-btn"
          class:active={activeFilter === filter}
          onclick={() => activeFilter = filter}
        >
          {filter}
        </button>
      {/each}
    </div>
  </Reveal>

  <div class="papers-grid">
    {#each filteredPapers as paper, i (paper.slug)}
      <Reveal delay={i * 80}>
        <a href="/research/{paper.slug}" class="paper-card">
          <div class="card-head">
            <span class="type-badge type-{paper.type.toLowerCase().replace(' ', '-')}">
              {paper.type}
            </span>
            <span class="date">{new Date(paper.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
          </div>

          <h2 class="title">{paper.title}</h2>
          <p class="excerpt">{paper.abstract}</p>

          <div class="keywords-list">
            {#each paper.keywords.slice(0, 3) as keyword}
              <span class="keyword">#{keyword}</span>
            {/each}
          </div>

          <div class="card-footer">
            <span class="authors">By {paper.authors[0]}</span>
            <span class="read-more">
              Read
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </a>
      </Reveal>
    {/each}
  </div>

  {#if filteredPapers.length === 0}
    <div class="empty">No publications found matching this filter.</div>
  {/if}
</div>

<style>
  .page {
    padding: 4rem 0 6rem;
  }

  .page-header {
    margin-bottom: 3rem;
    max-width: 600px;
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
    font-weight: 700;
    letter-spacing: -0.02em;
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
    margin-bottom: 2.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }

  .filter-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.85rem;
    border-radius: 99px;
    font-size: 0.75rem;
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

  .papers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 1.25rem;
  }

  .paper-card {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    height: 100%;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.2s, 
                box-shadow 0.2s;
    text-decoration: none;
    cursor: pointer;
  }

  .paper-card:hover {
    transform: translateY(-2px);
    border-color: var(--border-strong);
    box-shadow: var(--shadow-md);
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }

  .type-badge {
    font-size: 0.65rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  /* Dynamic color adaptation using color-mix */
  .type-journal {
    background: var(--accent-soft);
    color: var(--accent-color);
  }

  .type-case-study {
    background: color-mix(in srgb, #ca8a04 10%, var(--bg-card));
    color: #ca8a04;
  }

  :global([data-theme="dark"]) .type-case-study {
    background: color-mix(in srgb, #f59e0b 12%, var(--bg-card));
    color: #fbbf24;
  }

  .type-technical-report {
    background: color-mix(in srgb, #8b5cf6 10%, var(--bg-card));
    color: #8b5cf6;
  }

  :global([data-theme="dark"]) .type-technical-report {
    background: color-mix(in srgb, #a78bfa 12%, var(--bg-card));
    color: #c084fc;
  }

  .date {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .title {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
    margin-bottom: 0.5rem;
    transition: color 0.15s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .paper-card:hover .title {
    color: var(--accent-color);
  }

  .excerpt {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .keywords-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 1rem;
  }

  .keyword {
    font-size: 0.6875rem;
    color: var(--text-muted);
    background: var(--bg-tertiary);
    padding: 0.1rem 0.4rem;
    border-radius: 0.25rem;
    font-family: var(--font-mono);
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
    padding-top: 0.75rem;
    margin-top: auto;
    font-size: 0.75rem;
    gap: 0.5rem;
  }

  .authors {
    color: var(--text-muted);
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: var(--text-primary);
    transition: gap 0.2s ease;
    flex-shrink: 0;
  }

  .paper-card:hover .read-more {
    color: var(--accent-color);
    gap: 0.35rem;
  }

  .empty {
    text-align: center;
    padding: 5rem 0;
    color: var(--text-muted);
    font-size: 0.9375rem;
  }
</style>
