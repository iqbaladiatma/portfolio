<script lang="ts">
  import { onMount, untrack, tick } from 'svelte';
  import { dev } from '$app/environment';
  import type { OutlineItem } from '$lib/data/buku-toc';

  interface Props {
    pdfUrl: string;
    readerName: string;
    readerId: string;
    toc?: OutlineItem[];
    mode?: 'online' | 'offline';
  }

  let { pdfUrl, readerName, readerId, toc = [], mode = 'online' }: Props = $props();

  let containerEl = $state<HTMLElement | null>(null);
  let isLoading = $state(true);
  let errorMsg = $state('');
  let pdfDoc = $state<any>(null);
  let totalPages = $state(0);
  let currentPage = $state(1);
  let isRendering = $state(false);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
  let outline = $state<OutlineItem[]>([]);
  let jumpPage = $state('');
  let tocExpanded = $state(true);
  let touchStartX = 0;
  let loadProgress = $state<{ loaded: number; total: number } | null>(null);
  let isBlurred = $state(false);

  // Render queue system
  let pendingPage: number | null = null;
  let activeRenderTask: any = null;
  let lastRenderedPage: number | null = null;

  // Cached DOM elements for reuse
  let cachedCanvas: HTMLCanvasElement | null = null;
  let cachedPageContainer: HTMLDivElement | null = null;
  let cachedWatermark: HTMLDivElement | null = null;

  // Offline Caching & Feedback states
  let isSavingOffline = $state(false);
  let saveOfflineProgress = $state(0);
  let isSavedOffline = $state(false);

  let showFeedbackModal = $state(false);
  let feedbackRating = $state(0);
  let feedbackText = $state('');
  let isSubmittingFeedback = $state(false);
  let feedbackSubmitted = $state(false);
  let feedbackError = $state('');

  // --- All function definitions first ---

  function preventShortcuts(e: KeyboardEvent) {
    if (dev) return;
    // 1. Cegah shortcut dasar: Ctrl+P (Print), Ctrl+S (Save), Ctrl+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'u' || e.key === 'P' || e.key === 'S' || e.key === 'U')) {
      e.preventDefault();
      isBlurred = true;
      alert('Tindakan ini tidak diizinkan pada dokumen terproteksi.');
      return;
    }

    // 2. Deteksi tombol PrintScreen (PrtScn)
    if (e.key === 'PrintScreen' || e.keyCode === 44) {
      isBlurred = true;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('DOKUMEN TERPROTEKSI').catch(() => {});
      }
      alert('Screenshot tidak diizinkan.');
      return;
    }

    // 3. Deteksi tombol Windows (Meta) atau Command Mac secara instan sebelum Snipping Tool aktif
    if (e.key === 'Meta') {
      isBlurred = true;
      return;
    }

    // 4. Deteksi kombinasi tombol screenshot/developer tools (Ctrl+Shift atau Cmd+Shift atau F12)
    if ((e.ctrlKey && e.shiftKey) || (e.metaKey && e.shiftKey) || e.key === 'F12') {
      if (e.key === 'F12' || e.key === 'i' || e.key === 'I') {
        e.preventDefault();
      }
      isBlurred = true;
      return;
    }
  }

  function cancelActiveRender() {
    if (activeRenderTask) {
      try { activeRenderTask.cancel(); } catch {}
      activeRenderTask = null;
    }
  }

  function prefetchPage(pageNum: number) {
    if (!pdfDoc || pageNum < 1 || pageNum > totalPages) return;
    pdfDoc.getPage(pageNum).catch(() => {});
  }

  async function renderPage(pageNum: number): Promise<void> {
    if (!pdfDoc || !containerEl) return;

    if (lastRenderedPage === pageNum && cachedPageContainer && containerEl.contains(cachedPageContainer)) {
      return;
    }

    isRendering = true;
    errorMsg = '';

    try {
      const containerWidth = containerEl.clientWidth || window.innerWidth;
      const containerHeight = containerEl.clientHeight || window.innerHeight;
      if (!containerWidth || !containerHeight) {
        throw new Error('Container has no dimensions');
      }

      const page = await pdfDoc.getPage(pageNum);

      // If a newer page was requested while waiting, bail out
      if (pendingPage !== null) return;

      const viewportScale1 = page.getViewport({ scale: 1 });
      
      // Calculate margins/paddings to subtract from available space
      const paddingX = containerWidth < 640 ? 16 : 32;
      const paddingY = containerWidth < 640 ? 16 : 32;
      
      const targetWidth = Math.max(containerWidth - paddingX, 200);
      const targetHeight = Math.max(containerHeight - paddingY, 200);

      const scaleX = targetWidth / viewportScale1.width;
      const scaleY = targetHeight / viewportScale1.height;
      
      // Select the smaller scale factor to ensure it fits completely
      const scale = Math.min(scaleX, scaleY);
      
      // Cap DPR at 1.5 for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const finalScale = Math.min(scale, 1.5);
      const renderScale = finalScale * dpr;
      const viewport = page.getViewport({ scale: renderScale });

      // Reuse or create canvas and container elements
      if (!cachedPageContainer) {
        cachedPageContainer = document.createElement('div');
        cachedPageContainer.className = 'pdf-page-container';
        cachedCanvas = document.createElement('canvas');
        cachedCanvas.className = 'pdf-canvas';
        cachedWatermark = document.createElement('div');
        cachedWatermark.className = 'pdf-watermark';
        cachedWatermark.innerHTML = `<div class="watermark-text">${(readerName + ' - PROTECTED  ').repeat(12)}</div>`;
        cachedPageContainer.appendChild(cachedCanvas);
        cachedPageContainer.appendChild(cachedWatermark);
      }

      const canvas = cachedCanvas!;
      const ctx = canvas.getContext('2d')!;

      const newWidth = Math.ceil(viewport.width);
      const newHeight = Math.ceil(viewport.height);
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }

      cancelActiveRender();

      const renderTask = page.render({ canvasContext: ctx, viewport });
      activeRenderTask = renderTask;

      await renderTask.promise;
      activeRenderTask = null;
      lastRenderedPage = pageNum;

      // If a newer page was requested during rendering, bail out
      if (pendingPage !== null) return;

      // Mount the cached container if not already in DOM
      if (containerEl && !containerEl.contains(cachedPageContainer)) {
        containerEl.innerHTML = '';
        containerEl.appendChild(cachedPageContainer!);
      }

      prefetchPage(pageNum + 1);
    } catch (e: any) {
      const isCancelled = e?.name === 'RenderingCancelledException'
        || e?.message?.includes('Rendering cancelled');
      if (!isCancelled) {
        console.error('Render error:', e);
        errorMsg = `Gagal merender halaman. Error: ${e.message || 'Unknown'}`;
      }
    } finally {
      isRendering = false;
    }
  }

  async function processRenderQueue() {
    if (isRendering) return;

    while (pendingPage !== null) {
      const pageToRender = pendingPage;
      pendingPage = null;
      await renderPage(pageToRender);
    }
  }

  function scheduleRender(pageNum: number) {
    pendingPage = pageNum;
    if (!untrack(() => isRendering)) {
      processRenderQueue();
    } else {
      cancelActiveRender();
    }
  }

  async function resolvePageNumber(dest: any): Promise<number | null> {
    if (!pdfDoc) return null;
    try {
      let ref: any = dest;
      if (typeof dest === 'string') {
        ref = await pdfDoc.getDestination(dest);
      }
      if (Array.isArray(ref) && ref[0]) {
        const pageIndex = await pdfDoc.getPageIndex(ref[0]);
        return pageIndex + 1;
      }
    } catch (e) {
      console.error('Error resolving outline destination:', e);
    }
    return null;
  }

  async function resolveOutline(items: any[]): Promise<OutlineItem[]> {
    const resolved = await Promise.all(
      items.map(async (item) => {
        const page = await resolvePageNumber(item.dest);
        const children = item.items && item.items.length > 0 ? await resolveOutline(item.items) : [];
        return { title: item.title || 'Untitled', page: page ?? 0, items: children };
      })
    );
    return resolved.filter((item) => item.page > 0 || item.items.length > 0);
  }

  async function loadOutline() {
    if (!pdfDoc) return;
    try {
      if (toc && toc.length > 0) {
        outline = toc;
        return;
      }
      const rawOutline = await pdfDoc.getOutline();
      if (rawOutline) {
        outline = await resolveOutline(rawOutline);
      }
    } catch (e) {
      console.error('Error loading outline:', e);
    }
  }

  async function loadPdf() {
    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

      let finalPdfUrl = pdfUrl;
      try {
        const cache = await caches.open('buku-offline-cache');
        const cachedResponse = await cache.match(pdfUrl);
        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          finalPdfUrl = URL.createObjectURL(blob);
          isSavedOffline = true;
        }
      } catch (cacheErr) {
        console.warn('Failed to read from offline cache:', cacheErr);
      }

      const loadingTask = pdfjs.getDocument({
        url: finalPdfUrl,
        cMapUrl: '/cmaps/',
        cMapPacked: true,
        standardFontDataUrl: '/standard_fonts/',
        wasmUrl: '/wasm/',
        withCredentials: true,
        httpHeaders: {
          'X-Requested-With': 'PdfViewer'
        }
      });
      loadingTask.onProgress = (progress: { loaded: number; total: number }) => {
        loadProgress = progress;
      };
      pdfDoc = await loadingTask.promise;

      totalPages = pdfDoc.numPages;
      currentPage = 1;
      window.addEventListener('resize', handleResize);
      await loadOutline();

      // Render the first page before resolving isLoading
      if (pdfDoc) {
        await tick();
        await renderPage(currentPage);
      }
    } catch (e: any) {
      console.error('Error loading PDF:', e);
      errorMsg = `Gagal memuat dokumen PDF. Error: ${e.message || 'Unknown'}`;
    } finally {
      isLoading = false;
    }

    window.addEventListener('keydown', preventShortcuts);
    window.addEventListener('keyup', preventShortcuts);
  }

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      lastRenderedPage = null; // Force rendering on resize
      scheduleRender(currentPage);
    }, 500);
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: TouchEvent) {
    const endX = e.changedTouches[0].screenX;
    const diff = touchStartX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextPage() : prevPage();
    }
  }

  function nextPage() {
    if (currentPage >= totalPages) return;
    currentPage++;
  }

  function prevPage() {
    if (currentPage <= 1) return;
    currentPage--;
  }

  function jumpToPage() {
    const page = parseInt(jumpPage, 10);
    if (page && page >= 1 && page <= totalPages) {
      currentPage = page;
      jumpPage = '';
    }
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }

  async function handleSaveOffline() {
    if (isSavedOffline || isSavingOffline) return;
    isSavingOffline = true;
    saveOfflineProgress = 10;
    try {
      saveOfflineProgress = 30;
      const response = await fetch(pdfUrl, {
        headers: { 'X-Requested-With': 'PdfViewer' }
      });
      
      if (!response.ok) {
        throw new Error('Gagal mengambil file PDF dari server.');
      }
      
      saveOfflineProgress = 70;
      const cache = await caches.open('buku-offline-cache');
      await cache.put(pdfUrl, response);
      
      isSavedOffline = true;
      saveOfflineProgress = 100;
      alert('Buku berhasil disimpan secara offline. Anda dapat membukanya kembali kapan saja tanpa koneksi internet!');
    } catch (err: any) {
      console.error(err);
      alert('Gagal menyimpan offline: ' + (err.message || 'Unknown error'));
    } finally {
      isSavingOffline = false;
      saveOfflineProgress = 0;
    }
  }

  async function submitFeedback(e: SubmitEvent) {
    e.preventDefault();
    if (feedbackRating < 1 || feedbackRating > 5) {
      feedbackError = 'RATING HARUS DIPILIH (1-5 BINTANG).';
      return;
    }
    if (feedbackText.trim().length < 10) {
      feedbackError = 'ULASAN TERLALU PENDEK. MINIMAL 10 KARAKTER.';
      return;
    }
    
    isSubmittingFeedback = true;
    feedbackError = '';
    
    try {
      const res = await fetch('/simpan-feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reader_id: readerId,
          rating: feedbackRating,
          feedback: feedbackText
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        feedbackSubmitted = true;
        localStorage.setItem('feedback_submitted_' + readerId, 'true');
        showFeedbackModal = false;
        alert('Terima kasih atas feedback yang Anda berikan!');
      } else {
        feedbackError = data.message || 'Gagal mengirimkan feedback.';
      }
    } catch (err) {
      console.error('Gagal mengirim feedback:', err);
      if (dev) {
        feedbackSubmitted = true;
        localStorage.setItem('feedback_submitted_' + readerId, 'true');
        showFeedbackModal = false;
        alert('Mode Dev: Feedback disimulasikan berhasil.');
      } else {
        feedbackError = 'Gagal menghubungi server.';
      }
    } finally {
      isSubmittingFeedback = false;
    }
  }

  // --- Lifecycle hooks at the end ---

  onMount(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    tocExpanded = !mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      tocExpanded = !e.matches;
    };
    mql.addEventListener('change', handler);

    // Anti-screenshot blur
    const handleWindowBlur = () => { if (!dev) isBlurred = true; };
    const handleWindowFocus = () => { if (!dev) isBlurred = false; };
    const handleVisibilityChange = () => {
      if (document.hidden && !dev) {
        isBlurred = true;
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Check feedback status
    const alreadySubmitted = localStorage.getItem('feedback_submitted_' + readerId) === 'true';
    if (alreadySubmitted) {
      feedbackSubmitted = true;
    }

    loadPdf();
    return () => {
      mql.removeEventListener('change', handler);
      window.removeEventListener('keydown', preventShortcuts);
      window.removeEventListener('keyup', preventShortcuts);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
      cancelActiveRender();
    };
  });

  $effect(() => {
    if (pdfDoc && containerEl && !isLoading) {
      scheduleRender(currentPage);
    }
  });

  $effect(() => {
    if (mode === 'offline' && totalPages > 0 && currentPage === totalPages && !feedbackSubmitted) {
      const alreadySubmitted = localStorage.getItem('feedback_submitted_' + readerId) === 'true';
      if (!alreadySubmitted) {
        showFeedbackModal = true;
      }
    }
  });
</script>

<div
  class="pdf-viewer-wrapper"
  role="presentation"
  oncontextmenu={(e) => { e.preventDefault(); return false; }}
  oncopy={(e) => { e.preventDefault(); return false; }}
  ondragstart={(e) => { e.preventDefault(); return false; }}
>
  {#if isBlurred}
    <div class="blur-overlay">
      <div class="lock-box">
        <span class="lock-icon">🔒</span>
        <h3>KEAMANAN DOKUMEN AKTIF</h3>
        <p>Layar dikunci sementara. Fokuskan kembali ke halaman ini untuk melanjutkan membaca.</p>
      </div>
    </div>
  {/if}
  <aside class="toc-sidebar" class:collapsed={!tocExpanded}>
    <div class="toc-header">
      <h3>DAFTAR ISI</h3>
      <button class="toc-toggle" aria-label="Toggle daftar isi" onclick={() => (tocExpanded = !tocExpanded)}>
        {tocExpanded ? '‹' : '›'}
      </button>
    </div>
    <div class="jump-to-page">
      <input
        type="number"
        min="1"
        max={totalPages}
        placeholder="Hal"
        bind:value={jumpPage}
        onkeydown={(e) => e.key === 'Enter' && jumpToPage()}
        disabled={isLoading}
      />
      <button onclick={jumpToPage} disabled={isLoading}>GO</button>
    </div>
    <div class="toc-list">
      {#if isLoading}
        <div class="toc-loading">Memuat...</div>
      {:else if outline.length > 0}
        {#snippet tocList(items: OutlineItem[], level: number)}
          {#each items as item}
            <button
              class="toc-item"
              class:active={currentPage === item.page}
              class:sub={level > 0}
              onclick={() => item.page && goToPage(item.page)}
              disabled={isLoading || currentPage === item.page || !item.page}
              style="padding-left: {0.75 + level * 0.75}rem;"
            >
              {item.title}
            </button>
            {#if item.items && item.items.length > 0}
              {@render tocList(item.items, level + 1)}
            {/if}
          {/each}
        {/snippet}
        {@render tocList(outline, 0)}
      {:else}
        <div class="toc-loading">Tidak ada daftar isi</div>
      {/if}
    </div>
  </aside>

  <div class="main-viewer" role="region" aria-label="PDF viewer" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
    <button class="toc-toggle-btn" aria-label="Toggle daftar isi" onclick={() => (tocExpanded = !tocExpanded)}>
      {tocExpanded ? '‹' : '›'}
    </button>
    {#if isLoading}
      <div class="status-container">
        <div class="loading-box">
          <div class="loading-text">MEMUAT DOKUMEN...</div>
          {#if loadProgress}
            <div class="progress-bar">
              <div class="progress-fill" style="width: {loadProgress.total ? (loadProgress.loaded / loadProgress.total) * 100 : 0}%"></div>
            </div>
            <div class="progress-text">
              {Math.round(loadProgress.loaded / 1024 / 1024)} MB
              {#if loadProgress.total}
                / {Math.round(loadProgress.total / 1024 / 1024)} MB
              {/if}
            </div>
          {/if}
        </div>
      </div>
    {:else if errorMsg}
      <div class="status-container">
        <div class="error-box">[ERROR] {errorMsg}</div>
      </div>
    {/if}

    <div class="viewer-content" style="display: {isLoading || errorMsg ? 'none' : 'flex'}; flex-direction: column; flex: 1; overflow: hidden; min-height: 0; position: relative;">
      <div class="pagination-controls">
        <button class="nav-btn" disabled={currentPage <= 1} onclick={prevPage}>PREV</button>
        <span class="page-info">PAGE {currentPage} OF {totalPages}</span>
        <button class="nav-btn" disabled={currentPage >= totalPages} onclick={nextPage}>NEXT</button>
        
        {#if mode === 'offline'}
          <div class="offline-control-separator"></div>
          
          {#if isSavingOffline}
            <button class="offline-btn saving" disabled>
              SAVING ({saveOfflineProgress}%)
            </button>
          {:else if isSavedOffline}
            <button class="offline-btn saved" disabled>
              💾 OFFLINE
            </button>
          {:else}
            <button class="offline-btn" onclick={handleSaveOffline} disabled={isLoading}>
              💾 BACA OFFLINE
            </button>
          {/if}
        {/if}
      </div>
      <div class="pdf-view-wrapper-inner">
        <div class="pdf-container" class:rendering={isRendering} bind:this={containerEl}></div>
        {#if isRendering}
          <div class="page-loader">MENGGAMBAR HALAMAN...</div>
        {/if}
      </div>
    </div>
  </div>

  {#if showFeedbackModal}
    <div class="feedback-overlay">
      <div class="feedback-card">
        <div class="feedback-header">
          <div class="lock-icon-small">🔒</div>
          <h3>FEEDBACK DIWAJIBKAN</h3>
        </div>
        <p class="feedback-desc">
          Terima kasih telah membaca buku ini hingga selesai. Mohon berikan ulasan singkat & rating untuk membuka akses permanen.
        </p>
        <form class="feedback-form" onsubmit={submitFeedback}>
          <div class="rating-group">
            <label>Rating Buku</label>
            <div class="stars">
              {#each [1, 2, 3, 4, 5] as star}
                <button
                  type="button"
                  class="star-btn"
                  class:active={feedbackRating >= star}
                  onclick={() => (feedbackRating = star)}
                >
                  ★
                </button>
              {/each}
            </div>
          </div>

          <div class="input-group">
            <label for="feedbackText">Masukan / Ulasan</label>
            <textarea
              id="feedbackText"
              placeholder="TULIS ULASAN ANDA (MINIMAL 10 KARAKTER)..."
              bind:value={feedbackText}
              rows="4"
              required
            ></textarea>
          </div>

          {#if feedbackError}
            <div class="error-msg">[ERROR] {feedbackError}</div>
          {/if}

          <button type="submit" class="submit-btn" disabled={isSubmittingFeedback}>
            {isSubmittingFeedback ? 'MENGIRIM...' : 'KIRIM FEEDBACK'}
          </button>
        </form>
      </div>
    </div>
  {/if}
</div>

<style>
  .pagination-controls {
    z-index: 20;
    background-color: #0f0f0f;
    border-top: 1px solid #450a0a;
    border-bottom: 1px solid #450a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    flex-shrink: 0;
  }

  .nav-btn {
    color: #fff;
    cursor: pointer;
    background-color: #dc2626;
    border: none;
    padding: 0.5rem 1.5rem;
    font-family: var(--font-mono);
    font-weight: 800;
    transition: all 0.2s;
  }

  .nav-btn:hover:not(:disabled) {
    background-color: #ef4444;
    transform: translateY(-2px);
  }

  .nav-btn:disabled {
    color: #991b1b;
    cursor: not-allowed;
    background-color: #450a0a;
  }

  .page-info {
    color: #fff;
    letter-spacing: 0.05em;
    font-family: var(--font-mono);
    font-weight: 700;
  }

  .pdf-viewer-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    user-select: none;
    -webkit-user-select: none;
    background-color: #0a0a0a;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .blur-overlay {
    position: absolute;
    inset: 0;
    z-index: 99999;
    background-color: rgba(5, 5, 5, 0.85);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lock-box {
    background-color: #0f0f0f;
    border: 2px solid #dc2626;
    box-shadow: 0 0 30px rgba(220, 38, 38, 0.2);
    padding: 2.5rem;
    text-align: center;
    max-width: 24rem;
    width: 90%;
    box-sizing: border-box;
  }

  .lock-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
    animation: pulseIcon 1.5s infinite;
  }

  @keyframes pulseIcon {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
  }

  .lock-box h3 {
    color: #ef4444;
    font-size: 1.1rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
    font-family: var(--font-mono);
  }

  .lock-box p {
    color: #9ca3af;
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: var(--font-mono);
  }

  .toc-sidebar {
    display: flex;
    flex-direction: column;
    width: 280px;
    flex-shrink: 0;
    background-color: #0f0f0f;
    border-right: 1px solid #450a0a;
    overflow: hidden;
    transition: width 0.2s, transform 0.2s;
    user-select: auto;
    -webkit-user-select: auto;
  }

  .toc-sidebar.collapsed {
    width: 3rem;
  }

  .toc-sidebar.collapsed .toc-header {
    justify-content: center;
  }

  .toc-sidebar.collapsed h3,
  .toc-sidebar.collapsed .jump-to-page,
  .toc-sidebar.collapsed .toc-list {
    display: none;
  }

  .toc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #450a0a;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .toc-header h3 {
    color: #ef4444;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.875rem;
    font-weight: 900;
    margin: 0;
  }

  .toc-toggle {
    color: #9ca3af;
    background: transparent;
    border: 1px solid #1f2937;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, border-color 0.2s;
    padding: 0;
  }

  .toc-toggle:hover {
    color: #ef4444;
    border-color: #ef4444;
  }

  .jump-to-page {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid #450a0a;
    flex-shrink: 0;
  }

  .jump-to-page input {
    flex: 1;
    color: #fff;
    background-color: #000;
    border: 1px solid #374151;
    padding: 0.5rem;
    font-family: inherit;
    outline: none;
    user-select: auto;
    -webkit-user-select: auto;
  }

  .jump-to-page input:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 1px #ef4444;
  }

  .jump-to-page input:disabled {
    opacity: 0.5;
  }

  .jump-to-page button {
    color: #fff;
    cursor: pointer;
    background-color: #dc2626;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .jump-to-page button:hover:not(:disabled) {
    background-color: #ef4444;
  }

  .jump-to-page button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .toc-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-height: 0;
  }

  .toc-loading {
    color: #6b7280;
    text-align: center;
    padding: 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .toc-item {
    color: #9ca3af;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0.5rem 0.75rem;
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: auto;
    -webkit-user-select: auto;
    min-height: 44px;
    box-sizing: border-box;
  }

  .toc-item:hover:not(:disabled),
  .toc-item.active {
    color: #fff;
    background-color: #450a0a;
  }

  .toc-item.sub {
    font-size: 0.75rem;
    opacity: 0.9;
  }

  .toc-item:disabled {
    color: #4b5563;
    cursor: default;
  }

  .main-viewer {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
    position: relative;
    touch-action: pan-y;
  }

  .toc-toggle-btn {
    display: none;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 30;
    color: #9ca3af;
    background: transparent;
    border: 1px solid #1f2937;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    font-size: 1.25rem;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, border-color 0.2s;
  }

  .toc-toggle-btn:hover {
    color: #ef4444;
    border-color: #ef4444;
  }

  .status-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    flex: 1;
  }

  .loading-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: min(320px, 80vw);
  }

  .loading-text {
    color: #dc2626;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 1.25rem;
    font-weight: 900;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    text-align: center;
  }

  .progress-bar {
    width: 100%;
    height: 0.5rem;
    background-color: #450a0a;
    border: 1px solid #dc2626;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: #dc2626;
    transition: width 0.2s;
  }

  .progress-text {
    color: #9ca3af;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .error-box {
    color: #fff;
    letter-spacing: 0.05em;
    background-color: #450a0a;
    border: 1px solid #ef4444;
    padding: 1rem 1.5rem;
    font-family: var(--font-mono);
    font-weight: 700;
  }

  .pdf-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    overflow: hidden;
    min-height: 0;
    padding: 0.5rem;
    box-sizing: border-box;
    transition: opacity 0.2s ease-in-out;
  }

  .pdf-container.rendering {
    opacity: 0.6;
  }

  .pdf-view-wrapper-inner {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    min-height: 0;
  }

  .page-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(15, 15, 15, 0.85);
    border: 1px solid #dc2626;
    padding: 0.75rem 1.5rem;
    font-family: var(--font-mono);
    color: #ef4444;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    font-weight: 800;
    pointer-events: none;
    z-index: 10;
    text-transform: uppercase;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  :global(.pdf-page-container) {
    user-select: none;
    -webkit-user-select: none;
    max-width: 100%;
    max-height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.pdf-canvas) {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  }

  :global(.pdf-watermark) {
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  :global(.watermark-text) {
    opacity: 0.1;
    color: #dc2626;
    white-space: normal;
    text-align: center;
    mix-blend-mode: multiply;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    word-break: break-word;
    width: 200%;
    font-size: clamp(1rem, 4vw, 2.25rem);
    font-weight: 900;
    transform: rotate(-45deg);
  }

  @media print {
    .pdf-viewer-wrapper,
    .toc-sidebar {
      display: none !important;
    }
    :global(body)::before {
      content: "CETAK DILARANG / PRINTING PROHIBITED";
      color: #000;
      text-align: center;
      margin-top: 50px;
      font-size: 24pt;
      font-weight: 700;
      display: block;
    }
  }

  @media (max-width: 768px) {
    .toc-sidebar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: min(280px, 85vw);
      z-index: 50;
      transform: translateX(0);
    }
    .toc-sidebar.collapsed {
      width: min(280px, 85vw);
      transform: translateX(-100%);
    }
    .toc-list {
      gap: 0.5rem;
    }
    .toc-item {
      padding: 0.75rem 1rem;
    }
    .toc-toggle-btn {
      display: flex;
    }
  }

  @media (max-width: 640px) {
    .pagination-controls {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 0.75rem;
      padding: 0.4rem 0.5rem;
      width: 100%;
      box-sizing: border-box;
    }
    .pagination-controls .page-info {
      order: 2;
      width: auto;
      text-align: center;
      font-size: 0.75rem;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .pagination-controls .nav-btn {
      flex: 0 0 auto;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      min-width: 3.5rem;
      text-align: center;
    }
    .pagination-controls .nav-btn:first-of-type {
      order: 1;
    }
    .pagination-controls .nav-btn:last-of-type {
      order: 3;
    }
  }

  .offline-control-separator {
    width: 1px;
    height: 1.25rem;
    background-color: #450a0a;
  }

  .offline-btn {
    color: #fff;
    cursor: pointer;
    background-color: #111827;
    border: 1px solid #374151;
    padding: 0.5rem 0.75rem;
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: 0.7rem;
    transition: all 0.2s;
    letter-spacing: 0.05em;
  }

  .offline-btn:hover:not(:disabled) {
    background-color: #1f2937;
    border-color: #ef4444;
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
  }

  .offline-btn.saved {
    color: #10b981;
    border-color: #10b981;
    cursor: default;
    background-color: #064e3b;
  }

  .offline-btn.saving {
    color: #f59e0b;
    border-color: #f59e0b;
    background-color: #78350f;
    cursor: not-allowed;
  }

  /* Feedback Modal styles */
  .feedback-overlay {
    position: absolute;
    inset: 0;
    z-index: 99999;
    background-color: rgba(5, 5, 5, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-out;
  }

  .feedback-card {
    background-color: #0f0f0f;
    border: 2px solid #dc2626;
    box-shadow: 0 0 40px rgba(220, 38, 38, 0.3);
    padding: 2rem;
    max-width: 26rem;
    width: 90%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .feedback-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-bottom: 1px solid #450a0a;
    padding-bottom: 0.75rem;
  }

  .lock-icon-small {
    font-size: 1.5rem;
    animation: pulseIcon 1.5s infinite;
  }

  .feedback-header h3 {
    color: #ef4444;
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    margin: 0;
    text-transform: uppercase;
    font-family: var(--font-mono);
  }

  .feedback-desc {
    color: #9ca3af;
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: var(--font-mono);
  }

  .feedback-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .rating-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rating-group label {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .stars {
    display: flex;
    gap: 0.5rem;
  }

  .star-btn {
    background: transparent;
    border: none;
    color: #374151;
    font-size: 2rem;
    cursor: pointer;
    transition: color 0.15s, transform 0.1s;
    padding: 0;
    line-height: 1;
  }

  .star-btn:hover {
    transform: scale(1.1);
  }

  .star-btn.active {
    color: #fbbf24;
    text-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
  }

  .feedback-form .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .feedback-form label {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .feedback-form textarea {
    color: #fff;
    background-color: #000;
    border: 1px solid #374151;
    outline: none;
    padding: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    resize: none;
    transition: border-color 0.2s;
  }

  .feedback-form textarea:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 1px #ef4444;
  }

  .feedback-form .submit-btn {
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

  .feedback-form .submit-btn:hover:not(:disabled) {
    background-color: #b91c1c;
  }

  .feedback-form .submit-btn:disabled {
    background-color: #450a0a;
    color: #991b1b;
    cursor: not-allowed;
  }
</style>
