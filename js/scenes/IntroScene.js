class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
    }

    create() {
        // Background - a modern corporate environment
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x121e3d).setOrigin(0, 0);
        
        // Background elements - futuristic lines
        for (let i = 0; i < 10; i++) {
            const y = i * 80;
            const line = this.add.rectangle(0, y, this.cameras.main.width, 2, 0x4a6fa5, 0.3).setOrigin(0, 0);
            
            // Animate lines
            this.tweens.add({
                targets: line,
                x: 100,
                duration: 3000 + (i * 500),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        // Title
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            80,
            'Welcome to My Journey',
            { 
                font: 'bold 48px Arial',
                fill: '#ffffff',
                stroke: '#4a6fa5',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        // Character (placeholder)
        const character = this.add.rectangle(
            200,
            this.cameras.main.height - 150,
            80,
            120,
            0x4a6fa5
        ).setOrigin(0.5);
        
        // Create dialogue box
        const dialogBox = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height - 150,
            800,
            200,
            0x000000,
            0.8
        ).setOrigin(0.5);
        
        // Name text
        const nameText = this.add.text(
            dialogBox.x - 380,
            dialogBox.y - 80,
            'Saif Chtourou',
            { 
                font: 'bold 24px Arial',
                fill: '#4a6fa5' 
            }
        );
        
        // Dialogue text
        const dialogText = this.add.text(
            dialogBox.x - 380,
            dialogBox.y - 40,
            "Hello! I'm Saif Chtourou, a Java Developer specializing in Spring Boot and Azure.\n\nI'm currently working at SAP Labs France, where I develop robust applications using\nSpring Boot on the Azure Cloud Platform. My expertise includes implementing\nresilience tests, integrating Kafka for data flow, and setting up monitoring systems.",
            { 
                font: '20px Arial',
                fill: '#ffffff',
                wordWrap: { width: 760 }
            }
        );
        
        // Next button
        const nextButton = this.add.text(
            dialogBox.x + 350,
            dialogBox.y + 80,
            'Next',
            { 
                font: 'bold 24px Arial',
                fill: '#ffffff',
                backgroundColor: '#4a6fa5',
                padding: {
                    left: 15,
                    right: 15,
                    top: 8,
                    bottom: 8
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Button hover effect
        nextButton.on('pointerover', () => {
            nextButton.setStyle({ backgroundColor: '#3a5a8a' });
        });
        
        nextButton.on('pointerout', () => {
            nextButton.setStyle({ backgroundColor: '#4a6fa5' });
        });
        
        // Button click
        nextButton.on('pointerdown', () => {
            this.scene.start('SkillsScene');
        });
        
        // Header info bar
        const headerBar = this.add.rectangle(
            this.cameras.main.width / 2,
            30,
            this.cameras.main.width,
            60,
            0x000000,
            0.6
        ).setOrigin(0.5, 0.5);
        
        // Navigation buttons
        this.createNavButton(150, 30, 'Menu', 'MenuScene');
        this.createNavButton(300, 30, 'Skills', 'SkillsScene');
        this.createNavButton(450, 30, 'Experience', 'ExperienceScene');
        this.createNavButton(625, 30, 'Projects', 'ProjectsScene');
        this.createNavButton(775, 30, 'Contact', 'ContactScene');
        
        // Animate character
        this.tweens.add({
            targets: character,
            y: character.y - 20,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
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
            button.setStyle({ fill: '#4a6fa5' });
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