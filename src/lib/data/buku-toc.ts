export interface OutlineItem {
  title: string;
  page: number;
  items: OutlineItem[];
}

export const bukuToc: OutlineItem[] = [
  {
    title: '1 Ilusi Puncak Gunung',
    page: 16,
    items: [
      { title: '1.1 Realita vs Persepsi: Lahirnya "Si Paling Tahu"', page: 18, items: [] },
      { title: '1.2 Hukum Efisiensi Otak: Mengapa Otak Kita Pemalas?', page: 23, items: [] }
    ]
  },
  {
    title: '2 Bug Dalam Kepala',
    page: 38,
    items: [
      { title: '2.1 Sunk Cost Fallacy: Penyakit "Udah Terlanjur"', page: 42, items: [] },
      { title: '2.2 Confirmation Bias: Kacamata Kuda Sang Pemuja Ego', page: 45, items: [] },
      { title: '2.3 Ad Hominem & Straw Man: Ciri Khas Debat Kusir', page: 48, items: [] },
      { title: '2.4 Bandwagon Fallacy: Penyakit FOMO dan Kebodohan Berjamaah', page: 52, items: [] },
      { title: '2.5 False Dilemma: Si Kacamata Kuda Hitam-Putih', page: 55, items: [] },
      { title: '2.6 Appeal to Emotion: Berlindung di Balik Air Mata', page: 58, items: [] },
      { title: '2.7 Post Hoc (Cocoklogi): Penyakit Salah Diagnosa', page: 61, items: [] }
    ]
  },
  {
    title: '3 Relativitas Realitas',
    page: 68,
    items: [
      { title: '3.1 Kerangka Acuan: Realitas Itu Tergantung', page: 71, items: [] },
      { title: '3.2 Gravitasi Ego: Benda Bermassa Besar Melengkungkan Realitas', page: 75, items: [] },
      { title: '3.3 Dilatasi Waktu: Kecepatan Otak vs Beban Hidup', page: 79, items: [] },
      { title: '3.4 Paradoks Kembar: Kenapa Teman Lama Jadi Terasa Asing?', page: 89, items: [] },
      { title: '3.5 Persamaan E = mc²: Bom Nuklir Hubungan', page: 94, items: [] }
    ]
  },
  {
    title: '4 Algoritma Berpikir Jernih',
    page: 108,
    items: [
      { title: '4.1 Membangun Framework: Tarik Sampai ke Akarnya', page: 110, items: [] },
      { title: '4.2 Middleware Kehidupan: Menyaring Fakta dari Sampah', page: 113, items: [] },
      { title: '4.3 System 1 vs System 2: Seni Ngerem Otak', page: 119, items: [] },
      { title: '4.4 Logika vs Empati: Menang Debat Bukan Berarti Masalah Selesai', page: 125, items: [] }
    ]
  },
  {
    title: '5 Seni Mematikan Mesin',
    page: 134,
    items: [
      { title: '5.1 Infinite Loop & Overheating Server', page: 136, items: [] },
      { title: '5.2 Analysis Paralysis: Terlalu Banyak Indikator Bikin Lumpuh', page: 139, items: [] },
      { title: '5.3 Arsitektur Biologis: Hardware yang Tidak Bisa Di-Upgrade', page: 142, items: [] },
      { title: '5.4 Wilayah Misteri (The Blank Spot)', page: 145, items: [] },
      { title: '5.5 Garbage Collection: Menghapus Cache Masa Lalu', page: 148, items: [] },
      { title: '5.6 Esensi "How not to Think"', page: 151, items: [] },
      { title: '5.7 Menatap ke Bawah: Ilusi di Atas Puncak', page: 154, items: [] },
      { title: '5.8 Sebuah Epilog: Seduh Kopimu, Langit Masih Luas', page: 157, items: [] }
    ]
  },
  { title: 'Glosarium Buku', page: 161, items: [] },
  { title: 'Catatan Akhir', page: 167, items: [] },
  { title: 'Daftar Pustaka', page: 171, items: [] }
];
