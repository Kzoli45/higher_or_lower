<?php

$is_invalid = false;
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mysqli = require __DIR__ . "/db.php";
    $sql = sprintf(
        "SELECT * FROM user
            WHERE email = '%s'",
        $mysqli->real_escape_string($_POST["email"])
    );

    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();

    if ($user) {

        if (password_verify($_POST["password"], $user["hashed_pass"])) {
            session_start();

            session_regenerate_id();

            $_SESSION["user_id"] = $user["id"];
            header("Location: index.php");
            exit;
        }
    }
    $is_invalid = true;
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="login.css">
</head>

<body>
    <div class="box">
        <h1>Log in</h1>

        <?php if ($is_invalid) : ?>
            <div class="message"><em>Password or Email is incorrect!</em></div>
        <?php endif; ?>

        <form method="post">
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </div>

            <button>Log in</button>
        </form>
    </div>
</body>

</html>