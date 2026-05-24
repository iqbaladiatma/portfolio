# Plan Pembuatan: Portfolio Classic Modern Minimalis
**Developer & Owner**: Iqbal Muhammad Adiatma

## Visi Proyek
Membangun sebuah website portfolio yang merepresentasikan skill dan identitas Iqbal Muhammad Adiatma sebagai seorang *Full-Stack Developer*. Mengusung gaya *Classic Modern Minimalis*, desain akan memberikan kesan premium, bersih, elegan, dan profesional tanpa terlihat kaku. 

## Tech Stack
*   **Framework**: SvelteKit
*   **Agnostic Component**: Svelte 5
*   **Styling**: Vanilla CSS (Sesuai dengan guideline untuk memberikan kontrol maksimal dan aesthetic premium tanpa framework utility, menggunakan variables & *design system* kustom)
*   **Animasi**: Svelte Transitions & Vanilla CSS Micro-animations

## Fase Pengembangan

### Fase 1: Inisialisasi & Setup Proyek (Selesai/Disiapkan)
1. Inisialisasi SvelteKit (`npx sv create portfolio-iqbal`).
2. Setup folder structure standar.
3. Konfigurasi `GEMINI.md` sebagai *source of truth* untuk menjaga *AI developer* tetap konsisten dan tidak berhalusinasi.
4. Setup routing dasar (Home, Projects, About).

### Fase 2: Design System & Theming (Classic Modern Minimalis)
1. **Tipografi**: Setup *Google Fonts* (misal: *Inter* atau *Outfit* untuk UI, *Playfair Display* untuk aksen *classic* di heading).
2. **Color Palette**: 
   * Tema bersih dengan dominasi *monochrome* (putih/hitam lembut).
   * Aksen elegan.
3. **Global Styles**: Membuat file `app.css` yang mendefinisikan *CSS Variables*, *reset*, dan *utility class* dasar.
4. Setup *Dark Mode*.

### Fase 3: Pengembangan Komponen (Modular Svelte)
1. **Navigation Bar**: Minimalis, transparan, mendukung *glassmorphism*.
2. **Hero Section**: Typografi besar bergaya *classic modern*, deskripsi singkat (Full-Stack Developer, TALL Stack, Svelte).
3. **Card Projects**: Menampilkan proyek unggulan seperti:
   * $VETI (Solana)
   * Kelontong Cerdas (POS)
   * Sistem Manajemen Halaqoh (Flutter)
   * ISO 9001:2015 Digitization
4. **Skills/Tech Section**: Menampilkan tumpukan teknologi dominan (Laravel, Svelte, Flutter, db dll).
5. **Footer**: Tautan sosial (GitHub/iqbaladiatma, LinkedIn, YouTube).

### Fase 4: Routing & Integrasi Halaman
1. **`/` (Home)**: Menggabungkan komponen Hero, Featured Projects, dan Skills.
2. **`/projects`**: Detail lengkap proyek.
3. **`/about`**: Perjalanan sebagai siswa IDN Boarding School Solo dan sertifikasi (Dicoding dll).

### Fase 5: Polish, SEO & Optimalisasi
1. Meta tags dan SEO structure.
2. Semantic HTML.
3. *Micro-animations* dan performa.

## Struktur Direktori SvelteKit
```text
/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar.svelte, Footer.svelte
│   │   │   └── ui/          # ProjectCard.svelte, Button.svelte
│   │   ├── styles/
│   │   │   ├── app.css      # Entry CSS
│   │   │   └── theme.css    # CSS Variables, Design System
│   │   └── data/
│   │       └── store.js     # Data portofolio statis
│   ├── routes/
│   │   ├── +layout.svelte   
│   │   ├── +page.svelte     
│   │   ├── projects/
│   │   │   └── +page.svelte
│   │   └── about/
│   │       └── +page.svelte
│   └── app.html
├── static/
│   └── (assets, images, fonts)
├── GEMINI.md
└── svelte.config.js
```
