<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Set timezone to WIB (Asia/Jakarta)
date_default_timezone_set('Asia/Jakarta');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $nama = isset($input['nama']) ? trim($input['nama']) : '';

    if (strlen($nama) >= 3) {
        $file = 'pembaca.json';
        $data = [];
        
        if (file_exists($file)) {
            $data = json_decode(file_get_contents($file), true) ?: [];
        }
        
        $id = uniqid('reader_', true);
        
        // Simpan nama dengan tanggal & waktu akses (Unified schema)
        $data[] = [
            'id' => $id,
            'nama' => htmlspecialchars($nama),
            'status' => 'Online Only',
            'instansi' => '-',
            'alasan' => 'Akses langsung via pembaca online.',
            'type' => 'online',
            'timestamp' => date('Y-m-d H:i:s'),
            'feedback_rating' => null,
            'feedback_text' => null,
            'feedback_timestamp' => null
        ];
        
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
        
        // Simpan ke session untuk otentikasi baca dokumen
        $_SESSION['reader_authenticated'] = true;
        $_SESSION['reader_name'] = $nama;
        $_SESSION['reader_id'] = $id;
        $_SESSION['reader_feedback_submitted'] = false;
        
        echo json_encode(["status" => "success", "message" => "Akses dicatat."]);
        exit;
    }
}

echo json_encode(["status" => "error", "message" => "Request tidak valid."]);
