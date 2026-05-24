<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} | Iqbal Muhammad Adiatma</title>
</svelte:head>

<div class="error-page">
  <span class="code">{$page.status}</span>
  <h1>{$page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
  <p>{$page.status === 404 ? "The page you're looking for doesn't exist." : $page.error?.message ?? 'An unexpected error occurred.'}</p>
  <a href="/" class="back-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
    Back to home
  </a>
</div>

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    gap: 1rem;
    padding: 4rem 0;
  }

  .code {
    font-family: var(--font-mono);
    font-size: 5rem;
    font-weight: 700;
    color: var(--border-strong);
    line-height: 1;
  }

  h1 {
    font-size: 1.75rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 360px;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.65rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: var(--transition-fast);
  }

  .back-btn:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
    background: var(--bg-secondary);
  }
</style>
