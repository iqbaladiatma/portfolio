<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import { portfolioData } from '$lib/data/portfolio';

  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
  let touched = $state({ name: false, email: false, subject: false, message: false });

  const errors = $derived({
    name: touched.name && name.trim().length < 2 ? 'Name must be at least 2 characters' : '',
    email: touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email address' : '',
    subject: touched.subject && subject.trim().length < 3 ? 'Subject is too short' : '',
    message: touched.message && message.trim().length < 10 ? 'Message must be at least 10 characters' : ''
  });

  const isValid = $derived(
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    subject.trim().length >= 3 &&
    message.trim().length >= 10
  );

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    touched = { name: true, email: true, subject: true, message: true };
    if (!isValid) return;
    status = 'sending';
    await new Promise(r => setTimeout(r, 1200));
    status = 'sent';
    name = email = subject = message = '';
    touched = { name: false, email: false, subject: false, message: false };
  }

  const contacts = [
    {
      label: 'Email',
      value: 'iqbal@iqbaladiatma.my.id',
      href: portfolioData.socials.email,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
    },
    {
      label: 'GitHub',
      value: 'github.com/iqbaladiatma',
      href: portfolioData.socials.github,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`
    },
    {
      label: 'YouTube',
      value: '@iqbaladiatma',
      href: portfolioData.socials.youtube,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
    }
  ];
</script>

<svelte:head>
  <title>Contact | Iqbal Muhammad Adiatma</title>
  <meta name="description" content="Get in touch with Iqbal Muhammad Adiatma for project collaborations or inquiries.">
</svelte:head>

<div class="page">
  <Reveal>
    <div class="page-header">
      <span class="label">Contact</span>
      <h1>Let's work together</h1>
      <p>Have a project in mind or just want to say hi? My inbox is always open.</p>
    </div>
  </Reveal>

  <div class="contact-grid">
    <!-- Form -->
    <Reveal direction="left">
      <div class="form-card">
        {#if status === 'sent'}
          <div class="success-state">
            <div class="success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
            <button class="btn-reset" onclick={() => status = 'idle'}>Send another</button>
          </div>
        {:else}
          <form onsubmit={handleSubmit} novalidate>
            <div class="form-row">
              <div class="field" class:has-error={errors.name}>
                <label for="name">Name</label>
                <input
                  id="name" type="text" bind:value={name}
                  placeholder="Your name" autocomplete="name"
                  onblur={() => touched.name = true}
                />
                {#if errors.name}<span class="field-error">{errors.name}</span>{/if}
              </div>
              <div class="field" class:has-error={errors.email}>
                <label for="email">Email</label>
                <input
                  id="email" type="email" bind:value={email}
                  placeholder="your@email.com" autocomplete="email"
                  onblur={() => touched.email = true}
                />
                {#if errors.email}<span class="field-error">{errors.email}</span>{/if}
              </div>
            </div>
            <div class="field" class:has-error={errors.subject}>
              <label for="subject">Subject</label>
              <input
                id="subject" type="text" bind:value={subject}
                placeholder="What's this about?"
                onblur={() => touched.subject = true}
              />
              {#if errors.subject}<span class="field-error">{errors.subject}</span>{/if}
            </div>
            <div class="field" class:has-error={errors.message}>
              <label for="message">Message</label>
              <textarea
                id="message" bind:value={message}
                placeholder="Tell me about your project..." rows="6"
                onblur={() => touched.message = true}
              ></textarea>
              {#if errors.message}<span class="field-error">{errors.message}</span>{/if}
            </div>
            <button type="submit" class="submit-btn" disabled={status === 'sending'}>
              {#if status === 'sending'}
                <span class="spinner"></span> Sending...
              {:else}
                Send message
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
      <div class="sidebar">
        <div class="sidebar-block">
          <h3>Get in touch</h3>
          <p>I'm currently available for freelance work and open to full-time opportunities. Response time is usually within 24 hours.</p>
        </div>

        <div class="contact-links">
          {#each contacts as c}
            <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" class="contact-link">
              <span class="contact-icon">{@html c.icon}</span>
              <div>
                <span class="contact-label">{c.label}</span>
                <span class="contact-value">{c.value}</span>
              </div>
              <svg class="ext-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
              </svg>
            </a>
          {/each}
        </div>

        <div class="availability-card">
          <div class="avail-dot"></div>
          <div>
            <span class="avail-title">Available for projects</span>
            <span class="avail-sub">Open to freelance & collaborations</span>
          </div>
        </div>
      </div>
    </Reveal>
  </div>
</div>

<style>
  .page {
    padding: 4rem 0 6rem;
  }

  .page-header {
    margin-bottom: 4rem;
    max-width: 560px;
  }

  .label {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-color);
    margin-bottom: 0.75rem;
    font-family: var(--font-mono);
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }

  .page-header p {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  /* Form */
  .form-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1.25rem;
    padding: 2.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  input, textarea {
    padding: 0.7rem 1rem;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    font-size: 0.9375rem;
    color: var(--text-primary);
    font-family: inherit;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    outline: none;
    resize: vertical;
  }

  input::placeholder, textarea::placeholder {
    color: var(--text-muted);
  }

  input:focus, textarea:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }

  .has-error input,
  .has-error textarea {
    border-color: #dc2626;
  }

  .has-error input:focus,
  .has-error textarea:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  .field-error {
    font-size: 0.75rem;
    color: #dc2626;
    font-family: var(--font-mono);
    animation: slideIn 0.2s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: var(--text-primary);
    color: var(--bg-primary);
    border-radius: 0.5rem;
    font-size: 0.9375rem;
    font-weight: 500;
    font-family: inherit;
    transition: var(--transition-slow);
    cursor: pointer;
    align-self: flex-start;
  }

  .submit-btn:hover:not(:disabled) {
    opacity: 0.85;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Success */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 0;
    gap: 1rem;
  }

  .success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #16a34a;
  }

  .success-state h3 {
    font-size: 1.25rem;
    color: var(--text-primary);
  }

  .success-state p {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    max-width: 300px;
  }

  .btn-reset {
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-family: inherit;
    transition: var(--transition-fast);
    cursor: pointer;
    margin-top: 0.5rem;
  }

  .btn-reset:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
    background: var(--bg-secondary);
  }

  /* Sidebar */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .sidebar-block h3 {
    font-size: 1.125rem;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }

  .sidebar-block p {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    transition: var(--transition-fast);
    cursor: pointer;
  }

  .contact-link:hover {
    border-color: var(--border-strong);
    background: var(--bg-tertiary);
    transform: translateX(4px);
  }

  .contact-icon {
    color: var(--text-secondary);
    flex-shrink: 0;
    display: flex;
  }

  .contact-link > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .contact-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .contact-value {
    font-size: 0.875rem;
    color: var(--text-primary);
    font-weight: 500;
  }

  .ext-icon {
    color: var(--text-muted);
    flex-shrink: 0;
    transition: transform var(--transition-fast), color var(--transition-fast);
  }

  .contact-link:hover .ext-icon {
    transform: translate(2px, -2px);
    color: var(--text-primary);
  }

  .availability-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: rgba(34, 197, 94, 0.06);
    border: 1px solid rgba(34, 197, 94, 0.2);
    border-radius: 0.75rem;
  }

  :global([data-theme="dark"] .availability-card) {
    background: rgba(74, 222, 128, 0.06);
    border-color: rgba(74, 222, 128, 0.15);
  }

  .avail-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #16a34a;
    flex-shrink: 0;
    animation: pulse 2s infinite;
  }

  :global([data-theme="dark"] .avail-dot) {
    background: #4ade80;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
    50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(34,197,94,0); }
  }

  .avail-title {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #16a34a;
  }

  :global([data-theme="dark"] .avail-title) {
    color: #4ade80;
  }

  .avail-sub {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
  }

  @media (max-width: 480px) {
    .form-card { padding: 1.5rem; }
  }
</style>
