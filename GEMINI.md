# Project Configuration & AI Constraints (GEMINI.md)

## Identitas Proyek
- **Nama Proyek**: Portofolio Utama
- **Pemilik**: Iqbal Muhammad Adiatma
- **Status/Background**: Full-Stack Developer, Siswa Kelas 11 di IDN Boarding School Solo. Berpengalaman di TALL Stack, Svelte, Flutter, dan Node.js. Memiliki project seperti $VETI, Kelontong Cerdas, Sistem Manajemen Halaqoh, dan ISO 9001:2015 Digitization. GitHub: iqbaladiatma.
- **Tech Stack**: SvelteKit, Svelte 5, dan Tailwind CSS.

## Aturan Utama untuk AI
AI Developer **HARUS** membaca aturan ini sebelum menulis atau mengubah satu pun kode dalam proyek ini agar tetap *On-Track* dan tidak mengalami *Hallucination* (menggunakan tech stack atau pendekatan di luar spesifikasi).

### 1. Desain "Classic Modern Minimalis" & Kualitas Estetika
- **Wajib Aesthetics Premium**: Tidak boleh menulis styling dasar/minimal produk layak jalan (MVP). Gunakan layout modern, font premium (Google Fonts: Outfit / Inter untuk teks, *clean serif* untuk aksen jika perlu).
- **Styling dengan Tailwind CSS**: Gunakan TailwindCSS. Semua komponen menggunakan *Tailwind CSS* yang rapi. Buat transisi mikro untuk hover states, button click, dan scrolling. 
- **Skema Warna**: Harmonis. Padukan dark mode premium (misalnya Dark slate gray / off-black) dan light mode (soft white, bukan pure `#FFFFFF`). Jangan gunakan warna generik dasar (seperti `red`, `blue`).
- **Glassmorphism & Shadows**: Implementasi bayangan lembut (soft shadows) dan efek *glass* (backdrop-filter) dengan selera *classic modern*. 

### 2. Svelte & SvelteKit Best Practices
- **Reaktivitas Svelte 5**: Gunakan Svelte 5 *Runes* (seperti `$state`, `$derived`, `$props`) dalam membuat *logic* reaktif, jika `svelte@latest` default membawa Svelte 5. Jangan gunakan format reaktivitas lama seperti `export let` jika proyek memakai runes.
- **Komponen**: Kodenya harus modular. Jangan letakkan semuanya di dalam `+page.svelte`. Pecah Navbar, Footer, Hero, ProjectCard di dalam direktori `src/lib/components/`.
- **Styling**: Terapkan scope-styling `<style>` Svelte secara benar namun *leverage* `app.css` untuk *global CSS Variables*.

### 3. SEO & Semantic HTML
- Pada semua page (seperti `/`, `/projects`, `/about`), harus menggunakan `<svelte:head>` berisi `<title>` dan `<meta name="description">` yang kuat secara SEO dan relevan dengan karir Iqbal Muhammad Adiatma.
- Gunakan *tag* semantic: `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`. Hanya gunakan H1 tunggal di setiap halaman.

### 4. Zero Hallucination Policy
- Apabila AI ragu mengenai library eksternal, format build, atau struktur data projects, **bertanya** dan tunggu persetujuan Iqbal.
- Jangan meng-install pustaka sembarangan seperti Mui, Bootstrap, atau jQuery. Fokus ke Native Sveltekit dan Native CSS.
- Jika ada hal teknis baru atau bug, baca *log terminal*. Temukan akar masalah di dokumentasi *internal rules* sebelum menambahkan patch kode membabi buta.

## Workflow Instruksi
Setiap iterasi yang dilakukan oleh AI (seperti menambahkan page baru), instruksi ini wajib terus dipegang:
1. Pahami apa yang diminta.
2. Gunakan Tailwind CSS.
3. Pastikan reaktivitas Svelte.
4. Jamin estetika yang dituntut oleh gaya *Classic Modern Minimalis*.
