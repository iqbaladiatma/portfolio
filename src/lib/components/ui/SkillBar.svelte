<script lang="ts">
  interface Props {
    name: string;
    level: number;
    category?: string;
  }

  let props: Props = $props();

  // Color mapping based on category to give rich visual harmony
  const categoryColors: Record<string, string> = {
    'Backend': '#ef4444',
    'Frontend': '#ff6b35',
    'Language': '#f59e0b',
    'Database': '#8b5cf6',
    'Blockchain': '#10b981',
    'Tools': '#6366f1',
    'AI/ML': '#ec4899',
    'Standards': '#0ea5e9',
    'General': 'var(--accent-color)'
  };

  const color = $derived(categoryColors[props.category || 'General'] || 'var(--accent-color)');

  // Determine visual level tag
  const getLevelLabel = (lvl: number) => {
    if (lvl >= 90) return 'Expert';
    if (lvl >= 75) return 'Advanced';
    return 'Intermediate';
  };
</script>

<div class="skill-card" style="--skill-color: {color};">
  <div class="card-glow" aria-hidden="true"></div>
  
  <div class="card-header">
    <div class="tech-icon-circle">
      <span class="tech-letter">{props.name.charAt(0)}</span>
    </div>
    
    <div class="tech-info">
      <span class="skill-name">{props.name}</span>
      <span class="category-tag">{props.category || 'General'}</span>
    </div>

    <span class="level-badge">
      {getLevelLabel(props.level)}
    </span>
  </div>

  <div class="progress-section">
    <div class="progress-meta">
      <span class="progress-pct">{props.level}%</span>
    </div>
    <div class="skill-bar" role="progressbar" aria-valuenow={props.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${props.name} proficiency`}>
      <div class="skill-fill" style="width: {props.level}%"></div>
      <div class="skill-glow-tip" style="left: {props.level}%"></div>
    </div>
  </div>
</div>

<style>
  .skill-card {
    position: relative;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1.25rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: 
      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.3s ease,
      background-color 0.3s;
    box-shadow: var(--shadow-sm);
  }

  .skill-card:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--skill-color) 40%, var(--border));
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
  }

  :global([data-theme="dark"]) .skill-card:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
    background: color-mix(in srgb, var(--bg-secondary) 96%, var(--skill-color) 4%);
  }

  /* Ambient Glow effect inside card */
  .card-glow {
    position: absolute;
    top: -50px;
    right: -50px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--skill-color) 10%, transparent) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    filter: blur(10px);
    transition: transform 0.5s ease;
  }

  .skill-card:hover .card-glow {
    transform: scale(1.3);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    position: relative;
    z-index: 1;
  }

  .tech-icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    color: var(--skill-color);
    font-weight: 700;
    font-size: 0.875rem;
    flex-shrink: 0;
    box-shadow: var(--shadow-sm);
  }

  .tech-letter {
    font-family: var(--font-mono);
    text-transform: uppercase;
  }

  .tech-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex-grow: 1;
  }

  .skill-name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .category-tag {
    font-size: 0.6875rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 0.0625rem;
  }

  .level-badge {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--skill-color);
    background: color-mix(in srgb, var(--skill-color) 8%, var(--bg-primary));
    border: 1px solid color-mix(in srgb, var(--skill-color) 20%, transparent);
    padding: 0.15rem 0.5rem;
    border-radius: 99px;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }

  /* Progress section styles */
  .progress-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
  }

  .progress-meta {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .progress-pct {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }

  .skill-bar {
    height: 6px;
    background: var(--bg-tertiary);
    border-radius: 99px;
    overflow: hidden;
    position: relative;
  }

  .skill-fill {
    height: 100%;
    background: var(--skill-color);
    border-radius: 99px;
    box-shadow: 0 0 8px color-mix(in srgb, var(--skill-color) 40%, transparent);
  }

  .skill-glow-tip {
    position: absolute;
    top: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 10px 2px var(--skill-color);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
</style>
