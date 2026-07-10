<script lang="ts">
  import { onMount } from 'svelte';

  interface ReaderEntry {
    id: string;
    nama: string;
    status: string;
    instansi: string;
    alasan: string;
    timestamp: string;
    feedback_rating: number | null;
    feedback_text: string | null;
    feedback_timestamp: string | null;
  }

  let entries = $state<ReaderEntry[]>([]);
  let isLoading = $state(true);
  let errorMsg = $state('');
  let activeTab = $state<'pengajuan' | 'feedback'>('pengajuan');

  // Computed states
  let pengajuanEntries = $derived(
    [...entries].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  );

  let feedbackEntries = $derived(
    entries
      .filter((e) => e.feedback_rating !== null)
      .sort((a, b) => {
        const timeA = a.feedback_timestamp || '';
        const timeB = b.feedback_timestamp || '';
        return timeB.localeCompare(timeA);
      })
  );

  onMount(async () => {
    try {
      const res = await fetch('/pembaca.json');
      if (!res.ok) {
        throw new Error('Belum ada data pengajuan yang tercatat.');
      }
      const data = await res.json();
      entries = data.map((item: any) => ({
        id: item.id || 'legacy_' + Math.random(),
        nama: item.nama || 'Anonim',
        status: item.status || 'Lainnya',
        instansi: item.instansi || '-',
        alasan: item.alasan || 'Log akses pembaca lama.',
        type: item.type || 'online',
        timestamp: item.timestamp || '',
        feedback_rating: item.feedback_rating !== undefined ? item.feedback_rating : null,
        feedback_text: item.feedback_text !== undefined ? item.feedback_text : null,
        feedback_timestamp: item.feedback_timestamp !== undefined ? item.feedback_timestamp : null
      }));
    } catch (err: any) {
      errorMsg = err.message || 'Gagal memuat data log.';
    } finally {
      isLoading = false;
    }
  });
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
  <title>ACCESS LOG | VIEW ONLY</title>
</svelte:head>

<div class="admin-container">
  <header class="admin-header">
    <div class="header-left">
      <div class="pulse-dot"></div>
      <h1>PANEL MONITOR DOKUMEN</h1>
    </div>
    <a href="/buku" class="back-btn">KEMBALI</a>
  </header>

  <main class="admin-main">
    <div class="log-card">
      <div class="card-header">
        <div class="tab-controls">
          <button 
            class="tab-btn" 
            class:active={activeTab === 'pengajuan'} 
            onclick={() => activeTab = 'pengajuan'}
          >
            PENGAJUAN AKSES <span class="tab-count">{pengajuanEntries.length}</span>
          </button>
          <button 
            class="tab-btn" 
            class:active={activeTab === 'feedback'} 
            onclick={() => activeTab = 'feedback'}
          >
            FEEDBACK PEMBACA <span class="tab-count">{feedbackEntries.length}</span>
          </button>
        </div>
      </div>

      {#if isLoading}
        <div class="status-msg">Memuat data...</div>
      {:else if errorMsg || entries.length === 0}
        <div class="status-msg error">[KOSONG] {errorMsg || 'Belum ada data tercatat.'}</div>
      {:else}
        {#if activeTab === 'pengajuan'}
          <div class="table-wrapper">
            <table class="log-table">
              <thead>
                <tr>
                  <th style="width: 20%">WAKTU PENGAJUAN</th>
                  <th style="width: 30%">IDENTITAS & STATUS</th>
                  <th style="width: 50%">ALASAN MEMBACA</th>
                </tr>
              </thead>
              <tbody>
                {#each pengajuanEntries as entry}
                  <tr>
                    <td class="mono-text">{entry.timestamp}</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span class="name-text">{entry.nama.toUpperCase()}</span>
                        <span class="type-badge" class:offline={entry.type === 'offline'}>
                          {entry.type === 'offline' ? 'OFFLINE' : 'ONLINE'}
                        </span>
                      </div>
                      <div class="sub-text">{entry.status.toUpperCase()} @ {entry.instansi.toUpperCase()}</div>
                    </td>
                    <td class="reason-text">{entry.alasan}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <div class="table-wrapper">
            <table class="log-table">
              <thead>
                <tr>
                  <th style="width: 20%">WAKTU FEEDBACK</th>
                  <th style="width: 25%">NAMA</th>
                  <th style="width: 15%">RATING</th>
                  <th style="width: 40%">ULASAN / MASUKAN</th>
                </tr>
              </thead>
              <tbody>
                {#each feedbackEntries as entry}
                  <tr>
                    <td class="mono-text">{entry.feedback_timestamp}</td>
                    <td class="name-text">{entry.nama.toUpperCase()}</td>
                    <td>
                      <div class="stars-display">
                        {#each [1, 2, 3, 4, 5] as star}
                          <span class="star-icon" class:filled={star <= (entry.feedback_rating ?? 0)}>★</span>
                        {/each}
                      </div>
                    </td>
                    <td class="feedback-text-cell">{entry.feedback_text}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      {/if}
    </div>
  </main>
</div>

<style>
  .admin-container {
    box-sizing: border-box;
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    background-color: #050505;
    color: #fff;
    font-family: var(--font-mono, monospace);
    overflow: hidden;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2rem;
    background-color: #000;
    border-bottom: 1px solid #450a0a;
    flex-shrink: 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .pulse-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #dc2626;
    box-shadow: 0 0 10px #dc2626;
  }

  .admin-header h1 {
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    color: #ef4444;
    margin: 0;
    text-transform: uppercase;
  }

  .back-btn {
    color: #9ca3af;
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    border: 1px solid #1f2937;
    padding: 0.5rem 1rem;
    transition: all 0.2s;
  }

  .back-btn:hover {
    color: #ef4444;
    border-color: #ef4444;
    background-color: #450a0a;
  }

  .admin-main {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    justify-content: center;
  }

  .log-card {
    background-color: #0f0f0f;
    border: 2px solid #dc2626;
    box-shadow: 8px 8px #dc2626;
    width: 100%;
    max-width: 60rem;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: fit-content;
    max-height: 100%;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #374151;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  .tab-controls {
    display: flex;
    gap: 1.5rem;
  }

  .tab-btn {
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #9ca3af;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    padding: 0.5rem 0;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
  }

  .tab-btn:hover {
    color: #fff;
  }

  .tab-btn.active {
    color: #ef4444;
    border-bottom-color: #dc2626;
  }

  .tab-count {
    background-color: #1f2937;
    color: #9ca3af;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .tab-btn.active .tab-count {
    background-color: #dc2626;
    color: #fff;
  }

  .status-msg {
    text-align: center;
    color: #9ca3af;
    padding: 3rem 0;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
  }

  .status-msg.error {
    color: #ef4444;
  }

  .table-wrapper {
    flex: 1;
    overflow-y: auto;
    border: 1px solid #1f2937;
  }

  .log-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.8rem;
  }

  .log-table th {
    background-color: #000;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 1rem;
    border-bottom: 1px solid #1f2937;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .log-table td {
    padding: 1rem;
    border-bottom: 1px solid #111827;
    vertical-align: top;
  }

  .log-table tr:hover td {
    background-color: #1a0505;
  }

  .mono-text {
    color: #9ca3af;
    white-space: nowrap;
  }

  .name-text {
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .sub-text {
    font-size: 0.7rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  }

  .reason-text,
  .feedback-text-cell {
    color: #d1d5db;
    line-height: 1.4;
    word-break: break-word;
  }

  .stars-display {
    color: #1f2937;
    font-size: 1.15rem;
    display: flex;
    gap: 0.1rem;
  }

  .star-icon.filled {
    color: #fbbf24;
    text-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
  }

  .type-badge {
    font-size: 0.6rem;
    font-weight: 900;
    padding: 0.15rem 0.35rem;
    background-color: #064e3b;
    color: #10b981;
    border: 1px solid #10b981;
    letter-spacing: 0.05em;
  }

  .type-badge.offline {
    background-color: #78350f;
    color: #f59e0b;
    border: 1px solid #f59e0b;
  }

  @media (max-width: 768px) {
    .admin-header {
      padding: 1rem;
    }
    .admin-main {
      padding: 1rem;
    }
    .log-card {
      padding: 1.25rem;
      box-shadow: 4px 4px #dc2626;
    }
    .log-table th,
    .log-table td {
      padding: 0.75rem;
    }
    .tab-btn {
      font-size: 0.75rem;
    }
  }
</style>
