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
      link: "https://manaahel.site",
      github: "https://github.com/iqbaladiatma/manaahel-project",
      featured: false,
      year: "2025",
      status: "Live",
      role: "Full Stack Developer",
      duration: "3 months",
      overview: "Educational platform that provides a complete online learning experience with course management, student tracking, and comprehensive analytics. It is currently deployed at manaahel.site and actively maintained.",
      features: [
        "Interactive course creation",
        "Student enrollment and management",
        "Assessment and testing system",
        "Progress tracking and analytics",
        "Video streaming integration",
        "Certificate generation"
      ],
      stack: [
        { name: "Laravel", role: "Backend Framework" },
        { name: "Blade (54.6%)", role: "UI Templates" },
        { name: "PHP (41.2%)", role: "Backend Logic" },
        { name: "JavaScript (2.5%)", role: "Interactions" },
        { name: "MySQL", role: "Database" }
      ],
      challenges: "Implementing a scalable video streaming solution while maintaining platform performance and providing real-time progress tracking.",
      image: "/projects/manaahel-depan.png",
      gallery: [
        { image: "/projects/manaahel-admin.png", title: "Admin Dashboard" }
      ],
      color: "#8b5cf6",
      extraDetails: [
        {
          title: "Repository Language Distribution",
          type: "table",
          content: "| Language | Percentage | Description |\n|---|---|---|\n| Blade | 54.6% | Laravel's templating engine for UI |\n| PHP | 41.2% | Backend logic and server-side processing |\n| JavaScript | 2.5% | Frontend interactivity and client-side logic |\n| HTML | 1.2% | Markup structure |\n| Other | 0.5% | Configuration files and others |"
        }
      ]
    },
    {
      slug: "anugerah-rentcar",
      title: "Anugerah Rentcar — Fleet & Rental Management",
      description: "Complete vehicle rental management system with booking, tracking, and payment processing.",
      longDescription: "Anugerah Rentcar is a comprehensive vehicle rental management platform built with Laravel 12 and Livewire 3. It handles vehicle inventory, customer bookings, fleet management, and active session monitoring.",
      tags: ["Rental", "Booking", "Fleet Management", "Laravel 12", "Livewire 3"],
      link: "https://github.com/iqbaladiatma/anugerah-rentcar",
      github: "https://github.com/iqbaladiatma/anugerah-rentcar",
      featured: false,
      year: "2025",
      status: "Live",
      role: "Full Stack Developer",
      duration: "2 months",
      overview: "Vehicle rental management system that streamlines the entire rental process from booking to return, with integrated session tracking, multi-role configurations, and fleet management.",
      features: [
        "Vehicle inventory management",
        "Online booking and availability calendar",
        "Active Sessions Monitoring (names, email, IP, browser, and kick button)",
        "Role-Based Access Control (RBAC): Super Admin, Admin, Staff, Driver",
        "Invoice PDF generation with Laravel DomPDF",
        "Excel report export with Maatwebsite Excel",
        "User account activation and deactivation system"
      ],
      stack: [
        { name: "Laravel 12", role: "Backend Framework" },
        { name: "Livewire 3.6 & Volt 1.7", role: "Reactive Components" },
        { name: "Tailwind CSS", role: "Styling Framework" },
        { name: "Spatie Permission 6.24", role: "Access Control" },
        { name: "Jenssegers Agent 2.6", role: "Device & Agent Detection" },
        { name: "Laravel DomPDF 3.1", role: "PDF Generator" },
        { name: "Maatwebsite Excel 3.1", role: "Excel Import/Export" }
      ],
      challenges: "Creating a real-time availability system that could handle concurrent bookings while preventing double bookings, and building active session tracking to terminate user sessions on demand.",
      image: "/projects/rent-car-dashboard.png",
      gallery: [
        { image: "/projects/rent-car-detail.png", title: "Vehicle Details" },
        { image: "/projects/rent-car-help.png", title: "Help & Support" }
      ],
      color: "#f59e0b",
      security: `### Active Sessions & Security Guard
- Route super admin dilindungi oleh middleware \`super.admin\` kustom.
- Hanya user dengan role \`super_admin\` yang bisa mengakses panel kontrol. User lain mendapat respons 403 Forbidden.
- Pelacakan sesi aktif melacak alamat IP, data user-agent (sistem operasi dan peramban), halaman terakhir yang dikunjungi, serta waktu aktivitas terakhir.
- Sesi aktif akan dibersihkan dari database secara otomatis setiap 1 jam jika tidak ada aktivitas lebih dari 5 menit.`,
      dbSchema: `### Database Architecture

#### Tabel Utama: \`users\`
\`\`\`sql
ALTER TABLE users MODIFY COLUMN role ENUM(
  'super_admin', 
  'admin', 
  'staff', 
  'driver'
) NOT NULL DEFAULT 'staff';
\`\`\`

#### Tabel Baru: \`active_sessions\`
\`\`\`sql
CREATE TABLE active_sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    browser VARCHAR(255) NULL,
    platform VARCHAR(255) NULL,
    device VARCHAR(255) NULL,
    current_page VARCHAR(255) NULL,
    last_activity TIMESTAMP NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (user_id),
    INDEX (session_id),
    INDEX (last_activity)
);
\`\`\`

#### Hubungan Entitas:
- **User** memiliki satu/banyak **ActiveSession**.
- Admin mengawasi seluruh data booking, kendaraan, staff, driver, dan sesi.`,
      extraDetails: [
        {
          title: "Sistem Peran (User Roles)",
          type: "table",
          content: "| Role | Deskripsi | Akses |\n|---|---|---|\n| **super_admin** | Administrator tertinggi | Akses penuh seluruh fitur, monitor & kick user online, edit system settings |\n| **admin** | Administrator | Manajemen sistem & CRUD data master |\n| **staff** | Staf operator | Manajemen booking harian & ketersediaan kendaraan |\n| **driver** | Pengemudi | View profile pribadi & melihat daftar booking penugasan |"
        },
        {
          title: "Cara Setup & Instalasi",
          type: "code",
          content: "```bash\n# 1. Clone repository\ngit clone https://github.com/iqbaladiatma/anugerah-rentcar.git\ncd anugerah-rentcar\n\n# 2. Install dependencies\ncomposer install\nnpm install\n\n# 3. Setup environment\ncp .env.example .env\nphp artisan key:generate\n\n# 4. Migrate database & Seed\nphp artisan migrate --seed\n\n# 5. Build assets & Run\nnpm run build\nphp artisan serve\n```"
        }
      ]
    },
    {
      slug: "course-management",
      title: "Course Management — AHE Student Management System",
      description: "Integrated school administration platform for managing student profiles, attendance, tuition fees, and WhatsApp alerts.",
      longDescription: "Course Management is a school management system built with Laravel 12 for AHE (Ahlan Wa Sahlan Education). It features polymorphic attendance, automated student ID sequence, tuition billing checks, and automated WhatsApp parent alerts.",
      tags: ["School Management", "Laravel 12", "Polymorphic Relationships", "WhatsApp API"],
      link: "https://github.com/iqbaladiatma/course-management",
      github: "https://github.com/iqbaladiatma/course-management",
      featured: false,
      year: "2026",
      status: "Completed",
      role: "Full Stack Developer",
      duration: "2 weeks",
      overview: "Course Management is a highly-tuned administration platform for Ahlan Wa Sahlan Education (AHE). It simplifies daily operations by integrating polymorphic database relations for tracking student/teacher attendance under a single schema, managing monthly tuition cycles, and calculating teacher salaries.",
      features: [
        "Auto-Generated Student Numbers (Format: AHE25001, AHE25002, dst.)",
        "Polymorphic Attendance System: single table for student and teacher attendance log",
        "Unique Tuition constraint: prevents duplicate billing entries per month/student",
        "Interactive analytics and attendance reporting for selected date ranges",
        "Integrated WhatsApp Helper to format and validate Indonesian numbers (628xxx)",
        "Library inventory tracking (books pricing & stock constraint controls)",
        "Automated teacher salary sheets mapped to classes and active attendance"
      ],
      stack: [
        { name: "Laravel 12", role: "Backend Framework" },
        { name: "Blade Templates", role: "Svelte-like Server Render" },
        { name: "Tailwind CSS", role: "UI Styling" },
        { name: "SQLite / MySQL", role: "Relational Database" },
        { name: "PHPUnit 11.5", role: "Testing Framework" },
        { name: "Laravel Pint", role: "Code Style Linters" }
      ],
      challenges: "Structuring a polymorphic database architecture for the attendance log so that it cleanly handles both student and teacher relations, while preventing duplicates through compound indices.",
      image: "/projects/ahe-medang-dashboad.png",
      color: "#8b5cf6",
      dbSchema: `### Database Architecture & Relationships

#### 1. Tabel Utama: \`students\`
- \`id\` (primary key)
- \`no_induk\` (string, unique) → Generated otomatis: AHE25001
- \`nama_lengkap\` (string)
- \`no_wa\` (string) → Validasi format WhatsApp: 628xxx
- \`level_id\` (foreign key → levels)
- \`status\` (aktif / non_aktif)
- \`soft deletes\` aktif

#### 2. Tabel Polimorfik: \`attendances\`
- \`id\` (primary key)
- \`tanggal\` (date)
- \`type\` (student / teacher)
- \`attendable_id\` (polymorphic ID)
- \`attendable_type\` (polymorphic type)
- \`status\` (hadir, tidak_hadir, izin, sakit)
- \`subject_id\` (foreign key, nullable)
- \`jam_masuk\` & \`jam_keluar\` (time, nullable)
- **Unique Constraint**: \`(tanggal, type, attendable_id, subject_id)\`

#### 3. Tabel Keuangan: \`tuitions\`
- \`student_id\` (foreign key)
- \`bulan_tagihan\` (month)
- \`nominal\` (decimal)
- \`status\` (belum_bayar, lunas, cicilan)
- **Unique Constraint**: \`(student_id, bulan_tagihan)\` untuk mencegah tagihan ganda.`,
      routes: `### Route Structure

\`\`\`php
# Student Routes
GET    /students              - Daftar siswa
GET    /students/create       - Form tambah siswa
POST   /students              - Simpan siswa baru
GET    /students/{id}         - Detail siswa
GET    /students/{id}/edit    - Form edit siswa
PUT    /students/{id}         - Update siswa
DELETE /students/{id}         - Hapus siswa

# Teacher Routes
GET    /teachers              - Daftar guru
POST   /teachers              - Simpan guru baru
GET    /teachers/{id}/edit    - Form edit guru

# Attendance Routes
GET    /attendances           - Daftar absensi
GET    /attendances/create    - Form input absensi
POST   /attendances           - Simpan absensi
GET    /attendances/report    - Laporan absensi
\`\`\``,
      extraDetails: [
        {
          title: "Format Nomor Induk Otomatis (Student ID Generator)",
          type: "text",
          content: "Sistem secara dinamis menyusun nomor induk siswa menggunakan format:\n**\`AHE25001\`**\n- **AHE** = Inisial lembaga Ahlan Wa Sahlan Education\n- **25** = Dua digit tahun pendaftaran (2025)\n- **001** = Nomor urut urutan siswa terdaftar pada tahun tersebut"
        },
        {
          title: "Cara Setup & Migrasi",
          type: "code",
          content: "```bash\n# 1. Setup aplikasi\ncomposer install\nnpm install\ncp .env.example .env\nphp artisan key:generate\n\n# 2. Migrasi Database (Menggunakan script batch atau manual)\n./fresh-migrate.bat\n# atau\nphp artisan migrate:fresh --seed\n\n# 3. Jalankan pengujian unit\nphp artisan test\n```"
        }
      ]
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
      slug: "vetiver",
      title: "Vetiver ($VETI) — The Silent Anchor of DeFi",
      description: "A cryptocurrency ecosystem based on the stabilizing philosophy of the Vetiver plant, integrating multi-chain tokens, Soil Treasury, and deep root staking.",
      longDescription: "Vetiver ($VETI) is a decentralized finance ecosystem designed as an anti-erosion portfolio stabilizer. Features two core tokens, deep-root staking curves, Certik audit compliance, and DAO Soil Treasury orchestration.",
      tags: ["Solidity", "DeFi", "Solana", "Cosmos SDK", "Tokenomics"],
      link: "https://vetiver.network",
      github: "https://github.com/iqbaladiatma",
      featured: true,
      year: "2025",
      status: "Live",
      role: "Lead Blockchain Developer",
      duration: "Ongoing",
      overview: "Vetiver ($VETI) is a cryptocurrency project bridging natural conservation philosophy with modern decentralized protocols. It replicates the deep rooting mechanism of the vetiver plant — which prevents soil erosion and purifies water — through high-liquidity lockups, community green-treasury investments (Soil Treasury), and security audits.",
      features: [
        "Dual Token integration: VetiverSol ($VSOL) on Solana DEX & TokenVetiver on L1",
        "Soil Treasury DAO: community funds allocated to real-world green projects and buybacks",
        "Deep Root Staking: dynamic APY multiplier curves based on token lockup periods",
        "Comprehensive smart contract audits by Certik & TechRate (overall score 98/100)",
        "Anti-Erosion market mechanism to buffer extreme portfolio volatility",
        "Decentralized governance for token burn rates and treasury distribution"
      ],
      stack: [
        { name: "Solidity", role: "Ethereum Contracts" },
        { name: "Rust", role: "Solana Programs" },
        { name: "Go", role: "Cosmos SDK Framework" },
        { name: "Tailwind CSS", role: "Visual Interface" },
        { name: "CometBFT", role: "L1 Consensus Engine" }
      ],
      challenges: "Designing and auditing custom staking curves that mathematically reward longer holding cycles while keeping Gas execution costs minimal across multi-chain bridges.",
      image: "/projects/vetiver-depan.png",
      color: "#2F7A52",
      extraDetails: [
        {
          title: "Tokenomics (Supply: 1 Miliar $VETI)",
          type: "table",
          content: "| Alokasi | Persentase | Fungsi |\n|---|---|---|\n| **Ecosystem Growth** | 30% | Pengembangan ekosistem, kemitraan, dApps |\n| **Validator Rewards** | 25% | Insentif keamanan jaringan & validasi PoS |\n| **Core Team** | 20% | Alokasi tim inti dengan jadwal vesting panjang |\n| **Public Seed Sale** | 15% | Distribusi token publik perdana |\n| **Emergency Reserve** | 10% | Dana cadangan darurat stabilitas pasar |"
        },
        {
          title: "3 Pilar Filosofi Utama",
          type: "list",
          content: "- **Anti-Erosion (🛡️)**: Penyeimbang portofolio, dirancang untuk menjaga nilai saat terjadi guncangan pasar ekstrem.\n- **The Purifier (💧)**: Transparansi audit total. Smart contract divalidasi penuh oleh Certik & TechRate dengan skor 98/100.\n- **Deep Roots (⚓)**: Likuiditas terkunci jangka panjang. Bukan skema instan, melainkan pertumbuhan finansial berkelanjutan."
        },
        {
          title: "Roadmap Pengembangan (3 Fase)",
          type: "list",
          content: "- **Fase 1: SEEDING (Penyemaian)**: Audit Smart Contract, Peluncuran Website Resmi, Pembentukan Komunitas, Listing di DEX (Pump.fun).\n- **Fase 2: ROOTING (Pengakaran)**: CEX Listing, Peluncuran dApp Staking, Integrasi CoinGecko & CoinMarketCap, Kemitraan Strategis.\n- **Fase 3: BLOOMING (Mekar)**: Transisi penuh ke Tata Kelola DAO, Ekspansi lintas rantai (Cross-chain Bridge), Peluncuran NFT 'Vetiver Roots'."
        },
        {
          title: "Tim Inti Pendiri (Founders)",
          type: "list",
          content: "- **Iqbal Muhammad Adiatma** — Founder & CTO\n- **Rakhn.** — Co-Founder & Technical Architect\n- **Nagara** — Co-Founder & Growth Lead\n- **Jexki** — Management & Operations"
        }
      ]
    },
    {
      slug: "sim-pah",
      title: "SIM-PAH — Abu Hurairah QMS & Operations",
      description: "Sistem Informasi Manajemen Rumah Tangga (URT) & QMS ISO 9001:2015 untuk 28 lembaga internal Pondok Pesantren Abu Hurairah Mataram.",
      longDescription: "SIM-PAH is an operations and compliance system for Abu Hurairah Islamic Boarding School. It manages assets, inventory tracking, service requests, and automated checklists compliant with ISO 9001:2015 standards, serving 28 institutions.",
      tags: ["Laravel 12", "Vue 3", "Inertia.js", "MySQL", "ISO 9001:2015"],
      link: "https://abhursarpras.com",
      github: "https://github.com/iqbaladiatma/sim-pah",
      featured: true,
      year: "2026",
      status: "Completed",
      role: "Full Stack Engineer",
      duration: "7 days",
      overview: "SIM-PAH (Sistem Informasi Manajemen Pondok Pesantren Abu Hurairah - Mataram) adalah platform operasional terpusat yang dirancang khusus untuk mengelola logistik, rumah tangga (URT), dan pemenuhan standar kepatuhan ISO 9001:2015 pada 28 unit/lembaga di bawah naungan pesantren. Menggunakan arsitektur multi-tenancy kustom, platform ini dikembangkan secara rekor dalam waktu 7 hari dengan mengimplementasikan metodologi Vibe Coding.",
      features: [
        "Multi-Tenancy per Lembaga: filter resource (item, request, room) berbasis institution_id",
        "Role-Based Access Control (RBAC): Super Admin (System control), Admin URT, dan Lembaga (Karyawan)",
        "Manajemen Inventori & Stok Real-Time dengan ambang batas stok minimum (low stock alerts)",
        "Sistem Pengajuan URT (Utilitas, Habis Pakai, Darurat) dengan upload foto bukti & estimasi biaya",
        "Sertifikasi ISO 9001:2015: 39 prosedur ISO (maintenance logs, checklists, nonconformity tracking)",
        "Audit Trail Otomatis: mencatat aksi create, update, delete detail (nilai lama vs baru) via Spatie Activitylog",
        "Integrasi PWA (Vite PWA Plugin v1.2.0) untuk akses mobile instan karyawan lapangan"
      ],
      stack: [
        { name: "Laravel 12", role: "Backend Engine" },
        { name: "Vue 3 & Inertia.js", role: "Frontend SPA (No Filament)" },
        { name: "MySQL", role: "Database (66 migrations)" },
        { name: "Tailwind CSS", role: "Styling (#C9A658 Gold primary)" },
        { name: "Spatie Activitylog v4.11", role: "Audit Trail & Logs" },
        { name: "Vite PWA Plugin v1.2.0", role: "Progressive Web App" },
        { name: "Maatwebsite Excel v3.1", role: "Excel Import/Export" }
      ],
      challenges: "Mengotomasi 39 prosedur operasional ISO dan formulir checklist yang kompleks ke dalam basis data reaktif tanpa menggunakan admin framework otomatis, untuk mempertahankan kontrol penuh atas antarmuka dan efisiensi query.",
      image: "/projects/sim-pah-dashboard.png",
      gallery: [
        { image: "/projects/sim-pah-iso.png", title: "ISO 9001 Compliance Module" },
        { image: "/projects/sim-pah-login.png", title: "Login Page with Institution Selector" }
      ],
      color: "#C9A658",
      whyNot: "Manual CRUD menggunakan Vue 3 + Inertia dipilih alih-alih Filament untuk memberikan kontrol kustomisasi UI/UX tanpa batas, menghindari bottleneck plugin, dan mempercepat waktu muat halaman untuk 28 institusi.",
      metrics: [
        { label: "Waktu Development", value: "7 Hari (vs 3-6 bulan normal)" },
        { label: "AI-Generated Code", value: "70-85% keseluruhan (90-100% fase terstruktur)" },
        { label: "Total Lines of Code", value: "~37,875 (tanpa vendor)" },
        { label: "Custom Files", value: "250+ (controllers, models, Vue)" },
        { label: "Migrasi Database", value: "66 migrasi" },
        { label: "Modul Prosedur ISO", value: "39 prosedur" },
        { label: "Audit Trail Entries", value: "184 activity logs" },
        { label: "Prompt AI Used", value: "~45 prompt" }
      ],
      dbSchema: `### Database Architecture (15 Models Utama)

#### Core Entities
- \`User\` (\`users\`) → Super Admin, Admin URT, Lembaga
- \`Institution\` (\`institutions\`) → 28 lembaga internal
- \`Room\` (\`rooms\`) → Ruang/lokasi per lembaga
- \`SystemSetting\` → Konfigurasi global

#### Inventory & Assets
- \`Item\` (\`items\`) → Barang inventori dengan pelacakan stok real-time
- \`ItemUpdateRequest\` → Approval workflow perubahan stok barang
- \`BorrowingRecord\` → Peminjaman barang dengan tanda tangan digital
- \`AssetLifecycleLog\` → Catatan siklus hidup aset (lelang/pembuangan)

#### Request & Workflows
- \`Request\` (\`requests\`) → Pengajuan umum (utilitas, habis pakai, darurat)
- \`Vehicle\` (\`vehicles\`) → Kendaraan operasional pesantren
- \`VehicleRequest\` → Pengajuan pemakaian kendaraan

#### ISO 9001:2015 Compliance
- \`MaintenanceLog\` (160+ fields!) → Log maintenance utilitas & aset
- \`IsoChecklist\` → Template checklist ISO
- \`IsoChecklistLog\` → Catatan eksekusi checklist ISO
- \`ParkingLog\` → Monitoring area parkir`,
      routes: `### Route & Endpoint Map

\`\`\`php
# Authentication
/login                    → Login dengan dropdown institusi

# Employee Routes (Role: lembaga)
/dashboard               → Karyawan dashboard
/requests                → Kelola requests mereka
/items                   → Lihat inventory
/requests/create         → Buat request baru

# Admin Routes (Prefix: /admin)
/admin/dashboard         → Admin dashboard
/admin/institutions      → CRUD institusi
/admin/users            → CRUD users
/admin/items            → CRUD items (with import template)
/admin/rooms            → CRUD rooms
/admin/requests         → Manage semua requests
/admin/item-requests    → Approve/reject item updates
/admin/procedures       → ISO procedures management
  /procedures/dashboard     → Procedure overview
  /procedures/{type}        → View specific procedure
  /procedures/export-all    → Export semua procedures
  /procedures/import/{type} → Import dari Excel

# Super Admin Only
/admin/system-control       → System orchestration
/admin/activity-log         → View audit trails
/admin/online-users        → Manage active sessions
\`\`\``,
      structure: `### Project Folder Structure
\`\`\`
sim-pah/
├── app/
│   ├── Http/Controllers/Admin/
│   │   ├── AdminDashboardController.php
│   │   ├── InstitutionController.php
│   │   ├── ItemController.php
│   │   ├── UserController.php
│   │   ├── UrtProcedureController.php (ISO)
│   │   └── ActivityLogController.php
│   ├── Http/Middleware/
│   │   ├── AdminAccess.php
│   │   └── RoleMiddleware.php
│   └── Models/ (15 models)
├── database/migrations/ (66 migrations)
├── resources/
│   ├── js/Pages/ (30+ Vue components)
│   └── css/app.css (Tailwind)
├── routes/web.php
└── docs/
    ├── DATABASE_SCHEMA.md
    └── ERD.md
\`\`\``,
      security: `### Authentication & Security Flow
- **Multi-Tenant Isolation**: Isolasi data yang ketat berbasis institusi:
  \`\`\`sql
  SELECT * FROM items WHERE institution_id = auth()->user()->institution_id
  \`\`\`
- **Role-Based Guards**: Middleware tersemat untuk menyaring hak akses halaman admin dan karyawan.
- **Audit Trails**: Perubahan field krusial disimpan otomatis (nilai sebelum vs sesudah) menggunakan Spatie Activitylog.
- **Soft Deletes**: Pengajuan dan inventori yang dihapus didukung soft deletes untuk memfasilitasi audit kepatuhan ISO.`,
      workflow: `### Vibe Coding Methodology
Proyek ini dibangun melalui kolaborasi tingkat lanjut Manusia-AI dengan framework 3 pilar:
1. **Context Persistence**: Pemanfaatan berkas \`rules.md\` di folder \`.agent/rules/\` dan Model Context Protocol (MCP) untuk mencegah hilangnya memori instruksi AI.
2. **Schema Engineering**: Perencanaan database ERD secara komprehensif sebelum penulisan baris kode pertama.
3. **Conditional Tech Stack**: Pemilihan Laravel 12 karena strukturnya yang berpendirian (opinionated) didukung Vue 3 untuk kerangka kerja SPA reaktif cepat.`,
      extraDetails: [
        {
          title: "Growth Potential & Scale",
          type: "list",
          content: "- **Aplikasi Mobile**: Rencana ekspansi menggunakan Flutter untuk tim lapangan.\n- **Notifikasi Real-time**: Integrasi Pusher untuk notifikasi status pengajuan.\n- **ML Forecasting**: Prediksi habisnya inventori berbasis penggunaan historis.\n- **Manajemen Anggaran**: Modul penyesuaian biaya operasional terhadap kas tahunan."
        },
        {
          title: "Open Science & Reproducibility",
          type: "text",
          content: "Repositori kode bersifat publik di GitHub berlisensi MIT. Berkas perencanaan ERD, log prompt, dan berkas aturan agen tersedia lengkap untuk tujuan reproduksi ilmiah.\n\n**Citation:**\n```bibtex\n@misc{iqbal2026simpah,\n  author       = {Iqbal Muhammad Adiatma},\n  title        = {SIM URT PAH - Mataram: Vibe Coding MIS Implementation},\n  year         = {2026},\n  publisher    = {GitHub},\n  howpublished = {\\url{https://github.com/iqbaladiatma/sim-pah}}\n}\n```"
        }
      ]
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
