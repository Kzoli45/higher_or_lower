<?php

$host = "mysql.caesar.elte.hu";
$db_name = "kzoli45";
$username = "kzoli45";
$password = "xFs47Y4iepfr8zGP";

$mysqli = new mysqli($host, $username, $password, $db_name);

if ($mysqli->connect_errno) {
    die("Error while connecting: " . $mysqli->connect_error);
}

return $mysqli;
