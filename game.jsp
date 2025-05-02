<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="game_style.css">

</head>
<body>
    <div id="game-container">
        <h1 class="game-title">Snake Game</h1>
        <div id="score-display">Score: 0</div>
        <canvas id="game-canvas" width="400" height="400"></canvas>
        <div class="controls-info">
            Use <span class="key">↑</span> <span class="key">↓</span> <span class="key">←</span> <span class="key">→</span> or 
            <span class="key">W</span> <span class="key">S</span> <span class="key">A</span> <span class="key">D</span> to move
        </div>
        <div id="game-over">
            <h2>Game Over!</h2>
            <p id="final-score">Your score: 0</p>
            <button id="restart-btn">Play Again</button>
            <button id="menu-btn">Main Menu</button>
        </div>
    </div>

    <script src="game.js"></script>
</body>
</html>