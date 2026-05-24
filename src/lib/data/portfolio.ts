export const portfolioData = {
  name: "Iqbal Muhammad Adiatma",
  pronouns: "He/Him",
  title: "CTO & Full-Stack Engineer",
  headline: "CTO of Syariah Saham Indonesia · Software Engineer · Blockchain Dev · Sharia Fintech Specialist · Qur'an Memoriser",
  education: "Grade 11 · Software Engineering · IDN Boarding School Solo",
  location: "Indonesia",
  connections: "500+",
  bio: "Passionate and results-driven software engineer with a strong ambition to evolve into the role of a Product Architect. Bridging the gap between complex system architecture and real-world social impact — specializing in Sharia-compliant fintech, Web3, and high-performance web ecosystems.",
  availability: true,

  socials: {
    github: "https://github.com/iqbaladiatma",
    linkedin: "https://www.linkedin.com/in/iqbaladiatma",
    youtube: "https://www.youtube.com/@iqbaladiatma",
    email: "mailto:iqbal@iqbaladiatma.my.id",
    website: "https://www.iqbaladiatma.my.id"
  },

  skills: [
    { name: "Laravel", category: "Backend", level: 93 },
    { name: "Node.js", category: "Backend", level: 78 },
    { name: "Firebase", category: "Backend", level: 76 },
    { name: "Filament PHP", category: "Backend", level: 85 },
    { name: "SvelteKit", category: "Frontend", level: 90 },
    { name: "Next.js", category: "Frontend", level: 78 },
    { name: "ReactJS", category: "Frontend", level: 78 },
    { name: "Tailwind CSS", category: "Frontend", level: 93 },
    { name: "PHP", category: "Language", level: 90 },
    { name: "TypeScript", category: "Language", level: 85 },
    { name: "Go", category: "Language", level: 72 },
    { name: "Flutter / Dart", category: "Mobile", level: 84 },
    { name: "PostgreSQL / MySQL", category: "Database", level: 78 },
    { name: "Drizzle ORM", category: "Database", level: 72 },
    { name: "Solidity / Smart Contracts", category: "Blockchain", level: 72 },
    { name: "Cosmos SDK", category: "Blockchain", level: 70 },
    { name: "Solana / Anchor", category: "Blockchain", level: 68 },
    { name: "Git & GitHub", category: "Tools", level: 90 },
    { name: "Docker", category: "Tools", level: 65 },
    { name: "Google Gemini API", category: "AI/ML", level: 76 },
    { name: "ISO 9001:2015", category: "Standards", level: 82 }
  ],

  projects: [
    {
      slug: "ahe-medang",
      title: "AHE Medang — Event Management System",
      description: "Comprehensive event management platform for organizing and managing educational events and workshops.",
      longDescription: "AHE Medang is a full-featured event management system designed to streamline the process of organizing educational events, workshops, and seminars. Includes registration management, attendee tracking, and certificate generation.",
      tags: ["Event Management", "Registration", "Certificates"],
      link: "#",
      github: "https://github.com/iqbaladiatma",
      featured: false,
      year: "2025",
      status: "Completed",
      role: "Full Stack Developer",
      duration: "2 months",
      overview: "Event management platform that handles everything from event creation to certificate generation. Streamlines the entire event workflow for educational institutions.",
      features: [
        "Event creation and management",
        "Online registration system",
        "Attendee tracking and check-in",
        "Automated certificate generation",
        "Payment processing integration",
        "Email notifications and reminders"
      ],
      stack: [
        { name: "Laravel", role: "Backend" },
        { name: "Bootstrap", role: "Frontend" },
        { name: "MySQL", role: "Database" },
        { name: "DomPDF", role: "PDF Generation" }
      ],
      challenges: "Creating a flexible registration system that could handle different event types while maintaining a clean user experience for both organizers and attendees.",
      image: "/projects/ahe-medang-daftar.png",
      gallery: [
        { image: "/projects/ahe-medang-dashboad.png", title: "Dashboard Overview" },
        { image: "/projects/ahe-medang-lapora.png", title: "Reports & Analytics" }
      ],
      color: "#6366f1"
    },
    {
      slug: "decablue",
      title: "Decablue — Digital Agency Platform",
      description: "Modern digital agency website with portfolio showcase and client management system.",
      longDescription: "Decablue is a sleek digital agency platform designed to showcase creative work and manage client relationships. Features a stunning portfolio gallery, client testimonials, and project management tools.",
      tags: ["Agency", "Portfolio", "Client Management"],
      link: "#",
      github: "https://github.com/iqbaladiatma",
      featured: false,
      year: "2025",
      status: "Live",
      role: "Full Stack Developer",
      duration: "1 month",
      overview: "Digital agency platform that combines a beautiful portfolio showcase with practical client management tools for creative agencies.",
      features: [
        "Dynamic portfolio gallery",
        "Client project management",
        "Testimonial showcase",
        "Contact form with lead capture",
        "SEO-optimized content",
        "Responsive design"
      ],
      stack: [
        { name: "Next.js", role: "Frontend" },
        { name: "Tailwind CSS", role: "Styling" },
        { name: "Prisma", role: "Database" },
        { name: "PostgreSQL", role: "Database" }
      ],
      challenges: "Balancing visual appeal with performance while creating an intuitive content management system for non-technical agency staff.",
      image: "/projects/decablue.png",
      color: "#0ea5e9"
    },
    {
      slug: "manaahel",
      title: "Manaahel — Educational Platform",
      description: "Comprehensive educational platform for online learning and student management.",
      longDescription: "Manaahel is an advanced educational platform designed to facilitate online learning, student management, and academic progress tracking. Features interactive courses, assessments, and detailed analytics.",
      tags: ["Education", "E-Learning", "Student Management"],
      link: "#",
      github: "https://github.com/iqbaladiatma",
      featured: false,
      year: "2025",
      status: "Live",
      role: "Full Stack Developer",
      duration: "3 months",
      overview: "Educational platform that provides a complete online learning experience with course management, student tracking, and comprehensive analytics.",
      features: [
        "Interactive course creation",
        "Student enrollment and management",
        "Assessment and testing system",
        "Progress tracking and analytics",
        "Video streaming integration",
        "Certificate generation"
      ],
      stack: [
        { name: "Laravel", role: "Backend" },
        { name: "Vue.js", role: "Frontend" },
        { name: "MySQL", role: "Database" },
        { name: "AWS S3", role: "File Storage" }
      ],
      challenges: "Implementing a scalable video streaming solution while maintaining platform performance and providing real-time progress tracking.",
      image: "/projects/manaahel-depan.png",
      gallery: [
        { image: "/projects/manaahel-admin.png", title: "Admin Dashboard" }
      ],
      color: "#8b5cf6"
    },
    {
      slug: "rent-car",
      title: "Rent Car — Vehicle Rental Management",
      description: "Complete vehicle rental management system with booking, tracking, and payment processing.",
      longDescription: "Rent Car is a comprehensive vehicle rental management platform that handles everything from vehicle inventory to customer bookings, payment processing, and fleet management. Designed for rental companies of all sizes.",
      tags: ["Rental", "Booking", "Fleet Management"],
      link: "#",
      github: "https://github.com/iqbaladiatma",
      featured: false,
      year: "2025",
      status: "Live",
      role: "Full Stack Developer",
      duration: "2 months",
      overview: "Vehicle rental management system that streamlines the entire rental process from booking to return, with integrated payment and fleet management.",
      features: [
        "Vehicle inventory management",
        "Online booking system",
        "Payment processing integration",
        "Availability calendar",
        "Customer management",
        "Maintenance tracking"
      ],
      stack: [
        { name: "Laravel", role: "Backend" },
        { name: "React", role: "Frontend" },
        { name: "Stripe", role: "Payment" },
        { name: "PostgreSQL", role: "Database" }
      ],
      challenges: "Creating a real-time availability system that could handle concurrent bookings while preventing double bookings and managing complex pricing rules.",
      image: "/projects/rent-car-dashboard.png",
      gallery: [
        { image: "/projects/rent-car-detail.png", title: "Vehicle Details" },
        { image: "/projects/rent-car-help.png", title: "Help & Support" }
      ],
      color: "#f59e0b"
    },
    {
      slug: "hissa-saham-syariah",
      title: "Hissa — Platform Analisa Saham Syariah",
      description: "Comprehensive Sharia-compliant stock analysis platform with screening engine, community, academy, and Midtrans subscription.",
      longDescription: "Hissa is a full-featured investment platform for Muslim investors in Indonesia. Combines advanced stock screening (Debt Ratio, Liquidity, Non-Halal Income checks), community discussion, educational academy, and daily market articles — with a Pro subscription via Midtrans.",
      tags: ["Laravel", "Livewire", "Filament", "Fintech", "Sharia"],
      link: "https://hissa.id",
      github: "https://github.com/iqbaladiatma/hissa",
      featured: true,
      year: "2025",
      status: "Live",
      role: "Full Stack Developer",
      duration: "Ongoing",
      overview: "A production platform serving the Syariah Saham community. Features a proprietary Sharia screening engine that validates stocks against three compliance criteria: Debt Ratio, Liquidity Ratio, and Non-Halal Income — a stock passes only if it clears all three.",
      features: [
        "Sharia screening engine (Debt, Liquidity, Non-Halal Income checks)",
        "DES (Daftar Efek Syariah) charts & analysis",
        "Real-time watchlist & portfolio tracking",
        "Community discussion platform",
        "Interactive investment academy (courses)",
        "Daily market articles & emiten news",
        "Pro/Premium subscription via Midtrans",
        "PWA + Android (Capacitor) support"
      ],
      stack: [
        { name: "Laravel 10", role: "Backend" },
        { name: "Livewire 3 / Volt", role: "Reactive UI" },
        { name: "Filament PHP v3", role: "Admin Panel" },
        { name: "Alpine.js", role: "Frontend" },
        { name: "Midtrans", role: "Payment" },
        { name: "MySQL / PostgreSQL", role: "Database" }
      ],
      challenges: "Building a reliable Sharia screening engine that stays current with IDX market data while supporting a growing community with real-time interaction and a subscription billing system.",
      image: "/projects/hissa-depan.png",
      gallery: [
        { image: "/projects/hissa-dashboard.png", title: "Dashboard Analisa" },
        { image: "/projects/hissa-whale.png", title: "Whale Feature" }
      ],
      color: "#16a34a"
    },
    {
      slug: "vetiver-layer1-cosmos",
      title: "Vetiver — Layer-1 Blockchain (Cosmos SDK)",
      description: "A modular Proof-of-Stake Layer-1 blockchain built on Cosmos SDK with CometBFT consensus and IBC cross-chain connectivity.",
      longDescription: "Designed and implemented Vetiver, a modular PoS Layer-1 blockchain on the Cosmos SDK framework utilizing CometBFT for Byzantine Fault Tolerance consensus. Demonstrates end-to-end knowledge of modern distributed ledger technology including cross-chain interoperability via IBC.",
      tags: ["Go", "Cosmos SDK", "Blockchain", "IBC"],
      link: "https://github.com/iqbaladiatma",
      github: "https://github.com/iqbaladiatma",
      featured: true,
      year: "2025",
      status: "Live",
      role: "Lead Blockchain Developer",
      duration: "Ongoing",
      overview: "A production-grade Layer-1 blockchain built from scratch on Cosmos SDK. Configured core modules (Auth, Bank, Staking, Governance, Mint) with IBC and Interchain Accounts for cross-chain connectivity. Includes multi-validator testnet provisioning and comprehensive simulation tests.",
      features: [
        "Modular PoS consensus via CometBFT (BFT)",
        "IBC & Interchain Accounts (ICA) for cross-chain connectivity",
        "Core modules: Auth, Bank, Staking, Governance, Mint",
        "Simulation tests for state determinism & import/export integrity",
        "Multi-validator testnet provisioning",
        "Cross-compilation build targets for Linux & Darwin",
        "depinject-based dependency wiring"
      ],
      stack: [
        { name: "Go", role: "Language" },
        { name: "Cosmos SDK", role: "Blockchain Framework" },
        { name: "CometBFT", role: "Consensus Engine" },
        { name: "IBC Protocol", role: "Cross-chain" },
        { name: "Protocol Buffers", role: "Serialization" }
      ],
      challenges: "Wiring complex module dependencies with depinject while ensuring state determinism across simulation runs and maintaining IBC compatibility for cross-chain operations.",
      image: "/projects/vetiver-depan.png",
      color: "#6366f1"
    },
    {
      slug: "simpah-pharmacy",
      title: "SIM-PP — Manajemen Pondok Pesantren",
      description: "SaaS multi-tenant platform for managing Islamic boarding school operations — students, Tahfidz tracking, finance, and WhatsApp notifications.",
      longDescription: "SIM-PP is a multi-tenant SaaS platform built specifically for Indonesian Islamic boarding schools (pesantren). It digitizes the entire operational workflow: student data, Tahfidz (Quran memorization) tracking, finance, academic scheduling, payroll, and a digital student e-wallet with NFC/QR support.",
      tags: ["Laravel 12", "Svelte 5", "Inertia.js", "SaaS", "Multi-tenant"],
      link: "#",
      github: "https://github.com/iqbaladiatma",
      featured: false,
      year: "2026",
      status: "Completed",
      role: "Full-Stack Engineer",
      duration: "1 month",
      overview: "A production-grade SaaS platform for pesantren management in Indonesia. Multi-tenant architecture with full data isolation per institution. Subscription-based with three tiers: Basic (Rp 500k/mo), Pro (Rp 1.5jt/mo), and Enterprise (Rp 3jt/mo).",
      features: [
        "Multi-tenancy with full data isolation (Stancl/Tenancy)",
        "Smart Tahfidz Tracker — real-time Quran memorization with WhatsApp notifications",
        "Digital student e-wallet with NFC/QR card support",
        "Finance module — billing, payments, student wallet",
        "Academic module — scheduling, attendance, grades, e-rapor",
        "HR module — teacher data, attendance, payroll",
        "WhatsApp Gateway — automated notifications to parents",
        "RBAC — role-based access control per tenant"
      ],
      stack: [
        { name: "Laravel 12", role: "Backend" },
        { name: "Svelte 5 + Inertia.js 2", role: "Frontend" },
        { name: "Tailwind CSS 4", role: "Styling" },
        { name: "Stancl/Tenancy", role: "Multi-tenancy" },
        { name: "MySQL / PostgreSQL", role: "Database" }
      ],
      challenges: "Designing a flexible multi-tenant architecture that isolates data per pesantren while keeping the codebase maintainable. The Tahfidz tracker required real-time sync between ustadz input and parent WhatsApp notifications.",
      image: "/projects/sim-pah-dashboard.png",
      gallery: [
        { image: "/projects/sim-pah-iso.png", title: "ISO 9001 Compliance" },
        { image: "/projects/sim-pah-login.png", title: "Login Page" }
      ],
      color: "#2563eb"
    },
    {
      slug: "takaful-keluarga-agent-profile",
      title: "Takaful Keluarga — Agent Personal Profile",
      description: "Personal profile web platform for Takaful Keluarga agents across Indonesia, built with Svelte and Laravel.",
      longDescription: "A white-label personal profile platform enabling Takaful Keluarga insurance agents to have their own branded web presence. Each agent gets a customizable profile page to showcase their services and capture leads.",
      tags: ["Svelte", "Laravel", "Insurance", "Web"],
      link: "#",
      github: "https://github.com/iqbaladiatma",
      featured: false,
      year: "2025",
      status: "Live",
      role: "Full Stack Engineer",
      duration: "Ongoing",
      overview: "A scalable multi-tenant profile platform for Takaful Keluarga agents. Each agent gets a personalized landing page with their photo, products, and contact info — deployable across hundreds of agents.",
      features: [
        "Per-agent customizable profile pages",
        "Admin panel for content management",
        "Lead capture and contact forms",
        "Mobile-responsive design",
        "SEO-optimized agent pages"
      ],
      stack: [
        { name: "Svelte", role: "Frontend" },
        { name: "Laravel", role: "Backend" },
        { name: "MySQL", role: "Database" },
        { name: "Tailwind CSS", role: "Styling" }
      ],
      challenges: "Designing a flexible multi-tenant architecture that allows per-agent customization while keeping the admin experience simple and the frontend fast.",
      image: "/projects/takaful-depan.png",
      gallery: [
        { image: "/projects/takaful-admin.png", title: "Admin Dashboard" }
      ],
      color: "#0891b2"
    }
  ],

  experience: [
    {
      title: "Chief Technology Officer",
      org: "Syariah Saham Indonesia",
      type: "Wirausaha",
      period: "Feb 2026 – Saat ini",
      duration: "3 bln",
      location: "Remote",
      description: "Memimpin strategi teknologi dan pengembangan platform screening saham syariah. Mengawasi web development, DevOps, dan integrasi blockchain.",
      skills: ["Web Development", "DevOps", "Blockchain", "Laravel", "Svelte"]
    },
    {
      title: "Full Stack Engineer",
      org: "Syariah Saham Indonesia",
      type: "Kontrak",
      period: "Okt 2025 – Saat ini",
      duration: "7 bln",
      location: "Remote",
      description: "Membangun dan memelihara infrastruktur platform inti untuk screening saham syariah dan fitur komunitas.",
      skills: ["Laravel", "Svelte", "MySQL", "REST API"]
    },
    {
      title: "Software Developer",
      org: "Crypto Sharia",
      type: "Magang",
      period: "Nov 2025 – Saat ini",
      duration: "6 bln",
      location: "Remote",
      description: "Mengembangkan solusi software dan blockchain untuk platform edukasi kripto berbasis syariah.",
      skills: ["Blockchain", "Smart Contracts", "Laravel", "Web3"]
    },
    {
      title: "Full Stack Developer",
      org: "Meetsin.Id",
      type: "Paruh Waktu",
      period: "Nov 2025 – Saat ini",
      duration: "6 bln",
      location: "Hybrid",
      description: "Pengembangan full-stack paruh waktu untuk platform manajemen meeting dan event.",
      skills: ["Full Stack", "Laravel", "JavaScript"]
    },
    {
      title: "Full Stack Engineer",
      org: "Takaful Keluarga",
      type: "Pekerja Lepas",
      period: "Nov 2025 – Saat ini",
      duration: "6 bln",
      location: "Remote",
      description: "Membangun agency profile website untuk agen-agen Takaful Keluarga di seluruh Indonesia.",
      skills: ["Web Development", "Svelte", "Laravel"]
    },
    {
      title: "Full Stack Engineer — ISO Website Management",
      org: "Abu Hurairah Islamic School",
      type: "Kontrak",
      period: "Feb 2026",
      duration: "1 bln",
      location: "Mataram, NTB · Di lokasi",
      description: "Membangun sistem manajemen farmasi (SIMPAH) dan platform digitalisasi QMS ISO 9001:2015 untuk Pondok Pesantren Abu Hurairah Mataram.",
      skills: ["Laravel", "ISO 9001:2015 Management", "Web Development", "JavaScript"]
    },
    {
      title: "Guest Lecturer",
      org: "Universitas AMIKOM Yogyakarta",
      type: "Kontrak",
      period: "Nov 2025",
      duration: "1 bln",
      location: "Jogja · Di lokasi",
      description: "Dosen tamu di kelas Desain dengan tema \"AI Beyond the Canvas\" — mengajarkan integrasi Google Gemini API untuk otomasi bisnis.",
      skills: ["Artificial Intelligence (AI)", "Google Gemini API", "Web Development"]
    },
    {
      title: "Guest Lecturer",
      org: "Diponegoro University",
      type: "Kontrak",
      period: "Nov 2025",
      duration: "1 bln",
      location: "Di lokasi",
      description: "Pembicara utama di Workshop AI for Adbis dengan tema \"AI Automation Workflow\" — IDN Teaching AI.",
      skills: ["Artificial Intelligence (AI)", "AI Automation", "Public Speaking"]
    },
    {
      title: "IT Trainer",
      org: "SMK Muhammadiyah Bobotsari",
      type: "Kontrak",
      period: "Sep 2025",
      duration: "1 bln",
      location: "Bobotsari, Jawa Tengah · Di lokasi",
      description: "Menjadi IT Trainer untuk jurusan TKJ — mengajar tentang Cisco Networking dan Artificial Intelligence kepada siswa SMK.",
      skills: ["Artificial Intelligence (AI)", "Web Development", "Cisco", "Networking"]
    },
    {
      title: "IT Support Specialist",
      org: "MSW Sabilil Mukminin",
      type: "Kontrak",
      period: "Mar 2025",
      duration: "1 bln",
      location: "Desa Ngancar, Jawa Timur · Di lokasi",
      description: "Menjadi IT Support — mengelola data siswa di yayasan dan mengajar tentang AI serta teknologi kepada siswa MSW Sabilil Mukminin.",
      skills: ["Software Development", "Artificial Intelligence (AI)", "IT Support", "Data Management"]
    }
  ],

  certifications: [
    { name: "Solidity Smart Contract Development", issuer: "Cyfrin Updraft", date: "Feb 2026", credentialId: "0VKBN8X8AU4O", category: "Blockchain" },
    { name: "Full-Stack Web3 Development Crash Course", issuer: "Cyfrin Updraft", date: "Feb 2026", credentialId: "M409Z0HTMASJ", category: "Blockchain" },
    { name: "Blockchain Basics", issuer: "Cyfrin Updraft", date: "2025", credentialId: "", category: "Blockchain" },
    { name: "Back-End JavaScript (Node.js, Hapi, Git)", issuer: "Dicoding Indonesia", date: "2023", credentialId: "", category: "Backend" }
  ],

  volunteering: [
    {
      role: "Guest Lecturer — AI Beyond the Canvas",
      org: "Universitas AMIKOM Yogyakarta",
      period: "Nov 2025 · 1 bln · Jogja",
      description: "Dosen tamu di kelas Desain — mengajarkan integrasi Google Gemini API untuk otomasi bisnis kepada mahasiswa.",
      category: "Sains dan Teknologi"
    },
    {
      role: "Keynote Speaker — AI Automation Workflow",
      org: "Diponegoro University",
      period: "Nov 2025 · 1 bln",
      description: "Pembicara utama di Workshop AI for Adbis. Materi: AI Automation Workflow dalam konteks bisnis modern.",
      category: "Sains dan Teknologi"
    },
    {
      role: "IT Trainer — Cisco & AI",
      org: "SMK Muhammadiyah Bobotsari",
      period: "Sep 2025 · 1 bln · Bobotsari, Jawa Tengah",
      description: "Melatih siswa jurusan TKJ tentang Cisco Networking dan penerapan Artificial Intelligence di dunia kerja.",
      category: "Sains dan Teknologi"
    },
    {
      role: "IT Support & AI Educator",
      org: "MSW Sabilil Mukminin",
      period: "Mar 2025 · 1 bln · Desa Ngancar, Jawa Timur",
      description: "Mengelola data siswa yayasan dan mengajar tentang AI serta teknologi kepada siswa pesantren.",
      category: "Sains dan Teknologi"
    }
  ],

  timeline: [
    {
      year: "2026",
      title: "Founder — SIM-PP (SaaS Pesantren)",
      org: "Self-founded",
      description: "Membangun SaaS platform multi-tenant untuk manajemen pondok pesantren dengan fitur Tahfidz Tracker, e-wallet santri, dan WhatsApp Gateway.",
      type: "work"
    },
    {
      year: "2026",
      title: "Chief Technology Officer",
      org: "Syariah Saham Indonesia",
      description: "Memimpin strategi teknologi platform fintech syariah. Mengawasi web, DevOps, dan blockchain.",
      type: "work"
    },
    {
      year: "2026",
      title: "Full Stack Engineer — ISO & Pharmacy System",
      org: "Abu Hurairah Islamic School · Mataram",
      description: "Membangun SIMPAH (sistem manajemen farmasi) dan platform digitalisasi QMS ISO 9001:2015 yang mengotomasi 50 prosedur inti.",
      type: "work"
    },
    {
      year: "2025",
      title: "Multi-Role Engineer",
      org: "Crypto Sharia · Meetsin.Id · Takaful Keluarga",
      description: "Bekerja secara bersamaan di tiga perusahaan sebagai Software Developer, Full Stack Developer, dan Full Stack Engineer.",
      type: "work"
    },
    {
      year: "2025",
      title: "Guest Lecturer & IT Trainer",
      org: "AMIKOM Yogyakarta · Diponegoro University · SMK Muh. Bobotsari",
      description: "Mengajar 200+ mahasiswa dan siswa tentang AI Automation Workflow, AI Beyond the Canvas, dan Cisco Networking.",
      type: "work"
    },
    {
      year: "2025",
      title: "Blockchain Certifications",
      org: "Cyfrin Updraft",
      description: "Menyelesaikan sertifikasi Solidity Smart Contract Development dan Full-Stack Web3 Development.",
      type: "certification"
    },
    {
      year: "2024",
      title: "Grade 11 — Software Engineering",
      org: "IDN Boarding School Solo",
      description: "Fokus pada software engineering, web development, dan proyek kolaboratif. IPK: 5.0/5.0.",
      type: "education"
    },
    {
      year: "2023",
      title: "Back-End JavaScript Certification",
      org: "Dicoding Indonesia",
      description: "Menyelesaikan sertifikasi Node.js, Hapi framework, REST APIs, dan Git.",
      type: "certification"
    },
    {
      year: "2022",
      title: "Memulai Perjalanan Coding",
      org: "Self-taught",
      description: "Mulai belajar web development dengan HTML, CSS, dan JavaScript. Jatuh cinta dengan dunia programming.",
      type: "milestone"
    }
  ]
};
