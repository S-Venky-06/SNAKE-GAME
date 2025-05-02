/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = window.innerWidth < 600 ? 30 : 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 8 + 4;
                const posX = -100;
                const posY = Math.random() * 100;
                const duration = Math.random() * 15 + 10;
                const delay = Math.random() * 15;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}%`;
                particle.style.setProperty('--randomY', Math.random() * 100 - 50);
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Button click handlers
        document.getElementById('new-game').addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                // Redirect to game page or start game
                alert("Starting New Game");
                window.location.href = 'game.jsp';
                
            }, 300);
        });
        
        document.getElementById('score-history').addEventListener('click', function() {
            alert("Opening Score History");
            console.log('Opening score history...');
            
            window.location.href = 'scoreHistory.jsp';
        });
        

        
        document.getElementById('exit').addEventListener('click', function() {
            const confirmation = confirm('Are you sure you want to exit the game?');
            if (confirmation) {
                
                console.log('Exiting game...');
                window.close();
                
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const buttons = document.querySelectorAll('.button');
            let currentIndex = Array.from(buttons).findIndex(btn => btn === document.activeElement);
            
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                    buttons[currentIndex].focus();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) % buttons.length;
                    buttons[currentIndex].focus();
                    break;
                case 'Enter':
                    if (document.activeElement.classList.contains('button')) {
                        document.activeElement.click();
                    }
                    break;
            }
        });
        
        // Initialize on load
        window.addEventListener('load', () => {
            createParticles();
            
            // Add ripple effect to buttons
            const buttons = document.querySelectorAll('.button');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;
                    
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 1000);
                });
            });
        });
