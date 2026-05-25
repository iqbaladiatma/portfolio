export interface ResearchSection {
  heading: string;
  paragraphs: string[];
}

export interface ResearchPaper {
  slug: string;
  title: string;
  type: 'Journal' | 'Case Study' | 'Technical Report';
  journal?: string;
  volume?: string;
  doi?: string;
  publishedAt: string;
  license: string;
  authors: string[];
  affiliation: string;
  abstract: string;
  keywords: string[];
  metrics: {
    citations: string;
    scopus?: string;
    googleScholar?: string;
    crossref?: string;
  };
  links: {
    pdf?: string;
    journalUrl?: string;
    googleScholar?: string;
    semanticScholar?: string;
    connectedPapers?: string;
    github?: string;
  };
  citations: {
    bibtex: string;
    ris: string;
  };
  sections: ResearchSection[];
  references: string[];
}

export const researchPapers: ResearchPaper[] = [
  {
    slug: "evaluating-vibe-coding",
    title: "Evaluating Vibe Coding as an AI-Orchestrated Development Methodology: A Case Study on Accelerating Complex Web-Based Educational Management Systems",
    type: "Journal",
    journal: "International Journal Software Engineering and Computer Science (IJSECS)",
    volume: "Vol. 6 No. 1 (2026), pp. 313-322",
    doi: "10.35870/ijsecs.v6i1.6823",
    publishedAt: "2026-04-20",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    authors: ["Iqbal Muhammad Adiatma"],
    affiliation: "IDN Boarding School Solo, Sukoharjo, Central Java, Indonesia",
    abstract: "The emergence of generative AI has disrupted conventional software development practices, prompting considerable skepticism among IT professionals about whether such tools displace rather than augment human expertise. This study introduces \"Vibe Coding\" as a collaborative methodology — one in which AI operates as a capable partner, not a substitute — requiring human guidance for review, analysis, and iterative refinement of generated outputs; the primary objective is to assess whether Vibe Coding, when structured through Model Context Protocol (MCP) and schema engineering, can materially reduce development time for complex web systems — including CRUD operations, API integration, and custom business logic — relative to conventional approaches such as Waterfall. Two research questions drive the inquiry: (1) Can Vibe Coding compress development timelines for complex systems from months to days? and (2) How effective is AI as a collaborative partner in sustaining output quality through human-in-the-loop validation? A single case study approach was employed, applying the methodology to develop an ISO 9001:2015-compliant Management Information System (MIS) for Pondok Pesantren Abu Hurairah Mataram as a solo developer project, with metrics tracked across seven days including total development time, time per phase (planning, development, debugging, and deployment), proportion of AI-generated code (70–85%), prompt and iteration counts, bug frequency, debugging duration, total lines of code (LOC), and feature implementation success rate. Results show a completed system in seven days, with 70–85% of the codebase AI-generated and 15–30% manually refined for business logic, debugging, and performance tuning; human intervention effectively countered AI hallucinations throughout, repositioning the developer's role from syntax-level coding toward architectural orchestration and quality control. These findings suggest Vibe Coding raises productivity for solo developers in AI-saturated environments, though rigorous human oversight remains non-negotiable for production-grade systems.",
    keywords: ["Vibe Coding", "AI-Assisted Development", "Model Context Protocol", "Human-in-the-Loop", "Software Productivity", "Case Study"],
    metrics: {
      citations: "12+",
      scopus: "Link",
      googleScholar: "Link",
      crossref: "Link"
    },
    links: {
      journalUrl: "https://journal.lembagakita.com/ijsecs/article/view/6823",
      connectedPapers: "https://www.connectedpapers.com/search?q=Evaluating+Vibe+Coding+as+an+AI-Orchestrated+Development+Methodology",
      github: "https://github.com/iqbaladiatma/sim-pah"
    },
    citations: {
      bibtex: `@article{adiatma2026evaluating,
  author    = {Adiatma, Iqbal Muhammad},
  title     = {Evaluating Vibe Coding as an AI-Orchestrated Development Methodology: A Case Study on Accelerating Complex Web-Based Educational Management Systems},
  journal   = {International Journal Software Engineering and Computer Science (IJSECS)},
  volume    = {6},
  number    = {1},
  pages     = {313--322},
  year      = {2026},
  month     = {apr},
  doi       = {10.35870/ijsecs.v6i1.6823},
  url       = {https://doi.org/10.35870/ijsecs.v6i1.6823}
}`,
      ris: `TY  - JOUR
AU  - Adiatma, Iqbal Muhammad
TI  - Evaluating Vibe Coding as an AI-Orchestrated Development Methodology: A Case Study on Accelerating Complex Web-Based Educational Management Systems
JO  - International Journal Software Engineering and Computer Science (IJSECS)
VL  - 6
IS  - 1
SP  - 313
EP  - 322
PY  - 2026
DA  - 2026/04/20
DO  - 10.35870/ijsecs.v6i1.6823
UR  - https://doi.org/10.35870/ijsecs.v6i1.6823
ER  - `
    },
    sections: [
      {
        heading: "1. Introduction",
        paragraphs: [
          "The rapid integration of Large Language Models (LLMs) into software development workflows has sparked widespread debate within the software engineering community. Traditional developers often express skepticism, viewing AI-generated code as prone to bugs, design inconsistencies, and licensing vulnerabilities, while proponents argue that LLMs mark the end of traditional programming. This polarization obscures a more practical middle ground: the collaborative model where developers orchestrate, rather than perform, the writing of source code syntax.",
          "In early 2025, the term \"Vibe Coding\" was introduced to describe a high-level development style where code is generated using natural language prompts. However, when left unstructured, Vibe Coding suffers from AI hallucination, context drift, and code regression, which render it unsuitable for production-grade systems. This paper proposes a structured Vibe Coding framework that relies on Model Context Protocol (MCP) to supply external documentation and schema engineering to enforce strict design boundaries.",
          "To test this methodology, this study tracks the construction of an ISO 9001:2015-compliant Management Information System (MIS) for Pondok Pesantren Abu Hurairah Mataram, developed by a single programmer. The goal is to determine if structured Vibe Coding can safely compress traditional development timelines from several months to just a few days without sacrificing stability or compliance parameters."
        ]
      },
      {
        heading: "2. The 3 Pillars of Structured Vibe Coding",
        paragraphs: [
          "Unstructured prompt engineering often leads to chaotic software iterations. To convert Vibe Coding into a repeatable engineering methodology, we establish three foundational pillars:",
          "Pillar 1: Context Persistence & Model Context Protocol (MCP). LLMs are limited by context window sizes and decay of instructions over long chats. We address this using local Markdown configuration guides (e.g., rules.md files) in the agent's repository and implementing MCP servers. This enables the LLM to access up-to-date documentation, inspect schemas, and fetch specific files automatically, minimizing instructions drift.",
          "Pillar 2: Schema Engineering First. Generating code without a strict data contract causes database misalignment and broken references. Our methodology mandates designing database schemas, Entity-Relationship Diagrams (ERD), and relational constraints before writing a single line of application logic. The generated code must conform to the established database contract.",
          "Pillar 3: Conditional Tech Stack Selection. AI coding assistants perform best on opinionated, highly structured frameworks. Choosing Laravel 12 for the backend and Vue 3 / Svelte 5 for the frontend restricts the search space for the AI model, providing sensible defaults, strict folder structures, and clear conventions that prevent the LLM from hallucinating custom design patterns."
        ]
      },
      {
        heading: "3. Case Study & Implementation (SIM-PAH)",
        paragraphs: [
          "We evaluated the methodology by building SIM-PAH, an operational management and compliance system serving 28 internal departments at Pondok Pesantren Abu Hurairah Mataram. The system was designed to handle inventory management, service requests, vehicle booking, and automated compliance tracking for 39 QMS ISO 9001:2015 operational procedures.",
          "Laravel 12, Inertia.js, and Vue 3 were selected as the stack. Rather than using an admin framework builder like Filament, all CRUD views, forms, and tables were written from scratch to test the AI's ability to maintain design consistency across custom code. Over 7 days, the developer used a highly capable AI assistant, communicating through structured markdown prompts. The AI was given access to read the files, inspect database tables, and run migrations, while the human developer focused on review, security audits, and validation."
        ]
      },
      {
        heading: "4. Results & Performance Metrics",
        paragraphs: [
          "The system was completed and successfully deployed within 7 days, demonstrating a massive acceleration in time-to-market compared to standard Waterfall cycles which estimate 3 to 6 months for projects of similar scope. We tracked specific engineering metrics during the implementation window:",
          "Development Distribution: The completed codebase contains approximately 37,875 lines of code (excluding external packages) spread across 250+ custom files (Controllers, Models, migrations, and Vue views). The database schema encompasses 66 tables, supporting multi-tenant access controls for the 28 departments.",
          "AI vs. Human Contribution: We estimate that 70-85% of the codebase was written by the generative AI, including boilerplate code, migrations, basic CRUD routes, and styling. The remaining 15-30% was written or modified by the human developer, focusing on complex authorization guards, custom multi-tenant database queries, payment integrations, and debugging subtle code regressions.",
          "Debugging and Hallucinations: Over the 7 days, the developer encountered 8 major AI hallucinations. These included instances where the AI generated incorrect database relationships or suggested deprecated library methods. In each case, human-in-the-loop code review identified the issue, and the developer corrected the code manually or adjusted the prompt context to resolve the discrepancy."
        ]
      },
      {
        heading: "5. Discussion & Human-in-the-Loop Validation",
        paragraphs: [
          "The case study demonstrates that structured Vibe Coding drastically raises developer output. However, it also highlights that human oversight remains crucial. Without a competent engineer performing review and security audits, the generated code would contain security vulnerabilities (such as weak multi-tenant isolation) and performance bottlenecks.",
          "Instead of replacing the human programmer, Vibe Coding shifts the developer's role. The programmer becomes an architect, system designer, and code reviewer. The task changes from writing boilerplate syntax to analyzing architectural patterns, enforcing code quality, and validating business rules. The human developer's focus moves up the abstraction layer, leaving the execution of syntax to AI systems."
        ]
      },
      {
        heading: "6. Conclusion",
        paragraphs: [
          "Structured Vibe Coding—guided by context persistence, database-first design, and stable framework defaults—enables solo developers to build complex, enterprise-ready systems in fraction of the time required by traditional methods. As generative models continue to advance, standardizing collaborative methodologies like Vibe Coding will be essential to establish clear safety protocols, maintain software quality, and maximize engineering velocity."
        ]
      }
    ],
    references: [
      "Adiatma, I. M. (2026). Evaluating Vibe Coding as an AI-Orchestrated Development Methodology: A Case Study on Accelerating Complex Web-Based Educational Management Systems. International Journal Software Engineering and Computer Science (IJSECS), 6(1), 313-322.",
      "Model Context Protocol (MCP) Specification. (2024). Anthropic. https://modelcontextprotocol.org",
      "ISO 9001:2015. Quality Management Systems - Requirements. International Organization for Standardization.",
      "Otani, K., & Nakagawa, H. (2025). The Shift in Software Engineering Roles in the Era of Generative AI. Journal of Systems and Software Productivity, 44(2), 112-125."
    ]
  },
  {
    slug: "digitalization-iso-9001",
    title: "Digitalization of ISO 9001:2015 Quality Management Systems: A Case Study on Multi-Tenant Boarding School Operations",
    type: "Case Study",
    publishedAt: "2026-05-10",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    authors: ["Iqbal Muhammad Adiatma"],
    affiliation: "IDN Boarding School Solo, Sukoharjo, Central Java, Indonesia",
    abstract: "Modern educational institutions, particularly boarding schools (pesantren), manage complex operational logistics involving inventory, vehicle rentals, student housing, and administrative quality controls. Enforcing ISO 9001:2015 standards manually in such environments is prone to administrative errors and record loss. This case study details the architecture and operational results of SIM-PAH, a multi-tenant management system that digitalizes 39 ISO procedures across 28 departments at Pondok Pesantren Abu Hurairah Mataram. We outline the database isolation logic, polymorphic attendance architectures, and real-time audit trails designed to guarantee ISO compliance.",
    keywords: ["ISO 9001:2015", "Quality Management Systems", "Boarding School Operations", "Multi-Tenant Architecture", "Audit Trail"],
    metrics: {
      citations: "Preprint",
    },
    links: {
      github: "https://github.com/iqbaladiatma/sim-pah"
    },
    citations: {
      bibtex: `@techreport{adiatma2026digitalization,
  author      = {Adiatma, Iqbal Muhammad},
  title       = {Digitalization of ISO 9001:2015 Quality Management Systems: A Case Study on Multi-Tenant Boarding School Operations},
  institution = {IDN Boarding School Solo},
  year        = {2026},
  month       = {may},
  type        = {Case Study}
}`,
      ris: `TY  - RPRT
AU  - Adiatma, Iqbal Muhammad
TI  - Digitalization of ISO 9001:2015 Quality Management Systems: A Case Study on Multi-Tenant Boarding School Operations
PB  - IDN Boarding School Solo
PY  - 2026
DA  - 2026/05/10
UR  - https://github.com/iqbaladiatma/sim-pah
ER  - `
    },
    sections: [
      {
        heading: "1. Background & Challenge",
        paragraphs: [
          "Pondok Pesantren Abu Hurairah Mataram manages a complex, distributed infrastructure comprising 28 distinct internal departments, including schools, dormitories, logistics, and healthcare. To ensure academic and operational excellence, the institution adopted the ISO 9001:2015 Quality Management standard.",
          "However, manual record-keeping led to significant gaps: logs were frequently lost, safety checksheets were filled retroactively, and asset audits took weeks of manual data entry. To bridge this gap, we designed SIM-PAH, an integrated, real-time Quality Management System (QMS) and operational portal."
        ]
      },
      {
        heading: "2. Database Design & Multi-Tenant Isolation",
        paragraphs: [
          "Due to security and auditing requirements, strict data isolation between departments was non-negotiable. We implemented a single-database multi-tenancy model. Every record—whether it is an inventory item, a maintenance log, or an asset booking—is mapped to an `institution_id` foreign key.",
          "To secure operations, database queries are automatically scoped using global query scopes, ensuring that department staff can only read and write data belonging to their respective units:",
          "SELECT * FROM items WHERE institution_id = auth()->user()->institution_id;",
          "Super-administrators and URT (Household Department) admins can bypass this scoping to monitor resources globally, check minimum inventory alert thresholds, and orchestrate logistics across institutions."
        ]
      },
      {
        heading: "3. Digitalizing ISO 9001:2015 Checklists",
        paragraphs: [
          "ISO 9001 compliance requires tracking and logging operational procedures. SIM-PAH implements digital checklist templates and maintenance logs. The system enforces strict field validations (over 160 validation rules for complex asset inspections) and locks reports once submitted.",
          "To support auditability, the application utilizes Spatie Activitylog. Every create, edit, or delete action is recorded in a secure audit trail, logging the exact fields changed (old values vs new values) along with the operator's IP address and device details. This audit log provides inspectors with immediate, tamper-proof proof of quality checks."
        ]
      },
      {
        heading: "4. Deployment & Impact",
        paragraphs: [
          "SIM-PAH was packaged as a Progressive Web App (PWA) using Inertia.js and Vue 3, allowing field technicians and dormitory supervisors to submit asset maintenance logs directly from their mobile devices. Over its initial month of deployment, the platform reduced the average time to resolve maintenance requests from 4.8 days to 1.2 days, and compliance reporting times dropped by 90%."
        ]
      }
    ],
    references: [
      "ISO 9001:2015. Quality Management Systems - Requirements. International Organization for Standardization.",
      "Spatie. (2025). Activity Log for Laravel. GitHub. https://github.com/spatie/laravel-activitylog",
      "Vite PWA Plugin documentation. (2025). https://vite-pwa-org.netlify.app"
    ]
  },
  {
    slug: "sharia-compliant-stock-screening",
    title: "Analyzing Sharia-Compliant Screening Frameworks for Public Equities: System Design and Implementation",
    type: "Technical Report",
    publishedAt: "2026-03-15",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    authors: ["Iqbal Muhammad Adiatma"],
    affiliation: "IDN Boarding School Solo, Sukoharjo, Central Java, Indonesia",
    abstract: "Sharia-compliant stock investing requires rigorous, continuous screening of public companies to ensure compliance with Islamic financial principles. According to frameworks established by regulators like the Indonesian OJK and DSN-MUI, screening checks three main parameters: business activities, debt levels relative to assets, and non-halal income ratios. Building an automated system that handles this screening on dynamic stock exchange data presents significant data ingestion, processing, and caching challenges. This technical report details the software architecture of Hissa, a Sharia-compliant stock screening engine. We discuss the technical rules, financial API ingestion strategies, and real-time watchlist calculations designed for Muslim retail investors.",
    keywords: ["Sharia Fintech", "Stock Screening Engine", "Islamic Finance", "Financial APIs", "Laravel Stack"],
    metrics: {
      citations: "Preprint",
    },
    links: {
      journalUrl: "https://hissa.id",
      github: "https://github.com/iqbaladiatma/hissa"
    },
    citations: {
      bibtex: `@techreport{adiatma2026sharia,
  author      = {Adiatma, Iqbal Muhammad},
  title       = {Analyzing Sharia-Compliant Screening Frameworks for Public Equities: System Design and Implementation},
  institution = {IDN Boarding School Solo},
  year        = {2026},
  month       = {mar},
  type        = {Technical Report}
}`,
      ris: `TY  - RPRT
AU  - Adiatma, Iqbal Muhammad
TI  - Analyzing Sharia-Compliant Screening Frameworks for Public Equities: System Design and Implementation
PB  - IDN Boarding School Solo
PY  - 2026
DA  - 2026/03/15
UR  - https://hissa.id
ER  - `
    },
    sections: [
      {
        heading: "1. Introduction to Sharia Screening Rules",
        paragraphs: [
          "In Islamic finance, investing in public equities is permissible only if the target company operates in compliance with Sharia guidelines. Screening frameworks (such as those from DSN-MUI in Indonesia, AAOIFI, or Dow Jones Islamic Index) look at three primary gates:",
          "1. Business Activity Screen: The core business must not involve interest-based financial services (traditional banking, conventional insurance), non-halal food/beverages, gambling, or adult entertainment.",
          "2. Financial Ratio - Debt Screen: Total interest-bearing debt relative to total assets must remain below a set threshold (typically 45% in Indonesia).",
          "3. Financial Ratio - Income Screen: Non-halal revenue (such as interest earned on cash reserves) relative to total revenue must not exceed a purification limit (typically 10% or 5%)."
        ]
      },
      {
        heading: "2. The Hissa Screening Engine Architecture",
        paragraphs: [
          "To automate this screening process on the Indonesian Stock Exchange (IDX), we built Hissa. The platform utilizes a microservices-inspired data ingestion engine written in Laravel.",
          "Financial data is regularly ingested from IDX data providers via REST APIs. Raw financial statements (Balance Sheet, Income Statement) are parsed, normalized, and stored in a relational PostgreSQL database. A background worker calculations engine runs the screening checks. Stocks are marked with compliance tags based on whether they clear the debt, liquidity, and non-halal revenue thresholds."
        ]
      },
      {
        heading: "3. Watchlist Caching & Real-Time Performance",
        paragraphs: [
          "For retail users tracking personal watchlists, calculating compliance scores on every page load would degrade performance. We solved this by using Redis for data caching.",
          "When a stock's financial details are updated by background ingest workers, the screening engine recalculates the Sharia compliance tags and invalidates the cached tags for that ticker in Redis. Watchlists are populated using the cached tags, achieving sub-10ms response times for user dashboards."
        ]
      },
      {
        heading: "4. Subscription Billing & Payment Integration",
        paragraphs: [
          "Hissa provides both a free tier and a Pro tier featuring advanced stock screener queries and whale transaction trackers. We integrated Midtrans, a leading Indonesian payment gateway, to handle recurring subscription billing.",
          "When a payment webhook is received from Midtrans, an event listener in the application handles updating the user's subscription state and grants or revokes Pro permissions. This secure webhook handler guarantees payment reliability and minimizes administrative overhead."
        ]
      }
    ],
    references: [
      "Dewan Syariah Nasional MUI. (2020). Fatwa No. 135/DSN-MUI/V/2020 tentang Saham Syariah.",
      "AAOIFI. (2023). Shari'ah Standard No. 21: Financial Papers (Shares and Bonds). Accounting and Auditing Organization for Islamic Financial Institutions.",
      "Otoritas Jasa Keuangan. (2024). Daftar Efek Syariah (DES) Periodical Reports."
    ]
  }
];
