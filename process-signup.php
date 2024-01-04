<?php

if (empty($_POST["name"])) {
    die("Please enter a name!");
}

if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    die("Please type in a valid email adress!");
}

if (strlen($_POST["password"]) < 6) {
    die("Password must be at least 6 characters long!");
}

if (!preg_match("/[a-z]/i", $_POST["password"])) {
    die("Password must include a letter!");
}

if (!preg_match("/[0-9]/i", $_POST["password"])) {
    die("Password must include a number!");
}

if ($_POST["password"] !== $_POST["password-check"]) {
    die("Passwords must match!");
}

$hashed = password_hash($_POST["password"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "/db.php";

$sql = "INSERT INTO user (name, email, hashed_pass)
        VALUES (?, ?, ?)";

$stmt = $mysqli->stmt_init();

if (!$stmt->prepare($sql)) {
    die("SQL error: " . $mysqli->error);
}

$stmt->bind_param(
    "sss",
    $_POST["name"],
    $_POST["email"],
    $hashed
);

if ($stmt->execute()) {
    header("location: success.html");
    exit;
} else {

    if ($mysqli->errno === 1062) {
        die("Email adress is taken!");
    } else {
        die($mysqli->error . " " . $mysqli->errno);
    }
}
