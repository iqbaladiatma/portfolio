<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { portfolioData } from '$lib/data/portfolio';

  const typeColors: Record<string, string> = {
    work:          '#3b82f6',
    education:     '#34d399',
    certification: '#f59e0b',
    milestone:     '#60a5fa'
  };

  const certColors: Record<string, string> = {
    Blockchain: '#06b6d4',
    Backend:    '#3b82f6',
    Frontend:   '#38bdf8'
  };

  // group skills by category
  const skillsByCategory = portfolioData.skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills>);
</script>

<svelte:head>
  <title>About | Iqbal Muhammad Adiatma</title>
  <meta name="description" content="CTO of Syariah Saham Indonesia, Full-Stack Engineer, Blockchain Dev, and Qur'an Memoriser based in Indonesia.">
</svelte:head>

<div class="page">

  <!-- ══ HERO HEADER ══ -->
  <Reveal>
    <header class="about-header">
      <!-- Left: Identity -->
      <div class="ah-identity">
        <div class="ah-avatar" aria-hidden="true">IM</div>
        <div>
          <h1>Iqbal Muhammad Adiatma</h1>
          <p class="ah-role">{portfolioData.headline}</p>
        </div>
      </div>

      <!-- Right: Quick facts -->
      <div class="ah-facts">
        <div class="fact">
          <span class="fact-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </span>
          {portfolioData.location}
        </div>
        <div class="fact">
          <span class="fact-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.47 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72c1.31 2.24 3.13 4.06 5.37 5.37l1.08-.81a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
          </span>
          Open to work
          <span class="fact-dot"></span>
        </div>
        <div class="fact">
          <span class="fact-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </span>
          {portfolioData.connections} connections
        </div>
        <div class="fact">
          <span class="fact-icon">📖</span>
          Qur'an Memoriser
        </div>
      </div>
    </header>
  </Reveal>

  <!-- ══ BIO + STATS ROW ══ -->
  <Reveal delay={80}>
    <div class="bio-stats-row">
      <div class="bio-col">
        <p class="bio-lead">{portfolioData.bio}</p>
        <p class="bio-body">
          As a Grade 11 student at IDN Boarding School Solo, I balance academic life with
          professional roles in Fintech and Web3. My goal is to bridge complex system architecture
          with real-world social impact — especially within the Islamic finance ecosystem.
        </p>
        <div class="social-links-row">
          <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" class="sl-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" class="sl-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="/contact" class="sl-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Contact
          </a>
        </div>
      </div>
      <div class="stats-col">
        <div class="stat-item">
          <span class="stat-n">10<span class="stat-plus">+</span></span>
          <span class="stat-l">Active Roles</span>
        </div>
        <div class="stat-item">
          <span class="stat-n">33</span>
          <span class="stat-l">Certifications</span>
        </div>
        <div class="stat-item">
          <span class="stat-n">200<span class="stat-plus">+</span></span>
          <span class="stat-l">Students Taught</span>
        </div>
        <div class="stat-item">
          <span class="stat-n">5.0</span>
          <span class="stat-l">GPA / 5.0</span>
        </div>
      </div>
    </div>
  </Reveal>

  <!-- ══ EXPERIENCE ══ -->
  <section class="section">
    <Reveal>
      <div class="sec-head">
        <span class="sec-label">Experience</span>
        <h2>Work & Roles</h2>
      </div>
    </Reveal>

    <div class="exp-table">
      {#each portfolioData.experience as exp, i}
        <Reveal delay={i * 50}>
          <div class="exp-row">
            <div class="exp-period-col">
              <span class="exp-period">{exp.period}</span>
              <span class="exp-type-badge">{exp.type}</span>
            </div>
            <div class="exp-main">
              <div class="exp-title-row">
                <h3>{exp.title}</h3>
                <span class="exp-org">@ {exp.org}</span>
                <span class="exp-loc">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {exp.location}
                </span>
              </div>
              <p class="exp-desc">{exp.description}</p>
              <div class="skill-pills">
                {#each exp.skills as s}<span class="pill">{s}</span>{/each}
              </div>
            </div>
          </div>
        </Reveal>
      {/each}
    </div>
  </section>

  <!-- ══ TIMELINE ══ -->
  <section class="section">
    <Reveal>
      <div class="sec-head">
        <span class="sec-label">Journey</span>
        <h2>Timeline</h2>
      </div>
    </Reveal>

    <div class="tl-list">
      {#each portfolioData.timeline as item, i}
        <Reveal delay={i * 45}>
          <div class="tl-item">
            <div class="tl-left">
              <span class="tl-year">{item.year}</span>
              <span class="tl-dot" style="background:{typeColors[item.type] ?? '#6366f1'}"></span>
            </div>
            <div class="tl-body">
              <span class="tl-type" style="color:{typeColors[item.type] ?? '#6366f1'}">{item.type}</span>
              <h3>{item.title}</h3>
              <span class="tl-org">{item.org}</span>
              <p>{item.description}</p>
            </div>
          </div>
        </Reveal>
      {/each}
    </div>
  </section>

  <!-- ══ SKILLS ══ -->
  <section class="section">
    <Reveal>
      <div class="sec-head">
        <span class="sec-label">Stack</span>
        <h2>Technical Skills</h2>
      </div>
    </Reveal>

    <div class="skill-cats">
      {#each Object.entries(skillsByCategory) as [cat, skills], ci}
        <Reveal delay={ci * 60}>
          <div class="skill-cat-block">
            <span class="cat-label">{cat}</span>
            <div class="skill-tags">
              {#each skills as s}
                <span class="skill-tag" style="--lvl:{s.level}%">
                  {s.name}
                  <span class="skill-pct">{s.level}</span>
                </span>
              {/each}
            </div>
          </div>
        </Reveal>
      {/each}
    </div>
  </section>

  <!-- ══ VOLUNTEERING ══ -->
  <section class="section">
    <Reveal>
      <div class="sec-head">
        <span class="sec-label">Community</span>
        <h2>Teaching & Volunteering</h2>
      </div>
    </Reveal>

    <div class="vol-list">
      {#each portfolioData.volunteering as v, i}
        <Reveal delay={i * 50}>
          <div class="vol-row">
            <div class="vol-main">
              <h3>{v.role}</h3>
              <span class="vol-org">{v.org}</span>
            </div>
            <span class="vol-period">{v.period}</span>
            <p class="vol-desc">{v.description}</p>
          </div>
        </Reveal>
      {/each}
    </div>
  </section>

  <!-- ══ CERTIFICATIONS ══ -->
  <section class="section">
    <Reveal>
      <div class="sec-head">
        <span class="sec-label">Credentials</span>
        <h2>Certifications <span class="cert-badge">33</span></h2>
      </div>
    </Reveal>

    <div class="cert-list">
      {#each portfolioData.certifications as cert, i}
        <Reveal delay={i * 30}>
          <div class="cert-row">
            <span class="cert-dot" style="background:{certColors[cert.category] ?? '#6366f1'}"></span>
            <div class="cert-body">
              <span class="cert-name">{cert.name}</span>
              <span class="cert-issuer">{cert.issuer}</span>
            </div>
            <div class="cert-right">
              <span class="cert-cat" style="color:{certColors[cert.category] ?? '#6366f1'}">{cert.category}</span>
              <span class="cert-date">{cert.date}</span>
            </div>
          </div>
        </Reveal>
      {/each}

      <Reveal delay={120}>
        <div class="cert-more-row">
          <span>+29 more certifications</span>
          <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer">
            View all on LinkedIn
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
      </Reveal>
    </div>
  </section>

</div>

<style>
  .page { padding: 4rem 0 6rem; }

  /* ── About Header ── */
  .about-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--border);
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .ah-identity {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .ah-avatar {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--accent-soft);
    border: 1.5px solid var(--accent-border);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono);
    font-size: 0.75rem; font-weight: 700;
    color: var(--accent-color);
    flex-shrink: 0;
  }

  h1 {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    color: var(--text-primary);
    line-height: 1.1;
    margin-bottom: 0.3rem;
  }

  .ah-role {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
    max-width: 500px;
  }

  .ah-facts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.25rem;
  }

  .fact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .fact-icon { color: var(--text-muted); display: flex; }

  .fact-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 6px var(--green);
    flex-shrink: 0;
  }

  /* ── Bio + Stats ── */
  .bio-stats-row {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 4rem;
    margin-bottom: 0;
    align-items: start;
  }

  .bio-lead {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .bio-body {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.75;
    margin-bottom: 1.5rem;
  }

  .social-links-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .sl-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.775rem;
    font-family: var(--font-mono);
    color: var(--text-muted);
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.3rem;
    transition: var(--transition-fast);
  }
  .sl-link:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
    background: var(--bg-secondary);
  }

  .stats-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1.25rem 1rem;
    background: var(--bg-secondary);
    transition: background var(--transition-fast);
  }
  .stat-item:hover { background: var(--bg-tertiary); }

  .stat-n {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: var(--text-primary);
    line-height: 1;
  }

  .stat-plus { font-size: 1.1rem; color: var(--accent-color); }

  .stat-l {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  /* ── Shared section ── */
  .section {
    padding: 4rem 0;
    border-top: 1px solid var(--border);
  }

  .sec-head {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .sec-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent-color);
    white-space: nowrap;
    padding-top: 0.25rem;
  }

  h2 {
    font-size: clamp(1.3rem, 3vw, 1.875rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .cert-badge {
    font-size: 0.7rem;
    font-family: var(--font-mono);
    padding: 0.15rem 0.5rem;
    background: var(--accent-soft);
    border: 1px solid var(--accent-border);
    border-radius: 99px;
    color: var(--accent-color);
    font-weight: 600;
  }

  /* ── Experience table ── */
  .exp-table {
    display: flex;
    flex-direction: column;
  }

  .exp-row {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 2rem;
    padding: 1.75rem 0;
    border-bottom: 1px solid var(--border);
    transition: background var(--transition-fast);
  }
  .exp-row:last-child { border-bottom: none; }
  .exp-row:hover { background: rgba(255,255,255,0.01); }

  .exp-period-col {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-top: 0.15rem;
  }

  .exp-period {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .exp-type-badge {
    display: inline-block;
    font-size: 0.6rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    padding: 0.1rem 0.4rem;
    border: 1px solid var(--border);
    border-radius: 0.2rem;
    width: fit-content;
  }

  .exp-title-row {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.4rem 0.75rem;
    margin-bottom: 0.6rem;
  }

  .exp-main h3 {
    font-size: 0.9375rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  .exp-org {
    font-size: 0.8125rem;
    color: var(--accent-color);
    font-weight: 500;
  }

  .exp-loc {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.72rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-left: auto;
  }

  .exp-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.65;
    margin-bottom: 0.75rem;
  }

  .skill-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .pill {
    font-size: 0.65rem;
    font-family: var(--font-mono);
    padding: 0.15rem 0.5rem;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    border-radius: 0.2rem;
  }

  /* ── Timeline ── */
  .tl-list {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .tl-list::before {
    content: '';
    position: absolute;
    left: 72px;
    top: 0; bottom: 0;
    width: 1px;
    background: var(--border);
    pointer-events: none;
  }

  .tl-item {
    display: flex;
    gap: 0;
    padding: 1.5rem 0;
    position: relative;
  }

  .tl-left {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    min-width: 72px;
    padding-right: 0;
    flex-shrink: 0;
    padding-top: 0.15rem;
  }

  .tl-year {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  .tl-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-right: -4px;
    flex-shrink: 0;
    box-shadow: 0 0 0 3px var(--bg-primary);
    position: relative;
    z-index: 1;
  }

  .tl-body {
    padding-left: 2rem;
    flex: 1;
  }

  .tl-type {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    display: block;
    margin-bottom: 0.3rem;
  }

  .tl-body h3 {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
    letter-spacing: -0.01em;
  }

  .tl-org {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-bottom: 0.5rem;
  }

  .tl-body p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* ── Skills ── */
  .skill-cats {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .skill-cat-block {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 1.5rem;
    align-items: start;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border);
  }
  .skill-cat-block:last-child { border-bottom: none; padding-bottom: 0; }

  .cat-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    padding-top: 0.2rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.775rem;
    font-weight: 500;
    padding: 0.3rem 0.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.35rem;
    color: var(--text-secondary);
    transition: border-color var(--transition-fast), color var(--transition-fast);
    cursor: default;
  }
  .skill-tag:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
  }

  .skill-pct {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text-muted);
    opacity: 0.7;
  }

  /* ── Volunteering ── */
  .vol-list {
    display: flex;
    flex-direction: column;
  }

  .vol-row {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.2rem 1rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
  }
  .vol-row:last-child { border-bottom: none; }

  .vol-main { grid-column: 1; grid-row: 1; }
  .vol-main h3 {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
    display: inline;
  }
  .vol-org {
    font-size: 0.8125rem;
    color: var(--accent-color);
    font-weight: 500;
    margin-left: 0.5rem;
  }

  .vol-period {
    grid-column: 2;
    grid-row: 1;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    white-space: nowrap;
    padding-top: 0.2rem;
    align-self: start;
  }

  .vol-desc {
    grid-column: 1 / -1;
    grid-row: 2;
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  /* ── Certifications ── */
  .cert-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .cert-row {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid var(--border);
    background: var(--bg-primary);
    transition: background var(--transition-fast);
  }
  .cert-row:hover { background: var(--bg-secondary); }
  .cert-row:last-child { border-bottom: none; }

  .cert-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .cert-body {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .cert-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .cert-issuer {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .cert-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.15rem;
    flex-shrink: 0;
  }

  .cert-cat {
    font-size: 0.62rem;
    font-family: var(--font-mono);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cert-date {
    font-size: 0.65rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .cert-more-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.25rem;
    background: var(--bg-secondary);
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .cert-more-row a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.775rem;
    font-weight: 500;
    color: var(--accent-color);
    font-family: var(--font-mono);
    transition: gap var(--transition-fast);
  }
  .cert-more-row a:hover { gap: 0.55rem; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .bio-stats-row { grid-template-columns: 1fr; gap: 2rem; }
    .skill-cat-block { grid-template-columns: 1fr; gap: 0.75rem; }
  }

  @media (max-width: 768px) {
    .about-header { flex-direction: column; gap: 1.5rem; }
    .exp-row { grid-template-columns: 1fr; gap: 0.75rem; }
    .exp-period-col { flex-direction: row; align-items: center; gap: 0.75rem; }
    .exp-loc { margin-left: 0; }
    .tl-list::before { left: 56px; }
    .tl-left { min-width: 56px; }
    .vol-row { grid-template-columns: 1fr; }
    .vol-period { grid-column: 1; grid-row: auto; }
  }

  @media (max-width: 480px) {
    .stats-col { grid-template-columns: 1fr 1fr; }
    .cert-row { flex-wrap: wrap; }
    .cert-right { flex-direction: row; gap: 0.5rem; align-items: center; }
  }
</style>
