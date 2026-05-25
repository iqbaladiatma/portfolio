import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = './static/images';
const backupDir = './images_backup';

// 1. Pastikan folder backup ada
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 2. Baca file dari folder sumber
const files = fs.readdirSync(sourceDir);

async function run() {
  console.log('--- Memulai Proses Optimasi Gambar ---');
  
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const backupPath = path.join(backupDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // Skip if directory
    if (fs.statSync(filePath).isDirectory()) continue;
    
    // Hanya proses gambar jpg/jpeg/png
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      console.log(`\nMemproses: ${file}`);
      
      // Backup file asli jika belum ada di folder backup
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`-> Berhasil dicadangkan ke: ${backupPath}`);
      } else {
        console.log(`-> Cadangan sudah ada.`);
      }
      
      const statsBefore = fs.statSync(filePath);
      const sizeBeforeMB = (statsBefore.size / (1024 * 1024)).toFixed(2);
      
      const tempPath = filePath + '.tmp';
      
      try {
        // Kita gunakan file backup sebagai sumber agar jika dijalankan berulang kali,
        // gambar tidak mengalami kompresi ganda (kualitas tetap terjaga dari sumber asli).
        let pipeline = sharp(backupPath).resize({ width: 1920, withoutEnlargement: true });
        
        if (ext === '.jpg' || ext === '.jpeg') {
          pipeline = pipeline.jpeg({ quality: 82, progressive: true });
        } else if (ext === '.png') {
          pipeline = pipeline.png({ quality: 82, palette: true });
        }
        
        await pipeline.toFile(tempPath);
        
        // Hapus file lama di folder images dan ganti dengan yang sudah dioptimasi
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        const statsAfter = fs.statSync(filePath);
        const sizeAfterKB = (statsAfter.size / 1024).toFixed(2);
        const percentSaved = (((statsBefore.size - statsAfter.size) / statsBefore.size) * 100).toFixed(1);
        
        console.log(`✓ Selesai: ${sizeBeforeMB} MB -> ${sizeAfterKB} KB (Hemat ${percentSaved}%)`);
      } catch (err) {
        console.error(`✗ Gagal mengoptimasi ${file}:`, err);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    }
  }
  
  console.log('\n--- Semua Gambar Selesai Dioptimasi! ---');
}

run();
