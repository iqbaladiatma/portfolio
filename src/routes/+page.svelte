<script lang="ts">
  import Hero from '$lib/components/ui/Hero.svelte';
  import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
  import SkillBar from '$lib/components/ui/SkillBar.svelte';
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import TechMarquee from '$lib/components/ui/TechMarquee.svelte';
  import { portfolioData } from '$lib/data/portfolio';

  const featured = portfolioData.projects.filter(p => p.featured);
  const skillCategories = [...new Set(portfolioData.skills.map(s => s.category))];
  let activeCategory = $state<string | null>(null);

  const filteredSkills = $derived(
    activeCategory
      ? portfolioData.skills.filter(s => s.category === activeCategory)
      : portfolioData.skills
  );
</script>

<svelte:head>
  <title>Iqbal Muhammad Adiatma | Full-Stack Developer</title>
  <meta name="description" content="Portfolio of Iqbal Muhammad Adiatma, a Full-Stack Developer specializing in Laravel, Svelte, and Flutter.">
</svelte:head>

<Hero />

<!-- Tech Marquee -->
<div class="marquee-section">
  <TechMarquee />
</div>

<!-- Featured Projects -->
<section class="section">
  <Reveal>
    <div class="section-header">
      <div>
        <span class="section-label">Work</span>
        <h2>Featured Projects</h2>
      </div>
      <p>A selection of my recent work in web and mobile development.</p>
    </div>
  </Reveal>

  <div class="projects-grid">
    {#each featured as project, i}
      <Reveal delay={i * 80}>
        <ProjectCard {...project} />
      </Reveal>
    {/each}
  </div>

  <div class="section-footer">
    <a href="/projects" class="view-all">View all projects →</a>
  </div>
</section>

<!-- Skills -->
<section class="section">
  <Reveal>
    <div class="section-header">
      <div>
        <span class="section-label">Expertise</span>
        <h2>Technical Skills</h2>
      </div>
      <p>Technologies I work with to bring ideas to life.</p>
    </div>
  </Reveal>

  <div class="skill-filters">
    <button
      class="filter-btn"
      class:active={activeCategory === null}
      onclick={() => activeCategory = null}
    >All</button>
    {#each skillCategories as cat}
      <button
        class="filter-btn"
        class:active={activeCategory === cat}
        onclick={() => activeCategory = cat}
      >{cat}</button>
    {/each}
  </div>

  <div class="skills-grid">
    {#each filteredSkills as skill}
      <SkillBar name={skill.name} level={skill.level} category={skill.category} />
    {/each}
  </div>
</section>

<!-- CTA -->
<section class="section cta-section">
  <Reveal>
    <div class="cta-box">
      <div class="cta-glow" aria-hidden="true"></div>
      <span class="section-label">Contact</span>
      <h2>Have a project in mind?</h2>
      <p>I'm always open to discussing new projects and opportunities.</p>
      <div class="cta-actions">
        <a href="/contact" class="btn-primary">Get in touch</a>
        <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" class="btn-outline">View GitHub</a>
      </div>
    </div>
  </Reveal>
</section>

<style>
  .section {
    padding: 4rem 0;
    border-top: 1px solid var(--border);
  }

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-color);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.3;
    margin-top: 0.25rem;
  }

  .section-header p {
    font-size: 0.875rem;
    color: var(--text-muted);
    max-width: 300px;
    text-align: right;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .section-footer {
    display: flex;
    justify-content: flex-start;
  }

  .view-all {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .view-all:hover {
    color: var(--text-primary);
  }

  .skill-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .filter-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .filter-btn:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
  }

  .filter-btn.active {
    color: var(--accent-color);
    background: var(--accent-soft);
    border-color: var(--accent-border);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.25rem;
  }

  .cta-section {
    padding-bottom: 4rem;
  }

  .marquee-section {
    padding: 2rem 0;
    border-top: 1px solid var(--border);
  }

  .cta-box {
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 2.5rem;
    max-width: 560px;
    background: var(--bg-secondary);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .cta-box:hover {
    border-color: var(--accent-border);
    box-shadow: 0 0 32px rgba(99,102,241,0.08);
  }

  .cta-glow {
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .cta-box h2 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
  }

  .cta-box p {
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }

  .cta-actions {
    display: flex;
    gap: 0.75rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: var(--accent-color);
    color: white;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .btn-primary:hover {
    background: var(--accent-hover);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }

  .btn-outline:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .section-header {
      flex-direction: column;
      gap: 0.5rem;
    }
    .section-header p {
      text-align: left;
      max-width: 100%;
    }
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
