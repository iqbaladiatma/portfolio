<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import PdfViewer from '$lib/components/ui/PdfViewer.svelte';
  import { bukuToc } from '$lib/data/buku-toc';

  let readerName = $state('');
  let readerId = $state('');
  let isAuthenticated = $state(false);
  let nameInput = $state('');
  let statusInput = $state('');
  let instansiInput = $state('');
  let alasanInput = $state('');
  let errorMsg = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (nameInput.trim().length < 3) {
      errorMsg = 'NAMA TERLALU PENDEK. MINIMAL 3 KARAKTER.';
      return;
    }
    if (!statusInput) {
      errorMsg = 'STATUS HARUS DIPILIH.';
      return;
    }
    if (alasanInput.trim().length < 15) {
      errorMsg = 'ALASAN TERLALU PENDEK. MINIMAL 15 KARAKTER.';
      return;
    }
    
    const namaFix = nameInput.trim();
    const statusFix = statusInput;
    const instansiFix = instansiInput.trim();
    const alasanFix = alasanInput.trim();
    
    try {
      const res = await fetch('/simpan-pengajuan.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: namaFix,
          status: statusFix,
          instansi: instansiFix,
          alasan: alasanFix,
          type: 'offline'
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        readerId = data.reader_id;
        readerName = namaFix;
        isAuthenticated = true;
        sessionStorage.setItem('reader_offline_authenticated', 'true');
        sessionStorage.setItem('reader_offline_name', namaFix);
        sessionStorage.setItem('reader_offline_id', data.reader_id);
      } else {
        errorMsg = data.message || 'Gagal menyimpan pengajuan.';
      }
    } catch (err) {
      console.warn('Gagal mencatat log ke server:', err);
      if (dev) {
        // Fallback local access in dev mode without PHP execution
        const devId = 'dev_offline_' + Date.now();
        readerId = devId;
        readerName = namaFix;
        isAuthenticated = true;
        sessionStorage.setItem('reader_offline_authenticated', 'true');
        sessionStorage.setItem('reader_offline_name', namaFix);
        sessionStorage.setItem('reader_offline_id', devId);
      } else {
        errorMsg = 'GAGAL MENGHUBUNGI SERVER.';
      }
    }
  }

  function handleLogout() {
    isAuthenticated = false;
    sessionStorage.removeItem('reader_offline_authenticated');
    sessionStorage.removeItem('reader_offline_name');
    sessionStorage.removeItem('reader_offline_id');
  }

  $effect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  });

  onMount(() => {
    // Check if session exists
    const storedAuth = sessionStorage.getItem('reader_offline_authenticated') === 'true';
    const storedName = sessionStorage.getItem('reader_offline_name') || '';
    const storedId = sessionStorage.getItem('reader_offline_id') || '';
    if (storedAuth && storedName && storedId) {
      readerName = storedName;
      readerId = storedId;
      isAuthenticated = true;
    }

    // Proactively preload the heavy PDF.js library and fetch the worker file into browser cache
    const preloadResources = async () => {
      try {
        const pdfjsPromise = import('pdfjs-dist');
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
  <title>OFFLINE ACCESS CLEARANCE | SECURE READER</title>
  <link rel="preload" href="/pdf.worker.mjs" as="fetch" crossorigin />
</svelte:head>

<div class="buku-container">
  {#if isAuthenticated}
    <div class="pdf-viewer-layout">
      <header class="viewer-header">
        <div class="header-left">
          <div class="pulse-dot"></div>
          <div class="doc-title">VIEWING: RESTRICTED_DOC.PDF (SECURE OFFLINE)</div>
        </div>
        <div class="header-right">
          <div class="user-info">OFFLINE SECURE ACCESS: <span>{readerName.toUpperCase()}</span></div>
          <button class="logout-btn" onclick={handleLogout}>LOGOUT</button>
        </div>
      </header>
      <main class="viewer-main">
        <PdfViewer pdfUrl={dev ? '/secure-pdf/bukuku.pdf' : '/baca-dokumen.php'} readerName={readerName} readerId={readerId} toc={bukuToc} mode="offline" />
      </main>
    </div>
  {:else}
    <div class="name-gate-wrapper">
      <div class="bg-decoration">OFFLINE<br />DOWNLOAD</div>
      <div class="gate-card">
        <div class="gate-header">
          <div class="ping-dot"></div>
          <h2>Offline Download Request</h2>
        </div>
        <p class="gate-desc">Isi form pengajuan di bawah untuk mendapatkan Clearance mengunduh dokumen secara offline di dalam browser Anda.</p>
        <form class="gate-form" onsubmit={handleSubmit}>
          <div class="input-group">
            <label for="readerName">Nama Lengkap</label>
            <input
              id="readerName"
              type="text"
              placeholder="NAMA LENGKAP ANDA"
              autocomplete="off"
              spellcheck="false"
              bind:value={nameInput}
              required
            />
          </div>

          <div class="input-row">
            <div class="input-group half">
              <label for="readerStatus">Status</label>
              <select id="readerStatus" bind:value={statusInput} required>
                <option value="" disabled selected>PILIH STATUS</option>
                <option value="Pelajar">PELAJAR / SISWA</option>
                <option value="Mahasiswa">MAHASISWA</option>
                <option value="Pekerja">PEKERJA / PROFESIONAL</option>
                <option value="Lainnya">LAINNYA</option>
              </select>
            </div>

            <div class="input-group half">
              <label for="readerInstansi">Nama Instansi / Sekolah</label>
              <input
                id="readerInstansi"
                type="text"
                placeholder="SEKOLAH / UNIV / KANTOR"
                autocomplete="off"
                spellcheck="false"
                bind:value={instansiInput}
                required
              />
            </div>
          </div>

          <div class="input-group">
            <label for="readerAlasan">Kenapa ingin membaca & mengunduh buku ini?</label>
            <textarea
              id="readerAlasan"
              placeholder="TULISKAN ALASAN AKSES OFFLINE (MINIMAL 15 KARAKTER)..."
              autocomplete="off"
              spellcheck="false"
              rows="3"
              bind:value={alasanInput}
              required
            ></textarea>
          </div>

          {#if errorMsg}
            <div class="error-msg">[ERROR] {errorMsg}</div>
          {/if}
          <button type="submit" class="submit-btn">Ajukan & Buka Dokumen</button>
        </form>
      </div>
      <a href="/buku" class="back-link"><span>&larr;</span> BACA ONLINE SAJA</a>
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
    max-width: 32rem;
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
    gap: 1.25rem;
  }

  .input-row {
    display: flex;
    gap: 1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group.half {
    flex: 1;
  }

  @media (max-width: 640px) {
    .input-row {
      flex-direction: column;
      gap: 1.25rem;
    }
  }

  .input-group label {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .input-group input,
  .input-group select,
  .input-group textarea {
    color: #fff;
    text-transform: uppercase;
    background-color: #000;
    border: 1px solid #374151;
    outline: none;
    padding: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }

  .input-group select {
    cursor: pointer;
  }

  .input-group select option {
    background-color: #000;
    color: #fff;
  }

  .input-group textarea {
    resize: none;
  }

  .input-group input:focus,
  .input-group select:focus,
  .input-group textarea:focus {
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
