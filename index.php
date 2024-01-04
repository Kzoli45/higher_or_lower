<?php

session_start();

if (isset($_SESSION["user_id"])) {
  $mysqli = require __DIR__ . "/db.php";

  $sql = "SELECT * FROM user
          WHERE id = {$_SESSION["user_id"]}";

  $result = $mysqli->query($sql);
  $user = $result->fetch_assoc();

  if (isset($user['balance'])) {
    $balance = $user['balance'];
  } else {
    $balance = 0;
  }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="homepic.png" />
  <title>Higher or Lower</title>
</head>

<body>
  <div class="whole">
    <button id="card-shop-toggle">Select Style</button>
    <div class="card-shop hidden" id="card-shop">
      <div class="card-design">
        <p>Classic</p>
        <img src="AS.png" alt="design1" />
        <p>Owned</p>
        <button class="buy-design purchased" data-price="0" data-design="0">
          Select
        </button>
      </div>
      <div class="card-design">
        <p>Stargazer</p>
        <img src="AS1.png" alt="design2" />
        <p id="price1">$200</p>
        <button class="buy-design" data-price="200" data-design="1">
          Purchase
        </button>
      </div>
      <div class="card-design">
        <p>Autumn</p>
        <img src="AS2.png" alt="design3" />
        <p id="price2">$600</p>
        <button class="buy-design" data-price="600" data-design="2">
          Purchase
        </button>
      </div>
      <div class="card-design">
        <p>Solar</p>
        <img src="AS3.png" alt="design4" />
        <p id="price3">$1000</p>
        <button class="buy-design" data-price="1000" data-design="3">
          Purchase
        </button>
      </div>
    </div>
    <div class="game-container">
      <h1>
        <span class="first-word">Higher</span> <span>or</span>
        <span class="second-word">Lower</span>
      </h1>
      <div class="game-scene">
        <div class="button-container">
          <button id="higher-button">Higher</button>
        </div>
        <div class="card-container">
          <img id="card-image" src="" alt="Card Image" />
        </div>
        <div class="button-container">
          <button id="lower-button">Lower</button>
        </div>
      </div>
      <div class="game-stats">
        <p id="result-message">guess</p>
        <p id="cards-remaining"></p>
        <p id="current-score" class="wrong-tip"></p>
        <p id="balance">$<?= $balance ?></p>
      </div>
      <button id="restart-button">Restart</button>
      <a href="higher-or-lower-rules.html"><button class="homepage-button">Rules</button></a>
      <a href="https://github.com/Kzoli45/higher_or_lower" target="_blank"><button id="login-button">GitHub</button></a>
      <div class="correct-guesses">
        <p id="correct-guesses"></p>
      </div>

      <div class="loggedin">
        <?php if (isset($user)) : ?>
          <div class="user">
            <p id="username">Logged in as <?= htmlspecialchars($user["name"]) ?></p>
            <a href="logout.php"><button class="logout">Log out</button></a>
          </div>
        <?php else : ?>
          <div class="logging">
            <a href="login.php"><button class="login">Log in</button></a>
            <a href="signup.html"><button class="signup">Sign up</button></a>
          </div>
        <?php endif; ?>

        <style>
          .user {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .user p {
            background-color: darkblue;
            transition: 0.5s;
            color: white;
            padding: 14px;
            margin: auto 5px 0;
            width: 170px;
            max-width: 170px;
            border-radius: 10px;
          }

          .loggedin {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .logging {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          button {
            padding: 10px;
            width: 100px;
            font-size: 18px;
            color: #fff;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .login {
            background-color: darkblue;
          }

          .signup {
            background-color: green;
          }

          .logout {
            background-color: black;
          }
        </style>

      </div>
    </div>
  </div>

  <script src="index.js"></script>
</body>

</html>