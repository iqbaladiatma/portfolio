<script lang="ts">
  import '../lib/styles/theme.css';
  import { portfolioData } from '$lib/data/portfolio';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import CursorGlow from '$lib/components/ui/CursorGlow.svelte';
  import { page } from '$app/stores';

  let { children } = $props();
  let mobileMenuOpen = $state(false);
  let isExpanded = $state(false);
  let showContent = $state(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>' },
    { href: '/projects', label: 'Projects', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' },
    { href: '/research', label: 'Research', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>' },
    { href: '/academy', label: 'Hire Me', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>' },
    { href: '/about', label: 'About', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>' },
    { href: '/contact', label: 'Contact', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>' }
  ];

  const socials = [
    { href: portfolioData.socials.github, label: 'GitHub' },
    { href: portfolioData.socials.linkedin, label: 'LinkedIn' },
    { href: portfolioData.socials.youtube, label: 'YouTube' }
  ];

  function isActive(href: string) {
    if (href === '/') return $page.url.pathname === '/';
    return $page.url.pathname.startsWith(href);
  }

  function expandSidebar() {
    isExpanded = true;
    setTimeout(() => {
      if (isExpanded) showContent = true;
    }, 120);
  }

  function collapseSidebar() {
    showContent = false;
    pillVisible = false;
    setTimeout(() => {
      if (!showContent) isExpanded = false;
    }, 50);
  }

  let navEl = $state<HTMLElement | null>(null);
  let pillTop = $state(0);
  let pillH = $state(42);
  let pillVisible = $state(false);

  function onItemEnter(e: MouseEvent) {
    const item = e.currentTarget as HTMLElement;
    if (!navEl) return;
    const nr = navEl.getBoundingClientRect();
    const ir = item.getBoundingClientRect();
    pillTop = ir.top - nr.top;
    pillH = ir.height;
    pillVisible = true;
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<CursorGlow />
<div class="app-shell">
  <!-- Floating Morphing Sidebar -->
  <aside 
    class="floating-sidebar"
    class:expanded={isExpanded}
    onmouseenter={expandSidebar}
    onmouseleave={collapseSidebar}
  >
    <!-- Header with Avatar -->
    <div class="sidebar-header">
      <a href="/" class="avatar-btn">IA</a>
      <div class="profile-text" class:visible={showContent}>
        <h2 class="profile-name">Iqbal Adiatma</h2>
        <span class="profile-role">Full-Stack Developer</span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav" class:visible={showContent} bind:this={navEl} onmouseleave={() => pillVisible = false}>
      <div class="nav-pill" class:visible={pillVisible} style="top:{pillTop}px; height:{pillH}px;"></div>
      {#each navLinks as link}
        <a href={link.href} class="nav-item" class:active={isActive(link.href)} onmouseenter={onItemEnter}>
          <span class="nav-icon">{@html link.icon}</span>
          <span class="nav-label">{link.label}</span>
        </a>
      {/each}
    </nav>

    <!-- Footer with Social & Theme -->
    <div class="sidebar-footer" class:visible={showContent}>
      <div class="social-links">
        {#each socials as s}
          <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
        {/each}
      </div>
      <div class="footer-row">
        <ThemeToggle />
        <span class="copyright">© {new Date().getFullYear()}</span>
      </div>
    </div>
  </aside>

  <!-- Mobile header (Floating, Morphing, Rounded) -->
  <header class="mobile-header" class:menu-open={mobileMenuOpen}>
    <div class="mobile-header-top">
      <a href="/" class="logo" onclick={() => mobileMenuOpen = false}>Iqbal Adiatma</a>
      <div class="mobile-header-right">
        <ThemeToggle />
        <button class="menu-btn" onclick={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Toggle menu">
          {#if mobileMenuOpen}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer (Fades/Slides dynamically) -->
    <div class="mobile-menu-drawer">
      <nav class="mobile-nav">
        {#each navLinks as link}
          <a href={link.href} class="nav-item" class:active={isActive(link.href)} onclick={() => mobileMenuOpen = false}>
            <span class="nav-icon">{@html link.icon}</span>
            <span class="nav-label">{link.label}</span>
          </a>
        {/each}
      </nav>
      <div class="mobile-socials">
        {#each socials as s}
          <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
        {/each}
      </div>
    </div>
  </header>

  <!-- Mobile Backdrop Overlay -->
  {#if mobileMenuOpen}
    <button class="mobile-overlay-backdrop" onclick={() => mobileMenuOpen = false} aria-label="Close menu"></button>
  {/if}

  <!-- Main content -->
  <main class="main-content" class:sidebar-expanded={isExpanded}>
    <div class="content-wrapper">
      {@render children()}
    </div>

    <!-- Universal Footer -->
    <footer class="universal-footer">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <a href="/" class="footer-logo">IA</a>
          <p class="footer-bio">Iqbal Muhammad Adiatma</p>
          <p class="footer-headline">CTO & Full-Stack Developer specializing in high-performance web ecosystems, sharia fintech, and Web3.</p>
          <div class="footer-status-badge">
            <span class="status-pulse-dot"></span>
            Available for new opportunities
          </div>
        </div>

        <div class="footer-links-group">
          <div class="footer-links-col">
            <h4 class="links-col-title">Navigation</h4>
            <ul class="links-list">
              <li><a href="/" class="footer-link">Home</a></li>
              <li><a href="/projects" class="footer-link">Projects</a></li>
              <li><a href="/research" class="footer-link">Research</a></li>
              <li><a href="/academy" class="footer-link">Hire Me</a></li>
              <li><a href="/about" class="footer-link">About</a></li>
              <li><a href="/contact" class="footer-link">Contact</a></li>
            </ul>
          </div>

          <div class="footer-links-col">
            <h4 class="links-col-title">Selected Projects</h4>
            <ul class="links-list">
              <li><a href="/projects/hissa-saham-syariah" class="footer-link">Hissa Saham Syariah</a></li>
              <li><a href="/projects/vetiver" class="footer-link">Vetiver Blockchain</a></li>
              <li><a href="/projects/sim-pah" class="footer-link">SIM-PAH - Abu Hurairah</a></li>
              <li><a href="/projects/takaful-keluarga-agent-profile" class="footer-link">Takaful Agent Profile</a></li>
            </ul>
          </div>

          <div class="footer-links-col">
            <h4 class="links-col-title">Connect</h4>
            <ul class="links-list">
              <li><a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" class="footer-link ext-link">GitHub <span>→</span></a></li>
              <li><a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" class="footer-link ext-link">LinkedIn <span>→</span></a></li>
              <li><a href={portfolioData.socials.youtube} target="_blank" rel="noopener noreferrer" class="footer-link ext-link">YouTube <span>→</span></a></li>
              <li><a href={portfolioData.socials.email} class="footer-link ext-link">Email <span>→</span></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">© {new Date().getFullYear()} Iqbal Muhammad Adiatma. All rights reserved.</span>
        <span class="footer-credit">Built with Svelte 5 & Native CSS</span>
      </div>
    </footer>
  </main>
</div>

<style>
  .app-shell {
    min-height: 100vh;
    background: var(--bg-primary);
  }

  /* Floating Sidebar */
  .floating-sidebar {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--bg-card);
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    padding: 0.75rem;
    overflow: hidden;
    
    /* Collapsed state: small capsule */
    width: 4rem;
    height: 4rem;
    border-radius: 1.75rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    
    /* Morphing transition */
    transition: 
      width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      border-radius 0.35s ease-in-out,
      background-color 0.3s,
      border-color 0.3s,
      box-shadow 0.3s;
  }

  .floating-sidebar.expanded {
    width: 16rem;
    height: calc(100vh - 2rem);
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }

  /* Header */
  .sidebar-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 2.5rem;
  }

  .avatar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 1rem;
    background: var(--accent-color);
    color: white;
    font-weight: 800;
    font-size: 0.875rem;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    transition: transform 0.2s ease;
  }

  .avatar-btn:hover {
    transform: scale(1.05);
  }

  .profile-text {
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateX(-15px);
    pointer-events: none;
    white-space: nowrap;
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
  }

  .profile-text.visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }

  .profile-name {
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--text-primary);
    line-height: 1.2;
  }

  .profile-role {
    font-size: 0.75rem;
    color: var(--accent-color);
    font-weight: 600;
  }

  /* Navigation */
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.5rem;
    flex: 1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    position: relative;
  }

  .nav-pill {
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 0.625rem;
    background: var(--bg-tertiary, rgba(0,0,0,0.07));
    pointer-events: none;
    opacity: 0;
    z-index: 0;
    transition:
      top 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.15s ease;
  }

  :global([data-theme="dark"]) .nav-pill {
    background: rgba(255,255,255,0.09);
  }

  .nav-pill.visible { opacity: 1; }

  .sidebar-nav.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 2.625rem;
    padding: 0 0.875rem;
    border-radius: 0.625rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: 500;
    background: transparent;
    position: relative;
    z-index: 1;
    transition: color 0.15s ease;
    white-space: nowrap;
  }

  .nav-item:hover { color: var(--text-primary); }

  .nav-item.active {
    color: var(--accent-color);
    font-weight: 600;
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .nav-label {
    white-space: nowrap;
  }

  /* Footer */
  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    margin-top: auto;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .sidebar-footer.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    padding-left: 0.25rem;
  }

  .social-links a {
    font-size: 0.75rem;
    color: var(--text-muted);
    transition: color 0.2s ease;
  }

  .social-links a:hover {
    color: var(--accent-color);
  }

  .footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .copyright {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* Mobile header */
  .mobile-header {
    display: none;
    position: fixed;
    top: 0.75rem; left: 0.75rem; right: 0.75rem;
    height: 54px;
    background: color-mix(in srgb, var(--bg-primary) 70%, transparent);
    border: 1px solid var(--border);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 99px;
    padding: 0 0.5rem;
    align-items: center;
    justify-content: flex-start;
    z-index: 300;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transition: 
      height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.3s,
      box-shadow 0.3s;
    overflow: hidden;
    flex-direction: column;
  }

  :global([data-theme="dark"]) .mobile-header {
    background: color-mix(in srgb, var(--bg-primary) 75%, transparent);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  .mobile-header.menu-open {
    height: 408px;
    border-radius: 1.5rem;
    background: color-mix(in srgb, var(--bg-primary) 95%, transparent);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .mobile-header-top {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: 0 0.5rem 0 0.875rem;
  }

  .mobile-header .logo {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  .mobile-header-right {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  /* Target ThemeToggle child button */
  .mobile-header-right :global(.toggle) {
    border-radius: 50% !important;
    border: 1px solid var(--border) !important;
    background: transparent !important;
    width: 36px !important;
    height: 36px !important;
    color: var(--text-secondary) !important;
    transition: all 0.2s !important;
  }

  .mobile-header-right :global(.toggle:hover) {
    color: var(--text-primary) !important;
    border-color: var(--border-strong) !important;
    background-color: var(--bg-tertiary) !important;
  }

  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--text-secondary);
    background: transparent;
    border: 1px solid var(--border);
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .menu-btn:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
    background-color: var(--bg-tertiary);
  }

  /* Mobile menu drawer within container */
  .mobile-menu-drawer {
    width: 100%;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    transition: 
      opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 0.75rem 0.5rem 1rem;
    border-top: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
    box-sizing: border-box;
  }

  .mobile-header.menu-open .mobile-menu-drawer {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    transition-delay: 0.1s;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .mobile-nav .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .mobile-nav .nav-item:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
  }

  .mobile-nav .nav-item.active {
    color: var(--accent-color);
    background: var(--accent-soft);
    font-weight: 600;
  }

  .mobile-socials {
    display: flex;
    gap: 1.25rem;
    margin-top: 1rem;
    padding: 1rem 0.875rem 0;
    border-top: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
  }

  .mobile-socials a {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 500;
    transition: color 0.2s;
  }

  .mobile-socials a:hover {
    color: var(--accent-color);
  }

  /* Backdrop blur overlay */
  .mobile-overlay-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 250;
    border: none;
    cursor: pointer;
    animation: backdropFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes backdropFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Main content */
  .main-content {
    margin-left: 6rem;
    flex: 1;
    min-height: 100vh;
    padding: 2rem 3rem 4rem;
    transition: margin-left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .main-content.sidebar-expanded {
    margin-left: 18rem;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .floating-sidebar { display: none; }
    .mobile-header { display: flex; }
    .main-content {
      margin-left: 0;
      padding: 5.5rem 1.5rem 3rem;
    }
    .main-content.sidebar-expanded {
      margin-left: 0;
    }
  }

  @media (max-width: 480px) {
    .main-content {
      padding: 5.5rem 1rem 3rem;
    }
  }

  /* Universal Footer styling */
  .universal-footer {
    max-width: 1080px;
    margin: 6rem auto 0;
    padding: 4rem 0 2rem;
    border-top: 1px solid var(--border);
    position: relative;
    z-index: 10;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.2fr 2fr;
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .footer-brand-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
  }

  .footer-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 0.75rem;
    background: var(--accent-color);
    color: #ffffff;
    font-weight: 800;
    font-size: 0.875rem;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
    transition: transform 0.2s ease;
  }

  .footer-logo:hover {
    transform: scale(1.05);
  }

  .footer-bio {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-top: 0.25rem;
  }

  .footer-headline {
    font-size: 0.8125rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .footer-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.75rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 600;
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.2);
    color: #16a34a;
    font-family: var(--font-mono);
    margin-top: 0.5rem;
  }

  :global([data-theme="dark"]) .footer-status-badge {
    background: rgba(74, 222, 128, 0.08);
    border-color: rgba(74, 222, 128, 0.15);
    color: #4ade80;
  }

  .status-pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #16a34a;
    animation: statusPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  :global([data-theme="dark"]) .status-pulse-dot {
    background: #4ade80;
  }

  .footer-links-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .footer-links-col {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .links-col-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
  }

  .links-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-link {
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 0.15s ease, transform 0.15s ease;
    display: inline-block;
    width: fit-content;
  }

  .footer-link:hover {
    color: var(--text-primary);
    transform: translateX(2px);
  }

  .ext-link span {
    font-size: 0.75rem;
    opacity: 0;
    transition: opacity 0.15s ease, transform 0.15s ease;
    display: inline-block;
  }

  .footer-link:hover span {
    opacity: 1;
    transform: translate(2px, -2px);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    margin-top: 3rem;
  }

  .footer-copy {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .footer-credit {
    font-size: 0.72rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  /* Responsive styling */
  @media (max-width: 900px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  @media (max-width: 600px) {
    .footer-links-group {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
</style>
