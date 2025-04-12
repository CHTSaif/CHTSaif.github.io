class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Create loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 720, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Loading text
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '32px Arial',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // Percent text
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '0%',
            style: {
                font: '24px Arial',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // Missing asset warning
        const warningText = this.make.text({
            x: width / 2,
            y: height - 50,
            text: 'Note: This is a prototype. Art assets are placeholders.',
            style: {
                font: '16px Arial',
                fill: '#ff9900'
            }
        });
        warningText.setOrigin(0.5, 0.5);

        // Loading events
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x4a6fa5, 1);
            progressBar.fillRect(250, 280, 700 * value, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Error handler for missing assets
        this.load.on('loaderror', function (file) {
            console.log('Error loading asset: ', file.src);
            // Continue loading other assets
        });

        // Use safe loading for assets that might be missing
        this.safeLoadAssets();

        // Load background music for the entire website
        this.load.audio('bg-music', [
            'assets/audio/background-music.mp3',
            'assets/audio/background-music.ogg'
        ]);

        // Add callback for successful music loading
        this.load.on('filecomplete-audio-bg-music', () => {
            console.log('Background music loaded successfully');
        });

        // Add error callback
        this.load.on('loaderror', (fileObj) => {
            console.error('Failed to load file:', fileObj.url);
        });
    }

    // Load assets with error handling
    safeLoadAssets() {
        // Create simple placeholder for character
        this.createPlaceholderSprite('character', 64, 96);

        // Try to load background images, create placeholders if not found
        this.createPlaceholderImage('menu-bg', 0x333333);
        this.createPlaceholderImage('intro-bg', 0x121e3d);
        this.createPlaceholderImage('skills-bg', 0x1a1a2e);
        this.createPlaceholderImage('experience-bg', 0x0a192f);
        this.createPlaceholderImage('projects-bg', 0x2a0e61);
        this.createPlaceholderImage('contact-bg', 0x05192d);

        // Create platform placeholder
        this.createPlaceholderImage('platform', 0x888888);

        // Create skill icon placeholder - ensure this works for skill collection
        this.createInteractiveSkillIcon();

        // Create button placeholder
        this.createPlaceholderImage('button', 0x4a6fa5);

        // Create dialog box placeholder
        this.createPlaceholderImage('dialog-box', 0x000000);

        // Try to load actual audio files
        this.createPlaceholderAudio('background-music');
        this.createPlaceholderAudio('collect-sound');
        this.createPlaceholderAudio('jump-sound');
    }

    // Create a colored rectangle as a placeholder image
    createPlaceholderImage(key, color) {
        try {
            // First try to load the actual image
            this.load.image(key, 'assets/images/' + key + '.png');
        } catch (e) {
            console.log('Creating placeholder for: ' + key);

            // Create a placeholder texture
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(color, 1);
            graphics.fillRect(0, 0, 200, 200);
            graphics.generateTexture(key, 200, 200);
        }
    }

    // Create a specialized skill icon to ensure skill collection works
    createInteractiveSkillIcon() {
        const key = 'skill-icon';
        try {
            // First try to load the actual image
            this.load.image(key, 'assets/images/' + key + '.png');
        } catch (e) {
            console.log('Creating enhanced placeholder for skill icon');

            // Create a more visually distinct placeholder for skill icons
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });

            // Draw a more attractive skill icon
            graphics.fillStyle(0x4a6fa5, 1);
            graphics.fillCircle(100, 100, 90);

            // Add inner details
            graphics.fillStyle(0x6db33f, 1);
            graphics.fillCircle(100, 100, 70);

            graphics.fillStyle(0xffffff, 1);
            graphics.fillCircle(100, 100, 50);

            graphics.lineStyle(8, 0x4a6fa5, 1);
            graphics.beginPath();
            graphics.moveTo(70, 70);
            graphics.lineTo(130, 130);
            graphics.moveTo(130, 70);
            graphics.lineTo(70, 130);
            graphics.strokePath();

            // Generate the texture
            graphics.generateTexture(key, 200, 200);
        }
    }

    // Create a placeholder audio effect that synthesizes sound
    createPlaceholderAudio(key) {
        try {
            // First try to load the actual audio
            this.load.audio(key, ['assets/audio/' + key + '.mp3', 'assets/audio/' + key + '.ogg']);
        } catch (e) {
            console.log('Creating placeholder for audio: ' + key);

            // Create a synthesized sound as placeholder
            const synth = this.createSynthSound(key);
            if (synth) {
                console.log('Successfully created synthetic placeholder for: ' + key);
            }
        }
    }

    // Create a synthesized sound and store it
    createSynthSound(key) {
        if (!this.sys.game.device.audio.webAudio) {
            console.log('Web Audio API not available for synthesized sounds');
            return false;
        }

        try {
            // Check if audioContext is available
            if (!this.sound.context) {
                console.log('Audio context not available');
                return false;
            }

            // Create an empty buffer to act as a placeholder
            // This will be filled with synthesized audio when played
            const buffer = this.sound.context.createBuffer(1, this.sound.context.sampleRate * 0.5, this.sound.context.sampleRate);

            // Create and add the placeholder sound to the cache
            this.cache.audio.add(key, buffer);

            // Mark this sound as a placeholder so we can synthesize it when played
            this.registry.set('synth_sound_' + key, true);

            return true;
        } catch (e) {
            console.log('Error creating synthetic sound:', e);
            return false;
        }
    }

    // Create a placeholder spritesheet for animations
    createPlaceholderSprite(key, frameWidth, frameHeight) {
        try {
            // First try to load the actual spritesheet
            this.load.spritesheet(key, 'assets/sprites/' + key + '.png', {
                frameWidth: frameWidth,
                frameHeight: frameHeight
            });
        } catch (e) {
            console.log('Creating placeholder spritesheet for: ' + key);

            // Create a placeholder spritesheet
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });

            // Different colors for different animation states
            const colors = [0x4a6fa5, 0x6db33f, 0xdd0031];

            // Create 15 frames (3 rows of 5 frames)
            for (let i = 0; i < 15; i++) {
                graphics.fillStyle(colors[Math.floor(i / 5)], 1);
                graphics.fillRect(
                    (i % 5) * frameWidth,
                    Math.floor(i / 5) * frameHeight,
                    frameWidth,
                    frameHeight
                );
            }

            graphics.generateTexture(key, frameWidth * 5, frameHeight * 3);
        }
    }

    create() {
        // Initialize global background music
        this.initializeBackgroundMusic();

        // Start the next scene after a short delay
        this.time.delayedCall(300, () => {
            this.scene.start('MenuScene');
        });
    }

    // Initialize background music to play across all scenes
    initializeBackgroundMusic() {
        try {
            console.log('Initializing global background music...');

            // Create a global property to track music state across scenes
            if (!this.registry.get('bgMusicInitialized')) {
                // Check if audio exists in cache
                if (!this.cache.audio.exists('bg-music')) {
                    console.warn('Background music not found in cache. Creating placeholder...');
                    this.createSynthSound('bg-music');
                }

                // Create the background music with clear settings
                const bgMusic = this.sound.add('bg-music', {
                    volume: 0.25,
                    loop: true,
                    delay: 0
                });

                console.log('Background music created, attempting to play...');

                // Store the background music in the registry to access from any scene
                this.registry.set('bgMusic', bgMusic);
                this.registry.set('bgMusicInitialized', true);

                // Create a global mute/unmute function and store it in registry
                this.registry.set('toggleMute', (mute) => {
                    const music = this.registry.get('bgMusic');
                    if (music) {
                        if (mute) {
                            music.setVolume(0);
                        } else {
                            music.setVolume(0.25);
                            // Restart music if it's not playing
                            if (!music.isPlaying) {
                                try {
                                    music.play();
                                } catch (e) {
                                    console.error('Error restarting music:', e);
                                }
                            }
                        }
                    }
                });

                // Try to play the music with browser autoplay protection workaround
                const unmuteGame = () => {
                    const music = this.registry.get('bgMusic');
                    if (music && !music.isPlaying) {
                        try {
                            // Resume audio context if it was suspended
                            if (this.sound.context && this.sound.context.state === 'suspended') {
                                this.sound.context.resume().then(() => {
                                    music.play();
                                    console.log('Music context resumed & started on user interaction');
                                });
                            } else {
                                music.play();
                                console.log('Music started on user interaction');
                            }
                        } catch (e) {
                            console.error('Error playing music on interaction:', e);
                        }
                    }

                    // Remove the listeners after first use
                    document.removeEventListener('click', unmuteGame);
                    document.removeEventListener('keydown', unmuteGame);
                    this.input.off('pointerdown', unmuteGame);
                };

                // Add user interaction listeners for autoplay protection
                document.addEventListener('click', unmuteGame);
                document.addEventListener('keydown', unmuteGame);
                this.input.on('pointerdown', unmuteGame);

                // Don't try to play music automatically - wait for user interaction
                console.log('Waiting for user interaction to play background music');

                // Add a visual indicator to prompt user interaction
                const interactionPrompt = this.add.text(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 + 100,
                    'Click anywhere to enable audio',
                    {
                        font: '20px Arial',
                        fill: '#ffffff',
                        backgroundColor: '#4a6fa5',
                        padding: {
                            left: 15,
                            right: 15,
                            top: 10,
                            bottom: 10
                        }
                    }
                ).setOrigin(0.5);

                // Add a pulsing animation to draw attention
                this.tweens.add({
                    targets: interactionPrompt,
                    alpha: 0.7,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 800,
                    yoyo: true,
                    repeat: -1
                });

                // Remove the prompt after user interaction
                const removePrompt = () => {
                    if (interactionPrompt && interactionPrompt.active) {
                        interactionPrompt.destroy();
                    }
                };

                document.addEventListener('click', removePrompt, { once: true });
                document.addEventListener('keydown', removePrompt, { once: true });
                this.input.once('pointerdown', removePrompt);
            }
        } catch (error) {
            console.error('Error setting up background music:', error);
        }
    }
}