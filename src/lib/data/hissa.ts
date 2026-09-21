export const hissaCaseStudy = {
  title: 'Building HISSA',
  tagline: "Financial technology, financial data, and research for Indonesia's Sharia capital market.",
  description:
    'HISSA is a platform for researching Indonesian Sharia-compliant equities. My work on the platform has involved software engineering, financial-data systems, analytics, and research experiments.',
  role: {
    title: 'CTO & Lead Programs',
    organization: 'PT Syariah Saham Indonesia'
  },
  links: {
    product: 'https://hissa.syariahsaham.id/',
    github: 'https://github.com/iqbaladiatma',
    linkedin: 'https://www.linkedin.com/in/iqbaladiatma',
    portfolio: '/',
    research: '/research'
  },
  problems: [
    {
      title: 'Fragmented financial data',
      body: 'Financial information arrives through different reports, providers, formats, and structures.'
    },
    {
      title: 'Domain-specific interpretation',
      body: 'Raw numbers need context before they become meaningful information for financial research.'
    },
    {
      title: 'Human decision-making',
      body: 'Financial systems should support understanding, not simply output automated conclusions.'
    }
  ],
  responsibilities: [
    'Product architecture',
    'Backend and frontend development',
    'Financial-data workflows',
    'Database design',
    'Research prototyping',
    'Technical planning and coordination',
    'Machine-learning experimentation',
    'Mentoring and technical coordination'
  ],
  capabilities: [
    {
      title: 'Financial data aggregation',
      body: 'Collecting and structuring financial information into formats usable by the application.'
    },
    {
      title: 'Sharia stock research',
      body: 'Supporting research workflows focused on Indonesian Sharia-compliant equities.'
    },
    {
      title: 'Stock screening',
      body: 'Helping users explore companies through structured indicators and financial information.'
    },
    {
      title: 'Company fundamentals',
      body: 'Presenting financial information for clearer company analysis and comparison.'
    },
    {
      title: 'Market analytics',
      body: 'Visualizing financial and market data to support exploration and research.'
    },
    {
      title: 'Machine-learning experiments',
      body: 'Exploring ML-based approaches to financial analysis and decision-support research.'
    }
  ],
  questions: [
    'How should financial information be collected when the source environment is difficult to automate reliably?',
    'Which parts of a financial-data pipeline should remain human-validated?',
    'How can Sharia screening remain transparent and traceable as source data changes?',
    'How can machine-learning systems support financial analysis without hiding uncertainty from users?',
    'How should intelligent systems balance automation, explainability, and human judgment?',
    'How can financial information systems transform fragmented data into useful decision-support tools?'
  ],
  methodology: {
    stages: [
      'Financial Data Sources',
      'Data Collection & Normalization',
      'Validation & Human Review',
      'Sharia Screening',
      'Financial & Market Analysis',
      'Machine-Assisted Analysis',
      'Explainable Decision Support'
    ],
    sourceCategories: [
      'Official market and issuer disclosures',
      'Company financial statements',
      'Structured market data',
      'Publicly available regulatory information',
      'Internally normalized financial datasets'
    ],
    screening: [
      {
        title: 'Business Activity Screening',
        body: "Reviewing whether a company's primary activities are compatible with applicable Sharia principles."
      },
      {
        title: 'Financial Ratio Screening',
        body: 'Evaluating relevant financial ratios against applicable Sharia screening criteria without treating one ratio as the whole assessment.'
      },
      {
        title: 'Regulatory / Reference Status',
        body: 'Consulting relevant official or authoritative Sharia securities references where applicable.'
      },
      {
        title: 'Validation',
        body: 'Keeping screening results traceable and reviewable instead of presenting an unexplained binary output.'
      }
    ],
    machineTasks: [
      'Extraction',
      'Normalization',
      'Repetitive processing',
      'Anomaly flagging',
      'Preliminary analysis'
    ],
    humanTasks: [
      'Ambiguous-data review',
      'Validation',
      'Contextual interpretation',
      'Exception handling',
      'Methodological oversight'
    ],
    analyticalLayers: [
      'Data Integrity',
      'Sharia Eligibility',
      'Fundamental Context',
      'Market Behaviour',
      'Quantitative / Machine-Assisted Signals',
      'Human Interpretation'
    ],
    evolution: [
      'Software Project',
      'Data System',
      'Analytical Platform',
      'Research Questions',
      'Research-Oriented Financial Information System'
    ],
    limitations: [
      'Financial data can contain missing or inconsistent information.',
      'Source formats and availability can change over time.',
      'Sharia screening depends on regulatory criteria and available disclosures.',
      'Machine-learning outputs are probabilistic rather than certain.',
      'Historical patterns do not guarantee future market behaviour.',
      'Automated analysis does not replace professional financial judgment.'
    ]
  },
  publications: [
    {
      title: 'Design of Human-in-the-Loop Semi-Automated Pipelines for Financial Data Aggregation in Restricted Web Environments',
      status: 'Accepted',
      venue: 'JUTIF / Jurnal Teknik Informatika',
      areas: ['Financial data', 'Human-in-the-loop', 'Automation'],
      summary:
        'This research explores a semi-automated financial-data workflow in which automation handles repeatable processing while human validation remains part of the pipeline when source environments make fully automated extraction unreliable.'
    },
    {
      title: 'AI-Orchestrated Development Methodology (Vibe Coding)',
      status: 'Research',
      venue: 'Software engineering research',
      areas: ['AI orchestration', 'Verification', 'Software engineering'],
      summary:
        'Research exploring how AI models can participate across the software-development lifecycle while humans remain responsible for architecture, verification, and final decision-making.'
    }
  ],
  researchAreas: [
    'AI for Finance',
    'Financial Data Engineering',
    'Financial NLP',
    'Machine Learning',
    'Information Systems',
    'Market Microstructure',
    'Human-in-the-Loop Systems',
    'Decision Support Systems'
  ],
  stack: [
    { group: 'Product', items: ['Laravel', 'Vue', 'Inertia', 'Livewire', 'Tailwind CSS'] },
    { group: 'Data', items: ['MySQL', 'Financial-data pipelines'] },
    { group: 'Research', items: ['Python', 'XGBoost', 'Machine learning', 'Notebooks'] },
    { group: 'Infrastructure', items: ['Linux', 'Git', 'Production hosting'] }
  ]
} as const;
