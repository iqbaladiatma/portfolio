<script lang="ts">
  import { onMount } from 'svelte';
  import { portfolioData } from '$lib/data/portfolio';
  import profileImage from '$lib/assets/ppini.png';

  const floatingChips = [
    { label: 'Laravel', color: '#ef4444', x: -60, y: 40 },
    { label: 'Flutter', color: '#06b6d4', x: 280, y: 60 },
    { label: 'Solidity', color: '#6366f1', x: -40, y: 240 },
    { label: 'SvelteKit', color: '#ff6b35', x: 270, y: 260 },
  ];

  const rawStats = [
    { target: 10, suffix: '+', label: 'Roles' },
    { target: 33, suffix: '', label: 'Certifications' },
    { target: 200, suffix: '+', label: 'Students' },
    { target: 5, suffix: '.0', label: 'GPA' },
  ];

  let counts = $state(rawStats.map(() => 0));

  onMount(() => {
    const duration = 1400;
    const start = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      counts = rawStats.map(s => Math.round(ease * s.target));
      if (p < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  });
</script>

<section class="hero">
  <div class="hero-grid">
    <!-- Left: Content -->
    <div class="hero-content">
      <p class="location">{portfolioData.location}</p>
      <h1>Iqbal Muhammad Adiatma</h1>
      <p class="role">Full-Stack Developer & CTO</p>
      <p class="bio">{portfolioData.bio}</p>

      <div class="actions">
        <a href="/projects" class="btn-primary">View Projects</a>
        <a href="/contact" class="btn-secondary">Contact</a>
      </div>

      <div class="stats">
        {#each rawStats as s, i}
          <div class="stat">
            <span class="stat-value">{counts[i]}{s.suffix}</span>
            <span class="stat-label">{s.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right: Profile Photo -->
    <div class="hero-visual">
      <div class="profile-container">
        <!-- Orbit ring SVG -->
        <svg class="orbit-svg" viewBox="0 0 340 380" aria-hidden="true">
          <circle cx="170" cy="160" r="148" fill="none" stroke="var(--accent-color)" stroke-width="1" stroke-dasharray="6 8" opacity="0.25" />
          <circle cx="170" cy="160" r="122" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 12" opacity="0.4" />
        </svg>

        <!-- Floating tech chips -->
        {#each floatingChips as chip}
          <span
            class="float-chip"
            style="left:{chip.x}px; top:{chip.y}px; --c:{chip.color}; border-color:{chip.color}33"
          >{chip.label}</span>
        {/each}

        <!-- Decorative shapes -->
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>

        <!-- Profile image -->
        <div class="profile-image-wrapper">
          <img src={profileImage} alt="Iqbal Muhammad Adiatma" class="profile-image" />
        </div>

        <!-- Code snippet card -->
        <div class="code-lines">
          <span class="line line-1">const developer = {'{'}</span>
          <span class="line line-2">  passion: "Building",</span>
          <span class="line line-3">  stack: ["Full-Stack"],</span>
          <span class="line line-4">  mission: "Impact"</span>
          <span class="line line-5">{'}'};<span class="cursor">|</span></span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 4rem 0;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-content {
    max-width: 640px;
  }

  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 400px;
  }

  /* Profile Container */
  .profile-container {
    position: relative;
    width: 340px;
    height: 380px;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
  }

  .shape-1 {
    width: 220px; height: 220px;
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
    opacity: 0.12;
    top: 10px; right: 10px;
    animation: floatA 9s ease-in-out infinite;
  }

  .shape-2 {
    width: 160px; height: 160px;
    background: var(--accent-color);
    opacity: 0.08;
    top: 50px; left: 20px;
    animation: floatB 12s ease-in-out infinite;
  }

  .shape-3 {
    width: 100px; height: 100px;
    border: 2px solid var(--accent-color);
    opacity: 0.25;
    bottom: 80px; right: 30px;
    animation: spinSlow 20s linear infinite;
  }

  @keyframes floatA {
    0%, 100% { transform: translate(0, 0) scale(1); }
    40%       { transform: translate(-12px, 16px) scale(1.04); }
    70%       { transform: translate(8px, -10px) scale(0.97); }
  }

  @keyframes floatB {
    0%, 100% { transform: translate(0, 0); }
    35%       { transform: translate(14px, -18px); }
    65%       { transform: translate(-10px, 12px); }
  }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* Orbit SVG */
  .orbit-svg {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    animation: orbitSpin 30s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes orbitSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* Floating tech chips */
  .float-chip {
    position: absolute;
    padding: 0.25rem 0.6rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 600;
    font-family: var(--font-mono, monospace);
    color: var(--c);
    background: var(--bg-primary);
    border: 1px solid;
    white-space: nowrap;
    z-index: 20;
    animation: chipFloat 6s ease-in-out infinite;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .float-chip:nth-child(2) { animation-delay: -1.5s; }
  .float-chip:nth-child(3) { animation-delay: -3s; }
  .float-chip:nth-child(4) { animation-delay: -4.5s; }

  @keyframes chipFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  /* Profile Image */
  .profile-image-wrapper {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid var(--bg-card);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Code Lines */
  .code-lines {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    animation: slideUpIn 0.8s 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
    z-index: 15;
  }

  @keyframes slideUpIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cursor {
    display: inline-block;
    color: var(--accent-color);
    animation: blink 1s step-end infinite;
    font-weight: 700;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  :global([data-theme="dark"]) .code-lines {
    background: rgba(30, 30, 30, 0.7);
  }

  .line {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .line-1 { color: var(--accent-color); }
  .line-2 { padding-left: 1rem; }
  .line-3 { padding-left: 1rem; }
  .line-4 { padding-left: 1rem; }
  .line-5 { color: var(--accent-color); }

  .location {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .role {
    font-size: 1.125rem;
    color: var(--accent-color);
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .bio {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 3rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    background: var(--accent-color);
    color: white;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .btn-primary:hover {
    background: var(--accent-hover);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .btn-secondary:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
  }

  .stats {
    display: flex;
    gap: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
  }

  .stat {
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (max-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .hero-visual {
      order: -1;
      min-height: 320px;
    }

    .profile-container {
      transform: scale(0.9);
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding: 2rem 0;
    }

    h1 {
      font-size: 1.875rem;
    }

    .role {
      font-size: 1rem;
    }

    .stats {
      gap: 1.5rem;
    }

    .stat-value {
      font-size: 1.25rem;
    }

    .hero-visual {
      min-height: 300px;
    }

    .profile-container {
      transform: scale(0.8);
    }
  }
</style>
