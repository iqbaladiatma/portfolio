<script lang="ts">
  import { onMount } from 'svelte';

  let dark = $state(false);

  onMount(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dark = stored ? stored === 'dark' : prefersDark;
    applyTheme(dark);
  });

  function toggle() {
    dark = !dark;
    applyTheme(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  function applyTheme(isDark: boolean) {
    const html = document.documentElement;
    // Matikan semua transition sementara, lalu switch tema
    html.classList.add('theme-switching');
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    // Beri satu frame agar browser apply perubahan, lalu aktifkan transition body saja
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html.classList.remove('theme-switching');
      });
    });
  }
</script>

<button onclick={toggle} class="toggle" aria-label="Toggle theme" title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
  {#if dark}
    <!-- Sun icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  {:else}
    <!-- Moon icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  {/if}
</button>

<style>
  .toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 0;
    color: var(--text-muted);
    border: 1px solid var(--border);
    transition: var(--transition-base);
    cursor: pointer;
  }

  .toggle:hover {
    color: var(--text-primary);
    border-color: var(--line-bright);
    box-shadow: var(--glow-sm);
  }
</style>
