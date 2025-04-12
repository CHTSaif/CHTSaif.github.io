class SAPProjectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SAPProjectScene' });
    }

    preload() {
        // No need to load audio here anymore, it's handled in PreloadScene
        
        // Load the figurine image if needed for other purpose
        // Commented out since figurine is only used in MenuScene
        // this.load.image('figurine', 'assets/figurine.png');
    }

    create() {
        console.log('SAPProjectScene: create method started');
        
        // Background - tech themed with animated gradient
        this.createAnimatedBackground();
        
        // Add a grid effect
        this.createGridEffect();
        
        // Title with animated glow
        this.titleText = this.add.text(
            this.cameras.main.width / 2,
            80,
            'Projects & Internship: SAP Cloud ALM',
            { 
                font: 'bold 48px Arial',
                fill: '#ffffff',
                stroke: '#387eff',
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
        
        // Navigation buttons at the top
        this.createImprovedNavigation();
        
        // Create SAP Cloud ALM Analytics API project
        this.createSAPCloudALMProject();
        
        // Next scene button with hover animation
        this.createNextButton();
        
        // Create floating particles for dynamic effect
        this.createEnhancedParticleEffect();
        
        // Add mouse trail effect
        this.createMouseTrail();
        
        console.log('SAPProjectScene: create method completed');
    }
    
    // Unlock audio context on first user interaction
    unlockAudio() {
        // Flag to track if we've unlocked audio
        this.audioUnlocked = false;
        
        const unlockAudioContext = () => {
            console.log('Attempting to unlock audio context...');
            
            if (this.audioUnlocked) return;
            
            // Resume audio context if it exists and is suspended
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume().then(() => {
                    console.log('Audio context resumed successfully!');
                    this.audioUnlocked = true;
                    
                    // Try playing the music again after context is resumed
                    this.playBackgroundMusic();
                });
            }
            
            // Add a visible message that disappears when clicked
            const unlockMessage = this.add.text(
                this.cameras.main.width / 2, 
                this.cameras.main.height / 2,
                'Click anywhere to enable audio',
                { 
                    font: 'bold 24px Arial',
                    fill: '#ffffff',
                    backgroundColor: '#387eff',
                    padding: { x: 20, y: 10 }
                }
            ).setOrigin(0.5).setDepth(1000);
            
            // Fade out the message after a short delay
            this.time.delayedCall(300, () => {
                this.tweens.add({
                    targets: unlockMessage,
                    alpha: 0,
                    y: this.cameras.main.height / 2 - 30,
                    duration: 500,
                    onComplete: () => unlockMessage.destroy()
                });
            });
            
            // Remove event listeners to prevent multiple calls
            this.input.off('pointerdown', unlockAudioContext);
            document.removeEventListener('click', unlockAudioContext);
            document.removeEventListener('keydown', unlockAudioContext);
        };
        
        // Add event listeners for user interaction
        this.input.on('pointerdown', unlockAudioContext);
        document.addEventListener('click', unlockAudioContext);
        document.addEventListener('keydown', unlockAudioContext);
    }
    
    // Add method to play background music
    playBackgroundMusic() {
        try {
            console.log('Attempting to play background music...');
            
            // Check if music is already playing
            if (this.bgMusic && this.bgMusic.isPlaying) {
                console.log('Background music already playing');
                return;
            }
            
            // Force HTML5 audio (more compatible) instead of WebAudio
            this.sound.setAudioPlaybackRate(1.0);
            
            // Create the background music with clear settings
            this.bgMusic = this.sound.add('bg-music', {
                volume: 0.5,
                loop: true,
                delay: 0
            });
            
            console.log('Background music created, attempting to play...');
            
            // Direct play attempt with detailed error handling
            try {
                this.bgMusic.play();
                console.log('Background music play() called');
                
                // Verify if music is actually playing
                this.time.delayedCall(500, () => {
                    if (this.bgMusic && !this.bgMusic.isPlaying) {
                        console.warn('Music not playing after 500ms, trying fallback method');
                        this.tryFallbackPlayMethod();
                    } else {
                        console.log('Music verified as playing!');
                        
                        // Show a temporary music started notification
                        this.showTemporaryMessage('🎵 Music playing', 1500);
                    }
                });
            } catch (playError) {
                console.error('Direct play error:', playError);
                this.tryFallbackPlayMethod();
            }
        } catch (error) {
            console.error('Error setting up background music:', error);
            
            // Show user a clear error message
            this.showTemporaryMessage('⚠️ Audio error - check console', 3000);
        }
    }
    
    // Fallback method for playing audio
    tryFallbackPlayMethod() {
        console.log('Using fallback method to play audio...');
        
        // Create a user interaction message
        const message = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            '🔊 Click or tap anywhere to play music 🔊',
            {
                font: 'bold 24px Arial',
                fill: '#ffffff',
                backgroundColor: '#387eff',
                padding: { x: 20, y: 10 },
                align: 'center'
            }
        ).setOrigin(0.5).setDepth(1000);
        
        // Add pulsing animation to draw attention
        this.tweens.add({
            targets: message,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        
        // Function to play sound on user interaction
        const playOnInteraction = () => {
            if (this.bgMusic) {
                try {
                    this.bgMusic.play();
                    console.log('Playing music via user interaction');
                    this.showTemporaryMessage('🎵 Music started!', 1500);
                } catch (e) {
                    console.error('Failed to play even with interaction:', e);
                }
            }
            
            // Remove the message
            this.tweens.add({
                targets: message,
                alpha: 0,
                y: this.cameras.main.height / 2 - 50,
                duration: 500,
                onComplete: () => message.destroy()
            });
            
            // Remove event listeners
            this.input.off('pointerdown', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
        };
        
        // Add event listeners
        this.input.on('pointerdown', playOnInteraction);
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
    }
    
    // Helper to show temporary messages
    showTemporaryMessage(text, duration = 2000) {
        const message = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 100,
            text,
            {
                font: '18px Arial',
                fill: '#ffffff',
                backgroundColor: '#387eff',
                padding: { x: 10, y: 5 }
            }
        ).setOrigin(0.5).setAlpha(0).setDepth(1000);
        
        // Fade in
        this.tweens.add({
            targets: message,
            alpha: 1,
            duration: 300,
            onComplete: () => {
                // Wait and fade out
                this.time.delayedCall(duration, () => {
                    this.tweens.add({
                        targets: message,
                        alpha: 0,
                        duration: 300,
                        onComplete: () => message.destroy()
                    });
                });
            }
        });
        
        return message;
    }
    
    // Add audio controls to the scene
    createAudioControls() {
        // Create sound icon in bottom right corner
        const audioButton = this.add.circle(
            this.cameras.main.width - 30,
            this.cameras.main.height - 30,
            20,
            0x0d2481,
            0.8
        ).setInteractive({ useHandCursor: true });
        
        // Add icon inside the circle
        const audioIcon = this.add.text(
            this.cameras.main.width - 30,
            this.cameras.main.height - 30,
            '🔊',
            {
                font: '16px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Track music state
        let isMuted = false;
        
        // Add click handler to toggle music
        audioButton.on('pointerdown', () => {
            if (isMuted) {
                // Unmute audio
                if (this.bgMusic) {
                    this.bgMusic.setVolume(0.5);
                    audioIcon.setText('🔊');
                    isMuted = false;
                    this.showTemporaryMessage('🔊 Sound on');
                } else {
                    // If music doesn't exist, try to create it
                    this.playBackgroundMusic();
                    audioIcon.setText('🔊');
                    isMuted = false;
                }
            } else {
                // Mute audio
                if (this.bgMusic) {
                    this.bgMusic.setVolume(0);
                    audioIcon.setText('🔇');
                    isMuted = true;
                    this.showTemporaryMessage('🔇 Sound off');
                }
            }
        });
        
        // Add hover animation
        audioButton.on('pointerover', () => {
            this.tweens.add({
                targets: audioButton,
                scale: 1.2,
                duration: 100
            });
        });
        
        audioButton.on('pointerout', () => {
            this.tweens.add({
                targets: audioButton,
                scale: 1,
                duration: 100
            });
        });
    }
    
    // Add debug sound info button
    createDebugSoundInfo() {
        // Create debug button
        const debugButton = this.add.circle(
            this.cameras.main.width - 30,
            this.cameras.main.height - 80,
            20,
            0xff3333,
            0.8
        ).setInteractive({ useHandCursor: true });
        
        // Add icon inside the circle
        const debugIcon = this.add.text(
            this.cameras.main.width - 30,
            this.cameras.main.height - 80,
            '?',
            {
                font: 'bold 16px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Add click handler to show debug info
        debugButton.on('pointerdown', () => {
            // Get current sound state
            const soundInfo = {
                'Sound Context State': this.sound.context ? this.sound.context.state : 'Not available',
                'Music Loaded': this.cache.audio.exists('bg-music') ? 'Yes' : 'No',
                'Music Object Exists': this.bgMusic ? 'Yes' : 'No',
                'Music Playing': this.bgMusic && this.bgMusic.isPlaying ? 'Yes' : 'No',
                'Sound Manager Locked': this.sound.locked ? 'Yes' : 'No',
                'Audio Unlocked Flag': this.audioUnlocked ? 'Yes' : 'No',
                'Volume': this.bgMusic ? this.bgMusic.volume : 'N/A',
                'Loop': this.bgMusic ? this.bgMusic.loop : 'N/A'
            };
            
            // Format debug info
            let debugText = 'SOUND DEBUG INFO:\n\n';
            Object.entries(soundInfo).forEach(([key, value]) => {
                debugText += `${key}: ${value}\n`;
            });
            
            // Display a temporary panel with debug info
            const panel = this.add.rectangle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                500,
                300,
                0x000000,
                0.9
            ).setOrigin(0.5).setDepth(1000);
            
            const infoText = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                debugText,
                {
                    font: '16px monospace',
                    fill: '#ffffff',
                    align: 'left'
                }
            ).setOrigin(0.5).setDepth(1001);
            
            // Add close button
            const closeButton = this.add.text(
                this.cameras.main.width / 2 + 230,
                this.cameras.main.height / 2 - 130,
                'X',
                {
                    font: 'bold 24px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0.5).setDepth(1001).setInteractive({ useHandCursor: true });
            
            // Actions
            const playMusicButton = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 + 100,
                'Try Play Music',
                {
                    font: 'bold 18px Arial',
                    fill: '#ffffff',
                    backgroundColor: '#387eff',
                    padding: { x: 15, y: 8 }
                }
            ).setOrigin(0.5).setDepth(1001).setInteractive({ useHandCursor: true });
            
            playMusicButton.on('pointerdown', () => {
                // Try to play music when debug button is clicked
                if (this.sound.context && this.sound.context.state === 'suspended') {
                    this.sound.context.resume();
                }
                this.playBackgroundMusic();
                
                // Update debug info after trying to play
                setTimeout(() => {
                    const updatedSoundInfo = {
                        'Sound Context State': this.sound.context ? this.sound.context.state : 'Not available',
                        'Music Playing': this.bgMusic && this.bgMusic.isPlaying ? 'Yes' : 'No'
                    };
                    
                    let updatedText = debugText + '\n\nUPDATED STATUS:\n';
                    Object.entries(updatedSoundInfo).forEach(([key, value]) => {
                        updatedText += `${key}: ${value}\n`;
                    });
                    
                    infoText.setText(updatedText);
                }, 500);
            });
            
            closeButton.on('pointerdown', () => {
                panel.destroy();
                infoText.destroy();
                closeButton.destroy();
                playMusicButton.destroy();
            });
            
            // Auto-close after 10 seconds
            this.time.delayedCall(10000, () => {
                if (panel.active) {
                    panel.destroy();
                    infoText.destroy();
                    closeButton.destroy();
                    playMusicButton.destroy();
                }
            });
        });
        
        // Add hover animation
        debugButton.on('pointerover', () => {
            this.tweens.add({
                targets: debugButton,
                scale: 1.2,
                duration: 100
            });
        });
        
        debugButton.on('pointerout', () => {
            this.tweens.add({
                targets: debugButton,
                scale: 1,
                duration: 100
            });
        });
    }
    
    createAnimatedBackground() {
        // Create a dynamic background with gradient in blue tones
        const background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x0d2481).setOrigin(0, 0);
        
        // Add a secondary layer for the animated gradient effect
        const gradientOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x387eff, 0.2).setOrigin(0, 0);
        
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
            const line = this.add.line(0, 0, i, 0, i, this.cameras.main.height, 0x387eff, 0.1).setOrigin(0, 0);
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
            const line = this.add.line(0, 0, 0, i, this.cameras.main.width, i, 0x387eff, 0.1).setOrigin(0, 0);
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
            { label: 'Projects', scene: 'ProjectsScene', x: 550 }
        ];
        
        navItems.forEach(item => {
            // Create button background
            const buttonBg = this.add.rectangle(item.x, 30, 120, 35, 0x387eff, 0.4).setOrigin(0.5);
            
            // Create button text
            const button = this.createNavButton(item.x, 30, item.label, item.scene);
            
            // Link button and background for hover effects
            button.on('pointerover', () => {
                button.setStyle({ fill: '#ffffff' });
                buttonBg.fillColor = 0x0d2481;
                buttonBg.fillAlpha = 0.8;
            });
            
            button.on('pointerout', () => {
                button.setStyle({ fill: '#ffffff' });
                buttonBg.fillColor = 0x387eff;
                buttonBg.fillAlpha = 0.4;
            });
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
    
    createNextButton() {
        // Create button background with glow effect
        const buttonBg = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            250,
            45,
            0x387eff,
            1
        ).setOrigin(0.5);
        
        // Add outer glow
        const glow = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            254,
            49,
            0x86b3ff,
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
        const nextButtonText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            'Next: Contact Details',
            { 
                font: 'bold 22px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Button hover effects
        nextButtonText.on('pointerover', () => {
            buttonBg.fillColor = 0x0d2481;
            nextButtonText.setScale(1.05);
        });
        
        nextButtonText.on('pointerout', () => {
            buttonBg.fillColor = 0x387eff;
            nextButtonText.setScale(1);
        });
        
        nextButtonText.on('pointerdown', () => {
            // Flash effect before transition
            this.cameras.main.flash(500, 255, 255, 255, 0.3);
            
            console.log('SAPProjectScene: Next button clicked - transitioning to ContactScene');
            
            // Delay scene transition for flash effect to complete
            this.time.delayedCall(300, () => {
                // Navigate to Contact scene
                this.scene.start('ContactScene');
                console.log('SAPProjectScene: Started ContactScene');
            });
        });
    }
    
    createEnhancedParticleEffect() {
        // Create multiple types of particles
        for (let i = 0; i < 20; i++) {
            // Random color from blue palette
            const colors = [0x387eff, 0x0d2481, 0x86b3ff, 0x4a5de8];
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
    
    createMouseTrail() {
        // Create a trail effect that follows mouse/pointer
        const trail = [];
        const trailLength = 5;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = this.add.circle(0, 0, 3 - (i * 0.5), 0x86b3ff, 0.7 - (i * 0.1));
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
    
    // SAP Cloud ALM Analytics API Project
    createSAPCloudALMProject() {
        // Project display panel with animated data background
        const panel = this.add.rectangle(
            this.cameras.main.width / 2,
            350,
            900,
            400,
            0x0d2481,
            0.8
        ).setOrigin(0.5);
        
        // Add gradient effect to panel
        const gradientOverlay = this.add.rectangle(
            this.cameras.main.width / 2,
            350,
            900,
            400,
            0x387eff,
            0.2
        ).setOrigin(0.5);
        
        // Animate the gradient overlay
        this.tweens.add({
            targets: gradientOverlay,
            alpha: { from: 0.1, to: 0.3 },
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Project title with animated glow
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            190,
            'SAP Cloud ALM Analytics API',
            { 
                font: 'bold 36px Arial',
                fill: '#ffffff',
                stroke: '#387eff',
                strokeThickness: 3
            }
        ).setOrigin(0.5);
        
        // Add glow animation to title
        this.tweens.add({
            targets: titleText,
            strokeThickness: 5,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Project description panel with semi-transparent glass effect
        const descPanel = this.add.rectangle(
            this.cameras.main.width / 2,
            350,
            850,
            300,
            0x0a1a5c,
            0.6
        ).setOrigin(0.5);
        
        // Add border to panel
        descPanel.setStrokeStyle(2, 0x387eff, 0.7);
        
        // Project description with key points
        const descText = this.add.text(
            this.cameras.main.width / 2 - 400,
            250,
            "Worked on the SAP Cloud ALM Analytics API enabling dashboard creation and\nreport generation by aggregating various types of data managed by SAP Cloud ALM.\n\nThe API provides OData and REST endpoints that expose analytics data through a\nsingle entry point, supporting both time series and table data formats.\n\nImplemented core concepts including data providers, dimensions, metrics, and\nvarious output formats to allow flexible consumption of analytics from SAP\nAnalytics Cloud or third-party applications.",
            { 
                font: '20px Arial',
                fill: '#ffffff',
                align: 'left'
            }
        );
        
        // Add highlight effect to key technical terms
        const highlightWords = ["OData", "REST", "time series", "table data", "data providers", "dimensions", "metrics"];
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const currentText = descText.text;
                // Highlight a random keyword
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
            },
            repeat: -1
        });
        
        // Project information
        const infoText = this.add.text(
            this.cameras.main.width / 2 - 400,
            430,
            "Timeline: June 2022 - December 2022\nRole: Full Stack Developer\nCompany: SAP",
            { 
                font: 'bold 18px Arial',
                fill: '#86b3ff'
            }
        );
        
        // Create interactive visualization of the API architecture
        this.createAPIVisualization(this.cameras.main.width / 2 + 230, 350);
    }
    
    // Helper method to create interactive API visualization
    createAPIVisualization(x, y) {
        // Container for all API visualization elements
        const apiContainer = this.add.container(0, 0);
        
        // Background dashboard representation
        const dashboard = this.add.rectangle(
            x,
            y,
            270,
            270,
            0x000c24,
            0.8
        ).setOrigin(0.5);
        dashboard.setStrokeStyle(2, 0x387eff);
        apiContainer.add(dashboard);
        
        // Create data flow visualization
        this.createDataFlowVisualization(x, y, apiContainer);
        
        // Add text prompt to indicate clickability
        const clickPrompt = this.add.text(
            x,
            y + 110,
            "CLICK TO VIEW GRAPHS",
            {
                font: 'bold 12px Arial',
                fill: '#ffffff',
                backgroundColor: '#387eff'
            }
        ).setOrigin(0.5).setPadding(5);
        apiContainer.add(clickPrompt);
        
        // Make the visualization interactive
        dashboard.setInteractive({ useHandCursor: true });
        
        // Add pulse animation to dashboard to indicate interactivity
        this.tweens.add({
            targets: dashboard,
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
        
        // Add hover effect
        dashboard.on('pointerover', () => {
            this.tweens.add({
                targets: dashboard,
                strokeAlpha: 1,
                fillAlpha: 0.9,
                duration: 200
            });
            
            // Pulse the click prompt
            this.tweens.add({
                targets: clickPrompt,
                scale: 1.1,
                duration: 200,
                yoyo: true,
                repeat: 1
            });
        });
        
        dashboard.on('pointerout', () => {
            this.tweens.add({
                targets: dashboard,
                strokeAlpha: 1,
                fillAlpha: 0.8,
                duration: 200
            });
        });
        
        // Add click effect to show graph generation
        dashboard.on('pointerdown', () => {
            console.log('API visualization clicked - showing graph generation');
            this.showGraphGeneration(x, y);
        });
    }
    
    createDataFlowVisualization(x, y, container) {
        // Create data sources (top of the visualization)
        const dataSources = [
            { label: "Tasks", color: 0xff5757 },
            { label: "Logs", color: 0xffdd57 },
            { label: "Metrics", color: 0x57b8ff },
            { label: "Alerts", color: 0x84ff57 }
        ];
        
        // Position for data sources
        const sourceY = y - 110;
        const spacing = 60;
        
        // Create section divider lines
        const leftLine = this.add.line(x - 90, y - 65, 0, 0, 0, 130, 0x387eff, 0.5);
        const rightLine = this.add.line(x + 90, y - 65, 0, 0, 0, 130, 0x387eff, 0.5);
        container.add(leftLine);
        container.add(rightLine);
        
        // Create dimensions and metrics labels with "collecting..." text
        const dimensionsLabel = this.add.text(
            x - 70,
            y - 70,
            "Dimensions",
            {
                font: 'bold 12px Arial',
                fill: '#ffffff',
                backgroundColor: '#0d2481',
                padding: { x: 5, y: 2 }
            }
        ).setOrigin(0.5);
        container.add(dimensionsLabel);
        
        // Add "collecting..." blinking text for dimensions
        const collectingDim = this.add.text(
            x - 70,
            y - 55,
            "collecting...",
            {
                font: 'italic 10px Arial',
                fill: '#57fff5'
            }
        ).setOrigin(0.5);
        container.add(collectingDim);
        
        // Blink the collecting text
        this.tweens.add({
            targets: collectingDim,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
        
        const metricsLabel = this.add.text(
            x + 70,
            y - 70,
            "Metrics",
            {
                font: 'bold 12px Arial',
                fill: '#ffffff',
                backgroundColor: '#0d2481',
                padding: { x: 5, y: 2 }
            }
        ).setOrigin(0.5);
        container.add(metricsLabel);
        
        // Add "collecting..." blinking text for metrics
        const collectingMetrics = this.add.text(
            x + 70,
            y - 55,
            "collecting...",
            {
                font: 'italic 10px Arial',
                fill: '#ff9e57'
            }
        ).setOrigin(0.5);
        container.add(collectingMetrics);
        
        // Blink the collecting text
        this.tweens.add({
            targets: collectingMetrics,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            delay: 400
        });
        
        // Create data dimensions and metrics with animated collection
        const dimensions = ["Time", "Project", "System", "User"];
        const metrics = ["Status", "Count", "Duration", "Usage"];
        
        // Create dimensions visualization (left side) with progress indicators
        dimensions.forEach((dim, i) => {
            const dimY = y - 35 + (i * 18);
            const dimText = this.add.text(
                x - 90,
                dimY,
                dim,
                {
                    font: '10px Arial',
                    fill: '#57fff5'
                }
            ).setOrigin(0, 0.5);
            container.add(dimText);
            
            // Progress bar for each dimension showing collection progress
            const progress = this.add.rectangle(
                x - 40,
                dimY,
                40,
                6,
                0x57fff5,
                0.3
            ).setOrigin(0, 0.5);
            container.add(progress);
            
            // Animated progress filling
            this.tweens.add({
                targets: progress,
                scaleX: { from: 0, to: 1 },
                alpha: { from: 0.3, to: 0.7 },
                duration: 2000,
                delay: i * 500,
                repeat: -1,
                repeatDelay: 3000,
                yoyo: true
            });
            
            // Add animated data dots flowing from sources to dimensions
            this.createAnimatedDataFlow(
                x - 90 + ((i % dataSources.length) * spacing), 
                sourceY, 
                x - 70, 
                dimY, 
                dataSources[i % dataSources.length].color,
                container
            );
        });
        
        // Create metrics visualization (right side) with progress indicators
        metrics.forEach((metric, i) => {
            const metricY = y - 35 + (i * 18);
            const metricText = this.add.text(
                x + 90,
                metricY,
                metric,
                {
                    font: '10px Arial',
                    fill: '#ff9e57'
                }
            ).setOrigin(1, 0.5);
            container.add(metricText);
            
            // Progress bar for each metric showing collection progress
            const progress = this.add.rectangle(
                x + 40,
                metricY,
                40,
                6,
                0xff9e57,
                0.3
            ).setOrigin(1, 0.5);
            container.add(progress);
            
            // Animated progress filling
            this.tweens.add({
                targets: progress,
                scaleX: { from: 0, to: 1 },
                alpha: { from: 0.3, to: 0.7 },
                duration: 2000,
                delay: i * 500 + 250, // Slightly offset from dimensions
                repeat: -1,
                repeatDelay: 3000,
                yoyo: true
            });
            
            // Add animated data dots flowing from sources to metrics
            this.createAnimatedDataFlow(
                x - 90 + (((i + 2) % dataSources.length) * spacing), 
                sourceY, 
                x + 70, 
                metricY, 
                dataSources[(i + 2) % dataSources.length].color,
                container
            );
        });
        
        // Create source nodes with visual enhancements
        dataSources.forEach((source, i) => {
            const sourceX = x - 90 + (i * spacing);
            
            // Source node background
            const nodeBg = this.add.circle(
                sourceX,
                sourceY,
                12,
                0x000000,
                0.5
            );
            container.add(nodeBg);
            
            // Source node
            const node = this.add.circle(
                sourceX,
                sourceY,
                10,
                source.color,
                0.9
            );
            container.add(node);
            
            // Source label
            const label = this.add.text(
                sourceX,
                sourceY - 22,
                source.label,
                {
                    font: 'bold 10px Arial',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 2
                }
            ).setOrigin(0.5);
            container.add(label);
            
            // Add active data collection visual
            const pulseRing = this.add.circle(
                sourceX,
                sourceY,
                15,
                source.color,
                0.3
            );
            container.add(pulseRing);
            
            // Animate pulse rings to show active collection
            this.tweens.add({
                targets: pulseRing,
                scale: 1.5,
                alpha: 0,
                duration: 1000 + (i * 200),
                repeat: -1
            });
            
            // Animate nodes
            this.tweens.add({
                targets: node,
                scale: 1.2,
                duration: 800 + (i * 200),
                yoyo: true,
                repeat: -1
            });
        });
        
        // Create API layer (middle of the visualization)
        const apiLayer = this.add.rectangle(
            x,
            y,
            220,
            40,
            0x0055ff,
            0.8
        ).setOrigin(0.5);
        container.add(apiLayer);
        
        const apiText = this.add.text(
            x,
            y,
            "SAP Cloud ALM Analytics API",
            {
                font: 'bold 12px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        container.add(apiText);
        
        // Add processing indicator animation
        const processingText = this.add.text(
            x,
            y + 15,
            "Processing data...",
            {
                font: 'italic 10px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        container.add(processingText);
        
        // Animate the processing text
        this.tweens.add({
            targets: processingText,
            alpha: 0.5,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        
        // Create output formats (bottom part)
        const outputs = [
            { label: "Charts", color: 0xff9e57 },
            { label: "Tables", color: 0x57fff5 }
        ];
        
        // Add data flow from API to outputs (more dense)
        for (let i = 0; i < 3; i++) {
            this.createAnimatedDataFlow(x - 40, y + 20, x - 50, y + 50, 0x57fff5, container);
            this.createAnimatedDataFlow(x, y + 20, x - 50, y + 50, 0xff9e57, container);
            this.createAnimatedDataFlow(x + 40, y + 20, x + 50, y + 50, 0x57fff5, container);
            this.createAnimatedDataFlow(x, y + 20, x + 50, y + 50, 0xff9e57, container);
        }
        
        // Output to consumers
        outputs.forEach((output, i) => {
            const outputX = x - 50 + (i * 100);
            const outputY = y + 50;
            
            // Output node background
            const nodeBg = this.add.rectangle(
                outputX,
                outputY,
                82,
                32,
                0x000000,
                0.5
            ).setOrigin(0.5);
            container.add(nodeBg);
            
            // Output node
            const node = this.add.rectangle(
                outputX,
                outputY,
                80,
                30,
                output.color,
                0.8
            ).setOrigin(0.5);
            container.add(node);
            
            // Output label
            const label = this.add.text(
                outputX,
                outputY,
                output.label,
                {
                    font: 'bold 10px Arial',
                    fill: '#000000'
                }
            ).setOrigin(0.5);
            container.add(label);
            
            // Generating indicator
            const genText = this.add.text(
                outputX,
                outputY + 15,
                "generating...",
                {
                    font: 'italic 8px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0.5);
            genText.setAlpha(0);
            container.add(genText);
            
            // Show generating text periodically
            this.time.addEvent({
                delay: 3000 + (i * 1500),
                callback: () => {
                    this.tweens.add({
                        targets: genText,
                        alpha: 0.8,
                        duration: 300,
                        yoyo: true,
                        repeat: 5,
                        hold: 400
                    });
                },
                loop: true
            });
            
            // Animate output nodes
            this.tweens.add({
                targets: node,
                alpha: 0.6,
                duration: 1500,
                yoyo: true,
                repeat: -1
            });
            
            // Add mini-graph previews in the output nodes
            if (i === 0) {
                // Chart mini-preview
                const miniLine = this.add.graphics();
                miniLine.lineStyle(1, 0xffffff, 0.7);
                miniLine.beginPath();
                miniLine.moveTo(outputX - 30, outputY + 5);
                miniLine.lineTo(outputX - 20, outputY - 5);
                miniLine.lineTo(outputX - 10, outputY + 2);
                miniLine.lineTo(outputX, outputY - 3);
                miniLine.lineTo(outputX + 10, outputY + 5);
                miniLine.lineTo(outputX + 20, outputY - 2);
                miniLine.lineTo(outputX + 30, outputY + 3);
                miniLine.strokePath();
                container.add(miniLine);
                
                // Animate the line appearing segment by segment
                const lineGraphics = [miniLine];
                this.tweens.add({
                    targets: lineGraphics,
                    alpha: 0.2,
                    duration: 1500,
                    yoyo: true,
                    repeat: -1
                });
            } else {
                // Table mini-preview with animation
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        const cell = this.add.rectangle(
                            outputX - 20 + (c * 14),
                            outputY - 7 + (r * 7),
                            12,
                            5,
                            0xffffff,
                            0.4
                        );
                        container.add(cell);
                        
                        // Make cells appear in sequence
                        cell.setAlpha(0);
                        this.tweens.add({
                            targets: cell,
                            alpha: 0.4,
                            duration: 200,
                            delay: (r * 3 + c) * 100 + 1000,
                            repeat: -1,
                            repeatDelay: 3000,
                            yoyo: true,
                            hold: 1000
                        });
                    }
                }
            }
        });
    }
    
    // New method to create animated data flow between points
    createAnimatedDataFlow(startX, startY, endX, endY, color, container) {
        // Create repeating data flow animation along the path
        const createDataDot = () => {
            const dot = this.add.circle(startX, startY, 3, color, 0.8);
            container.add(dot);
            
            // Animate dot moving along the path
            this.tweens.add({
                targets: dot,
                x: endX,
                y: endY,
                alpha: { from: 0.8, to: 0 },
                ease: 'Sine.easeInOut',
                duration: 1000 + (Math.random() * 500),
                onComplete: () => {
                    dot.destroy();
                }
            });
        };
        
        // Create initial dot
        createDataDot();
        
        // Add recurring timer to create dots
        this.time.addEvent({
            delay: 1500 + (Math.random() * 1000),
            callback: createDataDot,
            loop: true
        });
    }
    
    // Enhanced method to show graph generation animation
    showGraphGeneration(x, y) {
        // Create a full-screen overlay for the graph animation
        const overlay = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.7
        ).setInteractive();
        
        // Create inner panel for better visual structure
        const innerPanel = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width - 100,
            this.cameras.main.height - 100,
            0x0d2481,
            0.7
        );
        
        // Add panel border
        innerPanel.setStrokeStyle(2, 0x387eff, 0.8);
        
        // Add title for the popup
        const title = this.add.text(
            this.cameras.main.width / 2,
            80,
            "SAP Cloud ALM Analytics API - Dashboard Generation",
            {
                font: 'bold 28px Arial',
                fill: '#ffffff',
                stroke: '#387eff',
                strokeThickness: 2
            }
        ).setOrigin(0.5);
        
        // Add subtitle showing automatic generation
        const subtitle = this.add.text(
            this.cameras.main.width / 2,
            115,
            "Visualizing collected metrics and dimensions",
            {
                font: 'italic 18px Arial',
                fill: '#86b3ff'
            }
        ).setOrigin(0.5);
        
        // Create "close" button
        const closeButton = this.add.rectangle(
            this.cameras.main.width - 50,
            50,
            80,
            40,
            0xff3333,
            0.8
        ).setInteractive({ useHandCursor: true });
        
        const closeText = this.add.text(
            this.cameras.main.width - 50,
            50,
            "CLOSE",
            {
                font: 'bold 16px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Add a skip game button
        const skipButton = this.add.rectangle(
            this.cameras.main.width - 50,
            110,
            120,
            40,
            0x387eff,
            0.8
        ).setInteractive({ useHandCursor: true });
        
        const skipText = this.add.text(
            this.cameras.main.width - 50,
            110,
            "Skip Game",
            {
                font: 'bold 16px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Show data being processed before graphs appear
        const dataProcessingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "Processing collected data...",
            {
                font: 'bold 24px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Create animated loading indicators
        const loadingDots = [];
        for (let i = 0; i < 5; i++) {
            const dot = this.add.circle(
                this.cameras.main.width / 2 - 40 + i * 20,
                this.cameras.main.height / 2 + 40,
                5,
                0x387eff
            );
            
            this.tweens.add({
                targets: dot,
                y: { from: this.cameras.main.height / 2 + 40, to: this.cameras.main.height / 2 + 30 },
                alpha: { from: 1, to: 0.2 },
                duration: 500,
                repeat: -1,
                delay: i * 100
            });
            
            loadingDots.push(dot);
        }
        
        // Create processing indicators for different data types
        const processingSteps = [
            "Loading data sources...",
            "Processing dimensions...",
            "Analyzing metrics...",
            "Calculating aggregations...",
            "Generating visualizations..."
        ];
        
        const statusText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 70,
            processingSteps[0],
            {
                font: '16px Arial',
                fill: '#86b3ff'
            }
        ).setOrigin(0.5);
        
        // Cycle through processing steps
        let currentStep = 0;
        const processingTimer = this.time.addEvent({
            delay: 800,
            callback: () => {
                currentStep = (currentStep + 1) % processingSteps.length;
                statusText.setText(processingSteps[currentStep]);
            },
            repeat: 4
        });
        
        // Hide initial elements after delay and show graphs
        this.time.delayedCall(4000, () => {
            dataProcessingText.destroy();
            statusText.destroy();
            loadingDots.forEach(dot => dot.destroy());
            
            // Generate animated graphs
            this.generateLineChart(this.cameras.main.width / 4, this.cameras.main.height / 2 - 50);
            this.generateBarChart(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2 - 50);
            this.generatePieChart(this.cameras.main.width / 4, this.cameras.main.height / 2 + 150);
            this.generateHeatMap(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2 + 150);
            
            // Display info about automatic graph generation
            const autoGenText = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height - 60,
                "Dashboards automatically generated from collected metrics and dimensions",
                {
                    font: 'italic 16px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0.5);
            
            // Add to elements for cleanup
            this.graphElements.push(autoGenText);
        });
        
        // Close button functionality
        closeButton.on('pointerdown', () => {
            // Remove all elements when closing
            overlay.destroy();
            innerPanel.destroy();
            title.destroy();
            subtitle.destroy();
            closeButton.destroy();
            closeText.destroy();
            skipButton.destroy();
            skipText.destroy();
            
            // Cleanup any remaining processing elements
            if (dataProcessingText) dataProcessingText.destroy();
            if (statusText) statusText.destroy();
            loadingDots.forEach(dot => { if (dot) dot.destroy(); });
            
            // Stop the processing timer if still running
            processingTimer.remove();
            
            // Clean up all generated graphs
            this.graphElements.forEach(element => { if (element) element.destroy(); });
            this.graphElements = [];
        });
        
        // Skip game button functionality
        skipButton.on('pointerdown', () => {
            // Show user this is a demo feature
            const message = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                "DEMO MODE: This would skip the interactive portfolio in a full game",
                {
                    font: 'bold 18px Arial',
                    fill: '#ffffff',
                    backgroundColor: '#ff3333',
                    padding: { x: 15, y: 10 }
                }
            ).setOrigin(0.5);
            
            this.time.delayedCall(2000, () => {
                message.destroy();
            });
        });
        
        // Store elements to clean up later
        this.graphElements = [overlay, innerPanel, title, subtitle, closeButton, closeText, skipButton, skipText];
    }
    
    // Generate an animated line chart
    generateLineChart(x, y) {
        // Create chart container
        const container = this.add.container(x, y);
        this.graphElements.push(container);
        
        // Chart background
        const bg = this.add.rectangle(0, 0, 400, 200, 0x222222, 0.9).setOrigin(0.5);
        container.add(bg);
        
        // Chart title
        const title = this.add.text(0, -85, "Time Series Data: Performance Metrics", {
            font: 'bold 16px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        container.add(title);
        
        // Create axes
        const xAxis = this.add.line(-180, 80, 0, 0, 360, 0, 0xffffff).setOrigin(0);
        const yAxis = this.add.line(-180, -80, 0, 0, 0, 160, 0xffffff).setOrigin(0);
        container.add(xAxis);
        container.add(yAxis);
        
        // Line chart points
        const points = [
            { x: -180, y: 30 },
            { x: -120, y: 0 },
            { x: -60, y: 40 },
            { x: 0, y: -20 },
            { x: 60, y: 20 },
            { x: 120, y: -40 },
            { x: 180, y: 10 }
        ];
        
        // Draw line segments with animation
        for (let i = 0; i < points.length - 1; i++) {
            const line = this.add.line(
                0, 0,
                points[i].x, points[i].y,
                points[i+1].x, points[i+1].y,
                0x3498db
            );
            line.setLineWidth(3);
            line.setAlpha(0);
            container.add(line);
            
            // Animate line appearance
            this.tweens.add({
                targets: line,
                alpha: 1,
                duration: 300,
                delay: i * 200,
                onComplete: () => {
                    // Add data point dot at end of line segment
                    const dot = this.add.circle(points[i+1].x, points[i+1].y, 5, 0xff9e57);
                    container.add(dot);
                    
                    // Animate dot appearance
                    this.tweens.add({
                        targets: dot,
                        scale: 1.5,
                        duration: 200,
                        yoyo: true,
                        repeat: 0
                    });
                }
            });
        }
    }
    
    // Generate an animated bar chart
    generateBarChart(x, y) {
        // Create chart container
        const container = this.add.container(x, y);
        this.graphElements.push(container);
        
        // Chart background
        const bg = this.add.rectangle(0, 0, 400, 200, 0x222222, 0.9).setOrigin(0.5);
        container.add(bg);
        
        // Chart title
        const title = this.add.text(0, -85, "Resource Utilization by System", {
            font: 'bold 16px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        container.add(title);
        
        // Create axes
        const xAxis = this.add.line(-180, 80, 0, 0, 360, 0, 0xffffff).setOrigin(0);
        const yAxis = this.add.line(-180, -80, 0, 0, 0, 160, 0xffffff).setOrigin(0);
        container.add(xAxis);
        container.add(yAxis);
        
        // Bar chart data
        const barData = [
            { label: "System A", value: 65, color: 0x3498db },
            { label: "System B", value: 40, color: 0x2ecc71 },
            { label: "System C", value: 85, color: 0xe74c3c },
            { label: "System D", value: 25, color: 0xf1c40f },
            { label: "System E", value: 55, color: 0x9b59b6 }
        ];
        
        // Create and animate bars
        const barWidth = 50;
        const spacing = 65;
        
        barData.forEach((data, i) => {
            // Position bar
            const barX = -180 + (i * spacing) + barWidth/2 + 10;
            
            // Create bar (start with height 0)
            const bar = this.add.rectangle(
                barX, 
                80, 
                barWidth, 
                0, 
                data.color, 
                1
            ).setOrigin(0.5, 1);
            container.add(bar);
            
            // Label
            const label = this.add.text(
                barX,
                82,
                data.label,
                {
                    font: '12px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0.5, 0).setAngle(-45);
            container.add(label);
            
            // Animate bar growing
            this.tweens.add({
                targets: bar,
                height: data.value * 1.5,
                duration: 800,
                delay: i * 150,
                ease: 'Bounce.Out'
            });
        });
    }
    
    // Generate an animated pie chart
    generatePieChart(x, y) {
        // Create chart container
        const container = this.add.container(x, y);
        this.graphElements.push(container);
        
        // Chart background
        const bg = this.add.rectangle(0, 0, 400, 200, 0x222222, 0.9).setOrigin(0.5);
        container.add(bg);
        
        // Chart title
        const title = this.add.text(0, -85, "Issue Distribution by Category", {
            font: 'bold 16px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        container.add(title);
        
        // Pie chart data
        const pieData = [
            { label: "Performance", percentage: 35, color: 0x3498db },
            { label: "Security", percentage: 15, color: 0xe74c3c },
            { label: "Usability", percentage: 25, color: 0x2ecc71 },
            { label: "Functional", percentage: 25, color: 0xf1c40f }
        ];
        
        // Create pie chart with animation
        const radius = 70;
        const centerX = 0;
        const centerY = 0;
        
        let startAngle = 0;
        pieData.forEach((segment, i) => {
            // Calculate angles in radians
            const angle = (segment.percentage / 100) * Math.PI * 2;
            const endAngle = startAngle + angle;
            
            // Instead of using path.arc (which doesn't exist), draw individual pie segments
            // using graphics directly
            const graphic = this.add.graphics({ fillStyle: { color: segment.color, alpha: 0.8 } });
            
            // Draw the pie segment with graphics.arc
            graphic.beginPath();
            graphic.moveTo(centerX, centerY);
            graphic.arc(centerX, centerY, radius, startAngle, endAngle, false);
            graphic.closePath();
            graphic.fillPath();
            
            container.add(graphic);
            
            // Calculate label position (in the middle of the segment)
            const labelAngle = startAngle + (angle / 2);
            const labelDistanceFromCenter = radius * 0.65;
            const labelX = centerX + Math.cos(labelAngle) * labelDistanceFromCenter;
            const labelY = centerY + Math.sin(labelAngle) * labelDistanceFromCenter;
            
            // Add percentage label
            const label = this.add.text(
                labelX,
                labelY,
                segment.percentage + '%',
                {
                    font: 'bold 14px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0.5);
            container.add(label);
            
            // Set starting point for the next segment
            startAngle = endAngle;
            
            // Animate segments appearing
            graphic.setAlpha(0);
            this.tweens.add({
                targets: graphic,
                alpha: 1,
                duration: 500,
                delay: i * 200
            });
        });
        
        // Add legend
        let legendY = 45;
        pieData.forEach((segment, i) => {
            // Legend color box
            const colorBox = this.add.rectangle(95, legendY + i * 25, 12, 12, segment.color);
            container.add(colorBox);
            
            // Legend text
            const legendText = this.add.text(
                110,
                legendY + i * 25,
                segment.label,
                {
                    font: '12px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0, 0.5);
            container.add(legendText);
        });
    }
    
    // Generate an animated heat map
    generateHeatMap(x, y) {
        // Create chart container
        const container = this.add.container(x, y);
        this.graphElements.push(container);
        
        // Chart background
        const bg = this.add.rectangle(0, 0, 400, 200, 0x222222, 0.9).setOrigin(0.5);
        container.add(bg);
        
        // Chart title
        const title = this.add.text(0, -85, "Systems Health Monitoring", {
            font: 'bold 16px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        container.add(title);
        
        // Heat map configuration
        const gridSize = 8;
        const cellSize = 38;
        const startX = -170;
        const startY = -65;
        
        // Row and column labels (systems and metrics)
        const rowLabels = ["S1", "S2", "S3", "S4", "S5"];
        const colLabels = ["CPU", "RAM", "Disk", "Net", "Resp"];
        
        // Add labels
        rowLabels.forEach((label, i) => {
            const text = this.add.text(
                startX - 20,
                startY + i * cellSize + cellSize/2,
                label,
                {
                    font: '12px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0.5);
            container.add(text);
        });
        
        colLabels.forEach((label, i) => {
            const text = this.add.text(
                startX + i * cellSize + cellSize/2,
                startY - 20,
                label,
                {
                    font: '12px Arial',
                    fill: '#ffffff'
                }
            ).setOrigin(0.5);
            container.add(text);
        });
        
        // Create heat map cells with animation
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                // Generate random value for demonstration (in real app, this would be real data)
                const value = Math.random();
                
                // Color based on value (green=good, red=bad)
                let cellColor;
                if (value < 0.3) {
                    cellColor = 0x2ecc71; // Green - good
                } else if (value < 0.7) {
                    cellColor = 0xf1c40f; // Yellow - warning
                } else {
                    cellColor = 0xe74c3c; // Red - critical
                }
                
                // Create cell
                const cell = this.add.rectangle(
                    startX + col * cellSize + cellSize/2,
                    startY + row * cellSize + cellSize/2,
                    cellSize - 4,
                    cellSize - 4,
                    cellColor,
                    0
                );
                container.add(cell);
                
                // Animate cell appearance
                this.tweens.add({
                    targets: cell,
                    alpha: 0.8,
                    duration: 300,
                    delay: (row * 5 + col) * 100
                });
                
                // Animate cells pulsing if critical (red)
                if (value >= 0.7) {
                    this.tweens.add({
                        targets: cell,
                        alpha: 0.4,
                        duration: 600,
                        delay: (row * 5 + col) * 100 + 400,
                        yoyo: true,
                        repeat: -1
                    });
                }
            }
        }
    }
    
    // Create the figurine character with animations
    createFigurineCharacter() {
        // Create a container for the figurine and its effects
        const containerX = 180;
        const containerY = 350;
        const figurineContainer = this.add.container(containerX, containerY);
        
        // Create a glowing background panel for the figurine
        const glowPanel = this.add.rectangle(0, 0, 220, 280, 0x387eff, 0.1);
        glowPanel.setStrokeStyle(2, 0x86b3ff, 0.8);
        figurineContainer.add(glowPanel);
        
        // Add decorative tech corners to the panel
        this.addTechCorners(figurineContainer, glowPanel.width/2, glowPanel.height/2);
        
        // Add the figurine image with a slight bounce effect
        const figurine = this.add.image(0, 0, 'figurine');
        
        // Scale the figurine to fit nicely in the panel
        const scaleFactor = Math.min(
            (glowPanel.width - 40) / figurine.width,
            (glowPanel.height - 40) / figurine.height
        );
        figurine.setScale(scaleFactor);
        
        figurineContainer.add(figurine);
        
        // Add a subtle floating animation
        this.tweens.add({
            targets: figurine,
            y: -10,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Add a role label
        const roleText = this.add.text(
            0,
            glowPanel.height/2 - 25,
            "SAP Developer",
            {
                font: 'bold 18px Arial',
                fill: '#ffffff',
                stroke: '#387eff',
                strokeThickness: 1,
                backgroundColor: '#0d2481',
                padding: { x: 10, y: 5 }
            }
        ).setOrigin(0.5);
        figurineContainer.add(roleText);
        
        // Add interactive highlight effect when hovering over the figurine
        glowPanel.setInteractive({ useHandCursor: true });
        
        glowPanel.on('pointerover', () => {
            // Enhance the glow effect on hover
            this.tweens.add({
                targets: glowPanel,
                fillAlpha: 0.3,
                strokeAlpha: 1,
                duration: 200
            });
            
            // Make the figurine slightly larger
            this.tweens.add({
                targets: figurine,
                scale: scaleFactor * 1.05,
                duration: 200
            });
            
            // Create particles around the figurine
            this.createFigurineParticles(figurineContainer);
        });
        
        glowPanel.on('pointerout', () => {
            // Return to normal state
            this.tweens.add({
                targets: glowPanel,
                fillAlpha: 0.1,
                strokeAlpha: 0.8,
                duration: 200
            });
            
            // Return to original size
            this.tweens.add({
                targets: figurine,
                scale: scaleFactor,
                duration: 200
            });
        });
        
        // Add click interaction to show greeting animation
        glowPanel.on('pointerdown', () => {
            // Bounce animation
            this.tweens.add({
                targets: figurine,
                y: -20,
                duration: 150,
                yoyo: true,
                ease: 'Bounce.Out',
                onComplete: () => {
                    // Create a speech bubble
                    const speechBubble = this.createSpeechBubble(
                        figurineContainer, 
                        80, -60, 160, 50, 
                        "Hello there!"
                    );
                    
                    // Remove after a few seconds
                    this.time.delayedCall(2000, () => {
                        if (speechBubble) {
                            this.tweens.add({
                                targets: speechBubble.getAll(),
                                alpha: 0,
                                duration: 300,
                                onComplete: () => {
                                    speechBubble.destroy(true);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    
    // Add decorative tech corners to the figurine panel
    addTechCorners(container, width, height) {
        const cornerSize = 20;
        const corners = [
            // Top-left
            { x: -width, y: -height, rotation: 0 },
            // Top-right
            { x: width, y: -height, rotation: Math.PI/2 },
            // Bottom-right
            { x: width, y: height, rotation: Math.PI },
            // Bottom-left
            { x: -width, y: height, rotation: -Math.PI/2 }
        ];
        
        corners.forEach(corner => {
            const graphics = this.add.graphics();
            graphics.lineStyle(2, 0x86b3ff, 1);
            
            // Draw L-shaped corner
            graphics.beginPath();
            graphics.moveTo(corner.x, corner.y + cornerSize);
            graphics.lineTo(corner.x, corner.y);
            graphics.lineTo(corner.x + cornerSize, corner.y);
            graphics.strokePath();
            
            // Add a small circle at the corner
            const dot = this.add.circle(corner.x, corner.y, 3, 0x86b3ff);
            
            // Pulse animation for the dot
            this.tweens.add({
                targets: dot,
                alpha: 0.4,
                scale: 1.3,
                duration: 1200,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 1000
            });
            
            container.add(graphics);
            container.add(dot);
        });
    }
    
    // Create particles around the figurine when hovered
    createFigurineParticles(container) {
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 70 + Math.random() * 30;
            
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            const particle = this.add.circle(x, y, 3, 0x86b3ff, 0.7);
            container.add(particle);
            
            // Animate particle
            this.tweens.add({
                targets: particle,
                alpha: 0,
                scale: 0,
                duration: 800 + Math.random() * 600,
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
    
    // Create a speech bubble
    createSpeechBubble(container, x, y, width, height, quote) {
        const bubbleContainer = this.add.container(x, y);
        container.add(bubbleContainer);
        
        // Create the speech bubble background
        const bubble = this.add.graphics();
        bubble.fillStyle(0xffffff, 0.9);
        bubble.lineStyle(2, 0x387eff, 1);
        
        // Draw rounded rectangle
        bubble.fillRoundedRect(0, 0, width, height, 10);
        bubble.strokeRoundedRect(0, 0, width, height, 10);
        
        // Add the pointer at the bottom
        bubble.fillTriangle(
            width/2 - 10, height,
            width/2 + 10, height,
            width/2, height + 15
        );
        bubble.lineBetween(width/2 - 10, height, width/2, height + 15);
        bubble.lineBetween(width/2 + 10, height, width/2, height + 15);
        
        bubbleContainer.add(bubble);
        
        // Add text
        const text = this.add.text(
            width/2, height/2, 
            quote, 
            { 
                font: '16px Arial',
                color: '#000000'
            }
        ).setOrigin(0.5);
        
        bubbleContainer.add(text);
        
        // Fade in animation
        bubbleContainer.setAlpha(0);
        this.tweens.add({
            targets: bubbleContainer,
            alpha: 1,
            y: y - 10,
            duration: 300
        });
        
        return bubbleContainer;
    }
} 