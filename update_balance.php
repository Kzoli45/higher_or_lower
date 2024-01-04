<?php

session_start();

if (isset($_SESSION["user_id"])) {
    $mysqli = require __DIR__ . "/db.php";

    $newBalance = json_decode(file_get_contents('php://input'), true)['newBalance'];
    $userId = $_SESSION["user_id"];

    $updateSql = "UPDATE user SET balance = $newBalance WHERE id = $userId";
    $mysqli->query($updateSql);

    echo json_encode(['success' => true, 'newBalance' => $newBalance]);
    exit;
}

echo json_encode(['error' => 'User not logged in']);
exit;
