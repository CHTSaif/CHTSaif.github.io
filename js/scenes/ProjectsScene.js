class ProjectsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ProjectsScene' });
    }

    create() {
        // Background - tech themed with animated gradient
        this.createAnimatedBackground();
        
        // Add a grid effect
        this.createGridEffect();
        
        // Title with animated glow
        this.titleText = this.add.text(
            this.cameras.main.width / 2,
            80,
            'Projects & Internship: "For Her" App',
            { 
                font: 'bold 48px Arial',
                fill: '#ffffff',
                stroke: '#7e57c2',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        // Add a glow animation to the title
        this.tweens.add({
            targets: this.titleText,
            strokeThickness: 6,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Navigation buttons at the top with improved appearance
        this.createImprovedNavigation();
        
        // Create project display with animation
        this.createForHerProject();
        
        // Next scene button with hover animation
        this.createNextButton();
        
        // Create floating particles for dynamic effect
        this.createEnhancedParticleEffect();
        
        // Add interactive easter egg
        this.createEasterEgg();
        
        // Add subtle mouse trail effect
        this.createMouseTrail();
    }
    
    createNextButton() {
        // Create button background with glow effect
        const buttonBg = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            250,
            45,
            0x7e57c2,
            1
        ).setOrigin(0.5);
        
        // Add outer glow
        const glow = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            254,
            49,
            0xb39ddb,
            0.5
        ).setOrigin(0.5);
        
        // Animate the glow
        this.tweens.add({
            targets: glow,
            alpha: 0.2,
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
        
        // Create the button text
        this.nextButtonText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            'Next: SAP Cloud ALM',
            { 
                font: 'bold 22px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Button hover effects
        this.nextButtonText.on('pointerover', () => {
            buttonBg.fillColor = 0x5e35b1;
            this.nextButtonText.setScale(1.05);
        });
        
        this.nextButtonText.on('pointerout', () => {
            buttonBg.fillColor = 0x7e57c2;
            this.nextButtonText.setScale(1);
        });
        
        this.nextButtonText.on('pointerdown', () => {
            // Flash effect before transition
            this.cameras.main.flash(500, 255, 255, 255, 0.3);
            
            console.log('ProjectsScene: Next button clicked - transitioning to SAPProjectScene');
            
            // Delay scene transition for flash effect to complete
            this.time.delayedCall(300, () => {
                // Navigate to SAP Project Scene
                this.scene.start('SAPProjectScene');
                console.log('ProjectsScene: Started SAPProjectScene');
            });
        });
    }
    
    createForHerProject() {
        // Project display panel with subtle animation
        const panel = this.add.rectangle(
            this.cameras.main.width / 2,
            320,
            900,
            400,
            0x3a1078,
            0.8
        ).setOrigin(0.5);
        
        // Add subtle pulsing animation to panel
        this.tweens.add({
            targets: panel,
            fillAlpha: 0.7,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Project title with typing effect
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            160,
            '',
            { 
                font: 'bold 36px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Simulate typing effect
        const title = '"For Her" Mobile App';
        let index = 0;
        
        this.time.addEvent({
            delay: 100,
            callback: () => {
                if (index < title.length) {
                    titleText.text += title.charAt(index);
                    index++;
                }
            },
            repeat: title.length - 1
        });
        
        // Project description panel
        const descPanel = this.add.rectangle(
            this.cameras.main.width / 2,
            320,
            850,
            300,
            0x4a1a9e,
            0.6
        ).setOrigin(0.5);
        
        // Project description
        const descText = this.add.text(
            this.cameras.main.width / 2 - 400,
            220,
            "During my internship at Make IT Happen, I contributed to the development\nof the 'For Her' mobile application, which focuses on user safety.\n\nThis innovative app allowed users to trigger safety notifications by using\na predefined safe word. When activated, the app would automatically send\nreal-time location updates to designated emergency contacts.\n\nThe project was developed with a focus on reliability and user privacy,\nensuring that the safety mechanisms would function even in stressful situations.",
            { 
                font: '20px Arial',
                fill: '#ffffff',
                align: 'left'
            }
        );
        
        // Add highlight effect to key phrases
        const highlightWords = ["safety", "safe word", "real-time location", "emergency contacts", "privacy"];
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const currentText = descText.text;
                highlightWords.forEach(word => {
                    // Temporarily highlight a random keyword
                    const randomWord = highlightWords[Math.floor(Math.random() * highlightWords.length)];
                    const highlightedText = currentText.replace(
                        new RegExp(randomWord, "g"), 
                        `[${randomWord}]`
                    );
                    
                    descText.setText(highlightedText);
                    
                    // Reset after a short delay
                    this.time.delayedCall(500, () => {
                        descText.setText(currentText);
                    });
                });
            },
            repeat: 5
        });
        
        // Project information
        const infoText = this.add.text(
            this.cameras.main.width / 2 - 400,
            400,
            "Timeline: February 2021 - May 2021\nRole: Developer Intern\nCompany: Make IT Happen",
            { 
                font: 'bold 18px Arial',
                fill: '#b39ddb'
            }
        );
        
        // Visual representation of the app with improved visuals
        const phoneOutline = this.add.rectangle(
            this.cameras.main.width / 2 + 200,
            320,
            160,
            280,
            0xd1c4e9,
            0.8
        ).setOrigin(0.5);
        
        // Add the phone's home button
        const homeButton = this.add.circle(
            this.cameras.main.width / 2 + 200,
            440,
            10,
            0xffffff,
            0.8
        ).setOrigin(0.5);
        
        const phoneScreen = this.add.rectangle(
            this.cameras.main.width / 2 + 200,
            320,
            150,
            270,
            0x000000,
            1
        ).setOrigin(0.5);
        
        // Add app header bar
        const appHeader = this.add.rectangle(
            this.cameras.main.width / 2 + 200,
            210,
            150,
            30,
            0xe040fb,
            1
        ).setOrigin(0.5);
        
        const appTitle = this.add.text(
            this.cameras.main.width / 2 + 200,
            210,
            'For Her',
            { 
                font: 'bold 14px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Location icon with improved animation
        const locationIcon = this.add.circle(
            this.cameras.main.width / 2 + 200,
            280,
            30,
            0xe040fb,
            0.8
        ).setOrigin(0.5);
        
        // Inner location pin
        const locationPin = this.add.triangle(
            this.cameras.main.width / 2 + 200,
            280,
            0, -15,
            12, 10,
            -12, 10,
            0xffffff
        ).setOrigin(0.5);
        
        // Location pulses - multiple layers for better effect
        for (let i = 1; i <= 3; i++) {
            const pulse = this.add.circle(
                this.cameras.main.width / 2 + 200,
                280,
                30,
                0xe040fb,
                0.8 / i
            ).setOrigin(0.5);
            
            this.tweens.add({
                targets: pulse,
                scale: 2,
                alpha: 0,
                duration: 1500,
                repeat: -1,
                delay: 300 * i,
                ease: 'Sine.easeOut'
            });
        }
        
        // Help button
        const helpButton = this.add.rectangle(
            this.cameras.main.width / 2 + 200,
            370,
            100,
            40,
            0xf50057,
            1
        ).setOrigin(0.5);
        
        const helpText = this.add.text(
            this.cameras.main.width / 2 + 200,
            370,
            'HELP',
            { 
                font: 'bold 18px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Make help button interactive with pressed effect
        const helpGroup = this.add.container(0, 0, [helpButton, helpText]);
        helpGroup.setInteractive(
            new Phaser.Geom.Rectangle(
                this.cameras.main.width / 2 + 200 - 50,
                370 - 20,
                100,
                40
            ),
            Phaser.Geom.Rectangle.Contains
        );
        
        helpGroup.on('pointerdown', () => {
            helpButton.fillColor = 0xc5004a;
            helpGroup.y = 2;
        });
        
        helpGroup.on('pointerup', () => {
            helpButton.fillColor = 0xf50057;
            helpGroup.y = 0;
            this.createMockNotification();
        });
        
        // Make help button pulse to simulate emergency
        this.tweens.add({
            targets: helpGroup,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createAnimatedBackground() {
        // Create a dynamic background with gradient
        const background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x2a0e61).setOrigin(0, 0);
        
        // Add a secondary layer for the animated gradient effect
        const gradientOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x4a1a9e, 0.2).setOrigin(0, 0);
        
        // Animate the gradient overlay
        this.tweens.add({
            targets: gradientOverlay,
            alpha: { from: 0.1, to: 0.3 },
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createGridEffect() {
        const gridContainer = this.add.container(0, 0);
        
        // Create vertical lines with staggered animation
        for (let i = 0; i < this.cameras.main.width; i += 30) {
            const line = this.add.line(0, 0, i, 0, i, this.cameras.main.height, 0x7e57c2, 0.1).setOrigin(0, 0);
            gridContainer.add(line);
            
            // Animate line opacity
            this.tweens.add({
                targets: line,
                alpha: 0.2,
                duration: 2000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: i * 5
            });
        }
        
        // Create horizontal lines with staggered animation
        for (let i = 0; i < this.cameras.main.height; i += 30) {
            const line = this.add.line(0, 0, 0, i, this.cameras.main.width, i, 0x7e57c2, 0.1).setOrigin(0, 0);
            gridContainer.add(line);
            
            // Animate line opacity
            this.tweens.add({
                targets: line,
                alpha: 0.2,
                duration: 2000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: i * 5
            });
        }
    }
    
    createImprovedNavigation() {
        const navItems = [
            { label: 'Menu', scene: 'MenuScene', x: 100 },
            { label: 'Skills', scene: 'SkillsScene', x: 250 },
            { label: 'Experience', scene: 'ExperienceScene', x: 400 },
            { label: 'Contact', scene: 'ContactScene', x: 550 }
        ];
        
        navItems.forEach(item => {
            // Create button background
            const buttonBg = this.add.rectangle(item.x, 30, 120, 35, 0x7e57c2, 0.4).setOrigin(0.5);
            
            // Create button text
            const button = this.createNavButton(item.x, 30, item.label, item.scene);
            
            // Link button and background for hover effects
            button.on('pointerover', () => {
                button.setStyle({ fill: '#ffffff' });
                buttonBg.fillColor = 0x5e35b1;
                buttonBg.fillAlpha = 0.8;
            });
            
            button.on('pointerout', () => {
                button.setStyle({ fill: '#ffffff' });
                buttonBg.fillColor = 0x7e57c2;
                buttonBg.fillAlpha = 0.4;
            });
        });
    }
    
    createEnhancedParticleEffect() {
        // Create multiple types of particles
        for (let i = 0; i < 20; i++) {
            // Random color from purple palette
            const colors = [0x7e57c2, 0x5e35b1, 0xb39ddb, 0x4a1a9e];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random particle shape (circle or rectangle)
            let particle;
            if (Math.random() > 0.5) {
                particle = this.add.circle(
                    Math.random() * this.cameras.main.width,
                    Math.random() * 10,
                    Math.random() * 3 + 1,
                    color,
                    0.7
                );
            } else {
                particle = this.add.rectangle(
                    Math.random() * this.cameras.main.width,
                    Math.random() * 10,
                    Math.random() * 4 + 2,
                    Math.random() * 4 + 2,
                    color,
                    0.7
                );
            }
            
            // Randomize particle movement pattern
            const duration = 5000 + (Math.random() * 7000);
            const zigzag = Math.random() > 0.7;
            
            if (zigzag) {
                // Zigzag movement
                this.tweens.add({
                    targets: particle,
                    y: this.cameras.main.height + 10,
                    x: {
                        value: {
                            getEnd: () => particle.x + (Math.random() * 200 - 100)
                        },
                        duration: 1000,
                        yoyo: true,
                        repeat: 10
                    },
                    alpha: 0,
                    duration: duration,
                    delay: i * 400,
                    repeat: -1,
                    onRepeat: () => {
                        particle.y = Math.random() * 10;
                        particle.x = Math.random() * this.cameras.main.width;
                        particle.alpha = 0.7;
                    }
                });
            } else {
                // Straight movement
                this.tweens.add({
                    targets: particle,
                    y: this.cameras.main.height + 10,
                    alpha: 0,
                    duration: duration,
                    delay: i * 400,
                    repeat: -1,
                    onRepeat: () => {
                        particle.y = Math.random() * 10;
                        particle.x = Math.random() * this.cameras.main.width;
                        particle.alpha = 0.7;
                    }
                });
            }
        }
    }
    
    createEasterEgg() {
        // Create a hidden clickable element
        const easterEgg = this.add.circle(
            this.cameras.main.width - 20,
            20,
            10,
            0x7e57c2,
            0.3
        ).setInteractive({ useHandCursor: true });
        
        // Make it pulse subtly to hint at its interactivity
        this.tweens.add({
            targets: easterEgg,
            alpha: 0.1,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        
        // Add click effect
        let clickCount = 0;
        easterEgg.on('pointerdown', () => {
            clickCount++;
            if (clickCount >= 3) {
                // Create spectacular effect on third click
                this.createFireworks();
                clickCount = 0;
            } else {
                // Feedback for clicks
                this.cameras.main.flash(100, 120, 70, 200, 0.2);
            }
        });
    }
    
    createFireworks() {
        // Create firework effect when easter egg is triggered
        for (let i = 0; i < 30; i++) {
            const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const particle = this.add.circle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                3,
                color,
                1
            );
            
            // Explode particles outward
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            
            this.tweens.add({
                targets: particle,
                x: this.cameras.main.width / 2 + Math.cos(angle) * distance,
                y: this.cameras.main.height / 2 + Math.sin(angle) * distance,
                alpha: 0,
                duration: 1000 + Math.random() * 1000,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
    
    createMouseTrail() {
        // Create a trail effect that follows mouse/pointer
        const trail = [];
        const trailLength = 5;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = this.add.circle(0, 0, 3 - (i * 0.5), 0xb39ddb, 0.7 - (i * 0.1));
            dot.visible = false;
            trail.push(dot);
        }
        
        this.input.on('pointermove', (pointer) => {
            // Update the position of the first dot
            if (trail.length > 0 && trail[0]) {
                trail[0].visible = true;
                trail[0].x = pointer.x;
                trail[0].y = pointer.y;
            }
            
            // Update the rest of the trail
            for (let i = trail.length - 1; i > 0; i--) {
                if (trail[i] && trail[i-1]) {
                    trail[i].visible = true;
                    trail[i].x = trail[i-1].x;
                    trail[i].y = trail[i-1].y;
                }
            }
        });
    }
    
    createMockNotification() {
        // Create a simulated notification when the help button is pressed
        const notification = this.add.container(
            this.cameras.main.width / 2 + 300,
            280
        );
        
        // Notification background
        const notifBg = this.add.rectangle(0, 0, 180, 70, 0x333333, 0.9);
        notification.add(notifBg);
        
        // Notification title
        const notifTitle = this.add.text(
            -80, 
            -25, 
            "Emergency Alert Sent", 
            { 
                font: 'bold 12px Arial',
                fill: '#ffffff' 
            }
        );
        notification.add(notifTitle);
        
        // Notification content
        const notifContent = this.add.text(
            -80, 
            0, 
            "Location shared with\nemergency contacts", 
            { 
                font: '10px Arial',
                fill: '#bbbbbb' 
            }
        );
        notification.add(notifContent);
        
        // Animation for notification appearance
        notification.alpha = 0;
        notification.x += 50;
        
        this.tweens.add({
            targets: notification,
            x: this.cameras.main.width / 2 + 300,
            alpha: 1,
            duration: 300,
            ease: 'Back.easeOut',
            onComplete: () => {
                // Disappear after a delay
                this.time.delayedCall(3000, () => {
                    this.tweens.add({
                        targets: notification,
                        alpha: 0,
                        x: this.cameras.main.width / 2 + 350,
                        duration: 300,
                        onComplete: () => {
                            notification.destroy();
                        }
                    });
                });
            }
        });
    }
    
    createNavButton(x, y, label, targetScene) {
        // Create a button with text
        const button = this.add.text(
            x,
            y,
            label,
            { 
                font: '20px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Add scene transition on click
        button.on('pointerdown', () => {
            this.scene.start(targetScene);
            // Add transition effect
            this.cameras.main.fade(500, 0, 0, 0);
        });
        
        return button;
    }
} 