<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const course = $derived(data.course);
  const totalDuration = $derived(data.totalDuration);

  // Baca chapter dari URL di client-side — aman untuk static hosting
  const chapter = $derived(() => {
    const slug = $page.url.searchParams.get('chapter');
    return course.chapters.find(c => c.slug === slug) ?? course.chapters[0];
  });

  const chapterIndex = $derived(course.chapters.findIndex(c => c.slug === chapter().slug));
  const prev = $derived(course.chapters[chapterIndex - 1] ?? null);
  const next = $derived(course.chapters[chapterIndex + 1] ?? null);

  let completed = $state<Set<string>>(new Set());

  function markComplete() {
    completed = new Set([...completed, chapter().slug]);
  }

  const progress = $derived(Math.round((completed.size / course.chapters.length) * 100));
</script>

<svelte:head>
  <title>{chapter().title} — {course.title} | Academy</title>
</svelte:head>

<!-- Full-screen player layout, no main padding -->
<div class="player-wrap">

  <!-- Top bar -->
  <header class="player-header">
    <div class="header-left">
      <a href="/academy/{course.slug}" class="back-btn" aria-label="Back to course">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
      </a>
      <div class="header-titles">
        <span class="header-course">{course.title}</span>
        <span class="header-chapter">{chapter().title}</span>
      </div>
    </div>
    <div class="header-right">
      <div class="progress-info">
        <span class="progress-text">{completed.size}/{course.chapters.length}</span>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width: {progress}%"></div>
        </div>
        <span class="progress-pct">{progress}%</span>
      </div>
    </div>
  </header>

  <!-- Body -->
  <div class="player-body">

    <!-- Video + info -->
    <div class="video-col">
      <!-- Video player -->
      <div class="video-frame">
        <div class="video-placeholder">
          <div class="play-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <span class="video-label">Chapter {chapterIndex + 1} · {chapter().duration} min</span>
          <p class="video-note">Video player — connect your video source (YouTube, Vimeo, etc.)</p>
        </div>
      </div>

      <!-- Chapter info -->
      <div class="chapter-info">
        <div class="chapter-info-top">
          <div>
            <span class="ch-num-badge">Chapter {chapterIndex + 1}</span>
            <h1>{chapter().title}</h1>
            <p class="ch-desc">{chapter().description}</p>
          </div>
          <div class="ch-actions">
            {#if completed.has(chapter().slug)}
              <div class="completed-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Completed
              </div>
            {:else}
              <button class="mark-btn" onclick={markComplete}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Mark Complete
              </button>
            {/if}
          </div>
        </div>

        <!-- Prev / Next -->
        <div class="nav-row">
          {#if prev}
            <a href="/academy/{course.slug}/learn?chapter={prev.slug}" class="nav-btn nav-prev">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              <span class="nav-label">
                <span class="nav-dir">Previous</span>
                <span class="nav-title">{prev.title}</span>
              </span>
            </a>
          {:else}
            <div></div>
          {/if}

          {#if next}
            <a href="/academy/{course.slug}/learn?chapter={next.slug}" class="nav-btn nav-next">
              <span class="nav-label">
                <span class="nav-dir">Next</span>
                <span class="nav-title">{next.title}</span>
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          {:else}
            <div></div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Sidebar chapter list -->
    <aside class="chapter-sidebar">
      <div class="sidebar-head">
        <span>Course Content</span>
        <span class="sidebar-count">{course.chapters.length} chapters</span>
      </div>
      <div class="sidebar-list">
        {#each course.chapters as ch, i}
          <a
            href="/academy/{course.slug}/learn?chapter={ch.slug}"
            class="sidebar-item"
            class:active={ch.slug === chapter().slug}
            class:done={completed.has(ch.slug)}
          >
            <div class="si-icon">
              {#if completed.has(ch.slug)}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {:else if ch.slug === chapter().slug}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              {:else}
                <span>{i + 1}</span>
              {/if}
            </div>
            <div class="si-info">
              <span class="si-title">{ch.title}</span>
              <span class="si-dur">{ch.duration} min</span>
            </div>
          </a>
        {/each}
      </div>
    </aside>

  </div>
</div>

<style>
  /* Override main padding for full-width player */
  :global(main) { padding: 0 !important; }

  .player-wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 68px);
    overflow: hidden;
  }

  /* Header */
  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.25rem;
    height: 56px;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    gap: 1rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    min-width: 0;
    flex: 1;
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px; height: 34px;
    border: 1px solid var(--border);
    border-radius: 0.4rem;
    color: var(--text-secondary);
    flex-shrink: 0;
    transition: var(--transition-fast);
    cursor: pointer;
  }
  .back-btn:hover { color: var(--text-primary); border-color: var(--border-strong); background: var(--bg-tertiary); }

  .header-titles {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .header-course {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-chapter {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-right { flex-shrink: 0; }

  .progress-info {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .progress-text {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    white-space: nowrap;
  }

  .progress-bar-wrap {
    width: 100px;
    height: 4px;
    background: var(--border);
    border-radius: 99px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(to right, #16a34a, #059669);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  .progress-pct {
    font-size: 0.75rem;
    font-weight: 600;
    color: #16a34a;
    font-family: var(--font-mono);
  }

  /* Body */
  .player-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Video col */
  .video-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-width: 0;
  }

  .video-frame {
    background: #000;
    aspect-ratio: 16/9;
    width: 100%;
    flex-shrink: 0;
  }

  .video-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, #0a1a0f, #0d2818);
  }

  .play-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: rgba(22,163,74,0.2);
    border: 2px solid rgba(22,163,74,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .video-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    font-family: var(--font-mono);
  }

  .video-note {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.35);
    text-align: center;
    max-width: 280px;
  }

  /* Chapter info */
  .chapter-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-top: 1px solid var(--border);
  }

  .chapter-info-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .ch-num-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #16a34a;
    font-family: var(--font-mono);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 1.375rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    line-height: 1.25;
  }

  .ch-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .ch-actions { flex-shrink: 0; }

  .mark-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.1rem;
    background: linear-gradient(135deg, #16a34a, #059669);
    color: white;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: var(--transition-slow);
    white-space: nowrap;
  }
  .mark-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(22,163,74,0.3); }

  .completed-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.1rem;
    background: rgba(22,163,74,0.1);
    color: #16a34a;
    border: 1px solid rgba(22,163,74,0.25);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    white-space: nowrap;
  }

  /* Nav row */
  .nav-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.75rem 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.6rem;
    transition: var(--transition-fast);
    cursor: pointer;
    max-width: 48%;
  }
  .nav-btn:hover { border-color: #16a34a; background: rgba(22,163,74,0.04); }

  .nav-next { margin-left: auto; }

  .nav-label {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .nav-dir {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .nav-title {
    font-size: 0.8375rem;
    font-weight: 500;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Sidebar */
  .chapter-sidebar {
    width: 300px;
    flex-shrink: 0;
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--bg-secondary);
  }

  .sidebar-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    flex-shrink: 0;
    background: linear-gradient(to right, rgba(22,163,74,0.04), transparent);
  }

  .sidebar-count {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-weight: 400;
  }

  .sidebar-list {
    overflow-y: auto;
    flex: 1;
  }

  .sidebar-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid var(--border);
    transition: background var(--transition-fast);
    cursor: pointer;
    text-decoration: none;
  }
  .sidebar-item:last-child { border-bottom: none; }
  .sidebar-item:hover { background: var(--bg-tertiary); }
  .sidebar-item.active { background: rgba(22,163,74,0.06); border-left: 3px solid #16a34a; }
  .sidebar-item.done .si-icon { background: #16a34a; color: white; border-color: #16a34a; }

  .si-icon {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 1px;
  }

  .sidebar-item.active .si-icon {
    background: #16a34a;
    color: white;
    border-color: #16a34a;
  }

  .si-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .si-title {
    font-size: 0.8375rem;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.3;
  }

            .sidebar-item.active .si-title { color: #16a34a; }

  .si-dur {
    font-size: 0.72rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  @media (max-width: 900px) {
    .player-wrap { height: auto; overflow: visible; }
    .player-body { flex-direction: column; overflow: visible; }
    .chapter-sidebar { width: 100%; border-left: none; border-top: 1px solid var(--border); max-height: 320px; }
    .progress-bar-wrap { width: 60px; }
    .progress-text { display: none; }
  }

  @media (max-width: 480px) {
    .chapter-info-top { flex-direction: column; }
    .nav-btn { max-width: 100%; }
  }
</style>
