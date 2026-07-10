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
    $status = isset($input['status']) ? trim($input['status']) : '';
    $instansi = isset($input['instansi']) ? trim($input['instansi']) : '';
    $alasan = isset($input['alasan']) ? trim($input['alasan']) : '';
    $type = isset($input['type']) ? trim($input['type']) : 'offline';

    if (strlen($nama) >= 3 && strlen($status) > 0 && strlen($alasan) >= 15) {
        $file = 'pembaca.json';
        $data = [];
        
        if (file_exists($file)) {
            $data = json_decode(file_get_contents($file), true) ?: [];
        }
        
        $id = uniqid('reader_', true);
        
        $new_entry = [
            'id' => $id,
            'nama' => htmlspecialchars($nama),
            'status' => htmlspecialchars($status),
            'instansi' => htmlspecialchars($instansi),
            'alasan' => htmlspecialchars($alasan),
            'type' => htmlspecialchars($type),
            'timestamp' => date('Y-m-d H:i:s'),
            'feedback_rating' => null,
            'feedback_text' => null,
            'feedback_timestamp' => null
        ];
        
        $data[] = $new_entry;
        
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
        
        // Simpan ke session untuk otentikasi baca dokumen
        $_SESSION['reader_authenticated'] = true;
        $_SESSION['reader_name'] = $nama;
        $_SESSION['reader_id'] = $id;
        $_SESSION['reader_feedback_submitted'] = false;
        
        echo json_encode([
            "status" => "success", 
            "message" => "Pengajuan berhasil dicatat.",
            "reader_id" => $id
        ]);
        exit;
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Validasi gagal. Pastikan nama minimal 3 karakter, status terisi, dan alasan minimal 15 karakter."
        ]);
        exit;
    }
}

echo json_encode(["status" => "error", "message" => "Request tidak valid."]);
