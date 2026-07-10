import { compress } from 'qpdf-compress';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const inputPath = path.join(rootDir, 'static', 'secure-pdf', 'bukuku.pdf');
const outputPath = path.join(rootDir, 'static', 'secure-pdf', 'bukuku.compressed.pdf');
const backupPath = path.join(rootDir, 'static', 'secure-pdf', 'bukuku.original.pdf');

async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }

  const originalSize = fs.statSync(inputPath).size;
  console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log('Compressing with qpdf-compress (lossy mode)...');

  try {
    await compress(inputPath, { lossy: true, output: outputPath });

    const compressedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - compressedSize) / originalSize) * 100;
    console.log(`Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Savings: ${savings.toFixed(2)}%`);

    if (compressedSize < originalSize) {
      fs.renameSync(inputPath, backupPath);
      fs.renameSync(outputPath, inputPath);
      console.log(`Replaced ${path.basename(inputPath)} with compressed version.`);
      console.log(`Original backed up to ${path.basename(backupPath)}`);
    } else {
      fs.unlinkSync(outputPath);
      console.log('Compressed version is not smaller, keeping original.');
    }
  } catch (err) {
    console.error('Compression failed:', err);
    process.exit(1);
  }
}

main();
