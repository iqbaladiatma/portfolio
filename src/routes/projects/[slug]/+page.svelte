<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { project, prev, next } = data;

  const statusColor: Record<string, string> = {
    'Live': '#10b981',
    'Completed': '#3b82f6',
    'In Development': '#f59e0b'
  };

  let activeImage = $state(project.image || '');
  let lightboxOpen = $state(false);

  const allImages = [
    ...(project.image ? [{ image: project.image, title: 'Overview Page' }] : []),
    ...(project.gallery || [])
  ];

  function openLightbox(img: string) {
    activeImage = img;
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
  }
</script>

<svelte:head>
  <title>{project.title} | Iqbal Muhammad Adiatma</title>
  <meta name="description" content={project.description}>
</svelte:head>

<!-- Lightbox Modal -->
{#if lightboxOpen}
  <div class="lightbox" role="dialog" aria-modal="true">
    <button class="lightbox-overlay" onclick={closeLightbox} aria-label="Close lightbox"></button>
    <div class="lightbox-content">
      <button class="lightbox-close" onclick={closeLightbox} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img src={activeImage} alt={project.title} />
    </div>
  </div>
{/if}

<article class="page-container">

  <!-- Floating Ambient background glow -->
  <div class="ambient-glow" style="--glow-color: {project.color || 'var(--accent-color)'};"></div>

  <!-- Breadcrumbs -->
  <Reveal>
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/" class="crumb-link">Home</a>
      <span class="crumb-separator">/</span>
      <a href="/projects" class="crumb-link">Projects</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">{project.title.split('—')[0].trim()}</span>
    </nav>
  </Reveal>

  <!-- Hero Header Section -->
  <Reveal delay={50}>
    <header class="project-header" style="--project-color: {project.color || 'var(--accent-color)'}">
      <div class="header-metadata">
        <span class="meta-badge year">{project.year}</span>
        <span class="meta-badge status" style="
          --badge-color: {statusColor[project.status] ?? 'var(--text-muted)'};
          color: var(--badge-color);
          border-color: color-mix(in srgb, var(--badge-color) 20%, transparent);
          background: color-mix(in srgb, var(--badge-color) 6%, transparent);
        ">
          <span class="status-indicator-dot" style="background: var(--badge-color)"></span>
          {project.status}
        </span>
        {#if project.featured}
          <span class="meta-badge featured">
            <svg class="star-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Featured
          </span>
        {/if}
      </div>

      <h1 class="project-title">{project.title}</h1>
      <p class="project-headline">{project.longDescription || project.description}</p>

      <div class="project-tags">
        {#each project.tags as tag}
          <span class="tag-chip">#{tag}</span>
        {/each}
      </div>

      <div class="project-primary-actions">
        {#if project.link !== '#'}
          <a href={project.link} target="_blank" rel="noopener noreferrer" class="action-btn live-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Launch Live Site
          </a>
        {/if}
        {#if project.github}
          <a href={project.github} target="_blank" rel="noopener noreferrer" class="action-btn code-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Browse Repository
          </a>
        {/if}
      </div>
    </header>
  </Reveal>

  <!-- Large Interactive Browser Mockup / Screenshot -->
  {#if project.image}
    <Reveal delay={100}>
      <section class="main-preview-showcase">
        <button class="mockup-frame" onclick={() => openLightbox(project.image)} aria-label="Open fullscreen screenshot">
          <div class="mockup-chrome-bar">
            <div class="chrome-window-controls">
              <span class="control-dot close"></span>
              <span class="control-dot minimize"></span>
              <span class="control-dot expand"></span>
            </div>
            <div class="chrome-address-bar">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span class="address-text">{project.link !== '#' ? project.link.replace('https://', '').replace('http://', '') : `${project.slug}.dev`}</span>
            </div>
            <div class="chrome-menu-trigger">
              <span class="menu-bullet"></span><span class="menu-bullet"></span><span class="menu-bullet"></span>
            </div>
          </div>
          <div class="mockup-viewport">
            <img src={project.image} alt="{project.title} Core Interface Screenshot" class="showcase-img" />
            <div class="zoom-magnifier-overlay">
              <span class="magnifier-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                Inspect Screen
              </span>
            </div>
          </div>
        </button>
      </section>
    </Reveal>
  {/if}

  <!-- Quick Project Info Panel (Premium Glassmorphism Row) -->
  <Reveal delay={120}>
    <section class="quick-stats-panel">
      <div class="quick-stat-card">
        <div class="stat-icon-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <div class="stat-details">
          <span class="stat-label">Role</span>
          <span class="stat-value">{project.role}</span>
        </div>
      </div>

      <div class="quick-stat-card">
        <div class="stat-icon-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div class="stat-details">
          <span class="stat-label">Duration</span>
          <span class="stat-value">{project.duration}</span>
        </div>
      </div>

      <div class="quick-stat-card">
        <div class="stat-icon-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <div class="stat-details">
          <span class="stat-label">Year</span>
          <span class="stat-value">{project.year}</span>
        </div>
      </div>

      <div class="quick-stat-card">
        <div class="stat-icon-wrapper" style="color: {statusColor[project.status]}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="stat-details">
          <span class="stat-label">Status</span>
          <span class="stat-value" style="color: {statusColor[project.status]}">{project.status}</span>
        </div>
      </div>
    </section>
  </Reveal>

  <!-- Editorial layout: Content + Sticky Sidebar -->
  <div class="editorial-grid">

    <!-- Left Main Column -->
    <main class="editorial-content">

      <!-- Section: Overview -->
      <Reveal>
        <section class="details-section">
          <h2 class="section-title">
            <span class="title-glow" style="background: {project.color || 'var(--accent-color)'}"></span>
            Overview
          </h2>
          <div class="overview-body">
            <p class="intro-paragraph">{project.overview}</p>
          </div>
        </section>
      </Reveal>

      <!-- Section: Key Features -->
      <Reveal delay={60}>
        <section class="details-section">
          <h2 class="section-title">
            <span class="title-glow" style="background: {project.color || 'var(--accent-color)'}"></span>
            Key Features
          </h2>
          <div class="features-list">
            {#each project.features as feature, i}
              <div class="feature-row">
                <span class="feature-number" style="color: {project.color || 'var(--accent-color)'}">{String(i + 1).padStart(2, '0')}</span>
                <div class="feature-desc">
                  <p>{feature}</p>
                </div>
              </div>
            {/each}
          </div>
        </section>
      </Reveal>

      <!-- Section: Dynamic Gallery -->
      {#if project.gallery && project.gallery.length > 0}
        <Reveal delay={80}>
          <section class="details-section">
            <h2 class="section-title">
              <span class="title-glow" style="background: {project.color || 'var(--accent-color)'}"></span>
              System Gallery
            </h2>
            <div class="gallery-layout-grid">
              {#each project.gallery as item, i}
                <button class="gallery-thumbnail-card" onclick={() => openLightbox(item.image)} aria-label="Zoom gallery image">
                  <div class="thumbnail-aspect-wrapper">
                    <img src={item.image} alt={item.title || `Screenshot ${i + 1}`} loading="lazy" />
                    <div class="thumbnail-hover-effect">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                    </div>
                  </div>
                  {#if item.title}
                    <span class="thumbnail-caption">{item.title}</span>
                  {/if}
                </button>
              {/each}
            </div>
          </section>
        </Reveal>
      {/if}

      <!-- Section: Challenges -->
      <Reveal delay={100}>
        <section class="challenge-alert-card" style="--project-color: {project.color || 'var(--accent-color)'}">
          <div class="alert-icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="alert-contents">
            <h3 class="alert-heading">Technical Challenge</h3>
            <p class="alert-body">{project.challenges}</p>
          </div>
        </section>
      </Reveal>

    </main>

    <!-- Right Sidebar Column (Sticky) -->
    <aside class="editorial-sidebar">

      <!-- Tech Stack Box -->
      <Reveal direction="right">
        <div class="sidebar-box">
          <h3 class="sidebar-box-title">
            <svg class="box-title-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            Tech Stack
          </h3>
          <div class="tech-chip-list">
            {#each project.stack as item}
              <div class="tech-chip-item">
                <span class="tech-indicator-dot" style="background: {project.color || 'var(--accent-color)'}"></span>
                <div class="tech-chip-info">
                  <span class="tech-name">{item.name}</span>
                  <span class="tech-role">{item.role}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </Reveal>

      <!-- Useful Links Box -->
      <Reveal direction="right" delay={60}>
        <div class="sidebar-box">
          <h3 class="sidebar-box-title">
            <svg class="box-title-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            Project Links
          </h3>
          <div class="navigation-link-list">
            {#if project.link !== '#'}
              <a href={project.link} target="_blank" rel="noopener noreferrer" class="nav-redirect-link">
                <svg class="redirect-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span class="link-label-txt">Live Demonstration</span>
                <svg class="redirect-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            {/if}
            {#if project.github}
              <a href={project.github} target="_blank" rel="noopener noreferrer" class="nav-redirect-link">
                <svg class="redirect-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                <span class="link-label-txt">GitHub Source Code</span>
                <svg class="redirect-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            {/if}
          </div>
        </div>
      </Reveal>

      <!-- Sidebar Specs List Box -->
      <Reveal direction="right" delay={80}>
        <div class="sidebar-box">
          <h3 class="sidebar-box-title">
            <svg class="box-title-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            System Specs
          </h3>
          <div class="specs-rows">
            <div class="specs-row">
              <span class="specs-key">Primary Role</span>
              <span class="specs-val">{project.role}</span>
            </div>
            <div class="specs-row">
              <span class="specs-key">Timeframe</span>
              <span class="specs-val">{project.duration}</span>
            </div>
            <div class="specs-row">
              <span class="specs-key">Calendar Year</span>
              <span class="specs-val">{project.year}</span>
            </div>
            <div class="specs-row">
              <span class="specs-key">Deployment</span>
              <span class="specs-val" style="color: {statusColor[project.status]}">{project.status}</span>
            </div>
          </div>
        </div>
      </Reveal>

    </aside>

  </div>

  <!-- Previous & Next Project Navigation Row -->
  <Reveal>
    <footer class="pagination-footer" aria-label="Project Navigation">
      {#if prev}
        <a href="/projects/{prev.slug}" class="pagination-card prev-card">
          <span class="nav-direction-label">
            <svg class="dir-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Previous Release
          </span>
          <span class="pagination-title">{prev.title.split('—')[0].trim()}</span>
          {#if prev.image}
            <div class="pagination-thumbnail">
              <img src={prev.image} alt="" loading="lazy" />
              <div class="thumbnail-overlay"></div>
            </div>
          {/if}
        </a>
      {:else}
        <div class="pagination-placeholder"></div>
      {/if}

      {#if next}
        <a href="/projects/{next.slug}" class="pagination-card next-card">
          <span class="nav-direction-label">
            Next Release
            <svg class="dir-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
          <span class="pagination-title">{next.title.split('—')[0].trim()}</span>
          {#if next.image}
            <div class="pagination-thumbnail">
              <img src={next.image} alt="" loading="lazy" />
              <div class="thumbnail-overlay"></div>
            </div>
          {/if}
        </a>
      {:else}
        <div class="pagination-placeholder"></div>
      {/if}
    </footer>
  </Reveal>

</article>

<style>
  /* Base page structure */
  .page-container {
    padding: 2.5rem 0 6rem;
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
  }

  /* Ambient Backdrop Glow */
  .ambient-glow {
    position: absolute;
    top: -120px;
    right: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--glow-color) 12%, transparent) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    filter: blur(40px);
  }

  /* Breadcrumbs styling */
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 2.5rem;
    font-size: 0.8125rem;
    position: relative;
    z-index: 10;
  }

  .crumb-link {
    color: var(--text-muted);
    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
  }

  .crumb-link:hover {
    color: var(--text-primary);
  }

  .crumb-separator {
    color: var(--border-strong);
    font-size: 0.75rem;
    user-select: none;
  }

  .crumb-current {
    color: var(--text-secondary);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }

  /* Project Header Block */
  .project-header {
    position: relative;
    margin-bottom: 3rem;
    z-index: 10;
  }

  .header-metadata {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .meta-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border: 1px solid var(--border);
  }

  .meta-badge.year {
    background: var(--bg-secondary);
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }

  .meta-badge.status {
    letter-spacing: 0.02em;
  }

  .status-indicator-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    animation: statusPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(0.85); }
  }

  .meta-badge.featured {
    background: var(--accent-soft);
    color: var(--accent-color);
    border-color: var(--accent-border);
  }

  .star-icon {
    color: var(--accent-color);
  }

  .project-title {
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.15;
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
  }

  .project-headline {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 800px;
    margin-bottom: 1.75rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.25rem;
  }

  .tag-chip {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-muted);
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    padding: 0.25rem 0.625rem;
    border-radius: 0.375rem;
    font-family: var(--font-mono);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tag-chip:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
  }

  .project-primary-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-sm);
  }

  .live-btn {
    background: var(--text-primary);
    color: var(--bg-primary);
    border: 1px solid var(--text-primary);
  }

  .live-btn:hover {
    opacity: 0.9;
    transform: translateY(-1.5px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }

  .code-btn {
    background: var(--bg-primary);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }

  .code-btn:hover {
    border-color: var(--border-strong);
    background: var(--bg-secondary);
    transform: translateY(-1.5px);
    box-shadow: var(--shadow-md);
  }

  /* Browser Showcase Frame */
  .main-preview-showcase {
    margin-bottom: 3.5rem;
    position: relative;
    z-index: 10;
  }

  .mockup-frame {
    display: block;
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 0.875rem;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: var(--bg-secondary);
    text-align: left;
    padding: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  }

  .mockup-frame:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  .mockup-chrome-bar {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    user-select: none;
  }

  .chrome-window-controls {
    display: flex;
    gap: 0.375rem;
  }

  .control-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .control-dot.close { background: #ff5f56; }
  .control-dot.minimize { background: #ffbd2e; }
  .control-dot.expand { background: #27c93f; }

  .chrome-address-bar {
    flex: 1;
    max-width: 380px;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    padding: 0.3rem 0.75rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
  }

  .address-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chrome-menu-trigger {
    display: flex;
    gap: 2.5px;
  }

  .menu-bullet {
    width: 3.5px;
    height: 3.5px;
    border-radius: 50%;
    background: var(--border-strong);
  }

  .mockup-viewport {
    position: relative;
    max-height: 520px;
    overflow: hidden;
    background: var(--bg-tertiary);
  }

  .showcase-img {
    width: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mockup-frame:hover .showcase-img {
    transform: scale(1.02);
  }

  .zoom-magnifier-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mockup-frame:hover .zoom-magnifier-overlay {
    background: rgba(0, 0, 0, 0.2);
  }

  .magnifier-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mockup-frame:hover .magnifier-pill {
    opacity: 1;
    transform: translateY(0);
  }

  /* Premium Glassmorphic Stats Row */
  .quick-stats-panel {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 3.5rem;
    position: relative;
    z-index: 10;
  }

  .quick-stat-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.125rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .quick-stat-card:hover {
    border-color: var(--border-strong);
    background: var(--bg-tertiary);
    transform: translateY(-1px);
  }

  .stat-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 0.5rem;
    background: var(--bg-primary);
    color: var(--text-muted);
    border: 1px solid var(--border);
    flex-shrink: 0;
  }

  .stat-details {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .stat-label {
    font-size: 0.6875rem;
    color: var(--text-muted);
    text-transform: uppercase;
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
    margin-bottom: 0.125rem;
  }

  .stat-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Editorial Grid Layout */
  .editorial-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 3rem;
    align-items: start;
    margin-bottom: 5rem;
  }

  .editorial-content {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }

  /* Details Sections styling */
  .details-section {
    position: relative;
  }

  .section-title {
    font-size: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-primary);
    margin-bottom: 1.75rem;
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .title-glow {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 10px currentColor;
  }

  .intro-paragraph {
    font-size: 0.975rem;
    color: var(--text-secondary);
    line-height: 1.8;
  }

  /* Key Features List */
  .features-list {
    display: flex;
    flex-direction: column;
  }

  .feature-row {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.125rem 0;
    border-bottom: 1px solid var(--border);
  }

  .feature-row:first-child {
    padding-top: 0;
  }

  .feature-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .feature-number {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    flex-shrink: 0;
    padding-top: 2px;
  }

  .feature-desc p {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Screenshot gallery */
  .gallery-layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
  }

  .gallery-thumbnail-card {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    cursor: pointer;
    text-align: left;
    padding: 0;
    border: none;
    background: transparent;
  }

  .thumbnail-aspect-wrapper {
    position: relative;
    border-radius: 0.625rem;
    overflow: hidden;
    border: 1px solid var(--border);
    aspect-ratio: 16 / 10;
    background: var(--bg-secondary);
  }

  .thumbnail-aspect-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gallery-thumbnail-card:hover .thumbnail-aspect-wrapper img {
    transform: scale(1.05);
  }

  .thumbnail-hover-effect {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: background 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .thumbnail-hover-effect svg {
    opacity: 0;
    transform: scale(0.85);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .gallery-thumbnail-card:hover .thumbnail-hover-effect {
    background: rgba(0, 0, 0, 0.35);
  }

  .gallery-thumbnail-card:hover .thumbnail-hover-effect svg {
    opacity: 1;
    transform: scale(1);
  }

  .thumbnail-caption {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
    padding-left: 0.25rem;
  }

  /* Challenge Accent Card */
  .challenge-alert-card {
    display: flex;
    gap: 1.25rem;
    padding: 1.5rem 1.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-left: 3px solid var(--project-color);
    border-radius: 0.875rem;
  }

  .alert-icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--project-color) 8%, var(--bg-primary));
    color: var(--project-color);
    flex-shrink: 0;
  }

  .alert-contents {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .alert-heading {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .alert-body {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Sticky Sidebar elements */
  .editorial-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: sticky;
    top: 2rem;
  }

  .sidebar-box {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.875rem;
    padding: 1.5rem;
  }

  .sidebar-box-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  .box-title-icon {
    opacity: 0.75;
  }

  /* Tech stacks chip display */
  .tech-chip-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .tech-chip-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tech-chip-item:hover {
    border-color: var(--border-strong);
    transform: translateX(2px);
  }

  .tech-indicator-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .tech-chip-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .tech-name {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .tech-role {
    font-size: 0.6875rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 0.0625rem;
  }

  /* Project Navigation redirect links */
  .navigation-link-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-redirect-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
  }

  .nav-redirect-link:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
    background: var(--bg-tertiary);
  }

  .redirect-icon {
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .link-label-txt {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .redirect-arrow {
    opacity: 0.45;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }

  .nav-redirect-link:hover .redirect-arrow {
    opacity: 1;
    transform: translate(1.5px, -1.5px);
  }

  /* Specifications metadata items */
  .specs-rows {
    display: flex;
    flex-direction: column;
  }

  .specs-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6875rem 0;
    border-bottom: 1px solid var(--border);
    gap: 1rem;
  }

  .specs-row:first-child {
    padding-top: 0;
  }

  .specs-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .specs-key {
    font-size: 0.8125rem;
    color: var(--text-muted);
  }

  .specs-val {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-primary);
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Release Pagination footer design */
  .pagination-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-top: 5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border);
  }

  .pagination-placeholder {
    pointer-events: none;
  }

  .pagination-card {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 1.25rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.875rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .pagination-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .next-card {
    text-align: right;
    align-items: flex-end;
  }

  .prev-card {
    text-align: left;
    align-items: flex-start;
  }

  .nav-direction-label {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.6875rem;
    font-weight: 700;
    color: var(--text-muted);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .dir-arrow {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .prev-card:hover .dir-arrow {
    transform: translateX(-3px);
  }

  .next-card:hover .dir-arrow {
    transform: translateX(3px);
  }

  .pagination-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.3;
    z-index: 2;
  }

  .pagination-thumbnail {
    margin-top: 0.5rem;
    width: 100%;
    max-height: 70px;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
    z-index: 1;
  }

  .pagination-thumbnail img {
    width: 100%;
    height: 70px;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .pagination-card:hover .pagination-thumbnail img {
    transform: scale(1.05);
  }

  .thumbnail-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0);
    transition: background 0.25s ease;
  }

  .pagination-card:hover .thumbnail-overlay {
    background: rgba(0,0,0,0.08);
  }

  :global([data-theme="dark"]) .pagination-card:hover .thumbnail-overlay {
    background: rgba(0,0,0,0.2);
  }

  /* Lightbox Dialog */
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .lightbox-overlay {
    position: absolute;
    inset: 0;
    background: rgba(8, 8, 8, 0.88);
    backdrop-filter: blur(12px);
    border: none;
    cursor: pointer;
  }

  .lightbox-content {
    position: relative;
    max-width: 1120px;
    max-height: 85vh;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 10;
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .lightbox-close {
    position: absolute;
    top: -46px;
    right: 0;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    width: 38px;
    height: 38px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transform: scale(1.05);
  }

  /* Responsive breakpoints */
  @media (max-width: 900px) {
    .editorial-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .editorial-sidebar {
      position: static;
    }

    .quick-stats-panel {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .page-container {
      padding: 1.5rem 0 4rem;
    }

    .meta-badge {
      font-size: 0.7rem;
      padding: 0.2rem 0.625rem;
    }

    .project-primary-actions {
      flex-direction: column;
      gap: 0.75rem;
    }

    .action-btn {
      width: 100%;
      justify-content: center;
    }

    .quick-stats-panel {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }

    .pagination-footer {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-top: 3.5rem;
      padding-top: 2rem;
    }

    .pagination-placeholder {
      display: none;
    }

    .gallery-layout-grid {
      grid-template-columns: 1fr;
    }

    .lightbox {
      padding: 1rem;
    }

    .lightbox-close {
      top: -42px;
    }
  }
</style>
