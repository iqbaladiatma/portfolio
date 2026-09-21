<script lang="ts">
  import { hissaCaseStudy as content } from '$lib/data/hissa';
  import Reveal from '$lib/components/ui/Reveal.svelte';

  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Building HISSA: Product & Research Case Study',
    url: 'https://www.iqbaladiatma.my.id/hissa',
    description:
      'A product and research case study about building HISSA, an Indonesian Sharia stock research platform.',
    author: {
      '@type': 'Person',
      name: 'Iqbal Muhammad Adiatma',
      url: 'https://www.iqbaladiatma.my.id'
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'HISSA',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: content.links.product
    }
  });

  function track(name: string) {
    if (typeof window === 'undefined') return;
    const analyticsWindow = window as Window & {
      plausible?: (event: string) => void;
      umami?: { track: (event: string) => void };
    };
    analyticsWindow.plausible?.(name);
    analyticsWindow.umami?.track(name);
  }
</script>

<svelte:head>
  <title>Building HISSA | FinTech, Financial Data & Research | Iqbal Adiatma</title>
  <meta
    name="description"
    content="A product and research case study about building HISSA, an Indonesian Sharia stock research platform, by software engineering student Iqbal Muhammad Adiatma."
  />
  <link rel="canonical" href="https://www.iqbaladiatma.my.id/hissa" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Building HISSA | Product & Research Case Study" />
  <meta
    property="og:description"
    content="Financial technology, financial data, AI, and research for Indonesia's Sharia capital market."
  />
  <meta property="og:image" content="https://www.iqbaladiatma.my.id/hissa/og-hissa-case-study.png" />
  <meta property="og:url" content="https://www.iqbaladiatma.my.id/hissa" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Building HISSA | Product & Research Case Study" />
  <meta
    name="twitter:description"
    content="Financial technology, financial data, AI, and research for Indonesia's Sharia capital market."
  />
  <meta name="twitter:image" content="https://www.iqbaladiatma.my.id/hissa/og-hissa-case-study.png" />
  <script type="application/ld+json">{structuredData}</script>
</svelte:head>

<svelte:window onload={() => track('hissa_case_study_view')} />

<article class="case-study">
  <header class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Product & Research Case Study</p>
      <h1>{content.title}</h1>
      <p class="hero-lead">{content.tagline}</p>
      <p class="hero-description">{content.description}</p>
      <div class="hero-actions" aria-label="Case study links">
        <a href={content.links.product} target="_blank" rel="noopener noreferrer" class="button primary" onclick={() => track('hissa_live_clicked')}>Visit HISSA</a>
        <a href={content.links.github} target="_blank" rel="noopener noreferrer" class="button secondary" onclick={() => track('github_clicked')}>View GitHub</a>
        <a href="#research" class="text-link">Read Research</a>
      </div>
      <ul class="hero-meta" aria-label="Case study subjects">
        <li>FinTech</li>
        <li>Financial Data</li>
        <li>AI</li>
        <li>Information Systems</li>
      </ul>
    </div>

    <div class="hero-visual" aria-label="HISSA product preview">
      <div class="hero-wireframe">
        <img src="/hissa/hissa-wireframe-product.webp" alt="HISSA product wireframe showing the dashboard, market summary, and stock screener" width="1055" height="1491" fetchpriority="high" />
      </div>
      <div class="visual-note">
        <strong>Public product</strong>
        <span>Designed primarily for Indonesian users</span>
      </div>
    </div>
  </header>

  <section class="section overview" aria-labelledby="overview-title">
    <Reveal>
      <div class="section-heading compact">
        <p class="section-index">01 / Context</p>
        <h2 id="overview-title">A research platform for Indonesia's Sharia capital market</h2>
      </div>
      <div class="overview-grid">
        <div class="prose">
          <p>HISSA brings together structured financial information, stock screening, company fundamentals, analytics, and research tools for Indonesian Sharia-compliant equities.</p>
          <p>The production interface is primarily in Bahasa Indonesia. This page explains the product, my contribution, and the research questions behind the work for an international audience.</p>
        </div>
        <aside class="context-note">
          <span>Student</span>
          <i></i>
          <span>Builder</span>
          <i></i>
          <span>Researcher</span>
        </aside>
      </div>
    </Reveal>
  </section>

  <section class="section problem" aria-labelledby="problem-title">
    <Reveal>
      <div class="section-heading">
        <p class="section-index">02 / The problem</p>
        <h2 id="problem-title">Financial information is available. Making it usable is harder.</h2>
        <p>Three recurring challenges shaped both the product and the questions I began to investigate.</p>
      </div>
    </Reveal>
    <div class="problem-grid">
      {#each content.problems as problem, i}
        <Reveal delay={i * 70}>
          <article class="problem-item">
            <span class="item-number">0{i + 1}</span>
            <h3>{problem.title}</h3>
            <p>{problem.body}</p>
          </article>
        </Reveal>
      {/each}
    </div>
    <Reveal delay={180}>
      <p class="section-conclusion">These problems turned HISSA from a software project into something that also raised research questions for me.</p>
    </Reveal>
  </section>

  <section class="section role" aria-labelledby="role-title">
    <Reveal>
      <div class="role-grid">
        <div class="role-statement">
          <p class="section-index">03 / My role</p>
          <h2 id="role-title">What I worked on</h2>
          <p class="role-name">{content.role.title}</p>
          <p class="organization">{content.role.organization}</p>
          <p class="role-description">My work spans product architecture, software development, financial-data systems, research experimentation, and technical team coordination.</p>
        </div>
        <div class="responsibilities">
          <p class="list-label">Areas of responsibility</p>
          <ul>
            {#each content.responsibilities as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>
      </div>
    </Reveal>
  </section>

  <section class="section capabilities" aria-labelledby="capabilities-title">
    <Reveal>
      <div class="section-heading compact">
        <p class="section-index">04 / Product</p>
        <h2 id="capabilities-title">Selected capabilities</h2>
        <p>Public capabilities are described here without exposing the internal methods that make them work.</p>
      </div>
    </Reveal>
    <div class="capability-grid">
      {#each content.capabilities as capability, i}
        <Reveal delay={(i % 3) * 55}>
          <article class="capability-card">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
          </article>
        </Reveal>
      {/each}
    </div>
  </section>

  <section class="section product-views" aria-labelledby="views-title">
    <Reveal>
      <div class="section-heading compact">
        <h2 id="views-title">Built around real research workflows</h2>
        <p>Two annotated wireframes explain the product's key research and monitoring workflows.</p>
      </div>
    </Reveal>
    <div class="wireframe-grid">
      <Reveal>
        <figure class="wireframe-view">
          <img src="/hissa/hissa-wireframe-product.webp" alt="Annotated HISSA wireframe showing dashboard, market summary, stock screener, and advanced screener screens" width="1055" height="1491" loading="lazy" />
          <figcaption>
            <strong>Primary product flow</strong>
            <span>Dashboard, market summary, and screening tools</span>
          </figcaption>
        </figure>
      </Reveal>
      <Reveal delay={80}>
        <figure class="wireframe-view">
          <img src="/hissa/hissa-wireframe-analysis.webp" alt="Annotated HISSA wireframe showing watchlist, stock detail, Sharia compliance, and research hub screens" width="1055" height="1491" loading="lazy" />
          <figcaption>
            <strong>Analysis and monitoring</strong>
            <span>Watchlists, stock details, compliance, and research</span>
          </figcaption>
        </figure>
      </Reveal>
    </div>
  </section>

  <section class="research-bridge" id="research" aria-labelledby="research-title">
    <div class="research-inner">
      <Reveal>
        <div class="section-heading research-heading">
          <p class="section-index">05 / Product to research</p>
          <h2 id="research-title">When engineering problems become research questions</h2>
          <p>Building HISSA repeatedly created questions that could not be answered only by writing more code.</p>
        </div>
      </Reveal>
      <ol class="question-list">
        {#each content.questions as question, i}
          <li>
            <Reveal delay={(i % 3) * 60}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <p>{question}</p>
            </Reveal>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <section class="section methodology" id="methodology" aria-labelledby="methodology-title">
    <Reveal>
      <div class="section-heading methodology-heading">
        <p class="section-index">06 / Methodology</p>
        <h2 id="methodology-title">Research Methodology Overview</h2>
        <p>HISSA began as an engineering problem: how can fragmented financial information be transformed into structured, explainable, and useful decision support?</p>
        <p>As the system evolved, engineering challenges increasingly became research questions involving data reliability, human validation, Sharia screening, financial analytics, and machine-assisted analysis.</p>
      </div>
    </Reveal>

    <Reveal>
      <div class="methodology-pipeline" aria-label="Seven-stage HISSA research methodology">
        {#each content.methodology.stages as stage, i}
          <div class="pipeline-stage">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <p>{stage}</p>
          </div>
        {/each}
      </div>
    </Reveal>

    <div class="evidence-grid">
      <Reveal>
        <article class="method-block sources-block">
          <p class="method-label">Evidence</p>
          <h3>Data Sources &amp; Evidence</h3>
          <p>HISSA works across public and structured evidence categories while attempting to preserve traceability between derived information and its source.</p>
          <ul>
            {#each content.methodology.sourceCategories as source}<li>{source}</li>{/each}
          </ul>
          <div class="trace-line" aria-label="Evidence traceability principle">
            <span>Source</span><i aria-hidden="true"></i><span>Transformation</span><i aria-hidden="true"></i><span>Validation</span><i aria-hidden="true"></i><span>Analysis</span>
          </div>
        </article>
      </Reveal>

      <Reveal delay={80}>
        <article class="method-block screening-block">
          <p class="method-label">Framework</p>
          <h3>Sharia Screening Framework</h3>
          <p>HISSA evaluates securities in the context of Indonesian Sharia capital-market principles and relevant regulatory criteria.</p>
          <div class="screening-list">
            {#each content.methodology.screening as item, i}
              <div><span>{String(i + 1).padStart(2, '0')}</span><section><h4>{item.title}</h4><p>{item.body}</p></section></div>
            {/each}
          </div>
          <p class="method-note">Screening criteria may evolve as regulations, source data, and methodological interpretations change.</p>
        </article>
      </Reveal>
    </div>

    <Reveal>
      <article class="human-review">
        <div class="human-review-intro">
          <p class="method-label">Research principle</p>
          <h3>Human-in-the-Loop Validation</h3>
          <p>HISSA does not assume that every financial-data problem should be fully automated.</p>
        </div>
        <div class="responsibility-pair">
          <section>
            <span>Machine</span>
            <ul>{#each content.methodology.machineTasks as task}<li>{task}</li>{/each}</ul>
          </section>
          <section>
            <span>Human</span>
            <ul>{#each content.methodology.humanTasks as task}<li>{task}</li>{/each}</ul>
          </section>
        </div>
        <blockquote>Automation should reduce repetitive work without removing human judgment where ambiguity, financial interpretation, or methodological uncertainty remains.</blockquote>
      </article>
    </Reveal>

    <div class="analysis-layout">
      <Reveal>
        <div class="analysis-intro">
          <p class="method-label">Interpretation</p>
          <h3>Analytical Framework</h3>
          <p>Analysis is treated as a set of connected layers rather than one opaque score. Each layer adds context while preserving a role for uncertainty and review.</p>
        </div>
      </Reveal>
      <ol class="analysis-layers">
        {#each content.methodology.analyticalLayers as layer, i}
          <li><span>{String(i + 1).padStart(2, '0')}</span><p>{layer}</p></li>
        {/each}
      </ol>
    </div>

    <Reveal>
      <div class="evolution" aria-labelledby="evolution-title">
        <div>
          <p class="method-label">Ongoing work</p>
          <h3 id="evolution-title">From a working product toward a research direction</h3>
          <p>This progression describes how the questions have evolved. It is not a claim that HISSA is already an academically validated research system.</p>
        </div>
        <ol>
          {#each content.methodology.evolution as stage, i}<li><span>{String(i + 1).padStart(2, '0')}</span><p>{stage}</p></li>{/each}
        </ol>
      </div>
    </Reveal>

    <Reveal>
      <aside class="limitations" aria-labelledby="limitations-title">
        <div>
          <p class="method-label">Scope</p>
          <h3 id="limitations-title">Limitations &amp; Research Boundaries</h3>
        </div>
        <ul>{#each content.methodology.limitations as limitation}<li>{limitation}</li>{/each}</ul>
      </aside>
    </Reveal>
  </section>

  <section class="section publications" aria-labelledby="publications-title">
    <Reveal>
      <div class="section-heading compact">
        <p class="section-index">07 / Selected research</p>
        <h2 id="publications-title">Research shaped by building</h2>
      </div>
    </Reveal>
    <div class="publication-list">
      {#each content.publications as publication, i}
        <Reveal delay={i * 80}>
          <article class="publication-card">
            <div class="publication-meta">
              <span class:accepted={publication.status === 'Accepted'}>{publication.status}</span>
              <p>{publication.venue}</p>
            </div>
            <div class="publication-body">
              <h3>{publication.title}</h3>
              <p>{publication.summary}</p>
              <ul aria-label="Research areas">
                {#each publication.areas as area}<li>{area}</li>{/each}
              </ul>
            </div>
          </article>
        </Reveal>
      {/each}
    </div>
    <a href={content.links.research} class="inline-action" onclick={() => track('publication_clicked')}>View all research</a>
  </section>

  <section class="section direction" aria-labelledby="direction-title">
    <Reveal>
      <div class="direction-layout">
        <div class="direction-copy">
          <p class="section-index">08 / Research direction</p>
          <h2 id="direction-title">What I want to understand next</h2>
          <blockquote>How can we build intelligent systems that are technically capable while remaining useful, understandable, and responsible for the humans who use them?</blockquote>
        </div>
        <div class="research-map" aria-label="Research interests around intelligent financial systems">
          <div class="map-center">Intelligent<br />Financial Systems</div>
          {#each content.researchAreas as area, i}
            <div class="map-node node-{i + 1}">{area}</div>
          {/each}
        </div>
      </div>
    </Reveal>
  </section>

  <section class="section technical" aria-labelledby="technical-title">
    <Reveal>
      <div class="section-heading compact">
        <p class="section-index">09 / Technical overview</p>
        <h2 id="technical-title">The technology, at a deliberate distance</h2>
        <p>Enough context to show the working domains, without publishing production architecture or proprietary methods.</p>
      </div>
    </Reveal>
    <div class="stack-grid">
      {#each content.stack as group}
        <div class="stack-group">
          <h3>{group.group}</h3>
          <ul>{#each group.items as item}<li>{item}</li>{/each}</ul>
        </div>
      {/each}
    </div>
  </section>

  <section class="section about" aria-labelledby="about-title">
    <Reveal>
      <div class="about-grid">
        <div class="portrait-frame">
          <img src="/hissa/iqbal.webp" alt="Portrait of Iqbal Muhammad Adiatma" width="856" height="1280" loading="lazy" />
        </div>
        <div class="about-copy">
          <p class="section-index">10 / About Iqbal</p>
          <h2 id="about-title">Student, builder, and researcher from Indonesia</h2>
          <p>I'm Iqbal Muhammad Adiatma, a final-year Software Engineering student from Indonesia.</p>
          <p>I enjoy building systems around real problems involving data, automation, financial technology, and human decision-making.</p>
          <p>My current academic interests sit at the intersection of Artificial Intelligence, Financial Technology, Information Systems, and Software Engineering.</p>
          <div class="about-links">
            <a href={content.links.portfolio}>Portfolio</a>
            <a href={content.links.github} target="_blank" rel="noopener noreferrer" onclick={() => track('github_clicked')}>GitHub</a>
            <a href={content.links.linkedin} target="_blank" rel="noopener noreferrer" onclick={() => track('linkedin_clicked')}>LinkedIn</a>
          </div>
        </div>
      </div>
    </Reveal>
  </section>

  <section class="closing" aria-labelledby="closing-title">
    <Reveal>
      <p class="closing-kicker">Continue from the case study</p>
      <h2 id="closing-title">See the product in context, or continue the academic conversation.</h2>
      <div class="closing-actions">
        <a href={content.links.product} target="_blank" rel="noopener noreferrer" class="button primary" onclick={() => track('hissa_live_clicked')}>Explore HISSA</a>
        <a href={content.links.linkedin} target="_blank" rel="noopener noreferrer" class="button secondary" onclick={() => track('linkedin_clicked')}>Connect on LinkedIn</a>
      </div>
      <p class="language-note">The production product is primarily designed for Indonesian users and currently uses Bahasa Indonesia.</p>
    </Reveal>
  </section>

  <footer class="case-footer">
    <div>
      <strong>Iqbal Muhammad Adiatma</strong>
      <nav aria-label="Case study footer">
        <a href={content.links.product} target="_blank" rel="noopener noreferrer">HISSA</a>
        <a href={content.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={content.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
    </div>
    <p>HISSA is presented here as a software, product, and research case study. Nothing on this page constitutes investment advice, financial advice, or a recommendation to buy or sell securities.</p>
  </footer>
</article>

<style>
  :global(.content-wrapper:has(.case-study)) {
    max-width: none;
    padding: 0;
  }

  :global(.main-content:has(.case-study) .universal-footer) {
    display: none;
  }

  .case-study {
    --hissa-bg: #080b0a;
    --hissa-surface: #0e1311;
    --hissa-card: #121815;
    --hissa-border: #26302b;
    --hissa-text: #f3f6f4;
    --hissa-secondary: #a8b3ac;
    --hissa-muted: #7f8d85;
    --hissa-green: #22c55e;
    --hissa-green-soft: #4ade80;
    --hissa-blue: #38bdf8;
    min-height: 100dvh;
    background: var(--hissa-bg);
    color: var(--hissa-text);
    overflow: hidden;
  }

  .case-study :global(h1),
  .case-study :global(h2),
  .case-study :global(h3) { color: var(--hissa-text); }
  .case-study :global(a:focus-visible),
  .case-study :global(button:focus-visible) { outline: 3px solid var(--hissa-blue); outline-offset: 4px; }

  .hero, .section, .research-inner, .closing, .case-footer {
    width: min(1200px, calc(100% - 80px));
    margin-inline: auto;
  }

  .hero {
    min-height: min(860px, 100dvh);
    display: grid;
    grid-template-columns: 7fr 5fr;
    align-items: center;
    gap: 64px;
    padding-block: 88px 72px;
  }

  .eyebrow, .section-index, .list-label {
    color: var(--hissa-green-soft);
    font: 700 0.72rem/1.4 var(--font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero h1 { font-size: clamp(3.5rem, 7vw, 5.5rem); line-height: 0.98; letter-spacing: -0.055em; margin: 20px 0 24px; }
  .hero-lead { max-width: 620px; color: var(--hissa-text); font-size: clamp(1.2rem, 2.2vw, 1.65rem); line-height: 1.4; }
  .hero-description { max-width: 650px; margin-top: 22px; color: var(--hissa-secondary); font-size: 1rem; line-height: 1.75; }
  .hero-actions, .closing-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
  .button { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; padding: 0 20px; border-radius: 10px; border: 1px solid transparent; font-size: 0.9rem; font-weight: 700; transition: transform 180ms ease, background 180ms ease, border-color 180ms ease; white-space: nowrap; }
  .button:hover { transform: translateY(-2px); }
  .button:active { transform: translateY(0); }
  .button.primary { background: var(--hissa-green); color: #052e16; }
  .button.primary:hover { background: var(--hissa-green-soft); }
  .button.secondary { border-color: var(--hissa-border); color: var(--hissa-text); background: var(--hissa-surface); }
  .button.secondary:hover { border-color: #3b4b42; background: var(--hissa-card); }
  .text-link, .inline-action { color: var(--hissa-green-soft); font-size: 0.9rem; font-weight: 700; border-bottom: 1px solid rgba(74, 222, 128, 0.45); padding-block: 10px 4px; }
  .hero-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
  .hero-meta li, .publication-body li { border: 1px solid var(--hissa-border); border-radius: 999px; padding: 5px 10px; color: var(--hissa-secondary); font-size: 0.72rem; }

  .hero-visual { position: relative; display: flex; justify-content: flex-end; }
  .hero-wireframe { width: min(100%, 430px); max-height: 600px; border: 1px solid #334038; border-radius: 18px; overflow: hidden; background: #f7faf8; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.38); }
  .hero-wireframe img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .visual-note { position: absolute; right: -18px; bottom: -26px; width: 210px; padding: 16px; border: 1px solid rgba(74, 222, 128, 0.32); border-radius: 12px; background: rgba(14, 19, 17, 0.96); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2); }
  .visual-note strong, .visual-note span { display: block; }
  .visual-note strong { font-size: 0.8rem; }
  .visual-note span { margin-top: 3px; color: var(--hissa-muted); font-size: 0.68rem; }

  .section { padding-block: 112px; border-top: 1px solid var(--hissa-border); }
  .section-heading { max-width: 780px; margin-bottom: 52px; }
  .section-heading.compact { margin-bottom: 44px; }
  .section-heading h2, .role h2, .direction h2, .about h2, .closing h2 { margin-top: 14px; font-size: clamp(2rem, 4vw, 3.35rem); line-height: 1.08; letter-spacing: -0.04em; }
  .section-heading > p:last-child { max-width: 680px; margin-top: 18px; color: var(--hissa-secondary); line-height: 1.75; }
  .overview-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 80px; align-items: start; }
  .prose { max-width: 760px; }
  .prose p { color: var(--hissa-secondary); font-size: 1.12rem; line-height: 1.8; }
  .prose p + p { margin-top: 20px; }
  .context-note { display: flex; flex-direction: column; gap: 14px; padding-left: 30px; border-left: 1px solid var(--hissa-border); }
  .context-note span { font-size: 1.12rem; font-weight: 650; }
  .context-note i { width: 26px; height: 1px; background: var(--hissa-green); }

  .problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--hissa-border); border: 1px solid var(--hissa-border); border-radius: 16px; overflow: hidden; }
  .problem-item { min-height: 270px; padding: 34px; background: var(--hissa-surface); }
  .item-number { color: var(--hissa-green-soft); font: 650 0.72rem var(--font-mono); }
  .problem-item h3 { margin-top: 64px; font-size: 1.15rem; }
  .problem-item p { margin-top: 10px; color: var(--hissa-secondary); line-height: 1.7; }
  .section-conclusion { max-width: 700px; margin: 34px 0 0 auto; color: var(--hissa-secondary); font-size: 1.05rem; line-height: 1.7; }

  .role { background: var(--hissa-surface); width: 100%; padding-inline: max(40px, calc((100vw - 1200px) / 2)); }
  .role-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 100px; }
  .role-name { margin-top: 48px; color: var(--hissa-green-soft); font-size: 1.35rem; font-weight: 750; }
  .organization { margin-top: 5px; color: var(--hissa-muted); }
  .role-description { max-width: 570px; margin-top: 24px; color: var(--hissa-secondary); line-height: 1.75; }
  .responsibilities ul { display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; margin-top: 18px; }
  .responsibilities li { padding: 14px 0; border-bottom: 1px solid var(--hissa-border); color: var(--hissa-secondary); font-size: 0.9rem; }

  .capability-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .capability-card { position: relative; min-height: 190px; padding: 28px; border: 1px solid var(--hissa-border); border-radius: 16px; background: var(--hissa-card); transition: border-color 180ms ease, transform 180ms ease; }
  .capability-card:hover { transform: translateY(-3px); border-color: rgba(34, 197, 94, 0.48); }
  .capability-card > span { position: absolute; top: 26px; right: 28px; color: var(--hissa-muted); font: 600 0.7rem var(--font-mono); }
  .capability-card h3 { max-width: 75%; font-size: 1.08rem; }
  .capability-card p { max-width: 530px; margin-top: 46px; color: var(--hissa-secondary); line-height: 1.65; }

  .wireframe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
  .wireframe-view { overflow: hidden; border: 1px solid var(--hissa-border); border-radius: 16px; background: var(--hissa-card); }
  .wireframe-view img { width: 100%; height: auto; background: #f7faf8; }
  .wireframe-view figcaption { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 18px 20px; }
  .wireframe-view figcaption strong { color: var(--hissa-text); font-size: 0.86rem; }
  .wireframe-view figcaption span { color: var(--hissa-muted); font-size: 0.74rem; text-align: right; }

  .research-bridge { background: linear-gradient(135deg, #071411 0%, #081215 52%, #071015 100%); border-block: 1px solid rgba(56, 189, 248, 0.2); }
  .research-inner { padding-block: 120px; }
  .research-heading .section-index { color: var(--hissa-blue); }
  .research-heading h2 { max-width: 860px; }
  .question-list { margin-top: 62px; border-top: 1px solid rgba(56, 189, 248, 0.22); }
  .question-list li { border-bottom: 1px solid rgba(56, 189, 248, 0.18); }
  .question-list li :global(.reveal) { display: grid; grid-template-columns: 84px 1fr; gap: 24px; padding: 34px 0; }
  .question-list span { color: var(--hissa-blue); font: 600 0.78rem var(--font-mono); padding-top: 7px; }
  .question-list p { max-width: 890px; color: var(--hissa-text); font-size: clamp(1.25rem, 2.3vw, 1.8rem); line-height: 1.45; letter-spacing: -0.02em; }

  .methodology { position: relative; }
  .methodology-heading { max-width: 900px; }
  .methodology-heading .section-index, .method-label { color: var(--hissa-blue); }
  .methodology-heading > p:last-child { margin-top: 10px; }
  .method-label { font: 700 0.68rem/1.4 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; }
  .methodology h3 { margin-top: 10px; font-size: clamp(1.45rem, 2.6vw, 2.15rem); letter-spacing: -0.025em; }
  .methodology-pipeline { display: grid; grid-template-columns: repeat(7, 1fr); margin: 12px 0 88px; border-block: 1px solid rgba(56, 189, 248, 0.25); }
  .pipeline-stage { position: relative; min-width: 0; padding: 24px 18px 28px; }
  .pipeline-stage:not(:last-child) { border-right: 1px solid rgba(56, 189, 248, 0.18); }
  .pipeline-stage:not(:last-child)::after { content: ''; position: absolute; top: 31px; right: -4px; width: 7px; height: 7px; transform: rotate(45deg); border-top: 1px solid var(--hissa-blue); border-right: 1px solid var(--hissa-blue); background: var(--hissa-bg); z-index: 1; }
  .pipeline-stage > span, .analysis-layers span, .evolution li span { color: var(--hissa-blue); font: 650 0.7rem var(--font-mono); }
  .pipeline-stage p { margin-top: 28px; color: var(--hissa-text); font-size: 0.82rem; line-height: 1.5; }
  .evidence-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 18px; align-items: start; }
  .method-block { min-height: 100%; padding: 34px; border: 1px solid var(--hissa-border); border-radius: 16px; background: var(--hissa-card); }
  .method-block > p:not(.method-label, .method-note) { margin-top: 16px; color: var(--hissa-secondary); line-height: 1.7; }
  .sources-block > ul { margin-top: 30px; border-top: 1px solid var(--hissa-border); }
  .sources-block > ul li { padding: 13px 0; border-bottom: 1px solid var(--hissa-border); color: var(--hissa-secondary); font-size: 0.87rem; }
  .trace-line { display: flex; align-items: center; gap: 8px; margin-top: 34px; color: var(--hissa-text); font: 650 0.63rem var(--font-mono); }
  .trace-line i { flex: 1; min-width: 8px; height: 1px; background: rgba(56, 189, 248, 0.45); }
  .screening-list { margin-top: 28px; }
  .screening-list > div { display: grid; grid-template-columns: 40px 1fr; gap: 14px; padding: 20px 0; border-top: 1px solid var(--hissa-border); }
  .screening-list > div > span { color: var(--hissa-blue); font: 650 0.68rem var(--font-mono); padding-top: 4px; }
  .screening-list h4 { color: var(--hissa-text); font-size: 0.9rem; }
  .screening-list section p { margin-top: 7px; color: var(--hissa-secondary); font-size: 0.84rem; line-height: 1.65; }
  .method-note { margin-top: 12px; padding-top: 18px; border-top: 1px solid var(--hissa-border); color: var(--hissa-muted); font-size: 0.76rem; line-height: 1.6; }
  .human-review { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 56px 72px; margin-top: 86px; padding: 44px; background: var(--hissa-surface); border-block: 1px solid var(--hissa-border); }
  .human-review-intro > p:last-child, .analysis-intro > p:last-child, .evolution > div > p:last-child { margin-top: 16px; color: var(--hissa-secondary); line-height: 1.7; }
  .responsibility-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
  .responsibility-pair section > span { color: var(--hissa-blue); font: 700 0.72rem var(--font-mono); text-transform: uppercase; }
  .responsibility-pair ul { margin-top: 16px; }
  .responsibility-pair li { padding: 10px 0; border-bottom: 1px solid var(--hissa-border); color: var(--hissa-secondary); font-size: 0.85rem; }
  .human-review blockquote { grid-column: 1 / -1; max-width: 930px; padding-left: 22px; border-left: 2px solid var(--hissa-blue); color: var(--hissa-text); font-size: clamp(1.05rem, 2vw, 1.35rem); line-height: 1.65; }
  .analysis-layout { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 88px; margin-top: 100px; align-items: start; }
  .analysis-intro { position: sticky; top: 36px; }
  .analysis-layers { border-top: 1px solid rgba(56, 189, 248, 0.3); }
  .analysis-layers li { display: grid; grid-template-columns: 60px 1fr; gap: 18px; align-items: center; min-height: 78px; border-bottom: 1px solid var(--hissa-border); }
  .analysis-layers p { color: var(--hissa-text); font-size: clamp(1rem, 2vw, 1.25rem); }
  .evolution { margin-top: 104px; }
  .evolution > div { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; }
  .evolution > div > p:last-child { margin-top: 0; }
  .evolution ol { display: grid; grid-template-columns: repeat(5, 1fr); margin-top: 38px; border-top: 1px solid rgba(56, 189, 248, 0.3); }
  .evolution li { position: relative; padding: 26px 18px 0 0; }
  .evolution li:not(:last-child)::after { content: ''; position: absolute; top: -4px; right: 18px; width: 7px; height: 7px; border-radius: 50%; background: var(--hissa-blue); }
  .evolution li p { margin-top: 17px; color: var(--hissa-secondary); font-size: 0.8rem; line-height: 1.55; }
  .limitations { display: grid; grid-template-columns: 0.72fr 1.28fr; gap: 64px; margin-top: 100px; padding: 34px 0; border-block: 1px solid var(--hissa-border); }
  .limitations h3 { font-size: 1.45rem; }
  .limitations ul { display: grid; grid-template-columns: 1fr 1fr; gap: 0 30px; }
  .limitations li { padding: 10px 0; color: var(--hissa-secondary); font-size: 0.82rem; line-height: 1.55; }

  .publication-list { display: grid; gap: 18px; }
  .publication-card { display: grid; grid-template-columns: 240px 1fr; gap: 50px; padding: 34px; border: 1px solid var(--hissa-border); border-radius: 16px; background: var(--hissa-card); }
  .publication-meta > span { display: inline-block; padding: 5px 9px; border-radius: 6px; background: rgba(56, 189, 248, 0.1); color: var(--hissa-blue); font: 700 0.67rem var(--font-mono); text-transform: uppercase; }
  .publication-meta > span.accepted { background: rgba(34, 197, 94, 0.1); color: var(--hissa-green-soft); }
  .publication-meta p { margin-top: 15px; color: var(--hissa-muted); font-size: 0.8rem; line-height: 1.55; }
  .publication-body h3 { font-size: 1.28rem; line-height: 1.4; }
  .publication-body > p { margin-top: 14px; color: var(--hissa-secondary); line-height: 1.7; }
  .publication-body ul { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 22px; }
  .inline-action { display: inline-block; margin-top: 32px; }

  .direction-layout { display: grid; grid-template-columns: 0.88fr 1.12fr; gap: 90px; align-items: center; }
  .direction-copy blockquote { margin-top: 38px; padding-left: 24px; border-left: 2px solid var(--hissa-blue); color: var(--hissa-secondary); font-size: 1.14rem; line-height: 1.75; }
  .research-map { position: relative; min-height: 520px; }
  .research-map::before { content: ''; position: absolute; inset: 12% 16%; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 50%; }
  .map-center, .map-node { position: absolute; display: flex; align-items: center; justify-content: center; text-align: center; border: 1px solid var(--hissa-border); background: var(--hissa-surface); color: var(--hissa-secondary); }
  .map-center { inset: 50% auto auto 50%; width: 180px; height: 180px; transform: translate(-50%, -50%); border-radius: 50%; border-color: rgba(56, 189, 248, 0.45); color: var(--hissa-text); font-weight: 750; line-height: 1.4; box-shadow: 0 0 60px rgba(56, 189, 248, 0.08); }
  .map-node { min-width: 130px; min-height: 42px; padding: 8px 12px; border-radius: 8px; font-size: 0.72rem; }
  .node-1 { top: 3%; left: 33%; } .node-2 { top: 20%; right: 0; } .node-3 { top: 49%; right: 1%; } .node-4 { bottom: 13%; right: 9%; }
  .node-5 { bottom: 1%; left: 34%; } .node-6 { bottom: 14%; left: 0; } .node-7 { top: 48%; left: -5%; } .node-8 { top: 18%; left: 1%; }

  .stack-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
  .stack-group h3 { padding-bottom: 14px; border-bottom: 1px solid var(--hissa-border); color: var(--hissa-green-soft); font-size: 0.86rem; }
  .stack-group ul { margin-top: 16px; }
  .stack-group li { padding: 7px 0; color: var(--hissa-secondary); font-size: 0.9rem; }

  .about-grid { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 72px; align-items: center; }
  .portrait-frame { width: min(100%, 320px); aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 1px solid rgba(74, 222, 128, 0.32); background: var(--hissa-card); box-shadow: 0 18px 52px rgba(0, 0, 0, 0.28); }
  .portrait-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; filter: saturate(0.82); }
  .about-copy > p:not(.section-index) { max-width: 680px; margin-top: 18px; color: var(--hissa-secondary); line-height: 1.75; }
  .about-links { display: flex; flex-wrap: wrap; gap: 22px; margin-top: 28px; }
  .about-links a { color: var(--hissa-text); font-weight: 700; border-bottom: 1px solid var(--hissa-green); padding-bottom: 3px; }

  .closing { padding-block: 120px; text-align: center; }
  .closing-kicker { color: var(--hissa-green-soft); font: 700 0.72rem var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; }
  .closing h2 { max-width: 800px; margin-inline: auto; }
  .closing-actions { justify-content: center; }
  .language-note { max-width: 590px; margin: 24px auto 0; color: var(--hissa-muted); font-size: 0.82rem; }
  .case-footer { padding-block: 30px 40px; border-top: 1px solid var(--hissa-border); }
  .case-footer > div { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .case-footer nav { display: flex; gap: 22px; color: var(--hissa-secondary); font-size: 0.82rem; }
  .case-footer > p { max-width: 760px; margin-top: 28px; color: var(--hissa-muted); font-size: 0.72rem; line-height: 1.6; }

  @media (max-width: 1000px) {
    .hero, .section, .research-inner, .closing, .case-footer { width: min(100% - 56px, 1200px); }
    .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 112px; }
    .hero-visual { width: 82%; margin-left: auto; }
    .role { width: 100%; }
    .role-grid, .direction-layout { gap: 56px; }
    .stack-grid { grid-template-columns: repeat(2, 1fr); }
    .methodology-pipeline { grid-template-columns: repeat(4, 1fr); }
    .pipeline-stage { border-bottom: 1px solid rgba(56, 189, 248, 0.18); }
    .pipeline-stage:nth-child(4) { border-right: 0; }
    .pipeline-stage:nth-child(4)::after { display: none; }
    .pipeline-stage:nth-child(n + 5) { border-bottom: 0; }
    .evidence-grid { grid-template-columns: 1fr; }
    .human-review, .analysis-layout { gap: 48px; }
  }

  @media (max-width: 767px) {
    .hero, .section, .research-inner, .closing, .case-footer { width: calc(100% - 40px); }
    .hero { gap: 50px; padding-block: 108px 72px; }
    .hero h1 { font-size: clamp(3rem, 16vw, 4.25rem); }
    .hero-lead { font-size: 1.14rem; }
    .hero-actions { align-items: stretch; }
    .hero-actions .button { flex: 1 1 calc(50% - 6px); }
    .hero-actions .text-link { width: max-content; }
    .hero-visual { width: 100%; }
    .visual-note { right: 12px; bottom: -40px; }
    .section { padding-block: 76px; }
    .section-heading { margin-bottom: 34px; }
    .overview-grid, .role-grid, .direction-layout, .about-grid, .publication-card { grid-template-columns: 1fr; gap: 36px; }
    .context-note { padding: 22px 0 0; border-left: 0; border-top: 1px solid var(--hissa-border); flex-direction: row; align-items: center; flex-wrap: wrap; }
    .context-note i { width: 12px; }
    .problem-grid { grid-template-columns: 1fr; }
    .problem-item { min-height: 0; }
    .problem-item h3 { margin-top: 32px; }
    .role { width: 100%; padding-inline: 20px; }
    .responsibilities ul, .capability-grid { grid-template-columns: 1fr; }
    .capability-card p { margin-top: 32px; }
    .wireframe-grid { grid-template-columns: 1fr; gap: 18px; }
    .wireframe-view figcaption { align-items: flex-start; flex-direction: column; gap: 4px; }
    .wireframe-view figcaption span { text-align: left; }
    .research-inner { padding-block: 80px; }
    .question-list li :global(.reveal) { grid-template-columns: 42px 1fr; gap: 10px; padding: 28px 0; }
    .methodology-pipeline { grid-template-columns: 1fr; margin-bottom: 62px; border-block: 1px solid rgba(56, 189, 248, 0.25); }
    .pipeline-stage { display: grid; grid-template-columns: 42px 1fr; gap: 12px; align-items: center; padding: 18px 0; border-right: 0 !important; border-bottom: 1px solid rgba(56, 189, 248, 0.18) !important; }
    .pipeline-stage:last-child { border-bottom: 0 !important; }
    .pipeline-stage:not(:last-child)::after { top: auto; right: auto; bottom: -4px; left: 18px; transform: rotate(135deg); }
    .pipeline-stage p { margin-top: 0; font-size: 0.9rem; }
    .method-block { padding: 24px 20px; }
    .trace-line { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 8px 14px; align-items: center; }
    .trace-line i { width: 1px; min-width: 1px; height: 18px; justify-self: center; }
    .trace-line i:nth-of-type(2) { grid-column: 2; }
    .trace-line span { text-align: center; }
    .human-review, .analysis-layout, .limitations { grid-template-columns: 1fr; }
    .human-review { margin-top: 62px; padding: 30px 20px; gap: 38px; }
    .responsibility-pair { gap: 20px; }
    .analysis-layout { margin-top: 72px; gap: 32px; }
    .analysis-intro { position: static; }
    .evolution { margin-top: 76px; }
    .evolution > div { grid-template-columns: 1fr; gap: 4px; }
    .evolution ol { grid-template-columns: 1fr; margin-top: 28px; border-top: 0; border-left: 1px solid rgba(56, 189, 248, 0.3); }
    .evolution li { display: grid; grid-template-columns: 38px 1fr; gap: 10px; padding: 14px 0 14px 18px; }
    .evolution li:not(:last-child)::after { top: auto; right: auto; bottom: -4px; left: -4px; }
    .evolution li p { margin-top: 0; }
    .limitations { gap: 22px; margin-top: 72px; }
    .limitations ul { grid-template-columns: 1fr; }
    .publication-card { padding: 24px; }
    .research-map { min-height: auto; display: flex; flex-wrap: wrap; gap: 8px; }
    .research-map::before { display: none; }
    .map-center, .map-node { position: static; transform: none; width: auto; min-width: 0; min-height: 42px; height: auto; border-radius: 8px; flex: 1 1 calc(50% - 8px); }
    .map-center { order: -1; flex-basis: 100%; border-color: rgba(56, 189, 248, 0.45); }
    .stack-grid { grid-template-columns: 1fr 1fr; gap: 36px 24px; }
    .portrait-frame { width: 230px; }
    .case-footer > div { align-items: flex-start; flex-direction: column; }
  }

  @media (max-width: 430px) {
    .hero-actions .button { flex-basis: 100%; }
    .stack-grid { grid-template-columns: 1fr; }
    .case-footer nav { flex-wrap: wrap; }
  }

  @media (prefers-reduced-motion: reduce) {
    .button, .capability-card { transform: none !important; transition: none !important; }
  }
</style>
