<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import PdfViewer from '$lib/components/ui/PdfViewer.svelte';
  import { bukuToc } from '$lib/data/buku-toc';

  let readerName = $state('');
  let isAuthenticated = $state(false);
  let nameInput = $state('');
  let errorMsg = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (nameInput.trim().length < 3) {
      errorMsg = 'NAMA TERLALU PENDEK. MINIMAL 3 KARAKTER.';
      return;
    }
    
    const namaFix = nameInput.trim();
    
    try {
      await fetch('/simpan-nama.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: namaFix })
      });
    } catch (err) {
      console.warn('Gagal mencatat log ke server:', err);
    }
    
    readerName = namaFix;
    isAuthenticated = true;
    sessionStorage.setItem('reader_authenticated', 'true');
    sessionStorage.setItem('reader_name', namaFix);
  }

  function handleLogout() {
    isAuthenticated = false;
    sessionStorage.removeItem('reader_authenticated');
    sessionStorage.removeItem('reader_name');
  }

  $effect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  });

  onMount(() => {
    // Check if session exists
    const storedAuth = sessionStorage.getItem('reader_authenticated') === 'true';
    const storedName = sessionStorage.getItem('reader_name') || '';
    if (storedAuth && storedName) {
      readerName = storedName;
      isAuthenticated = true;
    }

    // Proactively preload the heavy PDF.js library and fetch the worker file into browser cache
    const preloadResources = async () => {
      try {
        // Start preloading the pdfjs-dist bundle
        const pdfjsPromise = import('pdfjs-dist');
        
        // Warm up the worker file by triggering a fetch request
        // This puts it in the browser cache, making it load instantly in PdfViewer
        fetch('/pdf.worker.mjs', { priority: 'low' }).catch(() => {});
        
        await pdfjsPromise;
      } catch (err) {
        console.warn('Failed to preload PDF.js resources:', err);
      }
    };
    preloadResources();
  });
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
  <title>CLASSIFIED DOCUMENT | READ ONLY</title>
  <link rel="preload" href="/pdf.worker.mjs" as="fetch" crossorigin />
</svelte:head>

<div class="buku-container">
  {#if isAuthenticated}
    <div class="pdf-viewer-layout">
      <header class="viewer-header">
        <div class="header-left">
          <div class="pulse-dot"></div>
          <div class="doc-title">VIEWING: RESTRICTED_DOC.PDF</div>
        </div>
        <div class="header-right">
          <div class="user-info">LOGGED IN AS: <span>{readerName.toUpperCase()}</span></div>
          <button class="logout-btn" onclick={handleLogout}>LOGOUT</button>
        </div>
      </header>
      <main class="viewer-main">
        <PdfViewer pdfUrl={dev ? '/secure-pdf/bukuku.pdf' : '/baca-dokumen.php'} readerName={readerName} readerId="" toc={bukuToc} mode="online" />
      </main>
    </div>
  {:else}
    <div class="name-gate-wrapper">
      <div class="bg-decoration">RESTRICTED<br />AREA</div>
      <div class="gate-card">
        <div class="gate-header">
          <div class="ping-dot"></div>
          <h2>Security Clearance</h2>
        </div>
        <p class="gate-desc">Dokumen ini diproteksi. Masukkan identitas Anda untuk mencatat akses. Aktivitas Anda diawasi.</p>
        <form class="gate-form" onsubmit={handleSubmit}>
          <div class="input-group">
            <label for="readerName">IDENTITAS PEMBACA</label>
            <input
              id="readerName"
              type="text"
              placeholder="NAMA LENGKAP"
              autocomplete="off"
              spellcheck="false"
              bind:value={nameInput}
            />
          </div>
          {#if errorMsg}
            <div class="error-msg">[ERROR] {errorMsg}</div>
          {/if}
          <button type="submit" class="submit-btn">Akses Dokumen</button>
        </form>
      </div>
      <a href="/" class="back-link"><span>&larr;</span> KEMBALI KE BERANDA</a>
    </div>
  {/if}
</div>

<style>
  .buku-container {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    background-color: #050505;
    color: #fff;
    font-family: var(--font-mono);
    overflow: hidden;
  }

  .name-gate-wrapper {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
  }

  .bg-decoration {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    color: #dc2626;
    text-transform: uppercase;
    text-align: center;
    font-size: 20vw;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.05em;
    opacity: 0.05;
    overflow: hidden;
  }

  .gate-card {
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    background-color: #0f0f0f;
    border: 2px solid #dc2626;
    width: 100%;
    max-width: 28rem;
    padding: 2rem;
    box-shadow: 8px 8px #dc2626;
    transition: transform 0.2s;
  }

  .gate-card:hover {
    transform: translate(-2px, -2px);
  }

  @media (max-width: 640px) {
    .gate-card {
      padding: 1.5rem;
      box-shadow: 4px 4px #dc2626;
    }
    .gate-header h2 {
      font-size: 1.25rem;
    }
  }

  .gate-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .ping-dot {
    width: 1rem;
    height: 1rem;
    background-color: #dc2626;
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    75%, 100% {
      opacity: 0;
      transform: scale(2);
    }
  }

  .gate-header h2 {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #ef4444;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1;
  }

  .gate-desc {
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
  }

  .gate-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group label {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .input-group input {
    color: #fff;
    text-transform: uppercase;
    background-color: #000;
    border: 1px solid #374151;
    outline: none;
    padding: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .input-group input:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 1px #ef4444;
  }

  .error-msg {
    color: #ef4444;
    background-color: #450a0a;
    border: 1px solid #991b1b;
    padding: 0.5rem;
    font-size: 0.75rem;
  }

  .submit-btn {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    background-color: #dc2626;
    border: none;
    padding: 1rem;
    font-weight: 900;
    transition: background-color 0.2s, transform 0.1s;
  }

  .submit-btn:hover {
    background-color: #b91c1c;
  }

  .submit-btn:active {
    transform: scale(0.98);
  }

  .back-link {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.75rem;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #fff;
  }

  .pdf-viewer-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .viewer-header {
    z-index: 10;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background-color: #000;
    border-bottom: 1px solid #450a0a;
  }

  @media (max-width: 640px) {
    .viewer-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
    }
    .header-left,
    .header-right {
      justify-content: space-between;
      width: 100%;
      gap: 0.5rem;
    }
    .doc-title,
    .user-info {
      font-size: 0.65rem;
    }
    .logout-btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.65rem;
    }
  }

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .pulse-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #dc2626;
    animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .doc-title {
    color: #ef4444;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .user-info {
    color: #6b7280;
    letter-spacing: 0.1em;
    font-size: 0.75rem;
  }

  .user-info span {
    color: #fff;
    font-weight: 700;
  }

  .logout-btn {
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: transparent;
    border: 1px solid #1f2937;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 700;
    transition: color 0.2s, border-color 0.2s;
  }

  .logout-btn:hover {
    color: #ef4444;
    border-color: #ef4444;
  }

  .viewer-main {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
</style>
