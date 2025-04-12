class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Load any additional assets specifically for this scene
        this.load.image('figurine', 'assets/images/figurine.png');
    }

    create() {
        // Dynamic gradient background
        this.createDynamicBackground();

        // Add particles effect
        this.createParticleEffect();

        // Create a center container for better layout
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Professional logo effect
        this.createLogo(centerX, 120);

        // Enhanced subtitle with modern typing animation
        const subtitleText = this.add.text(
            centerX,
            200,
            '',
            {
                font: 'bold 28px Arial',
                fill: '#86b3ff',
                stroke: '#ffffff',
                strokeThickness: 1,
                shadow: {
                    offsetX: 1,
                    offsetY: 1,
                    color: '#000000',
                    blur: 3,
                    fill: true
                }
            }
        ).setOrigin(0.5);

        // Create a subtle background for the subtitle
        const subtitleBg = this.add.graphics();
        subtitleBg.fillStyle(0x0a1929, 0.3);
        subtitleBg.fillRoundedRect(centerX - 300, 185, 600, 40, 5);
        this.children.sendToBack(subtitleBg);

        // Simulate typing effect with modern tech keywords
        const subtitle = 'Java | Spring Boot | SAP CAP | Azure | Cloud Developer';
        this.typewriteText(subtitleText, subtitle, 40);

        // Character display with code rain effect
        this.createCodeRain(centerX - 180, centerY, 360, 200);

        // We're removing the blue avatar to only show the figurine
        // this.createAvatar(centerX + 180, centerY);

        // Start Adventure button with glowing effect
        const startButton = this.createButton(
            centerX,
            centerY + 180,
            'Start Adventure',
            {
                font: 'bold 32px Arial',
                fill: '#ffffff',
                backgroundColor: '#4a6fa5',
                padding: {
                    left: 20,
                    right: 20,
                    top: 12,
                    bottom: 12
                }
            }
        );

        // Button hover and click effects with sound
        startButton.on('pointerover', () => {
            startButton.setStyle({ backgroundColor: '#3a5a8a' });
            this.buttonGlow(startButton, true);
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ backgroundColor: '#4a6fa5' });
            this.buttonGlow(startButton, false);
        });

        // Button click
        startButton.on('pointerdown', () => {
            this.createClickEffect(centerX, centerY + 180);
            this.scene.start('IntroScene');
        });

        // Description text with pulsing effect
        const descText = this.add.text(
            centerX,
            centerY + 250,
            'Click to explore my interactive resume!',
            {
                font: '22px Arial',
                fill: '#ffffff',
                stroke: '#4a6fa5',
                strokeThickness: 1
            }
        ).setOrigin(0.5);

        // Add pulsing animation to description
        this.tweens.add({
            targets: descText,
            alpha: 0.7,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Don't try to play background music directly - it's handled by PreloadScene
        // and will start after user interaction

        // Bottom info text with floating animation
        const infoText = this.add.text(
            centerX,
            this.cameras.main.height - 40,
            'Phone: +216 52 167 839 | Email: saif.chtourou@esprit.tn | Location: Ben Arous, Mourouj 5',
            {
                font: '16px Arial',
                fill: '#888888'
            }
        ).setOrigin(0.5);

        // Animate info text
        this.tweens.add({
            targets: infoText,
            y: this.cameras.main.height - 35,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add figurine character with creative animations
        this.createFigurineCharacter();

        // Create global audio control
        this.createGlobalAudioControl();
    }

    createDynamicBackground() {
        // Create a modern gradient background with animated elements
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create a gradient background using multiple layers
        // Base dark background with a richer blue tone
        this.add.rectangle(0, 0, width, height, 0x0a1929).setOrigin(0, 0);

        // Add a subtle radial gradient overlay
        const gradientGraphics = this.add.graphics();
        const gradientRadius = Math.max(width, height) * 0.8;

        // Create a radial gradient
        gradientGraphics.fillGradientStyle(0x1a3b5c, 0x1a3b5c, 0x0a1929, 0x0a1929, 0.4);
        gradientGraphics.fillCircle(width/2, height/2, gradientRadius);

        // Add a subtle vignette effect
        const vignette = this.add.graphics();
        const vignetteRadius = Math.max(width, height) * 0.9;
        vignette.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0, 0, 0.3, 0.3);
        vignette.fillRect(0, 0, width, height);

        // Add more sophisticated grid lines for tech feel
        // Horizontal lines with varying opacity
        for (let i = 0; i < width; i += 40) {
            const opacity = 0.05 + (Math.sin(i * 0.01) * 0.05);
            const line = this.add.line(0, 0, i, 0, i, height, 0x4a6fa5, opacity).setOrigin(0, 0);

            // Animate some lines
            if (Math.random() > 0.7) {
                this.tweens.add({
                    targets: line,
                    alpha: opacity * 3,
                    duration: 2000 + Math.random() * 3000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        }

        // Vertical lines with varying opacity
        for (let i = 0; i < height; i += 40) {
            const opacity = 0.05 + (Math.sin(i * 0.01) * 0.05);
            const line = this.add.line(0, 0, 0, i, width, i, 0x4a6fa5, opacity).setOrigin(0, 0);

            // Animate some lines
            if (Math.random() > 0.7) {
                this.tweens.add({
                    targets: line,
                    alpha: opacity * 3,
                    duration: 2000 + Math.random() * 3000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        }

        // Add digital circuit-like patterns
        const circuitGraphics = this.add.graphics();
        circuitGraphics.lineStyle(1, 0x4a6fa5, 0.2);

        // Create 5 random circuit paths
        for (let c = 0; c < 5; c++) {
            const startX = Math.random() * width;
            const startY = Math.random() * height;
            let currentX = startX;
            let currentY = startY;

            circuitGraphics.beginPath();
            circuitGraphics.moveTo(currentX, currentY);

            // Create a path with 5-10 segments
            const segments = 5 + Math.floor(Math.random() * 5);
            for (let s = 0; s < segments; s++) {
                // Decide whether to go horizontal or vertical
                if (Math.random() > 0.5) {
                    currentX += (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100);
                } else {
                    currentY += (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100);
                }

                circuitGraphics.lineTo(currentX, currentY);

                // Add a node at some points
                if (Math.random() > 0.7) {
                    circuitGraphics.strokeCircle(currentX, currentY, 3);
                }
            }

            circuitGraphics.strokePath();
        }

        // Add floating geometric shapes in the background
        for (let i = 0; i < 20; i++) {
            const size = 20 + Math.random() * 40;
            const x = Math.random() * width;
            const y = Math.random() * height;
            const alpha = 0.05 + Math.random() * 0.15;
            const color = [0x4a6fa5, 0x387eff, 0x6db33f][Math.floor(Math.random() * 3)];

            // Choose between different shapes
            const shapeType = Math.floor(Math.random() * 4);
            let shape;

            if (shapeType === 0) {
                // Circle
                shape = this.add.circle(x, y, size / 2, color, alpha);
            } else if (shapeType === 1) {
                // Rectangle
                shape = this.add.rectangle(x, y, size, size, color, alpha);
            } else if (shapeType === 2) {
                // Triangle
                const points = [
                    { x: 0, y: -size/2 },
                    { x: size/2, y: size/2 },
                    { x: -size/2, y: size/2 }
                ];
                shape = this.add.polygon(x, y, points, color, alpha);
            } else {
                // Hexagon
                const points = [];
                for (let j = 0; j < 6; j++) {
                    const angle = (j / 6) * Math.PI * 2;
                    points.push({
                        x: Math.cos(angle) * (size/2),
                        y: Math.sin(angle) * (size/2)
                    });
                }
                shape = this.add.polygon(x, y, points, color, alpha);
            }

            // Add floating animation with rotation
            this.tweens.add({
                targets: shape,
                y: y - 100 - Math.random() * 150,
                x: x + (Math.random() * 100 - 50),
                angle: shape.angle + (Math.random() > 0.5 ? 360 : -360),
                alpha: 0,
                duration: 15000 + Math.random() * 15000,
                repeat: -1,
                repeatDelay: Math.random() * 2000,
                ease: 'Sine.easeInOut',
                onRepeat: () => {
                    shape.y = y;
                    shape.x = x;
                    shape.alpha = alpha;
                }
            });
        }
    }

    createParticleEffect() {
        // Create enhanced floating particles with varied colors and shapes
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const colors = [0x4a6fa5, 0x387eff, 0x6db33f, 0x86b3ff];

        // Create more particles for a richer effect
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 1 + Math.random() * 3;
            const alpha = 0.2 + Math.random() * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Randomly choose between circle and small square particles
            let particle;
            if (Math.random() > 0.3) {
                particle = this.add.circle(x, y, size, color, alpha);
            } else {
                particle = this.add.rectangle(x, y, size * 2, size * 2, color, alpha);
                // Add rotation to square particles
                this.tweens.add({
                    targets: particle,
                    angle: particle.angle + (Math.random() > 0.5 ? 360 : -360),
                    duration: 10000 + Math.random() * 15000,
                    repeat: -1,
                    ease: 'Linear'
                });
            }

            // Create varied movement patterns
            const movePattern = Math.floor(Math.random() * 3);

            if (movePattern === 0) {
                // Standard upward float
                this.tweens.add({
                    targets: particle,
                    y: particle.y - (300 + Math.random() * 400),
                    x: particle.x + (Math.random() * 100 - 50),
                    alpha: 0,
                    duration: 8000 + Math.random() * 12000,
                    repeat: -1,
                    repeatDelay: Math.random() * 1000,
                    ease: 'Linear',
                    onRepeat: () => {
                        particle.y = height + 20;
                        particle.x = Math.random() * width;
                        particle.alpha = alpha;
                    }
                });
            } else if (movePattern === 1) {
                // Spiral movement
                const centerX = particle.x;
                const radius = 20 + Math.random() * 40;
                let angle = Math.random() * Math.PI * 2;

                this.tweens.add({
                    targets: particle,
                    y: '-=' + (300 + Math.random() * 400),
                    alpha: 0,
                    duration: 10000 + Math.random() * 10000,
                    repeat: -1,
                    repeatDelay: Math.random() * 1000,
                    ease: 'Linear',
                    onUpdate: (tween, target) => {
                        angle += 0.02;
                        target.x = centerX + Math.cos(angle) * radius;
                    },
                    onRepeat: () => {
                        particle.y = height + 20;
                        particle.x = Math.random() * width;
                        particle.alpha = alpha;
                    }
                });
            } else {
                // Zigzag movement
                this.tweens.add({
                    targets: particle,
                    y: particle.y - (300 + Math.random() * 400),
                    alpha: 0,
                    duration: 12000 + Math.random() * 8000,
                    repeat: -1,
                    repeatDelay: Math.random() * 1000,
                    ease: 'Linear',
                    onUpdate: (tween, target, key, value, progress) => {
                        // Create zigzag effect
                        target.x = particle.x + Math.sin(progress * 10) * 30;
                    },
                    onRepeat: () => {
                        particle.y = height + 20;
                        particle.x = Math.random() * width;
                        particle.alpha = alpha;
                    }
                });
            }

            // Add subtle pulsing to some particles
            if (Math.random() > 0.7) {
                this.tweens.add({
                    targets: particle,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    duration: 2000 + Math.random() * 2000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        }
    }

    createLogo(x, y) {
        // Create a container for the logo elements
        const logoContainer = this.add.container(x, y);

        // Add a subtle glow effect behind the text
        const glow = this.add.graphics();
        glow.fillStyle(0x4a6fa5, 0.2);
        glow.fillCircle(0, 0, 150);
        logoContainer.add(glow);

        // Create a professional looking title with enhanced styling
        const titleText = this.add.text(
            0,
            0,
            'Saif Chtourou',
            {
                font: 'bold 68px Arial',
                fill: '#ffffff',
                stroke: '#387eff',
                strokeThickness: 6,
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#000000',
                    blur: 5,
                    fill: true
                }
            }
        ).setOrigin(0.5);
        logoContainer.add(titleText);

        // Create decorative elements around the title
        // Left bracket
        const leftBracket = this.add.text(
            -titleText.width/2 - 30,
            0,
            '{',
            {
                font: 'bold 80px Arial',
                fill: '#387eff'
            }
        ).setOrigin(0.5);
        logoContainer.add(leftBracket);

        // Right bracket
        const rightBracket = this.add.text(
            titleText.width/2 + 30,
            0,
            '}',
            {
                font: 'bold 80px Arial',
                fill: '#387eff'
            }
        ).setOrigin(0.5);
        logoContainer.add(rightBracket);

        // Create a decorative underline with gradient effect
        const underlineGraphics = this.add.graphics();
        underlineGraphics.lineGradientStyle(6, 0x387eff, 0x387eff, 0x6db33f, 0x6db33f, 1);
        underlineGraphics.lineBetween(-titleText.width/2 * 0.8, 45, titleText.width/2 * 0.8, 45);
        underlineGraphics.setAlpha(0); // Start invisible for animation
        logoContainer.add(underlineGraphics);

        // Create decorative dots at the ends of the underline
        const leftDot = this.add.circle(-titleText.width/2 * 0.8, 45, 4, 0x387eff, 1);
        const rightDot = this.add.circle(titleText.width/2 * 0.8, 45, 4, 0x6db33f, 1);
        leftDot.setAlpha(0);
        rightDot.setAlpha(0);
        logoContainer.add(leftDot);
        logoContainer.add(rightDot);

        // Animate the underline and dots appearing
        this.tweens.add({
            targets: [underlineGraphics, leftDot, rightDot],
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            delay: 300
        });

        // Add subtle floating animation to the entire logo
        this.tweens.add({
            targets: logoContainer,
            y: y - 5,
            duration: 2500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add subtle scaling pulse to the glow
        this.tweens.add({
            targets: glow,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add subtle rotation to the brackets
        this.tweens.add({
            targets: leftBracket,
            angle: -5,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.tweens.add({
            targets: rightBracket,
            angle: 5,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        return logoContainer;
    }

    createAvatar(x, y) {
        // Create a stylized avatar using shapes instead of a simple rectangle
        const container = this.add.container(x, y);

        // Base shape
        const body = this.add.rectangle(0, 0, 100, 160, 0x4a6fa5).setOrigin(0.5);
        container.add(body);

        // Head
        const head = this.add.circle(0, -60, 30, 0x4a6fa5);
        container.add(head);

        // Eyes
        const leftEye = this.add.circle(-10, -65, 5, 0x0a1929);
        const rightEye = this.add.circle(10, -65, 5, 0x0a1929);
        container.add(leftEye);
        container.add(rightEye);

        // Mouth
        const mouth = this.add.rectangle(0, -45, 20, 3, 0x0a1929);
        container.add(mouth);

        // Technical symbols around avatar
        const symbols = [
            { shape: 'text', content: '{ }', x: -60, y: -40, angle: -15 },
            { shape: 'text', content: '</>', x: 60, y: -30, angle: 15 },
            { shape: 'text', content: 'Java', x: -50, y: 40, angle: -10 },
            { shape: 'text', content: 'Spring', x: 50, y: 50, angle: 10 }
        ];

        symbols.forEach(symbol => {
            let element;
            if (symbol.shape === 'text') {
                element = this.add.text(
                    symbol.x,
                    symbol.y,
                    symbol.content,
                    { font: '16px Arial', fill: '#ffffff' }
                ).setOrigin(0.5).setAngle(symbol.angle);
            }

            container.add(element);

            // Animate the symbols
            this.tweens.add({
                targets: element,
                y: element.y - 10,
                alpha: 0.7,
                duration: 1500 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });

        // Add subtle animation to character
        this.tweens.add({
            targets: container,
            y: container.y - 10,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        return container;
    }

    createCodeRain(x, y, width, height) {
        // Create a matrix-like code rain effect
        const container = this.add.container(x, y);

        // Background panel
        const panel = this.add.rectangle(0, 0, width, height, 0x0a1929, 0.7).setOrigin(0.5);
        container.add(panel);

        // Code lines
        const codeSymbols = [
            'import java.util.*;',
            'public class Resume {',
            '   private String name = "Saif";',
            '   public void skills() {',
            '      List<String> skills = new ArrayList<>();',
            '      skills.add("Java");',
            '      skills.add("Spring Boot");',
            '      skills.add("Azure");',
            '   }',
            '   public int experience() {',
            '      return 2;  // years',
            '   }',
            '}'
        ];

        // Create and animate code lines
        for (let i = 0; i < codeSymbols.length; i++) {
            const lineText = this.add.text(
                -width/2 + 10,
                -height/2 + 20 + (i * 20),
                codeSymbols[i],
                {
                    font: '14px Courier New',
                    fill: '#4a6fa5'
                }
            ).setOrigin(0, 0.5);

            container.add(lineText);

            // Fade in effect for each line
            lineText.setAlpha(0);
            this.tweens.add({
                targets: lineText,
                alpha: 1,
                duration: 500,
                delay: i * 200,
                ease: 'Power2'
            });

            // For certain java keywords, change the color
            const keywords = ['public', 'private', 'class', 'void', 'int', 'String', 'List', 'ArrayList', 'new', 'return'];
            keywords.forEach(keyword => {
                if (codeSymbols[i].includes(keyword)) {
                    // This is a simplistic approach - in a real IDE you'd use proper syntax highlighting
                    const highlighted = codeSymbols[i].replace(keyword, `[color=#e06c75]${keyword}[/color]`);
                    lineText.setText(highlighted);
                    lineText.setColor('#4a6fa5');
                }
            });
        }

        // Blinking cursor at the end
        const cursor = this.add.rectangle(
            -width/2 + 10 + 20, // Approximate position after last char
            -height/2 + 20 + (codeSymbols.length * 20),
            8,
            16,
            0xe06c75
        ).setOrigin(0, 0.5);

        container.add(cursor);

        this.tweens.add({
            targets: cursor,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        return container;
    }

    createButton(x, y, text, style) {
        // Create a container for the button elements
        const buttonContainer = this.add.container(x, y);

        // Create a more sophisticated button background with gradient and rounded corners
        const buttonWidth = text.length * 16 + style.padding.left + style.padding.right;
        const buttonHeight = 50 + style.padding.top + style.padding.bottom;

        // Create the main button background
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(0x387eff, 1);
        buttonBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 10);
        buttonContainer.add(buttonBg);

        // Add a subtle gradient overlay
        const gradientBg = this.add.graphics();
        gradientBg.fillGradientStyle(0x4a6fa5, 0x387eff, 0x4a6fa5, 0x387eff, 0.3);
        gradientBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 10);
        buttonContainer.add(gradientBg);

        // Add a subtle border
        const border = this.add.graphics();
        border.lineStyle(2, 0x86b3ff, 0.8);
        border.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 10);
        buttonContainer.add(border);

        // Add the button text
        const buttonText = this.add.text(
            0,
            0,
            text,
            {
                font: style.font,
                fill: style.fill,
                align: 'center'
            }
        ).setOrigin(0.5);
        buttonContainer.add(buttonText);

        // Add decorative elements
        // Left bracket
        const leftBracket = this.add.text(
            -buttonWidth/2 - 15,
            0,
            '{',
            {
                font: 'bold 32px Arial',
                fill: '#86b3ff'
            }
        ).setOrigin(0.5);
        buttonContainer.add(leftBracket);

        // Right bracket
        const rightBracket = this.add.text(
            buttonWidth/2 + 15,
            0,
            '}',
            {
                font: 'bold 32px Arial',
                fill: '#86b3ff'
            }
        ).setOrigin(0.5);
        buttonContainer.add(rightBracket);

        // Add a glow effect
        const glow = this.add.graphics();
        glow.fillStyle(0x86b3ff, 0.3);
        glow.fillRoundedRect(-buttonWidth/2 - 10, -buttonHeight/2 - 10, buttonWidth + 20, buttonHeight + 20, 15);
        glow.setAlpha(0); // Start invisible
        buttonContainer.add(glow);

        // Store references to elements that need to be animated
        buttonContainer.bg = buttonBg;
        buttonContainer.gradient = gradientBg;
        buttonContainer.text = buttonText;
        buttonContainer.glow = glow;
        buttonContainer.leftBracket = leftBracket;
        buttonContainer.rightBracket = rightBracket;

        // Make the container interactive
        buttonContainer.setSize(buttonWidth + 40, buttonHeight + 20);
        buttonContainer.setInteractive({ useHandCursor: true });

        return buttonContainer;
    }

    buttonGlow(button, isHovering) {
        if (isHovering) {
            // Hover state
            this.tweens.add({
                targets: button.glow,
                alpha: 0.8,
                duration: 200
            });

            this.tweens.add({
                targets: button.bg,
                alpha: 0.9,
                duration: 200
            });

            this.tweens.add({
                targets: button.gradient,
                alpha: 0.7,
                duration: 200
            });

            this.tweens.add({
                targets: [button.leftBracket, button.rightBracket],
                scale: 1.2,
                duration: 200
            });

            this.tweens.add({
                targets: button.text,
                scale: 1.05,
                duration: 200
            });

            // Add a subtle floating animation
            this.tweens.add({
                targets: button,
                y: button.y - 3,
                duration: 200
            });
        } else {
            // Normal state
            this.tweens.add({
                targets: button.glow,
                alpha: 0,
                duration: 200
            });

            this.tweens.add({
                targets: button.bg,
                alpha: 1,
                duration: 200
            });

            this.tweens.add({
                targets: button.gradient,
                alpha: 0.3,
                duration: 200
            });

            this.tweens.add({
                targets: [button.leftBracket, button.rightBracket],
                scale: 1,
                duration: 200
            });

            this.tweens.add({
                targets: button.text,
                scale: 1,
                duration: 200
            });

            // Return to original position
            this.tweens.add({
                targets: button,
                y: button.y + 3,
                duration: 200
            });
        }
    }

    createClickEffect(x, y) {
        // Create a more sophisticated click effect with multiple elements

        // Main ripple effect
        const circle = this.add.circle(x, y, 10, 0xffffff, 0.7);

        // Secondary ripple with different timing
        const circle2 = this.add.circle(x, y, 5, 0x86b3ff, 0.5);

        // Small particles that fly outward
        const particles = [];
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const particle = this.add.circle(
                x,
                y,
                3,
                0x86b3ff,
                0.8
            );
            particles.push(particle);

            // Animate particles flying outward
            this.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * 70,
                y: y + Math.sin(angle) * 70,
                alpha: 0,
                scale: 0.5,
                duration: 700,
                ease: 'Power2',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }

        // Flash effect
        const flash = this.add.circle(x, y, 20, 0xffffff, 0.3);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            scale: 2,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                flash.destroy();
            }
        });

        // Main ripple animation
        this.tweens.add({
            targets: circle,
            radius: 60,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                circle.destroy();
            }
        });

        // Secondary ripple with delay
        this.tweens.add({
            targets: circle2,
            radius: 80,
            alpha: 0,
            duration: 1000,
            delay: 100,
            ease: 'Power2',
            onComplete: () => {
                circle2.destroy();
            }
        });

        // Add a camera shake effect
        this.cameras.main.shake(100, 0.005);
    }

    typewriteText(textObject, text, delay = 30) {
        // Create a container for the typing effect
        const container = this.add.container(textObject.x, textObject.y);

        // Clear the original text object
        textObject.setText('');

        // Create a cursor
        const cursor = this.add.text(0, 0, '|', {
            font: textObject.style.font,
            fill: '#86b3ff'
        }).setOrigin(0, 0.5);
        container.add(cursor);

        // Add blinking animation to cursor
        this.tweens.add({
            targets: cursor,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // Track current position and text
        let currentText = '';
        let i = 0;
        const length = text.length;

        // Add typing sound (subtle)
        const makeTypingSound = () => {
            if (Math.random() > 0.7) {
                // Simulate a typing sound with a very quiet beep
                try {
                    const typingSound = this.sound.add('typing-sound', { volume: 0.05 });
                    typingSound.play();
                } catch (e) {
                    // No sound available, that's fine
                }
            }
        };

        // Create a typing event with variable speed
        const typingEvent = this.time.addEvent({
            callback: () => {
                // Add the next character
                currentText += text[i];
                textObject.setText(currentText);

                // Update cursor position
                cursor.x = textObject.width / 2 + 5;

                // Make typing sound
                makeTypingSound();

                // Move to next character
                i++;

                // Vary the typing speed slightly for realism
                if (i < length) {
                    // Punctuation gets a longer pause
                    if (text[i-1] === '.' || text[i-1] === ',' || text[i-1] === '|') {
                        typingEvent.delay = delay * 3;
                    } else {
                        // Random slight variation in typing speed
                        typingEvent.delay = delay * (0.8 + Math.random() * 0.5);
                    }
                }

                // When done, add a subtle animation to the text
                if (i >= length) {
                    // Subtle pulse animation on the text
                    this.tweens.add({
                        targets: textObject,
                        scaleX: 1.03,
                        scaleY: 1.03,
                        duration: 800,
                        yoyo: true,
                        repeat: 1,
                        ease: 'Sine.easeInOut'
                    });

                    // Hide cursor after typing is complete
                    this.time.delayedCall(1000, () => {
                        this.tweens.add({
                            targets: cursor,
                            alpha: 0,
                            duration: 500,
                            onComplete: () => {
                                cursor.destroy();
                            }
                        });
                    });
                }
            },
            repeat: length - 1,
            delay: delay
        });

        return textObject;
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

    // Create the figurine character with animations
    createFigurineCharacter() {
        try {
            // Create a container for the figurine and its effects - moved to the right side
            const containerX = this.cameras.main.width - 180; // Changed from 180 to right side
            const containerY = 350;
            const figurineContainer = this.add.container(containerX, containerY);

            // Create a glowing background panel for the figurine - slightly larger
            const glowPanel = this.add.rectangle(0, 0, 240, 300, 0x387eff, 0.1);
            glowPanel.setStrokeStyle(2, 0x86b3ff, 0.8);
            figurineContainer.add(glowPanel);

            // Add decorative tech corners to the panel
            this.addTechCorners(figurineContainer, glowPanel.width/2, glowPanel.height/2);

            // Check if the figurine image exists in the cache
            if (this.textures.exists('figurine')) {
                // Add the figurine image with a slight bounce effect
                const figurine = this.add.image(0, 0, 'figurine');

                // Scale the figurine to fit nicely in the panel - slightly larger
                const scaleFactor = Math.min(
                    (glowPanel.width - 30) / figurine.width,
                    (glowPanel.height - 30) / figurine.height
                ) * 1.1; // Make it 10% larger
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

                // Add floating tech logos around the figurine (Java, Python)
                this.addFloatingTechLogos(figurineContainer);

                // Add hover effects
                glowPanel.setInteractive();
                glowPanel.on('pointerover', () => {
                    this.createFigurineParticles(figurineContainer);
                    glowPanel.setStrokeStyle(3, 0x86b3ff, 1);
                });

                glowPanel.on('pointerout', () => {
                    glowPanel.setStrokeStyle(2, 0x86b3ff, 0.8);
                });

                // Add click effect with quote
                glowPanel.on('pointerdown', () => {
                    // Remove any existing speech bubbles first
                    figurineContainer.getAll().forEach(child => {
                        if (child instanceof Phaser.GameObjects.Container && child !== figurine) {
                            child.destroy();
                        }
                    });

                    // Create a speech bubble with a quote - adjusted position for right side
                    this.createSpeechBubble(
                        figurineContainer,
                        -120, -50, // Changed from 120 to -120 to appear on the left side of figurine
                        220, 100, // Increased size for better text display
                        'Hello! I\'m Saif, a Java developer with a passion for creating elegant solutions.'
                    );
                });
            } else {
                // Create a placeholder if the figurine image doesn't exist
                const placeholder = this.add.text(0, 0, '[Figurine]', {
                    font: '20px Arial',
                    fill: '#ffffff'
                }).setOrigin(0.5);
                figurineContainer.add(placeholder);
            }

            return figurineContainer;
        } catch (e) {
            console.error('Error creating figurine character:', e);
            // Return an empty container to avoid errors
            return this.add.container(0, 0);
        }
    }

    // Add tech-style corners to a panel
    addTechCorners(container, width, height) {
        const cornerSize = 20;
        const corners = [
            { x: -width, y: -height },  // Top-left
            { x: width - cornerSize, y: -height },  // Top-right
            { x: -width, y: height - cornerSize },  // Bottom-left
            { x: width - cornerSize, y: height - cornerSize }  // Bottom-right
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

    // Create a speech bubble
    createSpeechBubble(container, x, y, width, height, quote) {
        const bubbleContainer = this.add.container(x, y);
        container.add(bubbleContainer);

        // Create the speech bubble background
        const bubble = this.add.graphics();
        bubble.fillStyle(0xffffff, 0.95); // Increased opacity for better readability
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

        // Add text with improved styling
        const text = this.add.text(
            width/2, height/2,
            quote,
            {
                font: 'bold 16px Arial',
                color: '#000000',
                align: 'center',
                wordWrap: { width: width - 20 } // Add word wrapping with padding
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

    // Create global audio control that works across scenes
    createGlobalAudioControl() {
        // Track current mute state
        const isMuted = this.registry.get('musicMuted') || false;

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
            isMuted ? '🔇' : '🔊',
            {
                font: '16px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);

        // Add click handler to toggle music
        audioButton.on('pointerdown', () => {
            // Get the current mute state
            const currentState = this.registry.get('musicMuted') || false;
            // Toggle to opposite state
            const newState = !currentState;

            // Update registry
            this.registry.set('musicMuted', newState);

            // Update visual
            audioIcon.setText(newState ? '🔇' : '🔊');

            // Call the global toggle function
            const toggleFunc = this.registry.get('toggleMute');
            if (toggleFunc) {
                toggleFunc(newState);
            } else {
                // Fallback if toggle function isn't available
                const music = this.registry.get('bgMusic');
                if (music) {
                    if (newState) {
                        music.setVolume(0);
                    } else {
                        music.setVolume(0.5);
                    }
                }
            }

            // Show status message
            this.showTemporaryMessage(newState ? '🔇 Sound off' : '🔊 Sound on');
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

    // Add floating tech logos around the figurine
    addFloatingTechLogos(container) {
        // Create tech logos that float around the figurine
        const techLogos = [
            { text: 'Java', color: '#e76f00', x: -80, y: 30, angle: -15 },
            { text: 'Python', color: '#306998', x: 80, y: -30, angle: 10 },
            { text: 'Spring', color: '#6db33f', x: -60, y: -60, angle: 5 },
            { text: 'Azure', color: '#0089d6', x: 70, y: 60, angle: -5 }
        ];

        techLogos.forEach(logo => {
            // Create text logo
            const logoText = this.add.text(
                logo.x,
                logo.y,
                logo.text,
                {
                    font: 'bold 18px Arial',
                    fill: logo.color,
                    stroke: '#ffffff',
                    strokeThickness: 2,
                    shadow: {
                        offsetX: 1,
                        offsetY: 1,
                        color: '#000000',
                        blur: 3,
                        fill: true
                    }
                }
            ).setOrigin(0.5).setAngle(logo.angle);

            container.add(logoText);

            // Create a floating animation path
            const radius = 20 + Math.random() * 15;
            const speed = 0.5 + Math.random() * 0.5;
            const startAngle = Math.random() * Math.PI * 2;

            // Store original position
            const originalX = logo.x;
            const originalY = logo.y;

            // Create a unique update function for this logo
            this.time.addEvent({
                delay: 50,
                callback: () => {
                    // Calculate new position in a circular path
                    const angle = startAngle + (this.time.now * speed * 0.001);
                    logoText.x = originalX + Math.cos(angle) * radius;
                    logoText.y = originalY + Math.sin(angle) * radius;
                },
                callbackScope: this,
                loop: true
            });

            // Add a subtle pulse effect
            this.tweens.add({
                targets: logoText,
                scale: 1.1,
                duration: 1500 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
}