<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { paper, prev, next } = $derived(data);

  let activeTab = $state<'bibtex' | 'ris'>('bibtex');
  let copied = $state(false);
  let activeSection = $state('abstract');

  function copyCitation(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }

  function handleTOCClick(e: MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activeSection = id;
    }
  }

  // Generate ID from headings
  function getHeadingId(heading: string): string {
    return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
</script>

<svelte:head>
  <title>{paper.title} | Research</title>
  <meta name="description" content={paper.abstract.substring(0, 155) + '...'}>
</svelte:head>

<div class="page">
  <!-- Back navigation -->
  <Reveal>
    <a href="/research" class="back-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Back to Research
    </a>
  </Reveal>

  <!-- Article Header -->
  <Reveal delay={50}>
    <header class="article-header">
      <div class="meta-row">
        <span class="type-tag">{paper.type}</span>
        {#if paper.journal}
          <span class="journal-name">{paper.journal}</span>
        {/if}
      </div>
      <h1>{paper.title}</h1>
      <div class="authors-list">
        {paper.authors.join(', ')}
      </div>
      <p class="affiliation">{paper.affiliation}</p>

      {#if paper.doi}
        <div class="doi-row">
          <span class="doi-label">DOI:</span>
          <a href="https://doi.org/{paper.doi}" target="_blank" rel="noopener noreferrer" class="doi-link">
            https://doi.org/{paper.doi}
          </a>
        </div>
      {/if}
    </header>
  </Reveal>

  <!-- Layout Container -->
  <div class="article-layout">
    <!-- Main Column -->
    <main class="article-body">
      <!-- Abstract Section -->
      <Reveal delay={100}>
        <section id="abstract" class="section abstract-section">
          <h2>Abstract</h2>
          <p>{paper.abstract}</p>
          <div class="keywords">
            <strong>Keywords:</strong>
            {#each paper.keywords as keyword}
              <span class="keyword">{keyword}</span>
            {/each}
          </div>
        </section>
      </Reveal>

      <!-- Full Text Sections -->
      {#each paper.sections as sec, idx}
        <Reveal delay={120 + idx * 40}>
          <section id={getHeadingId(sec.heading)} class="section paper-section">
            <h2>{sec.heading}</h2>
            {#each sec.paragraphs as para}
              <p>{para}</p>
            {/each}
          </section>
        </Reveal>
      {/each}

      <!-- References -->
      <Reveal delay={200}>
        <section id="references" class="section references-section">
          <h2>References</h2>
          <ol class="references-list">
            {#each paper.references as ref}
              <li>{ref}</li>
            {/each}
          </ol>
        </section>
      </Reveal>

      <!-- Article Navigation -->
      <Reveal delay={220}>
        <div class="paper-nav">
          {#if prev}
            <a href="/research/{prev.slug}" class="nav-button prev">
              <span class="nav-label">← Previous Paper</span>
              <span class="nav-title">{prev.title}</span>
            </a>
          {:else}
            <div class="nav-placeholder"></div>
          {/if}

          {#if next}
            <a href="/research/{next.slug}" class="nav-button next">
              <span class="nav-label">Next Paper →</span>
              <span class="nav-title">{next.title}</span>
            </a>
          {:else}
            <div class="nav-placeholder"></div>
          {/if}
        </div>
      </Reveal>
    </main>

    <!-- Sidebar Column -->
    <aside class="article-sidebar">
      <Reveal delay={150}>
        <!-- Table of Contents -->
        <div class="sidebar-widget toc-widget">
          <h3>On This Page</h3>
          <nav class="toc-links">
            <a 
              href="#abstract" 
              class="toc-link" 
              class:active={activeSection === 'abstract'} 
              onclick={(e) => handleTOCClick(e, 'abstract')}
            >
              Abstract
            </a>
            {#each paper.sections as sec}
              {@const id = getHeadingId(sec.heading)}
              <a 
                href="#{id}" 
                class="toc-link" 
                class:active={activeSection === id} 
                onclick={(e) => handleTOCClick(e, id)}
              >
                {sec.heading}
              </a>
            {/each}
            <a 
              href="#references" 
              class="toc-link" 
              class:active={activeSection === 'references'} 
              onclick={(e) => handleTOCClick(e, 'references')}
            >
              References
            </a>
          </nav>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <!-- Resource Links & Metrics -->
        <div class="sidebar-widget resources-widget">
          <h3>Resources & Index</h3>
          
          {#if paper.metrics}
            <div class="metrics-grid">
              <div class="metric-card">
                <span class="metric-val">{paper.metrics.citations}</span>
                <span class="metric-lbl">Citations</span>
              </div>
              <div class="metric-card">
                <span class="metric-val">Peer</span>
                <span class="metric-lbl">Reviewed</span>
              </div>
            </div>
          {/if}

          <div class="links-list">
            {#if paper.links.journalUrl}
              <a href={paper.links.journalUrl} target="_blank" rel="noopener noreferrer" class="resource-link primary-btn">
                View Original Publisher
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            {/if}
            {#if paper.links.github}
              <a href={paper.links.github} target="_blank" rel="noopener noreferrer" class="resource-link secondary-btn">
                View Source Code
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            {/if}
          </div>
        </div>
      </Reveal>

      <Reveal delay={210}>
        <!-- Citation Exporter -->
        <div class="sidebar-widget citation-widget">
          <div class="citation-header">
            <h3>Cite This Paper</h3>
            <div class="tabs">
              <button 
                class="tab-btn" 
                class:active={activeTab === 'bibtex'} 
                onclick={() => activeTab = 'bibtex'}
              >
                BibTeX
              </button>
              <button 
                class="tab-btn" 
                class:active={activeTab === 'ris'} 
                onclick={() => activeTab = 'ris'}
              >
                RIS
              </button>
            </div>
          </div>

          <div class="citation-content">
            <pre class="citation-code"><code>{activeTab === 'bibtex' ? paper.citations.bibtex : paper.citations.ris}</code></pre>
            <button 
              class="copy-btn" 
              onclick={() => copyCitation(activeTab === 'bibtex' ? paper.citations.bibtex : paper.citations.ris)}
            >
              {#if copied}
                <span class="success-text">Copied!</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="checkmark">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              {:else}
                <span>Copy to Clipboard</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              {/if}
            </button>
          </div>
        </div>
      </Reveal>
    </aside>
  </div>
</div>

<style>
  .page {
    padding: 3rem 0 6rem;
    max-width: 1120px;
    margin: 0 auto;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    transition: color 0.15s ease;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .back-link:hover {
    color: var(--accent-color);
  }

  /* Article Header */
  .article-header {
    border-bottom: 1px solid var(--border);
    padding-bottom: 2rem;
    margin-bottom: 3rem;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .type-tag {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: var(--accent-soft);
    color: var(--accent-color);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
  }

  .journal-name {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  h1 {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: var(--text-primary);
    line-height: 1.25;
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .authors-list {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .affiliation {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .doi-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
  }

  .doi-label {
    font-weight: 600;
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }

  .doi-link {
    color: var(--text-muted);
    transition: color 0.15s ease;
  }

  .doi-link:hover {
    color: var(--accent-color);
  }

  /* Two Column Layout */
  .article-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 3.5rem;
    align-items: start;
  }

  /* Main Column */
  .article-body {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .section h2 {
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  .section p {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }

  .section p:last-child {
    margin-bottom: 0;
  }

  /* Abstract Specific */
  .abstract-section {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.75rem;
  }

  .abstract-section p {
    font-size: 0.95rem;
    font-style: italic;
    color: var(--text-secondary);
    line-height: 1.75;
  }

  .keywords {
    margin-top: 1.5rem;
    font-size: 0.8125rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .keywords strong {
    color: var(--text-primary);
  }

  .keywords .keyword {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
  }

  /* References */
  .references-list {
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .references-list li {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  /* Paper Navigation */
  .paper-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    border-top: 1px solid var(--border);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .nav-button {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    transition: border-color 0.2s, background 0.2s;
    text-decoration: none;
  }

  .nav-button:hover {
    border-color: var(--border-strong);
    background: var(--bg-secondary);
  }

  .nav-button.prev {
    align-items: flex-start;
  }

  .nav-button.next {
    align-items: flex-end;
    text-align: right;
  }

  .nav-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-bottom: 0.35rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .nav-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .nav-button:hover .nav-title {
    color: var(--accent-color);
  }

  .nav-placeholder {
    pointer-events: none;
  }

  /* Sidebar */
  .article-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    position: sticky;
    top: 2rem;
  }

  .sidebar-widget {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.25rem;
  }

  .sidebar-widget h3 {
    font-size: 0.8125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-family: var(--font-mono);
  }

  /* Table of Contents */
  .toc-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .toc-link {
    font-size: 0.875rem;
    color: var(--text-muted);
    padding: 0.25rem 0;
    border-left: 2px solid transparent;
    padding-left: 0.75rem;
    transition: color 0.15s, border-color 0.15s;
  }

  .toc-link:hover {
    color: var(--text-primary);
  }

  .toc-link.active {
    color: var(--accent-color);
    border-color: var(--accent-color);
    font-weight: 500;
  }

  /* Resources & Metrics */
  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .metric-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 0.75rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .metric-val {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-mono);
  }

  .metric-lbl {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.15rem;
  }

  .links-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .resource-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
    text-align: center;
    transition: var(--transition-fast);
  }

  .resource-link.primary-btn {
    background: var(--accent-color);
    color: white;
  }

  .resource-link.primary-btn:hover {
    background: var(--accent-hover);
  }

  .resource-link.secondary-btn {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }

  .resource-link.secondary-btn:hover {
    border-color: var(--border-strong);
    background: var(--bg-secondary);
  }

  /* Citation Widget */
  .citation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .citation-header h3 {
    margin-bottom: 0;
  }

  .tabs {
    display: flex;
    background: var(--bg-tertiary);
    padding: 0.15rem;
    border-radius: 0.375rem;
    border: 1px solid var(--border);
  }

  .tab-btn {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 0.25rem;
    color: var(--text-muted);
    transition: color 0.15s, background 0.15s;
  }

  .tab-btn.active {
    background: var(--bg-card);
    color: var(--text-primary);
    box-shadow: var(--shadow-sm);
  }

  .citation-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .citation-code {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 0.75rem;
    overflow-x: auto;
    max-height: 180px;
    white-space: pre;
    text-align: left;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.45rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    background: var(--bg-card);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-primary);
    transition: var(--transition-fast);
  }

  .copy-btn:hover {
    border-color: var(--border-strong);
    background: var(--bg-secondary);
  }

  .copy-btn .success-text {
    color: var(--green);
  }

  .copy-btn .checkmark {
    color: var(--green);
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .article-layout {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .article-sidebar {
      position: static;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .toc-widget {
      display: none; /* Hide TOC on mobile/tablet */
    }
  }

  @media (max-width: 768px) {
    .article-sidebar {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .paper-nav {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .nav-button.next {
      align-items: flex-start;
      text-align: left;
    }

    .nav-placeholder {
      display: none;
    }
  }
</style>
