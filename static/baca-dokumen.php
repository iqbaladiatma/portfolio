<?php
session_start();

// 1. Cek apakah pembaca sudah memasukkan nama (terotentikasi)
if (!isset($_SESSION['reader_authenticated']) || $_SESSION['reader_authenticated'] !== true) {
    header('HTTP/1.0 403 Forbidden');
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Akses ditolak. Silakan masukkan identitas Anda terlebih dahulu."]);
    exit;
}

// 2. Cek header untuk memastikan request berasal dari PDF Viewer aplikasi (bukan dibuka langsung di tab baru)
$headers = getallheaders();
$requestedWith = '';

if (isset($headers['X-Requested-With'])) {
    $requestedWith = $headers['X-Requested-With'];
} elseif (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    $requestedWith = $_SERVER['HTTP_X_REQUESTED_WITH'];
}

if ($requestedWith !== 'PdfViewer') {
    header('HTTP/1.0 403 Forbidden');
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Akses langsung tidak diizinkan."]);
    exit;
}

// 3. Sajikan berkas PDF aman
$filePath = __DIR__ . '/secure-pdf/bukuku.pdf';

if (!file_exists($filePath)) {
    header('HTTP/1.1 404 Not Found');
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Dokumen tidak ditemukan."]);
    exit;
}

// Bersihkan output buffer untuk mencegah masalah memori saat membaca file besar (45MB)
if (ob_get_level()) {
    ob_end_clean();
}

$fileSize = filesize($filePath);
$file = fopen($filePath, 'rb');

if (!$file) {
    header('HTTP/1.1 500 Internal Server Error');
    exit;
}

// Default values
$start = 0;
$end = $fileSize - 1;
$length = $fileSize;

// Support Accept-Ranges
header('Accept-Ranges: bytes');
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="restricted_document.pdf"');
header('Cache-Control: private, max-age=0, must-revalidate');

if (isset($_SERVER['HTTP_RANGE'])) {
    $range = $_SERVER['HTTP_RANGE'];
    if (preg_match('/bytes=\s*(\d+)-(\d*)/i', $range, $matches)) {
        $start = (int)$matches[1];
        if (isset($matches[2]) && $matches[2] !== '') {
            $end = (int)$matches[2];
        }
    }
    
    // Validate range
    if ($start > $end || $start >= $fileSize || $end >= $fileSize) {
        header('HTTP/1.1 416 Range Not Satisfiable');
        header("Content-Range: bytes */$fileSize");
        fclose($file);
        exit;
    }
    
    $length = $end - $start + 1;
    fseek($file, $start);
    header('HTTP/1.1 206 Partial Content');
    header("Content-Range: bytes $start-$end/$fileSize");
}

header('Content-Length: ' . $length);

// Stream the chunk to the client
$bufferSize = 8192;
$bytesSent = 0;
while (!feof($file) && $bytesSent < $length) {
    $toRead = min($bufferSize, $length - $bytesSent);
    if ($toRead <= 0) {
        break;
    }
    $buffer = fread($file, $toRead);
    if ($buffer === false || $buffer === '') {
        break;
    }
    echo $buffer;
    flush();
    $bytesSent += strlen($buffer);
}

fclose($file);
exit;
