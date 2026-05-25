<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import DotGrid from '$lib/components/ui/DotGrid.svelte';
  import GeoDeco from '$lib/components/ui/GeoDeco.svelte';
  import { portfolioData } from '$lib/data/portfolio';
  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let organization = $state('');
  let engagementType = $state('');
  let eventName = $state('');
  let eventDate = $state('');
  let eventFormat = $state('online');
  let description = $state('');
  let budget = $state('');
  let status = $state<'idle' | 'sending' | 'sent'>('idle');
  let touched = $state({ name: false, email: false, organization: false, engagementType: false, description: false });

  const errors = $derived({
    name: touched.name && name.trim().length < 2 ? 'Nama minimal 2 karakter' : '',
    email: touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Email tidak valid' : '',
    organization: touched.organization && organization.trim().length < 2 ? 'Nama organisasi diperlukan' : '',
    engagementType: touched.engagementType && !engagementType ? 'Pilih jenis undangan' : '',
    description: touched.description && description.trim().length < 20 ? 'Deskripsi minimal 20 karakter' : '',
  });

  const isValid = $derived(
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    organization.trim().length >= 2 &&
    !!engagementType &&
    description.trim().length >= 20
  );

  const engagementTypes = [
    { value: 'speaker',       label: 'Speaker / Pembicara' },
    { value: 'freelance',     label: 'Freelance Developer' },
    { value: 'workshop',      label: 'Workshop / Training' },
    { value: 'mentoring',     label: 'Mentoring' },
    { value: 'collaboration', label: 'Kolaborasi Proyek' },
    { value: 'other',         label: 'Lainnya' },
  ];

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    touched = { name: true, email: true, organization: true, engagementType: true, description: true };
    if (!isValid) return;
    status = 'sending';

    const typeLabel = engagementTypes.find(t => t.value === engagementType)?.label ?? engagementType;
    const lines = [
      `Nama: ${name}`,
      `Email: ${email}`,
      phone ? `Phone/WA: ${phone}` : null,
      `Organisasi / Instansi: ${organization}`,
      `Jenis Undangan: ${typeLabel}`,
      eventName ? `Nama Acara / Proyek: ${eventName}` : null,
      eventDate ? `Tanggal: ${eventDate}` : null,
      `Format: ${eventFormat}`,
      budget ? `Estimasi Budget: ${budget}` : null,
      '',
      'Detail / Deskripsi:',
      description,
    ].filter(l => l !== null).join('\n');

    await new Promise(r => setTimeout(r, 900));

    const header = `*[${typeLabel}] Undangan dari ${organization}*`;
    const text = encodeURIComponent(`${header}\n\n${lines}`);
    const waNumber = '6281232588596';
    const waUrl = `https://wa.me/${waNumber}?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    status = 'sent';
    name = email = phone = organization = engagementType = eventName = eventDate = description = budget = '';
    eventFormat = 'online';
    touched = { name: false, email: false, organization: false, engagementType: false, description: false };
  }

  const services = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      title: 'Speaker / Pembicara',
      desc: 'Seminar teknologi, talkshow, webinar, atau guest lecture di kampus, perusahaan, maupun komunitas developer.',
      tags: ['Seminar', 'Webinar', 'Guest Lecture', 'Talkshow'],
      color: '#6366f1',
      topics: ['Web & Mobile Development', 'Fintech Syariah', 'Blockchain & Web3', 'Karir di Tech'],
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      title: 'Freelance Developer',
      desc: 'Pengembangan web, mobile, dan blockchain. Full-stack dari MVP hingga platform enterprise siap produksi.',
      tags: ['Laravel', 'SvelteKit', 'Flutter', 'Web3'],
      color: '#0ea5e9',
      topics: ['Web App & SaaS', 'Mobile App Flutter', 'Blockchain / DApp', 'API & Backend'],
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
      title: 'Workshop & Training',
      desc: 'Workshop coding praktis, training tim developer, atau program mentoring privat untuk pemula hingga intermediate.',
      tags: ['Workshop', 'Training', 'Mentoring', 'Coding'],
      color: '#16a34a',
      topics: ['Laravel dari Nol', 'SvelteKit Hands-on', 'Blockchain Basics', 'Career Mentoring'],
    },
  ];

  const credentials = [
    { icon: '💼', text: 'CTO — Syariah Saham Indonesia' },
    { icon: '⚡', text: 'Full-Stack: Laravel · SvelteKit · Flutter' },
    { icon: '⛓️', text: 'Blockchain: Cosmos SDK · Solana · Solidity' },
    { icon: '🎓', text: 'Grade 11, Software Engineering — IDN Boarding School' },
    { icon: '🚀', text: '10+ production projects shipped' },
    { icon: '📋', text: 'ISO 9001:2015 Quality System Implementor' },
  ];

  const steps = [
    { n: '01', title: 'Isi Form', desc: 'Kirim detail acara, proyek, atau kebutuhan kamu lewat form di bawah.' },
    { n: '02', title: 'Review 24 Jam', desc: 'Aku review dan membalas dalam 1×24 jam kerja.' },
    { n: '03', title: 'Diskusi Singkat', desc: 'Kita jadwalkan call 15–30 menit untuk align ekspektasi & detail.' },
    { n: '04', title: 'Mulai!', desc: 'Deal, tandatangani brief, dan kolaborasi dimulai.' },
  ];
</script>

<svelte:head>
  <title>Hire Me | Iqbal Muhammad Adiatma</title>
  <meta name="description" content="Hire Iqbal Muhammad Adiatma as a speaker, freelance developer, or workshop facilitator. Send your invitation or project brief.">
</svelte:head>

<div class="page">

  <!-- ── Hero ── -->
  <section class="hero">
    <div class="deco-dots"><DotGrid cols={14} rows={7} opacity={0.18} /></div>
    <div class="deco-geo"><GeoDeco /></div>

    <div class="hero-inner">
      <div class="hero-content">
      <Reveal>
        <div class="badge-row">
          <span class="badge avail-badge">
            <span class="pulse-dot"></span>
            Tersedia untuk Proyek
          </span>
          <span class="badge-label">Indonesia · Remote · Hybrid</span>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <h1 class="hero-title">Hire Me or<br /><span class="hero-accent">Invite as Speaker</span></h1>
      </Reveal>

      <Reveal delay={120}>
        <p class="hero-desc">
          Butuh developer full-stack, pembicara teknologi, atau fasilitator workshop?
          Aku siap berkolaborasi untuk membawa <span class="hero-highlight">dampak nyata</span> bagi instansi atau proyekmu.
        </p>
      </Reveal>

      <Reveal delay={160}>
        <div class="hero-cta">
          <a href="#form" class="btn btn-primary">
            Kirim Undangan
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
          <a href="/projects" class="btn btn-secondary">Lihat Proyek</a>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-n">10+</span>
            <span class="stat-l">Projects</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat">
            <span class="stat-n">3+</span>
            <span class="stat-l">Tahun Exp</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat">
            <span class="stat-n">5+</span>
            <span class="stat-l">Instansi</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat">
            <span class="stat-n">24h</span>
            <span class="stat-l">Respons</span>
          </div>
        </div>
      </Reveal>
      </div>

      <Reveal delay={80}>
        <div class="hero-photos">
          <div class="hero-photo photo-sm">
            <img src="/images/amikom-presentasi.jpg" alt="Sesi Presentasi Amikom" />
          </div>
          <div class="hero-photo photo-lg">
            <img src="/images/undip-fotobersama.jpg" alt="Foto Bersama Undip" />
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  <!-- ── Gallery & Experience ── -->
  <section class="section">
    <Reveal>
      <div class="section-hd">
        <span class="section-label">Galeri & Pengalaman</span>
        <h2>Momen & Highlight</h2>
        <p class="section-sub">Beberapa dokumentasi dari kegiatan, seminar, dan kolaborasi yang pernah aku lakukan.</p>
      </div>
    </Reveal>

    <Reveal delay={60}>
      <!-- ROW 1: Feature landscape kiri besar + 2 portrait kanan -->
      <div class="gallery-r1">
        <div class="gallery-item gitem-feature">
          <img src="/images/amikom-landscape.jpg" alt="Event Amikom" loading="lazy" decoding="async" />
          <div class="gallery-caption">Speaker — Universitas Amikom Yogyakarta</div>
        </div>
        <div class="gallery-col">
          <div class="gallery-item">
            <img src="/images/amikom-presentasi.jpg" alt="Sesi Presentasi Amikom" loading="lazy" decoding="async" />
            <div class="gallery-caption">Sesi Presentasi</div>
          </div>
          <div class="gallery-item">
            <img src="/images/amikom-fotbar.jpg" alt="Foto Bersama Amikom" loading="lazy" decoding="async" />
            <div class="gallery-caption">Foto Bersama Peserta</div>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={80}>
      <!-- ROW 2: 3 landscape sejajar -->
      <div class="gallery-r2">
        <div class="gallery-item">
          <img src="/images/smk-muh-guru.jpg" alt="Mengajar Guru SMK Muhammadiyah" loading="lazy" decoding="async" />
          <div class="gallery-caption">Pelatihan Guru — SMK Muhammadiyah</div>
        </div>
        <div class="gallery-item">
          <img src="/images/smk-muh-kelas.jpg" alt="Kelas SMK Muhammadiyah" loading="lazy" decoding="async" />
          <div class="gallery-caption">Mengajar Kelas</div>
        </div>
        <div class="gallery-item">
          <img src="/images/smk-muh-kahoot.jpg" alt="Kahoot Session" loading="lazy" decoding="async" />
          <div class="gallery-caption">Interactive Session</div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={100}>
      <!-- ROW 3: 2 portrait besar + 1 landscape kanan -->
      <div class="gallery-r3">
        <div class="gallery-item">
          <img src="/images/with-dr-joan-santoso.jpg" alt="Bersama Dr. Joan Santoso" loading="lazy" decoding="async" />
          <div class="gallery-caption">Bersama Dr. Joan Santoso</div>
        </div>
        <div class="gallery-item">
          <img src="/images/with-prof-esther.jpg" alt="Bersama Prof. Esther" loading="lazy" decoding="async" />
          <div class="gallery-caption">Bersama Prof. Esther</div>
        </div>
        <div class="gallery-col">
          <div class="gallery-item">
            <img src="/images/undip-fotobersama.jpg" alt="Foto Bersama Undip" loading="lazy" decoding="async" />
            <div class="gallery-caption">Workshop — Universitas Diponegoro</div>
          </div>
          <div class="gallery-item">
            <img src="/images/undip-hambar.png" alt="Undip Talk" loading="lazy" decoding="async" />
            <div class="gallery-caption">Undip — Diskusi</div>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={120}>
      <!-- ROW 4: Full-width banner + 2 square kanan -->
      <div class="gallery-r4">
        <div class="gallery-item gitem-banner">
          <img src="/images/hero.jpg" alt="Sesi Spesial" loading="lazy" decoding="async" />
          <div class="gallery-caption">Behind the Scene — Studio & Workshop</div>
        </div>
        <div class="gallery-col">
          <div class="gallery-item">
            <img src="/images/msw-pertama.jpg" alt="MSW Sesi 1" loading="lazy" decoding="async" />
            <div class="gallery-caption">MSW — Sesi 1</div>
          </div>
          <div class="gallery-item">
            <img src="/images/msw-kedua.jpg" alt="MSW Sesi 2" loading="lazy" decoding="async" />
            <div class="gallery-caption">MSW — Sesi 2</div>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={140}>
      <!-- ROW 5: 2 landscape slim -->
      <div class="gallery-r5">
        <div class="gallery-item">
          <img src="/images/undip-keren.png" alt="Undip Highlight" loading="lazy" decoding="async" />
          <div class="gallery-caption">Undip — Highlight</div>
        </div>
        <div class="gallery-item">
          <img src="/images/amikom-presentasi.jpg" alt="Presentasi Detail" loading="lazy" decoding="async" />
          <div class="gallery-caption">Detail Presentasi</div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={100}>
      <div class="exp-chips">
        {#each [
          { icon: '🎤', label: 'Public Speaker', desc: '5+ instansi' },
          { icon: '💻', label: 'Freelance Dev', desc: '10+ proyek' },
          { icon: '🏫', label: 'Workshop', desc: '3+ batch' },
          { icon: '🏆', label: 'Kompetisi', desc: 'Finalis nasional' },
          { icon: '📜', label: 'Sertifikasi', desc: '33 sertifikat' },
          { icon: '🎓', label: 'Akademik', desc: 'GPA 5.0' },
        ] as chip}
          <div class="exp-chip">
            <span class="exp-icon">{chip.icon}</span>
            <div>
              <span class="exp-label">{chip.label}</span>
              <span class="exp-desc">{chip.desc}</span>
            </div>
          </div>
        {/each}
      </div>
    </Reveal>
  </section>

  <!-- ── Projects ── -->
  <section class="section">
    <Reveal>
      <div class="section-hd">
        <span class="section-label">Portfolio</span>
        <h2>Project Kita</h2>
        <p class="section-sub">Beberapa proyek yang telah aku kerjakan untuk berbagai klien dan kebutuhan bisnis.</p>
      </div>
    </Reveal>

    <Reveal delay={60}>
      <div class="projects-grid">
        {#each portfolioData.projects.filter(p => p.image) as project, i (project.slug)}
          <a href="/projects/{project.slug}" class="project-card">
            <div class="project-image">
              <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
            </div>
            <div class="project-content">
              <div class="project-meta">
                {#if project.year}<span class="project-year">{project.year}</span>{/if}
                {#if project.featured}<span class="project-badge">★ Featured</span>{/if}
                {#if project.status}<span class="project-status">{project.status}</span>{/if}
              </div>
              <h3 class="project-title">{project.title}</h3>
              <p class="project-description">{project.description}</p>
              <div class="project-tags">
                {#each project.tags.slice(0, 3) as tag}
                  <span class="project-tag">{tag}</span>
                {/each}
              </div>
            </div>
          </a>
        {/each}
      </div>
    </Reveal>
  </section>

  <!-- ── Services ── -->
  <section class="section">
    <Reveal>
      <div class="section-hd">
        <span class="section-label">Layanan</span>
        <h2>Apa yang Aku Tawarkan</h2>
      </div>
    </Reveal>

    <div class="services-grid">
      {#each services as svc, i}
        <Reveal delay={i * 80}>
          <div class="svc-card" style="--c: {svc.color}">
            <div class="svc-icon-wrap" style="color:{svc.color}; background:{svc.color}15; border:1px solid {svc.color}25">
              {@html svc.icon}
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
            <div class="svc-topics">
              {#each svc.topics as t}
                <span class="topic-chip">{t}</span>
              {/each}
            </div>
            <a href="#form" class="svc-cta" style="color:{svc.color}">
              Undang Sekarang
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </Reveal>
      {/each}
    </div>
  </section>

  <!-- ── Process ── -->
  <section class="section">
    <Reveal>
      <div class="section-hd">
        <span class="section-label">Proses</span>
        <h2>Bagaimana Cara Kerjanya</h2>
      </div>
    </Reveal>

    <div class="process-grid">
      {#each steps as s, i}
        <Reveal delay={i * 60}>
          <div class="process-step">
            <span class="step-num">{s.n}</span>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
            {#if i < steps.length - 1}
              <div class="step-arrow">→</div>
            {/if}
          </div>
        </Reveal>
      {/each}
    </div>
  </section>

  <!-- ── Form ── -->
  <section class="section" id="form">
    <Reveal>
      <div class="section-hd">
        <span class="section-label">Undang Sekarang</span>
        <h2>Kirim Undangan atau Brief</h2>
        <p class="section-desc">Isi form di bawah dengan detail lengkap. Aku akan merespons dalam <strong>1×24 jam kerja</strong>.</p>
      </div>
    </Reveal>

    <div class="form-grid">

      <!-- Form Card -->
      <Reveal direction="left">
        <div class="form-card">
          {#if status === 'sent'}
            <div class="success-state">
              <div class="success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3>Undangan Terkirim!</h3>
              <p>WhatsApp kamu sudah terbuka dengan draft pesan. Kirim chat-nya untuk menyelesaikan proses undangan.</p>
              <p class="success-note">Belum terbuka? Chat langsung ke <a href="https://wa.me/6281232588596" target="_blank" rel="noopener noreferrer">+62 812-3258-8596</a></p>
              <button class="btn-reset" onclick={() => status = 'idle'}>Kirim Lagi</button>
            </div>
          {:else}
            <form onsubmit={handleSubmit} novalidate>
              <div class="form-row">
                <div class="field" class:has-error={errors.name}>
                  <label for="f-name">Nama Lengkap <span class="req">*</span></label>
                  <input id="f-name" type="text" bind:value={name} placeholder="Nama kamu"
                    autocomplete="name" onblur={() => touched.name = true} />
                  {#if errors.name}<span class="field-error">{errors.name}</span>{/if}
                </div>
                <div class="field" class:has-error={errors.email}>
                  <label for="f-email">Email <span class="req">*</span></label>
                  <input id="f-email" type="email" bind:value={email} placeholder="email@instansi.com"
                    autocomplete="email" onblur={() => touched.email = true} />
                  {#if errors.email}<span class="field-error">{errors.email}</span>{/if}
                </div>
              </div>

              <div class="form-row">
                <div class="field">
                  <label for="f-phone">No. HP / WhatsApp <span class="opt">(opsional)</span></label>
                  <input id="f-phone" type="tel" bind:value={phone} placeholder="+62 8xx xxxx xxxx" autocomplete="tel" />
                </div>
                <div class="field" class:has-error={errors.organization}>
                  <label for="f-org">Nama Instansi / Organisasi <span class="req">*</span></label>
                  <input id="f-org" type="text" bind:value={organization} placeholder="Universitas / Perusahaan / Komunitas"
                    onblur={() => touched.organization = true} />
                  {#if errors.organization}<span class="field-error">{errors.organization}</span>{/if}
                </div>
              </div>

              <div class="field" class:has-error={errors.engagementType}>
                <label for="f-type">Jenis Undangan <span class="req">*</span></label>
                <div class="type-grid">
                  {#each engagementTypes as t}
                    <button
                      type="button"
                      class="type-btn"
                      class:active={engagementType === t.value}
                      onclick={() => { engagementType = t.value; touched.engagementType = true; }}
                    >{t.label}</button>
                  {/each}
                </div>
                {#if errors.engagementType}<span class="field-error">{errors.engagementType}</span>{/if}
              </div>

              <div class="form-row">
                <div class="field">
                  <label for="f-event">Nama Acara / Proyek <span class="opt">(opsional)</span></label>
                  <input id="f-event" type="text" bind:value={eventName} placeholder="Seminar Teknologi 2026 / Project X" />
                </div>
                <div class="field">
                  <label for="f-date">Tanggal Rencana <span class="opt">(opsional)</span></label>
                  <input id="f-date" type="date" bind:value={eventDate} />
                </div>
              </div>

              <div class="field">
                <span class="field-group-label">Format Pelaksanaan</span>
                <div class="format-row">
                  {#each [['online','Online'], ['offline','Offline'], ['hybrid','Hybrid']] as [val, lbl]}
                    <label class="radio-label" class:active={eventFormat === val}>
                      <input type="radio" bind:group={eventFormat} value={val} />
                      {lbl}
                    </label>
                  {/each}
                </div>
              </div>

              <div class="field" class:has-error={errors.description}>
                <label for="f-desc">Detail / Deskripsi <span class="req">*</span></label>
                <textarea id="f-desc" bind:value={description} rows="5"
                  placeholder="Ceritakan kebutuhan kamu: tujuan acara, audiens, topik yang diinginkan, scope proyek, dll."
                  onblur={() => touched.description = true}></textarea>
                <div class="field-foot">
                  {#if errors.description}<span class="field-error">{errors.description}</span>{/if}
                  <span class="char-count" class:warn={description.length > 0 && description.length < 20}>{description.length} / min 20</span>
                </div>
              </div>

              <div class="field">
                <label for="f-budget">Estimasi Budget <span class="opt">(opsional)</span></label>
                <input id="f-budget" type="text" bind:value={budget} placeholder="Rp 500.000 — Rp 5.000.000 / Negotiable" />
              </div>

              <button type="submit" class="submit-btn" disabled={status === 'sending'}>
                {#if status === 'sending'}
                  <span class="spinner"></span> Memproses...
                {:else}
                  Kirim Undangan
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </Reveal>

      <!-- Sidebar -->
      <Reveal direction="right" delay={100}>
        <div class="form-sidebar">

          <div class="sidebar-block">
            <h3>Mengapa Aku?</h3>
            <div class="cred-list">
              {#each credentials as c}
                <div class="cred-item">
                  <span class="cred-icon">{c.icon}</span>
                  <span class="cred-text">{c.text}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="contact-quick">
            <h4>Kontak Langsung</h4>
            <a href="https://wa.me/6281232588596" target="_blank" rel="noopener noreferrer" class="contact-link">
              <span class="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.448h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411z"/></svg>
              </span>
              <div>
                <span class="cl-label">WhatsApp</span>
                <span class="cl-value">+62 812-3258-8596</span>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
            <a href="mailto:iqbalmuhammadadiatma@gmail.com" class="contact-link">
              <span class="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <div>
                <span class="cl-label">Email</span>
                <span class="cl-value">iqbalmuhammadadiatma@gmail.com</span>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/iqbaladiatma" target="_blank" rel="noopener noreferrer" class="contact-link">
              <span class="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </span>
              <div>
                <span class="cl-label">LinkedIn</span>
                <span class="cl-value">iqbaladiatma</span>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          </div>

          <div class="avail-card">
            <div class="avail-pulse"></div>
            <div>
              <span class="avail-title">Tersedia untuk Proyek</span>
              <span class="avail-sub">Freelance · Speaker · Workshop · Mentoring</span>
            </div>
          </div>

        </div>
      </Reveal>

    </div>
  </section>

</div>

<style>
  .page { padding: 0 0 6rem; }

  /* ── Hero ── */
  .hero {
    min-height: 62vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
    margin: 0 -3rem;
    padding: 5rem 3rem 4rem;
    margin-bottom: 5rem;
  }

  .deco-dots {
    position: absolute; top: 2rem; right: -1rem;
    pointer-events: none; z-index: 0;
  }
  .deco-geo {
    position: absolute; right: -80px; bottom: -80px;
    width: 420px; height: 420px;
    pointer-events: none; z-index: 0;
  }

  .hero-inner {
    width: 100%;
    position: relative; z-index: 1;
    animation: fadeUp 0.8s cubic-bezier(0.4,0,0.2,1) both;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .hero-content {
    flex: 0 0 400px;
    min-width: 0;
  }

  .hero-photos {
    flex: 1;
    display: flex;
    gap: 1rem;
    align-items: stretch;
    height: 340px;
  }

  .hero-photo {
    border-radius: 1.5rem;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xl);
    transition: transform 0.4s ease;
  }

  .hero-photo.photo-sm { flex: 0.85; }
  .hero-photo.photo-lg { flex: 1.4; }

  .hero-photo:hover { transform: scale(1.02); }

  .hero-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .badge-row {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2rem; flex-wrap: wrap;
  }

  .avail-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.35rem 0.85rem; border-radius: 99px;
    font-size: 0.75rem; font-weight: 600;
    background: rgba(22,163,74,0.08);
    border: 1px solid rgba(22,163,74,0.25);
    color: #16a34a;
  }

  :global([data-theme="dark"]) .avail-badge {
    background: rgba(74,222,128,0.08);
    border-color: rgba(74,222,128,0.2);
    color: #4ade80;
  }

  .pulse-dot {
    width: 7px; height: 7px;
    border-radius: 50%; background: #16a34a;
    animation: pulse 2s infinite;
  }

  :global([data-theme="dark"]) .pulse-dot { background: #4ade80; }

  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(22,163,74,0.4); }
    50% { opacity: 0.8; box-shadow: 0 0 0 5px rgba(22,163,74,0); }
  }

  .badge-label {
    font-size: 0.8rem; color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .hero-title {
    font-size: clamp(2.8rem, 7vw, 5rem);
    color: var(--text-primary); line-height: 1.05;
    margin-bottom: 1.25rem;
  }

  .hero-accent { color: var(--accent-color); }

  .hero-desc {
    font-size: 1.0625rem; color: var(--text-secondary);
    line-height: 1.75; max-width: 100%; margin-bottom: 2.5rem;
  }

  .hero-highlight { color: var(--text-primary); font-weight: 500; }

  .hero-cta {
    display: flex; align-items: center; gap: 0.75rem;
    flex-wrap: wrap; margin-bottom: 3rem;
  }

  .btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.7rem 1.4rem; border-radius: 0.5rem;
    font-weight: 500; font-size: 0.9375rem;
    transition: var(--transition-slow); cursor: pointer;
  }

  .btn-primary { background: var(--text-primary); color: var(--bg-primary); }
  .btn-primary:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: var(--shadow-md); }

  .btn-secondary { border: 1px solid var(--border); color: var(--text-primary); }
  .btn-secondary:hover { background: var(--bg-secondary); border-color: var(--border-strong); transform: translateY(-2px); }

  .hero-stats {
    display: flex; align-items: center; gap: 1.5rem;
  }

  .stat { display: flex; flex-direction: column; gap: 0.1rem; }
  .stat-n {
    font-size: 1.5rem; font-weight: 700;
    color: var(--text-primary); line-height: 1;
  }
  .stat-l {
    font-size: 0.72rem; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.06em;
    font-family: var(--font-mono);
  }
  .stat-sep { width: 1px; height: 32px; background: var(--border); }

  /* ── Gallery ── */
  .section-sub {
    font-size: 0.9375rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
    max-width: 540px;
  }

  .gallery-item {
    position: relative;
    border-radius: 1.25rem;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-md);
    contain: layout paint style;
  }

  .gallery-r1, .gallery-r2, .gallery-r3, .gallery-r4, .gallery-r5 {
    content-visibility: auto;
    contain-intrinsic-size: auto 400px;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateZ(0);
  }

  .gallery-item:hover img { transform: scale(1.06); }

  .gallery-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 1rem 1.1rem 0.85rem;
    background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%);
    color: #fff;
    font-size: 0.8125rem;
    font-weight: 500;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .gallery-item:hover .gallery-caption {
    opacity: 1;
    transform: translateY(0);
  }

  .gallery-col {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    min-height: 0;
  }

  /* Row 1: Landscape besar kiri + 2 portrait kanan */
  .gallery-r1 {
    display: grid;
    grid-template-columns: 1.55fr 1fr;
    gap: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .gallery-r1 .gitem-feature { height: 400px; }
  .gallery-r1 .gallery-col { height: 400px; }
  .gallery-r1 .gallery-col .gallery-item { flex: 1; }

  /* Row 2: 3 landscape sejajar */
  .gallery-r2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .gallery-r2 .gallery-item { height: 210px; }

  /* Row 3: 2 portrait + kolom 2 landscape */
  .gallery-r3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1.4fr;
    gap: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .gallery-r3 > .gallery-item { height: 320px; }
  .gallery-r3 .gallery-col { height: 320px; }
  .gallery-r3 .gallery-col .gallery-item { flex: 1; }

  /* Row 4: Banner landscape + 2 square kanan */
  .gallery-r4 {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .gallery-r4 .gitem-banner { height: 300px; }
  .gallery-r4 .gallery-col { height: 300px; }
  .gallery-r4 .gallery-col .gallery-item { flex: 1; }

  /* Row 5: 2 landscape slim */
  .gallery-r5 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.875rem;
    margin-bottom: 2rem;
  }

  .gallery-r5 .gallery-item { height: 200px; }

  /* Experience chips */
  .exp-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .exp-chip {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.875rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    cursor: default;
  }

  .exp-chip:hover {
    border-color: var(--accent-border);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .exp-icon { font-size: 1.375rem; line-height: 1; }

  .exp-label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .exp-desc {
    display: block;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 0.1rem;
  }

  /* Projects Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    content-visibility: auto;
    contain-intrinsic-size: 600px;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    contain: layout paint style;
  }

  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
  }

  .project-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    display: block;
  }

  .project-card:hover .project-image img {
    transform: scale(1.04);
  }

  :global(.project-placeholder) {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, color-mix(in srgb, var(--c) 12%, var(--bg-secondary)), color-mix(in srgb, var(--c) 4%, var(--bg-secondary)));
    position: relative;
  }

  :global(.project-placeholder::after) {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 50%, color-mix(in srgb, var(--c) 20%, transparent), transparent 60%);
  }

  .project-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .project-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .project-year {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .project-badge {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    background: var(--accent-soft);
    border-radius: 99px;
    color: var(--accent-color);
  }

  .project-status {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    background: var(--bg-tertiary);
    border-radius: 0.25rem;
    color: var(--text-secondary);
  }

  .project-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .project-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .project-tag {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    border-radius: 0.25rem;
  }

  @media (max-width: 768px) {
    .gallery-r1,
    .gallery-r3,
    .gallery-r4 { grid-template-columns: 1fr; }

    .gallery-r1 .gitem-feature,
    .gallery-r4 .gitem-banner { height: 240px; }

    .gallery-r1 .gallery-col,
    .gallery-r3 .gallery-col,
    .gallery-r4 .gallery-col {
      height: auto;
      flex-direction: row;
    }

    .gallery-r1 .gallery-col .gallery-item,
    .gallery-r3 .gallery-col .gallery-item,
    .gallery-r4 .gallery-col .gallery-item { height: 160px; }

    .gallery-r2 { grid-template-columns: repeat(2, 1fr); }
    .gallery-r2 .gallery-item:nth-child(3) { grid-column: span 2; }

    .gallery-r3 > .gallery-item { height: 220px; }
    .gallery-r5 { grid-template-columns: 1fr; }
    .gallery-r5 .gallery-item { height: 180px; }

    .projects-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .project-content {
      padding: 1rem;
    }

    .project-title {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .gallery-r1 .gallery-col,
    .gallery-r3 .gallery-col,
    .gallery-r4 .gallery-col { flex-direction: column; }

    .gallery-r1 .gallery-col .gallery-item,
    .gallery-r3 .gallery-col .gallery-item,
    .gallery-r4 .gallery-col .gallery-item { height: 180px; }

    .projects-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .project-content {
      padding: 1rem;
    }

    .project-title {
      font-size: 1rem;
    }
  }

  /* ── Section commons ── */
  .section { margin-bottom: 5rem; }

  .section-hd {
    margin-bottom: 2.5rem;
  }

  .section-label {
    display: inline-block;
    font-size: 0.7rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--accent-color); margin-bottom: 0.6rem;
    font-family: var(--font-mono);
  }

  .section-hd h2 {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: var(--text-primary); margin-bottom: 0.5rem;
  }

  .section-desc {
    font-size: 1rem; color: var(--text-secondary);
    line-height: 1.7; max-width: 520px;
  }

  .section-desc strong { color: var(--text-primary); }

  /* ── Services ── */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .svc-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1.25rem;
    padding: 2rem 1.75rem;
    display: flex; flex-direction: column; gap: 1rem;
    transition: var(--transition-slow);
    position: relative; overflow: hidden;
  }

  .svc-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--c);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .svc-card:hover { border-color: var(--border-strong); transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .svc-card:hover::before { opacity: 1; }

  .svc-icon-wrap {
    width: 48px; height: 48px; border-radius: 0.875rem;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .svc-card h3 {
    font-size: 1.125rem; font-weight: 600;
    color: var(--text-primary); line-height: 1.3;
  }

  .svc-card p {
    font-size: 0.875rem; color: var(--text-secondary);
    line-height: 1.65; flex: 1;
  }

  .svc-topics {
    display: flex; flex-wrap: wrap; gap: 0.375rem;
    margin-top: 0.25rem;
  }

  .topic-chip {
    font-size: 0.72rem; font-weight: 500;
    padding: 0.2rem 0.55rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .svc-cta {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.8125rem; font-weight: 600;
    margin-top: 0.25rem;
    transition: gap var(--transition-fast);
  }
  .svc-card:hover .svc-cta { gap: 0.6rem; }

  /* ── Process ── */
  .process-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    position: relative;
  }

  .process-step {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1.5rem 1.25rem;
    position: relative;
  }

  .step-num {
    display: block;
    font-size: 0.7rem; font-weight: 700;
    font-family: var(--font-mono);
    color: var(--accent-color);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.75rem;
  }

  .process-step h4 {
    font-size: 0.9375rem; font-weight: 600;
    color: var(--text-primary); margin-bottom: 0.5rem;
  }

  .process-step p {
    font-size: 0.8125rem; color: var(--text-secondary);
    line-height: 1.6;
  }

  .step-arrow {
    position: absolute;
    top: 50%; right: -0.875rem;
    transform: translateY(-50%);
    font-size: 1.125rem; color: var(--border-strong);
    z-index: 1;
  }

  /* ── Form grid ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2.5rem;
    align-items: start;
  }

  .form-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1.25rem;
    padding: 2.5rem;
  }

  form {
    display: flex; flex-direction: column; gap: 1.25rem;
  }

  .form-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  }

  .field { display: flex; flex-direction: column; gap: 0.45rem; }

  label {
    font-size: 0.8125rem; font-weight: 500;
    color: var(--text-secondary);
  }

  .req { color: var(--accent-color); }
  .opt { font-weight: 400; color: var(--text-muted); font-size: 0.75rem; }

  .field-group-label {
    font-size: 0.8125rem; font-weight: 500;
    color: var(--text-secondary);
  }

  input, textarea {
    padding: 0.7rem 1rem;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    font-size: 0.9375rem; color: var(--text-primary);
    font-family: inherit; outline: none; resize: vertical;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  input::placeholder, textarea::placeholder { color: var(--text-muted); }

  input:focus, textarea:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }

  input[type="date"] { cursor: pointer; }

  .has-error input, .has-error textarea { border-color: #dc2626; }
  .has-error input:focus, .has-error textarea:focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.1); }

  .field-error {
    font-size: 0.72rem; color: #dc2626;
    font-family: var(--font-mono);
    animation: slideIn 0.2s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .field-foot {
    display: flex; justify-content: space-between; align-items: center;
    min-height: 1rem;
  }

  .char-count {
    font-size: 0.72rem; color: var(--text-muted);
    font-family: var(--font-mono); margin-left: auto;
  }
  .char-count.warn { color: #f59e0b; }

  /* Type buttons grid */
  .type-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;
  }

  .type-btn {
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    font-size: 0.8125rem; font-weight: 500;
    color: var(--text-secondary); background: var(--bg-primary);
    cursor: pointer; font-family: inherit;
    transition: var(--transition-fast); text-align: center;
  }

  .type-btn:hover { border-color: var(--accent-color); color: var(--accent-color); }
  .type-btn.active {
    background: var(--accent-color); color: white;
    border-color: var(--accent-color);
  }

  /* Format radio */
  .format-row { display: flex; gap: 0.75rem; }

  .radio-label {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    font-size: 0.875rem; color: var(--text-secondary);
    cursor: pointer; font-weight: 500;
    transition: var(--transition-fast);
  }

  .radio-label input { display: none; }

  .radio-label:hover { border-color: var(--border-strong); }
  .radio-label.active {
    border-color: var(--accent-color);
    background: var(--accent-soft);
    color: var(--accent-color);
  }

  /* Submit */
  .submit-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background: var(--text-primary); color: var(--bg-primary);
    border-radius: 0.5rem;
    font-size: 0.9375rem; font-weight: 600;
    font-family: inherit;
    transition: var(--transition-slow); cursor: pointer;
    align-self: flex-start;
  }

  .submit-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .spinner {
    width: 14px; height: 14px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: inline-block;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Success */
  .success-state {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 2.5rem 1rem; gap: 0.875rem;
  }

  .success-icon {
    width: 60px; height: 60px; border-radius: 50%;
    background: rgba(22,197,94,0.08);
    border: 1px solid rgba(22,197,94,0.25);
    display: flex; align-items: center; justify-content: center;
    color: #16a34a; margin-bottom: 0.5rem;
  }

  .success-state h3 { font-size: 1.375rem; color: var(--text-primary); }
  .success-state p { font-size: 0.9375rem; color: var(--text-secondary); max-width: 340px; line-height: 1.65; }

  .success-note {
    font-size: 0.8125rem !important;
    color: var(--text-muted) !important;
  }

  .success-note a { color: var(--accent-color); text-decoration: underline; }

  .btn-reset {
    margin-top: 0.5rem; padding: 0.5rem 1.5rem;
    border: 1px solid var(--border); border-radius: 0.5rem;
    font-size: 0.875rem; color: var(--text-secondary);
    font-family: inherit; cursor: pointer;
    transition: var(--transition-fast);
  }
  .btn-reset:hover { color: var(--text-primary); border-color: var(--border-strong); background: var(--bg-secondary); }

  /* ── Sidebar ── */
  .form-sidebar {
    display: flex; flex-direction: column; gap: 1.25rem;
    position: sticky; top: 88px;
  }

  .sidebar-block {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1rem; padding: 1.5rem;
  }

  .sidebar-block h3 {
    font-size: 0.8rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--text-muted); font-family: var(--font-mono);
    margin-bottom: 1.25rem;
  }

  .cred-list { display: flex; flex-direction: column; gap: 0.75rem; }

  .cred-item {
    display: flex; align-items: flex-start; gap: 0.625rem;
  }

  .cred-icon { font-size: 1rem; flex-shrink: 0; line-height: 1.4; }

  .cred-text {
    font-size: 0.8375rem; color: var(--text-secondary);
    line-height: 1.45;
  }

  .contact-quick {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1rem; padding: 1.25rem;
    display: flex; flex-direction: column; gap: 0.75rem;
  }

  .contact-quick h4 {
    font-size: 0.8rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--text-muted); font-family: var(--font-mono);
    margin-bottom: 0.25rem;
  }

  .contact-link {
    display: flex; align-items: center; gap: 0.875rem;
    padding: 0.875rem 1rem;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    transition: var(--transition-fast); cursor: pointer;
  }

  .contact-link:hover { border-color: var(--border-strong); transform: translateX(3px); }

  .contact-icon { color: var(--text-secondary); display: flex; flex-shrink: 0; }

  .contact-link > div { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }

  .cl-label {
    font-size: 0.7rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--text-muted); font-family: var(--font-mono);
  }

  .cl-value { font-size: 0.8125rem; color: var(--text-primary); font-weight: 500; }

  .contact-link svg:last-child { color: var(--text-muted); flex-shrink: 0; }
  .contact-link:hover svg:last-child { color: var(--text-primary); }

  .avail-card {
    display: flex; align-items: center; gap: 1rem;
    padding: 1.25rem;
    background: rgba(22,163,74,0.06);
    border: 1px solid rgba(22,163,74,0.2);
    border-radius: 0.875rem;
  }

  :global([data-theme="dark"]) .avail-card {
    background: rgba(74,222,128,0.06);
    border-color: rgba(74,222,128,0.15);
  }

  .avail-pulse {
    width: 10px; height: 10px;
    border-radius: 50%; background: #16a34a; flex-shrink: 0;
    animation: pulse 2s infinite;
  }

  :global([data-theme="dark"]) .avail-pulse { background: #4ade80; }

  .avail-title { display: block; font-size: 0.875rem; font-weight: 600; color: #16a34a; }
  :global([data-theme="dark"]) .avail-title { color: #4ade80; }
  .avail-sub { display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem; }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .hero-photos { height: 280px; }
    .hero-content { flex: 0 0 360px; }
  }

  @media (max-width: 1024px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .process-grid { grid-template-columns: repeat(2, 1fr); }
    .step-arrow { display: none; }
  }

  @media (max-width: 900px) {
    .hero-photos { display: none; }
    .hero-content { flex: 1; }
    .hero { margin: 0 -1.5rem; padding: 4rem 1.5rem 3rem; }
  }

  @media (max-width: 768px) {
    .services-grid { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
    .form-sidebar { position: static; }
    .form-row { grid-template-columns: 1fr; }
    .type-grid { grid-template-columns: repeat(2, 1fr); }

    /* Gallery adjustments at 768px */
    .gallery-r1,
    .gallery-r3,
    .gallery-r4 { grid-template-columns: 1fr; }

    .gallery-r1 .gitem-feature,
    .gallery-r4 .gitem-banner { height: 240px; }

    .gallery-r1 .gallery-col,
    .gallery-r3 .gallery-col,
    .gallery-r4 .gallery-col {
      height: auto;
      flex-direction: row;
    }

    .gallery-r1 .gallery-col .gallery-item,
    .gallery-r3 .gallery-col .gallery-item,
    .gallery-r4 .gallery-col .gallery-item { height: 160px; }

    .gallery-r2 { grid-template-columns: repeat(2, 1fr); }
    .gallery-r2 .gallery-item:nth-child(3) { grid-column: span 2; }

    .gallery-r3 > .gallery-item { height: 220px; }
    .gallery-r5 { grid-template-columns: 1fr; }
    .gallery-r5 .gallery-item { height: 180px; }

    /* Show captions directly on mobile since there is no cursor hover */
    .gallery-caption {
      opacity: 1;
      transform: translateY(0);
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
    }

    .projects-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .project-content { padding: 1rem; }
  }

  @media (max-width: 560px) {
    /* Collapse side-by-side gallery rows to column on small mobile screen */
    .gallery-r1 .gallery-col,
    .gallery-r3 .gallery-col,
    .gallery-r4 .gallery-col {
      flex-direction: column;
    }
    .gallery-r1 .gallery-col .gallery-item,
    .gallery-r3 .gallery-col .gallery-item,
    .gallery-r4 .gallery-col .gallery-item {
      height: 180px;
    }
    .gallery-r2 {
      grid-template-columns: 1fr;
    }
    .gallery-r2 .gallery-item {
      height: 180px;
    }
    .gallery-r2 .gallery-item:nth-child(3) {
      grid-column: span 1;
    }
  }

  @media (max-width: 480px) {
    .process-grid { grid-template-columns: 1fr; }
    .hero-stats { flex-wrap: wrap; gap: 1rem; }
    .format-row { flex-direction: column; }
    .form-card { padding: 1.5rem; }
    .hero { margin: 0 -1rem; padding: 3.5rem 1rem 3rem; }
  }
</style>
