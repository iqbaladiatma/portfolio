<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { levelLabel, levelColor } from '$lib/data/academy';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { course, totalDuration } = data;

  let openChapter = $state<number | null>(null);
</script>

<svelte:head>
  <title>{course.title} | Academy</title>
  <meta name="description" content={course.description}>
</svelte:head>

<div class="page">

  <Reveal>
    <a href="/academy" class="back-link">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
      Back to Academy
    </a>
  </Reveal>

  <div class="layout">

    <!-- Main -->
    <div class="main">
      <!-- Thumbnail -->
      <Reveal>
        <div class="thumb" style="--c: {levelColor[course.level]}">
          <div class="thumb-inner">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <!-- Decorative shapes inside thumb -->
          <svg class="thumb-deco td1" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="50"/></svg>
          <svg class="thumb-deco td2" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,0 100,50 50,100 0,50"/></svg>
          <span class="thumb-level" style="background: {levelColor[course.level]}">{levelLabel[course.level]}</span>
          {#if course.price === 0}
            <span class="thumb-free">Free</span>
          {/if}
        </div>
      </Reveal>

      <!-- Info -->
      <Reveal delay={60}>
        <div class="course-info">
          <span class="category-label">{course.category}</span>
          <h1>{course.title}</h1>
          <p class="long-desc">{course.longDescription}</p>

          <div class="meta-row">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              {course.chapters.length} chapters
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {totalDuration} min total
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {course.students} students
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Updated {course.updatedAt}
            </span>
          </div>

          <div class="tags-row">
            {#each course.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </Reveal>

      <!-- Chapter List -->
      <Reveal delay={100}>
        <div class="chapters-block">
          <div class="chapters-header">
            <h2>Course Content</h2>
            <span class="chapters-meta">{course.chapters.length} chapters · {totalDuration} min</span>
          </div>

          <div class="chapter-list">
            {#each course.chapters as ch}
              <div class="chapter-item" class:open={openChapter === ch.order}>
                <button
                  class="chapter-btn"
                  onclick={() => openChapter = openChapter === ch.order ? null : ch.order}
                  aria-expanded={openChapter === ch.order}
                >
                  <div class="ch-left">
                    <span class="ch-num">{ch.order}</span>
                    <span class="ch-title">{ch.title}</span>
                  </div>
                  <div class="ch-right">
                    <span class="ch-dur">{ch.duration} min</span>
                    <svg class="ch-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </button>
                {#if openChapter === ch.order}
                  <div class="chapter-desc">
                    <p>{ch.description}</p>
                    <a href="/academy/{course.slug}/learn?chapter={ch.slug}" class="ch-start-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      Start Chapter
                    </a>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </Reveal>
    </div>

    <!-- Sidebar -->
    <div class="sidebar">
      <Reveal direction="right">
        <div class="sidebar-card">
          <!-- Price -->
          <div class="price-block">
            {#if course.price === 0}
              <span class="price-free">Free</span>
              <span class="price-sub">No payment required</span>
            {:else}
              <span class="price-paid">Rp {course.price.toLocaleString('id-ID')}</span>
              <span class="price-sub">One-time payment</span>
            {/if}
          </div>

          <!-- CTA -->
          <a href="/academy/{course.slug}/learn?chapter={course.chapters[0].slug}" class="enroll-btn">
            {course.price === 0 ? 'Start Learning Free' : 'Enroll Now'}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <!-- Includes -->
          <div class="includes">
            <span class="includes-title">This course includes:</span>
            <ul>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {course.chapters.length} video lessons
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {totalDuration} minutes of content
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Lifetime access
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Progress tracking
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Mobile friendly
              </li>
            </ul>
          </div>

          <!-- Level info -->
          <div class="level-info" style="border-color: {levelColor[course.level]}20; background: {levelColor[course.level]}08">
            <span class="level-dot" style="background: {levelColor[course.level]}"></span>
            <div>
              <span class="level-name" style="color: {levelColor[course.level]}">{levelLabel[course.level]}</span>
              <span class="level-sub">Skill level</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>

  </div>
</div>

<style>
  .page { padding: 3rem 0 6rem; }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    transition: var(--transition-fast);
    cursor: pointer;
  }
  .back-link:hover { color: #16a34a; gap: 0.75rem; }

  .layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 3rem;
    align-items: start;
  }

  .main { display: flex; flex-direction: column; gap: 2.5rem; }

  /* Thumb */
  .thumb {
    position: relative;
    aspect-ratio: 16/9;
    border-radius: 1rem;
    overflow: hidden;
    background: linear-gradient(135deg, color-mix(in srgb, var(--c) 85%, #000), color-mix(in srgb, var(--c) 55%, #059669));
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
  }

  .thumb-inner {
    width: 96px; height: 96px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .thumb-deco {
    position: absolute;
    fill: white;
    opacity: 0.05;
    pointer-events: none;
  }
  .td1 { width: 200px; height: 200px; top: -60px; left: -40px; }
  .td2 { width: 140px; height: 140px; bottom: -30px; right: 60px; }

  .thumb-level {
    position: absolute;
    top: 1rem; right: 1rem;
    font-size: 0.7rem; font-weight: 700;
    color: white;
    padding: 0.25rem 0.6rem;
    border-radius: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    z-index: 2;
  }

  .thumb-free {
    position: absolute;
    top: 1rem; left: 1rem;
    font-size: 0.7rem; font-weight: 700;
    color: white;
    background: #16a34a;
    padding: 0.25rem 0.6rem;
    border-radius: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    z-index: 2;
  }

  /* Course info */
  .category-label {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #16a34a;
    font-family: var(--font-mono);
    margin-bottom: 0.75rem;
  }

  h1 {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    color: var(--text-primary);
    margin-bottom: 1rem;
    line-height: 1.15;
  }

  .long-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.75;
    margin-bottom: 1.5rem;
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8375rem;
    color: var(--text-muted);
  }

  .tags-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .tag {
    font-size: 0.72rem;
    font-weight: 500;
    padding: 0.2rem 0.6rem;
    background: var(--bg-secondary);
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    font-family: var(--font-mono);
  }

  /* Chapters */
  .chapters-block {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1rem;
    overflow: hidden;
  }

  .chapters-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(to right, rgba(22,163,74,0.04), transparent);
  }

  h2 { font-size: 1.0625rem; color: var(--text-primary); }

  .chapters-meta {
    font-size: 0.78rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .chapter-list { display: flex; flex-direction: column; }

  .chapter-item {
    border-bottom: 1px solid var(--border);
  }
  .chapter-item:last-child { border-bottom: none; }

  .chapter-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    transition: background var(--transition-fast);
    gap: 1rem;
  }
  .chapter-btn:hover { background: var(--bg-tertiary); }
  .chapter-item.open .chapter-btn { background: rgba(22,163,74,0.04); }

  .ch-left { display: flex; align-items: center; gap: 0.875rem; flex: 1; min-width: 0; }

  .ch-num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    flex-shrink: 0;
    font-family: var(--font-mono);
  }

  .chapter-item.open .ch-num {
    background: #16a34a;
    color: white;
    border-color: #16a34a;
  }

  .ch-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-primary);
    text-align: left;
    line-height: 1.3;
  }

  .ch-right { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }

  .ch-dur {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .ch-arrow {
    color: var(--text-muted);
    transition: transform var(--transition-fast);
  }
  .chapter-item.open .ch-arrow { transform: rotate(180deg); }

  .chapter-desc {
    padding: 0 1.5rem 1.25rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    animation: fadeDown 0.2s ease;
  }

  @keyframes fadeDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

  .chapter-desc p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .ch-start-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #16a34a;
    padding: 0.4rem 0.875rem;
    border: 1px solid rgba(22,163,74,0.3);
    border-radius: 0.4rem;
    background: rgba(22,163,74,0.06);
    transition: var(--transition-fast);
    cursor: pointer;
    align-self: flex-start;
  }
  .ch-start-btn:hover { background: rgba(22,163,74,0.12); border-color: #16a34a; }

  /* Sidebar */
  .sidebar { position: sticky; top: 88px; }

  .sidebar-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .price-block { text-align: center; }

  .price-free {
    display: block;
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: #16a34a;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .price-paid {
    display: block;
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .price-sub {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .enroll-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1.25rem;
    background: linear-gradient(135deg, #16a34a, #059669);
    color: white;
    border-radius: 0.6rem;
    font-weight: 700;
    font-size: 0.9375rem;
    transition: var(--transition-slow);
    cursor: pointer;
  }
  .enroll-btn:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.3); }

  .includes { display: flex; flex-direction: column; gap: 0.5rem; }

  .includes-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: var(--font-mono);
    margin-bottom: 0.25rem;
  }

  .includes ul { display: flex; flex-direction: column; gap: 0.5rem; }

  .includes li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .level-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem;
    border: 1px solid;
    border-radius: 0.6rem;
  }

  .level-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .level-name {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .level-sub {
    display: block;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { position: static; }
  }
</style>
