class ContactScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ContactScene' });
    }

    create() {
        // Background
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x05192d).setOrigin(0, 0);
        
        // Add floating particles
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.cameras.main.width;
            const y = Math.random() * this.cameras.main.height;
            const size = Math.random() * 3;
            
            const particle = this.add.circle(x, y, size, 0x64ffda, 0.4);
            
            // Animate
            this.tweens.add({
                targets: particle,
                y: particle.y - 200,
                alpha: 0,
                duration: 10000 + Math.random() * 5000,
                repeat: -1,
                repeatDelay: Math.random() * 1000,
                ease: 'Linear'
            });
        }
        
        // Title
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            100,
            'Contact Me',
            { 
                font: 'bold 64px Arial',
                fill: '#ffffff',
                stroke: '#64ffda',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        // Create contact card
        this.createContactCard();
        
        // Navigation buttons
        this.createNavButton(150, 30, 'Menu', 'MenuScene');
        this.createNavButton(300, 30, 'Skills', 'SkillsScene');
        this.createNavButton(450, 30, 'Experience', 'ExperienceScene');
        this.createNavButton(625, 30, 'Projects', 'ProjectsScene');
        
        // Game completion message
        const completionText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 70,
            'Congratulations! You have explored my entire interactive resume.',
            { 
                font: 'bold 22px Arial',
                fill: '#64ffda'
            }
        ).setOrigin(0.5);
        
        // Replay button
        const replayButton = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 30,
            'Restart Journey',
            { 
                font: '20px Arial',
                fill: '#ffffff',
                backgroundColor: '#64ffda',
                padding: {
                    left: 15,
                    right: 15,
                    top: 8,
                    bottom: 8
                },
                color: '#05192d'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        replayButton.on('pointerover', () => {
            replayButton.setStyle({ backgroundColor: '#4ecdc4' });
        });
        
        replayButton.on('pointerout', () => {
            replayButton.setStyle({ backgroundColor: '#64ffda' });
        });
        
        replayButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
    
    createContactCard() {
        // Main container for the business card
        const cardWidth = 600;
        const cardHeight = 350;
        
        // Card background
        const card = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            cardWidth,
            cardHeight,
            0x112240,
            0.9
        ).setOrigin(0.5).setStrokeStyle(2, 0x64ffda);
        
        // Name
        const nameText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 120,
            'Saif Chtourou',
            { 
                font: 'bold 40px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Title
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 80,
            'Java | Spring Boot | SAP CAP | Azure Developer',
            { 
                font: '20px Arial',
                fill: '#8892b0'
            }
        ).setOrigin(0.5);
        
        // Divider
        const divider = this.add.line(
            this.cameras.main.width / 2 - cardWidth/2 + 40,
            this.cameras.main.height / 2 - 40,
            0,
            0,
            cardWidth - 80,
            0,
            0x64ffda
        );
        
        // Contact details
        const contactDetails = [
            { icon: '📱', text: '+216 52 167 839', y: 0 },
            { icon: '✉️', text: 'saif.chtourou@esprit.tn', y: 40 },
            { icon: '📍', text: 'Ben Arous, Mourouj 5', y: 80 }
        ];
        
        contactDetails.forEach(detail => {
            // Icon
            const icon = this.add.text(
                this.cameras.main.width / 2 - 220,
                this.cameras.main.height / 2 - 20 + detail.y,
                detail.icon,
                { 
                    font: '24px Arial'
                }
            ).setOrigin(0, 0.5);
            
            // Contact text
            const text = this.add.text(
                this.cameras.main.width / 2 - 180,
                this.cameras.main.height / 2 - 20 + detail.y,
                detail.text,
                { 
                    font: '22px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0, 0.5);
            
            // Make contact details interactive with glow effect
            text.setInteractive({ useHandCursor: true });
            
            text.on('pointerover', () => {
                text.setStyle({ fill: '#64ffda' });
            });
            
            text.on('pointerout', () => {
                text.setStyle({ fill: '#ffffff' });
            });
        });
        
        // "Boss level" challenge - a small puzzle
        const puzzleButton = this.add.text(
            this.cameras.main.width / 2 + 150,
            this.cameras.main.height / 2 + 90,
            'Try the Challenge!',
            { 
                font: 'bold 18px Arial',
                fill: '#ffffff',
                backgroundColor: '#f50057',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        puzzleButton.on('pointerover', () => {
            puzzleButton.setStyle({ backgroundColor: '#d81b60' });
        });
        
        puzzleButton.on('pointerout', () => {
            puzzleButton.setStyle({ backgroundColor: '#f50057' });
        });
        
        // Boss level popup
        puzzleButton.on('pointerdown', () => {
            this.showBossLevel();
        });
    }
    
    showBossLevel() {
        // Create a semi-transparent overlay
        const overlay = this.add.rectangle(
            0,
            0,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.8
        ).setOrigin(0, 0).setInteractive();
        
        // Challenge panel
        const panel = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            700,
            450,
            0x112240,
            1
        ).setOrigin(0.5).setStrokeStyle(2, 0x64ffda);
        
        // Challenge title
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 180,
            'Boss Level: Technology Quiz',
            { 
                font: 'bold 32px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Question
        const questionText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 120,
            'Which technology is used for messaging and data streaming\nthat I integrated at SAP Labs France?',
            { 
                font: '22px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
        
        // Options
        const options = [
            { text: 'RabbitMQ', correct: false, x: -150, y: -40 },
            { text: 'Kafka', correct: true, x: 150, y: -40 },
            { text: 'ActiveMQ', correct: false, x: -150, y: 40 },
            { text: 'ZeroMQ', correct: false, x: 150, y: 40 }
        ];
        
        const optionButtons = [];
        
        options.forEach(option => {
            const button = this.add.text(
                this.cameras.main.width / 2 + option.x,
                this.cameras.main.height / 2 + option.y,
                option.text,
                { 
                    font: 'bold 20px Arial',
                    fill: '#ffffff',
                    backgroundColor: '#3a506b',
                    padding: {
                        left: 20,
                        right: 20,
                        top: 10,
                        bottom: 10
                    }
                }
            ).setOrigin(0.5).setInteractive({ useHandCursor: true });
            
            // Hover effect
            button.on('pointerover', () => {
                button.setStyle({ backgroundColor: '#1a2a3a' });
            });
            
            button.on('pointerout', () => {
                button.setStyle({ backgroundColor: '#3a506b' });
            });
            
            // Click handler
            button.on('pointerdown', () => {
                this.handleQuizAnswer(option.correct, overlay, panel, optionButtons);
            });
            
            optionButtons.push(button);
        });
        
        // Close button
        const closeButton = this.add.text(
            this.cameras.main.width / 2 + 320,
            this.cameras.main.height / 2 - 200,
            'X',
            { 
                font: 'bold 24px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        closeButton.on('pointerover', () => {
            closeButton.setStyle({ fill: '#64ffda' });
        });
        
        closeButton.on('pointerout', () => {
            closeButton.setStyle({ fill: '#ffffff' });
        });
        
        closeButton.on('pointerdown', () => {
            overlay.destroy();
            panel.destroy();
            titleText.destroy();
            questionText.destroy();
            closeButton.destroy();
            optionButtons.forEach(button => button.destroy());
        });
    }
    
    handleQuizAnswer(correct, overlay, panel, buttons) {
        // Create result message
        const resultText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 120,
            correct ? 'Correct! You really know your technologies!' : 'Incorrect. Try again!',
            { 
                font: 'bold 24px Arial',
                fill: correct ? '#64ffda' : '#f50057'
            }
        ).setOrigin(0.5);
        
        // If correct, show a special reward
        if (correct) {
            buttons.forEach(button => button.disableInteractive());
            
            // Display a special summary message
            const summaryText = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 + 170,
                'Thanks for exploring my interactive resume!\nI hope you enjoyed the journey through my career.',
                { 
                    font: '20px Arial',
                    fill: '#ffffff',
                    align: 'center'
                }
            ).setOrigin(0.5);
            
            // Create celebration effect - either with particles or basic animation
            if (this.textures.exists('skill-icon')) {
                const emitter = this.add.particles('skill-icon').createEmitter({
                    x: this.cameras.main.width / 2,
                    y: this.cameras.main.height / 2,
                    speed: { min: -800, max: 800 },
                    angle: { min: 0, max: 360 },
                    scale: { start: 0.05, end: 0 },
                    blendMode: 'ADD',
                    active: true,
                    lifespan: 2000,
                    quantity: 20
                });
                
                // Stop the emitter after a short time
                this.time.delayedCall(2000, () => {
                    emitter.stop();
                });
            } else {
                // Alternative celebration effect with circles
                this.createCelebrationEffect();
            }
        }
    }
    
    createCelebrationEffect() {
        // Create bursts of circles as a celebration effect
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 100 + Math.random() * 300;
            const distance = 50 + Math.random() * 150;
            
            const particle = this.add.circle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                3 + Math.random() * 5,
                Phaser.Display.Color.HSVToRGB(Math.random(), 1, 1).color,
                0.8
            );
            
            // Calculate end position
            const targetX = particle.x + Math.cos(angle) * distance;
            const targetY = particle.y + Math.sin(angle) * distance;
            
            // Animate the particle
            this.tweens.add({
                targets: particle,
                x: targetX,
                y: targetY,
                alpha: 0,
                scale: 0.1,
                duration: 1500,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
    
    createNavButton(x, y, label, targetScene) {
        const button = this.add.text(
            x,
            y,
            label,
            { 
                font: '20px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Button hover and click effects
        button.on('pointerover', () => {
            button.setStyle({ fill: '#64ffda' });
        });
        
        button.on('pointerout', () => {
            button.setStyle({ fill: '#ffffff' });
        });
        
        button.on('pointerdown', () => {
            this.scene.start(targetScene);
        });
        
        return button;
    }
} 