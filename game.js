const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score-display');
        const gameOverDiv = document.getElementById('game-over');
        const finalScoreDisplay = document.getElementById('final-score');
        const restartBtn = document.getElementById('restart-btn');
        const menuBtn = document.getElementById('menu-btn');
        
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        
        let snake = [];
        let food = {};
        let score = 0;
        let xVelocity = 0;
        let yVelocity = 0;
        let gameRunning = true;
        let gameSpeed = 100; // Speed in milliseconds
        let lastRenderTime = 0;
        
        // Initialize game
        function initGame() {
            // Reset snake
            snake = [
                {x: 10, y: 10}
            ];
            
            // Place first food
            placeFood();
            
            // Reset score
            score = 0;
            updateScore(); // New function to update score display
            
            // Reset velocity
            xVelocity = 0;
            yVelocity = 0;
            
            // Reset game speed
            gameSpeed = 100;
            
            // Hide game over screen
            gameOverDiv.style.display = 'none';
            
            // Start game loop
            gameRunning = true;
            requestAnimationFrame(gameLoop);
        }
        
        // Update score display - fix for score not showing
        function updateScore() {
            scoreDisplay.textContent = `Score: ${score}`;
            scoreDisplay.style.display = 'block'; // Ensure it's visible
        }
        
        // Place food at random position
        function placeFood() {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
            
            // Make sure food doesn't spawn on snake
            for (let segment of snake) {
                if (segment.x === food.x && segment.y === food.y) {
                    placeFood();
                    return;
                }
            }
        }
        
        // Game loop with requestAnimationFrame for smoother animation
        function gameLoop(currentTime) {
            if (!gameRunning) return;
            
            requestAnimationFrame(gameLoop);
            
            // Control game speed
            if (currentTime - lastRenderTime < gameSpeed) {
                return;
            }
            lastRenderTime = currentTime;
            
            // Clear canvas
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid lines for better visibility
            drawGrid();
            
            // Move snake
            const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
            snake.unshift(head);
            
            // Check if snake ate food
            if (head.x === food.x && head.y === food.y) {
                score++;
                updateScore(); // Update score display
                
                // Increase speed slightly with each food
                if (gameSpeed > 50) {
                    gameSpeed *= 0.98;
                }
                
                placeFood();
                
                // Visual effect for eating
                drawEatingEffect(food.x * gridSize, food.y * gridSize);
            } else {
                snake.pop();
            }
            
            // Check collisions
            if (
                head.x < 0 || head.x >= tileCount ||
                head.y < 0 || head.y >= tileCount ||
                checkSelfCollision()
            ) {
                gameOver();
                return;
            }
            
            // Draw food
            drawFood();
            
            // Draw snake
            drawSnake();
        }
        
        // Draw grid lines
        function drawGrid() {
            ctx.strokeStyle = 'rgba(76, 175, 80, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i <= tileCount; i++) {
                // Vertical lines
                ctx.beginPath();
                ctx.moveTo(i * gridSize, 0);
                ctx.lineTo(i * gridSize, canvas.height);
                ctx.stroke();
                
                // Horizontal lines
                ctx.beginPath();
                ctx.moveTo(0, i * gridSize);
                ctx.lineTo(canvas.width, i * gridSize);
                ctx.stroke();
            }
        }
        
        // Draw food with glow effect
        function drawFood() {
            ctx.fillStyle = '#ff5252';
            ctx.shadowColor = '#ff5252';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(
                food.x * gridSize + gridSize/2, 
                food.y * gridSize + gridSize/2, 
                gridSize/2 - 2, 
                0, 
                Math.PI * 2
            );
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        
        // Visual effect when eating food
        function drawEatingEffect(x, y) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(x + gridSize/2, y + gridSize/2, gridSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw snake with gradient body
        function drawSnake() {
            // Draw body segments
            for (let i = snake.length - 1; i > 0; i--) {
                const segment = snake[i];
                
                // Create gradient for snake body
                const gradient = ctx.createLinearGradient(
                    segment.x * gridSize, 
                    segment.y * gridSize, 
                    segment.x * gridSize + gridSize, 
                    segment.y * gridSize + gridSize
                );
                
                gradient.addColorStop(0, '#2e7d32');
                gradient.addColorStop(1, '#4caf50');
                
                ctx.fillStyle = gradient;
                
                // Round the corners slightly
                ctx.beginPath();
                ctx.roundRect(
                    segment.x * gridSize + 1, 
                    segment.y * gridSize + 1, 
                    gridSize - 2, 
                    gridSize - 2, 
                    3
                );
                ctx.fill();
            }
            
            // Draw snake head with different color
            const head = snake[0];
            ctx.fillStyle = '#4ade80';
            ctx.shadowColor = '#4ade80';
            ctx.shadowBlur = 5;
            
            ctx.beginPath();
            ctx.roundRect(
                head.x * gridSize, 
                head.y * gridSize, 
                gridSize, 
                gridSize, 
                4
            );
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Add eyes to head
            ctx.fillStyle = '#0f172a';
            
            // Position eyes based on direction
            let leftEyeX = head.x * gridSize + gridSize/4;
            let rightEyeX = head.x * gridSize + gridSize*3/4;
            let eyesY = head.y * gridSize + gridSize/3;
            
            // If moving horizontally, eyes on top
            if (xVelocity !== 0) {
                leftEyeX = head.x * gridSize + gridSize/3;
                rightEyeX = head.x * gridSize + gridSize*2/3;
                
                if (xVelocity > 0) { // Moving right
                    eyesY = head.y * gridSize + gridSize/4;
                } else { // Moving left
                    eyesY = head.y * gridSize + gridSize*3/4;
                }
            } 
            // If moving vertically, eyes side by side
            else if (yVelocity !== 0) {
                if (yVelocity > 0) { // Moving down
                    eyesY = head.y * gridSize + gridSize/4;
                } else { // Moving up
                    eyesY = head.y * gridSize + gridSize*3/4;
                }
            }
            
            // Draw the eyes
            ctx.beginPath();
            ctx.arc(leftEyeX, eyesY, 2, 0, Math.PI * 2);
            ctx.arc(rightEyeX, eyesY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Check if snake collided with itself
        function checkSelfCollision() {
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    return true;
                }
            }
            return false;
        }
        
        // Game over
        function gameOver() {
            gameRunning = false;
            finalScoreDisplay.textContent = `Your score: ${score}`;
            gameOverDiv.style.display = 'block';
            
            // Save score to server
            saveScore(score);
        }
        
        // Save score to server
        function saveScore(score) {
    // Prompt the player for their name after the game ends
    const playerName = prompt("Game Over! Your score: " + score + "\n\nEnter your name:", "");
    
    // If the player clicked Cancel or entered an empty name
    if (playerName === null || playerName.trim() === "") {
        console.log("Score not saved - no name provided");
        return;
    }
    
    // Send both the score and player name to the server
    fetch('saveScore.jsp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `score=${score}&playerName=${encodeURIComponent(playerName)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Score saved:', data);
        alert("Score saved successfully!");
    })
    .catch(error => {
        console.error('Error saving score:', error);
        alert("Error saving score. Please try again.");
    });
}
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            // Prevent default behavior for arrow keys to avoid page scrolling
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.key)) {
                e.preventDefault();
            }
            
            // Don't process input if game isn't running
            if (!gameRunning) return;
            
            // Prevent reverse movement
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (yVelocity !== 1) {
                        xVelocity = 0;
                        yVelocity = -1;
                    }
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (yVelocity !== -1) {
                        xVelocity = 0;
                        yVelocity = 1;
                    }
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (xVelocity !== 1) {
                        xVelocity = -1;
                        yVelocity = 0;
                    }
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (xVelocity !== -1) {
                        xVelocity = 1;
                        yVelocity = 0;
                    }
                    break;
            }
        });
        
        // Touch controls for mobile - detect swipes
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, false);
        
        document.addEventListener('touchend', (e) => {
            if (!gameRunning) return;
            
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            
            const xDiff = touchStartX - touchEndX;
            const yDiff = touchStartY - touchEndY;
            
            // Detect which direction had the greater movement
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                // Horizontal swipe
                if (xDiff > 0) {
                    // Swipe left
                    if (xVelocity !== 1) {
                        xVelocity = -1;
                        yVelocity = 0;
                    }
                } else {
                    // Swipe right
                    if (xVelocity !== -1) {
                        xVelocity = 1;
                        yVelocity = 0;
                    }
                }
            } else {
                // Vertical swipe
                if (yDiff > 0) {
                    // Swipe up
                    if (yVelocity !== 1) {
                        xVelocity = 0;
                        yVelocity = -1;
                    }
                } else {
                    // Swipe down
                    if (yVelocity !== -1) {
                        xVelocity = 0;
                        yVelocity = 1;
                    }
                }
            }
        }, false);
        
        // Restart button
        restartBtn.addEventListener('click', initGame);
        
        // Menu button - placeholder function
        menuBtn.addEventListener('click', () => {
            // This would normally navigate to the menu
            // For now, just reload the page
            window.location.href="index.jsp";
        });
        
        // Start the game
        initGame();