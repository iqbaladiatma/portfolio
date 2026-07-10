<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Set timezone to WIB (Asia/Jakarta)
date_default_timezone_set('Asia/Jakarta');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $rating = isset($input['rating']) ? (int)$input['rating'] : 0;
    $feedback = isset($input['feedback']) ? trim($input['feedback']) : '';
    
    // Pastikan reader_id ada di session
    $reader_id = isset($_SESSION['reader_id']) ? $_SESSION['reader_id'] : '';
    
    if (empty($reader_id)) {
        // Sebagai fallback jika session hilang tapi client mengirimkan ID pembaca
        $reader_id = isset($input['reader_id']) ? trim($input['reader_id']) : '';
    }
    
    if (empty($reader_id)) {
        echo json_encode(["status" => "error", "message" => "Sesi Anda tidak valid atau telah berakhir."]);
        exit;
    }
    
    if ($rating >= 1 && $rating <= 5 && strlen($feedback) >= 10) {
        $file = 'pembaca.json';
        $data = [];
        
        if (file_exists($file)) {
            $data = json_decode(file_get_contents($file), true) ?: [];
        }
        
        $updated = false;
        foreach ($data as &$entry) {
            if (isset($entry['id']) && $entry['id'] === $reader_id) {
                $entry['feedback_rating'] = $rating;
                $entry['feedback_text'] = htmlspecialchars($feedback);
                $entry['feedback_timestamp'] = date('Y-m-d H:i:s');
                $updated = true;
                break;
            }
        }
        
        if ($updated) {
            file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
            $_SESSION['reader_feedback_submitted'] = true;
            echo json_encode(["status" => "success", "message" => "Feedback berhasil disimpan."]);
            exit;
        } else {
            echo json_encode(["status" => "error", "message" => "Data pembaca tidak ditemukan."]);
            exit;
        }
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Validasi gagal. Pastikan rating terisi dan ulasan minimal 10 karakter."
        ]);
        exit;
    }
}

echo json_encode(["status" => "error", "message" => "Request tidak valid."]);
