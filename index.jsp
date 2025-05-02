
<!--
Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Html.html to edit this template
-->

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game | Start Menu</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="main_style.css">
</head>
<body>
    <div class="particles" id="particles"></div>
    
    <div class="container">
        <div class="title-container">
            <div class="snake-icon">ð</div>
            <h1 class="title">Snake Game</h1>
            <p class="subtitle">The classic game with modern twist</p>
        </div>
        
        <div class="menu">
            <button class="button new-game" id="new-game">
                <i class="fas fa-play"></i> New Game
            </button>
            <button class="button" id="score-history">
                <i class="fas fa-trophy"></i> Score History
            </button>
            
            <button class="button" id="exit">
                <i class="fas fa-sign-out-alt"></i> Exit
            </button>
        </div>
        
        <div class="credits">
            <p>Use arrow keys or WASD to control the snake</p>
            <p>Eat food to grow and avoid collisions</p>
            <p>© Made By vs</p>
        </div>
    </div>
    
    <script src="main.js"></script>
</body>
</html>