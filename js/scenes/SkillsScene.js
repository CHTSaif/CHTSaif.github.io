class SkillsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SkillsScene' });
        
        // Skill data with enhanced properties
        this.skills = [
            { name: 'Java', x: 200, y: 250, color: 0xe76f00, icon: '☕', description: 'Core language expertise' },
            { name: 'Spring Boot', x: 400, y: 250, color: 0x6db33f, icon: '🍃', description: 'REST APIs, microservices' },
            { name: 'Angular', x: 600, y: 250, color: 0xdd0031, icon: 'Ⓐ', description: 'Frontend development' },
            { name: 'SAP Cloud Platform', x: 800, y: 250, color: 0x0faaff, icon: '☁️', description: 'Cloud applications' },
            { name: 'Azure', x: 1000, y: 250, color: 0x0089d6, icon: '🔷', description: 'Cloud infrastructure' },
            { name: 'Kafka', x: 200, y: 400, color: 0x231f20, icon: '🔄', description: 'Data streaming' },
            { name: 'RabbitMQ', x: 400, y: 400, color: 0xff6600, icon: '🐇', description: 'Message broker' },
            { name: 'Docker', x: 600, y: 400, color: 0x2496ed, icon: '🐳', description: 'Containerization' },
            { name: 'Jenkins', x: 800, y: 400, color: 0xd33833, icon: '🔧', description: 'CI/CD pipelines' },
            { name: 'Domain Driven Design', x: 1000, y: 400, color: 0x4b5563, icon: '🏗️', description: 'Architecture pattern' },
            { name: 'Grafana', x: 300, y: 550, color: 0xf46800, icon: '📊', description: 'Metrics visualization' },
            { name: 'Kibana', x: 500, y: 550, color: 0x00bfb3, icon: '📝', description: 'Log analytics' },
            { name: 'Sonar', x: 700, y: 550, color: 0x4e9bcd, icon: '🔍', description: 'Code quality' },
            { name: 'Git', x: 900, y: 550, color: 0xf05032, icon: '📦', description: 'Version control' }
        ];
        
        this.collectedSkills = 0;
        this.currentTooltip = null;
    }

    create() {
        // Create dynamic background
        this.createBackground();
        
        // Add title with animated particles
        this.createAnimatedTitle();
        
        // Progress counter with progress bar
        this.createProgressBar();
        
        // Create skill web network visualization
        this.createSkillNetwork();
        
        // Navigation buttons at the top 
        this.createNavigationBar();
    }
    
    createBackground() {
        // Space-like background with depth effect
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dark background gradient
        this.add.rectangle(0, 0, width, height, 0x0a0e29).setOrigin(0, 0);
        
        // Add grid lines with perspective effect
        const horizonY = height * 0.65;
        
        // Vertical lines with perspective
        for (let i = 0; i < width; i += 40) {
            const startX = i;
            const startY = 0;
            const endX = width/2 + (i - width/2) * 0.3;
            const endY = horizonY;
            
            this.add.line(0, 0, startX, startY, endX, endY, 0x16213e, 0.2).setOrigin(0);
        }
        
        // Horizontal lines with perspective
        for (let i = 0; i < height; i += 40) {
            if (i >= horizonY) {
                continue;
            }
            
            const yRatio = i / horizonY;
            const startWidth = width * (1 - yRatio * 0.5);
            const startX = (width - startWidth) / 2;
            
            this.add.line(0, i, startX, 0, startX + startWidth, 0, 0x16213e, 0.2).setOrigin(0);
        }
        
        // Add floating particles in the background
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 1 + Math.random() * 2;
            const alpha = 0.3 + Math.random() * 0.5;
            
            // Create star-like particle
            const particle = this.add.circle(x, y, size, 0xffffff, alpha);
            
            // Random pulsing animation
            this.tweens.add({
                targets: particle,
                alpha: 0.1 + Math.random() * 0.3,
                scaleX: 0.8,
                scaleY: 0.8,
                duration: 1000 + Math.random() * 3000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
    
    createAnimatedTitle() {
        const centerX = this.cameras.main.width / 2;
        
        // Main title with glow effect
        const titleText = this.add.text(
            centerX,
            80,
            'Technical Skills',
            { 
                font: 'bold 48px Arial',
                fill: '#ffffff',
                stroke: '#4a6fa5',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        // Add glow animation
        this.tweens.add({
            targets: titleText,
            strokeThickness: 6,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Particles around the title
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const distance = 70 + Math.random() * 20;
            const x = centerX + Math.cos(angle) * distance;
            const y = 80 + Math.sin(angle) * (distance * 0.5);
            const size = 2 + Math.random() * 4;
            
            const particle = this.add.circle(x, y, size, 0x4a6fa5, 0.7);
            
            // Create orbital animation
            this.tweens.add({
                targets: particle,
                x: centerX + Math.cos(angle + Math.PI) * distance,
                y: 80 + Math.sin(angle + Math.PI) * (distance * 0.5),
                duration: 4000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        // Subtitle
        const subtitleText = this.add.text(
            centerX,
            140,
            'Collect all skills by clicking on them!',
            { 
                font: '24px Arial',
                fill: '#e94560',
                stroke: '#000000',
                strokeThickness: 1
            }
        ).setOrigin(0.5);
        
        // Pulsing animation for subtitle
        this.tweens.add({
            targets: subtitleText,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createProgressBar() {
        const width = this.cameras.main.width;
        const centerX = width / 2;
        
        // Progress text
        this.progressText = this.add.text(
            centerX,
            600,
            'Skills Collected: 0/' + this.skills.length,
            { 
                font: 'bold 24px Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5);
        
        // Background bar
        this.progressBarBg = this.add.rectangle(
            centerX,
            640,
            400,
            20,
            0x222222,
            0.8
        ).setOrigin(0.5);
        
        // Progress bar 
        this.progressBar = this.add.rectangle(
            centerX - 200,
            640,
            0,
            20,
            0x4a6fa5,
            1
        ).setOrigin(0, 0.5);
        
        // Frame for progress bar
        this.add.rectangle(
            centerX,
            640,
            400,
            20,
            0xffffff,
            0
        ).setOrigin(0.5).setStrokeStyle(2, 0xffffff, 0.5);
    }
    
    updateProgressBar() {
        const progress = this.collectedSkills / this.skills.length;
        const barWidth = 400 * progress;
        
        // Update progress text
        this.progressText.setText('Skills Collected: ' + this.collectedSkills + '/' + this.skills.length);
        
        // Animate progress bar
        this.tweens.add({
            targets: this.progressBar,
            width: barWidth,
            duration: 300,
            ease: 'Power2'
        });
        
        // Color transition based on progress
        let barColor;
        if (progress < 0.3) {
            barColor = 0xe76f00; // Orange
        } else if (progress < 0.7) {
            barColor = 0xf7b731; // Yellow
        } else {
            barColor = 0x6db33f; // Green
        }
        
        this.progressBar.fillColor = barColor;
    }
    
    createSkillNetwork() {
        // Create a dynamic, interactive network/web of skills with connections
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Container for all skill elements
        this.skillContainer = this.add.container(0, 0);
        this.connectionLines = [];
        this.skillSprites = [];
        
        // Add a glowing background effect for the entire skill network
        this.createNetworkGlow();
        
        // Draw connections between related skills
        this.drawSkillConnections();
        
        // Create skill nodes with enhanced visuals
        this.skills.forEach((skill, index) => {
            // Create an enhanced animated skill node
            this.createEnhancedSkillNode(skill, index);
        });
        
        // Add floating particles around the network
        this.createNetworkParticles();
        
        // Add subtle central energy effect
        this.createCentralEnergyEffect();
    }
    
    createEnhancedSkillNode(skill, index) {
        // Create a SIMPLIFIED and MORE OBVIOUS interactive skill node
        
        // Use original skill position without wave effect to make clicking more reliable
        const posX = skill.x;
        const posY = skill.y;
        
        // Create a large clickable area first - bigger than the visual hexagon
        const clickArea = this.add.circle(posX, posY, 60, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
        this.skillContainer.add(clickArea);
        
        // Create outer glow as a simple circle for better visibility
        const glow = this.add.circle(
            posX, 
            posY,
            55,
            skill.color,
            0.3
        ).setOrigin(0.5);
        this.skillContainer.add(glow);
        
        // Create skill hexagon with solid background for better visibility
        const hexagon = this.add.polygon(
            posX, 
            posY,
            this.createHexPoints(posX, posY, 50),
            skill.color,
            0.9
        ).setOrigin(0.5);
        hexagon.setStrokeStyle(3, 0xffffff, 0.7);
        this.skillContainer.add(hexagon);
        
        // Add bright inner circle to emphasize clickability
        const innerCircle = this.add.circle(
            posX,
            posY,
            35,
            0xffffff,
            0.3
        ).setOrigin(0.5);
        this.skillContainer.add(innerCircle);
        
        // Skill icon in center with better visibility
        const iconText = this.add.text(
            posX,
            posY - 5,
            skill.icon,
            { 
                font: '36px Arial',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3
            }
        ).setOrigin(0.5);
        this.skillContainer.add(iconText);
        
        // Skill label below with improved visibility
        const skillText = this.add.text(
            posX,
            posY + 35,
            skill.name,
            { 
                font: 'bold 18px Arial',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        this.skillContainer.add(skillText);
        
        // Add "CLICK" text hint above the skill
        const clickText = this.add.text(
            posX,
            posY - 60,
            "CLICK",
            {
                font: 'bold 16px Arial',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3
            }
        ).setOrigin(0.5).setAlpha(0);
        this.skillContainer.add(clickText);
        
        // Group elements for skill
        const skillGroup = { 
            clickArea: clickArea,
            hexagon: hexagon, 
            glow: glow,
            innerCircle: innerCircle,
            icon: iconText, 
            text: skillText,
            clickText: clickText,
            data: skill,
            collected: false,
            index: index
        };
        
        this.skillSprites.push(skillGroup);
        
        // SIMPLIFIED INTERACTION HANDLERS
        // Using the clickArea as the main interaction point
        clickArea.on('pointerover', () => {
            if (!skillGroup.collected) {
                // Show the click hint
                this.tweens.add({
                    targets: clickText,
                    alpha: 1,
                    y: posY - 65,
                    duration: 200,
                    ease: 'Back.easeOut'
                });
                
                // Scale effect for better hover feedback
                this.tweens.add({
                    targets: [hexagon, innerCircle, iconText],
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 200
                });
                
                // Glow effect on hover
                this.tweens.add({
                    targets: glow,
                    alpha: 0.6,
                    scale: 1.2,
                    duration: 200
                });
                
                // Show tooltip
                this.showSimpleTooltip(skill);
                
                // Create hover sound
                this.createHoverSound(200 + (index * 20));
                
                // Create subtle particle burst on hover
                this.createHoverParticles(posX, posY, skill.color);
            }
        });
        
        clickArea.on('pointerout', () => {
            if (!skillGroup.collected) {
                // Hide the click hint
                this.tweens.add({
                    targets: clickText,
                    alpha: 0,
                    y: posY - 60,
                    duration: 200
                });
                
                // Reset scale
                this.tweens.add({
                    targets: [hexagon, innerCircle, iconText],
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200
                });
                
                // Reset glow
                this.tweens.add({
                    targets: glow,
                    alpha: 0.3,
                    scale: 1,
                    duration: 200
                });
                
                // Hide tooltip
                this.hideTooltip();
            }
        });
        
        // CLICK EVENT - Simplified for better reliability
        clickArea.on('pointerdown', () => {
            if (!skillGroup.collected) {
                // Mark as collected to prevent multiple clicks
                skillGroup.collected = true;
                
                // Call the collect function
                this.collectSkill(skillGroup);
                
                // Ripple effect for feedback
                this.createClickRipple(posX, posY);
            }
        });
        
        // Simple pulsing animation for idle state
        this.tweens.add({
            targets: glow,
            alpha: { from: 0.3, to: 0.5 },
            scale: { from: 1, to: 1.1 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Subtle animation for the inner circle
        this.tweens.add({
            targets: innerCircle,
            alpha: { from: 0.3, to: 0.5 },
            scale: { from: 1, to: 1.1 },
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        return skillGroup;
    }
    
    createGradientHexagon(x, y, radius, color, alpha) {
        // Create hexagonal shape with gradient effect
        
        // Lightened version of the color for gradient
        const r = (color >> 16) & 0xFF;
        const g = (color >> 8) & 0xFF;
        const b = color & 0xFF;
        
        // Create lighter color for gradient (blend with white)
        const lighterColor = Phaser.Display.Color.GetColor(
            Math.min(255, r + 80),
            Math.min(255, g + 80),
            Math.min(255, b + 80)
        );
        
        // Create hexagon with the base color
        const hexagon = this.createHexagon(x, y, radius, color, alpha);
        
        // Add inner hexagon with lighter color for gradient effect
        const innerHex = this.createHexagon(x, y, radius * 0.7, lighterColor, alpha);
        
        // Group the hexagons (outer is parent)
        hexagon.innerHex = innerHex;
        
        return hexagon;
    }
    
    createHexPoints(x, y, radius) {
        // Create points for a hexagon
        const points = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
            points.push({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius
            });
        }
        return points;
    }
    
    createHexagon(x, y, radius, fillColor, alpha) {
        // Create hexagonal shape for skill node
        const points = this.createHexPoints(x, y, radius);
        
        const hexagon = this.add.polygon(0, 0, points, fillColor, alpha).setOrigin(0);
        
        // Add stroke (outline)
        hexagon.setStrokeStyle(2, 0xffffff, 0.7);
        
        return hexagon;
    }
    
    createHoverSound(frequency) {
        // Create a subtle hover sound
        try {
            this.createSynthSound(frequency, frequency * 1.5, 0.1);
        } catch (e) {
            console.log('Error creating hover sound');
        }
    }
    
    createHoverParticles(x, y, color) {
        // Create subtle particles when hovering over a skill
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            
            const particle = this.add.circle(
                x,
                y,
                2 + Math.random() * 3,
                color,
                0.7
            );
            
            this.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                alpha: 0,
                scale: 0.5,
                duration: 500 + Math.random() * 300,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
    
    createClickRipple(x, y) {
        // Create a ripple effect when clicking on a skill
        for (let i = 0; i < 3; i++) {
            const circle = this.add.circle(
                x, y,
                50 + (i * 10),
                0xffffff,
                0.5 - (i * 0.15)
            );
            
            this.tweens.add({
                targets: circle,
                scale: 2 + (i * 0.5),
                alpha: 0,
                duration: 500 + (i * 150),
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    circle.destroy();
                }
            });
        }
    }
    
    createNetworkGlow() {
        // Create a subtle glow behind the entire skill network
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        const networkGlow = this.add.circle(
            centerX,
            centerY,
            300,
            0x4a6fa5,
            0.15
        );
        
        // Add subtle animation
        this.tweens.add({
            targets: networkGlow,
            scale: 1.1,
            alpha: 0.1,
            duration: 5000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createNetworkParticles() {
        // Create floating particles around the network to give it life
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 200;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            const particle = this.add.circle(
                x, y,
                1 + Math.random() * 2,
                0x4a6fa5,
                0.5
            );
            
            // Create orbital movement
            this.tweens.add({
                targets: particle,
                x: centerX + Math.cos(angle + Math.PI) * distance,
                y: centerY + Math.sin(angle + Math.PI) * distance,
                duration: 15000 + Math.random() * 10000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            // Add pulsing effect
            this.tweens.add({
                targets: particle,
                alpha: 0.2,
                scale: 0.7,
                duration: 2000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
    
    createCentralEnergyEffect() {
        // Create a central energy effect that connects all skills
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Central point
        const centralPoint = this.add.circle(
            centerX,
            centerY,
            5,
            0xffffff,
            0.8
        );
        
        // Add pulsing effect
        this.tweens.add({
            targets: centralPoint,
            scale: 1.5,
            alpha: 0.4,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Create energy lines connecting to skills
        this.skills.forEach((skill, index) => {
            const line = this.add.line(
                0, 0,
                centerX, centerY,
                skill.x, skill.y,
                0x4a6fa5, 0.1
            ).setOrigin(0, 0);
            
            this.skillContainer.add(line);
            
            // Make sure line is behind the skills
            line.setDepth(-1);
            
            // Add subtle pulsing effect to line
            this.tweens.add({
                targets: line,
                alpha: 0.3,
                duration: 2000 + (index * 200),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    drawSkillConnections() {
        // Create connections between related skills based on categories
        const connections = [
            // Frontend connections
            { source: 2, target: 4 }, // Angular - Azure
            
            // Backend connections
            { source: 0, target: 1 }, // Java - Spring
            { source: 0, target: 9 }, // Java - DDD
            { source: 1, target: 3 }, // Spring - SAP
            
            // DevOps connections
            { source: 4, target: 7 }, // Azure - Docker  
            { source: 7, target: 8 }, // Docker - Jenkins
            { source: 8, target: 12 }, // Jenkins - Sonar
            { source: 13, target: 8 }, // Git - Jenkins
            
            // Monitoring connections
            { source: 10, target: 11 }, // Grafana - Kibana
            
            // Messaging connections
            { source: 5, target: 6 }, // Kafka - RabbitMQ
            { source: 1, target: 5 }, // Spring - Kafka
        ];
        
        connections.forEach(conn => {
            const source = this.skills[conn.source];
            const target = this.skills[conn.target];
            
            // Create animated connection line
            this.createAnimatedConnection(source, target);
        });
    }
    
    createAnimatedConnection(source, target) {
        // Create an animated connection line between two skills
        
        // Create main connection line
        const line = this.add.line(
            0, 0,
            source.x, source.y,
            target.x, target.y,
            0x4a6fa5, 0.3
        ).setOrigin(0, 0);
        
        this.connectionLines.push(line);
        this.skillContainer.add(line);
        
        // Ensure lines are behind skill nodes
        line.setDepth(0);
        
        // Add subtle animation to the line
        this.tweens.add({
            targets: line,
            alpha: 0.5,
            duration: 2000 + Math.random() * 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Create moving particle along the connection
        this.createConnectionParticle(source, target);
    }
    
    createConnectionParticle(source, target) {
        // Create a particle that travels along the connection
        const particle = this.add.circle(
            source.x,
            source.y,
            3,
            0xffffff,
            0.8
        );
        
        // Create a timeline for the particle movement
        const timeline = this.tweens.createTimeline({
            loop: -1
        });
        
        // Add movement from source to target
        timeline.add({
            targets: particle,
            x: target.x,
            y: target.y,
            duration: 2000 + Math.random() * 1000,
            ease: 'Sine.easeInOut'
        });
        
        // Add movement from target to source
        timeline.add({
            targets: particle,
            x: source.x,
            y: source.y, 
            duration: 2000 + Math.random() * 1000,
            ease: 'Sine.easeInOut'
        });
        
        // Start the timeline
        timeline.play();
        
        // Add pulse animation to the particle
        this.tweens.add({
            targets: particle,
            alpha: 0.3,
            scale: 0.6,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    showSimpleTooltip(skill) {
        // Show a simpler tooltip that's easier to see
        this.hideTooltip();
        
        // Create a container for the tooltip
        this.currentTooltip = this.add.container(skill.x, skill.y - 100);
        
        // Create tooltip background with bold border
        const tooltipBg = this.add.rectangle(
            0,
            0,
            240,
            80,
            0x000000,
            0.8
        ).setOrigin(0.5);
        tooltipBg.setStrokeStyle(4, skill.color, 1);
        this.currentTooltip.add(tooltipBg);
        
        // Create tooltip title with larger font
        const titleText = this.add.text(
            0,
            -20,
            skill.name,
            {
                font: 'bold 22px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
        this.currentTooltip.add(titleText);
        
        // Create tooltip description with better contrast
        const descText = this.add.text(
            0,
            10,
            skill.description,
            {
                font: '16px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
        this.currentTooltip.add(descText);
        
        // Add bold "Click to collect" text
        const collectText = this.add.text(
            0,
            35,
            "CLICK TO COLLECT",
            {
                font: 'bold 16px Arial',
                fill: '#ffff00',
                align: 'center'
            }
        ).setOrigin(0.5);
        this.currentTooltip.add(collectText);
        
        // Make the tooltip visible immediately
        this.currentTooltip.setAlpha(1);
        
        // Add pulsing to the collect text for emphasis
        this.tweens.add({
            targets: collectText,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }
    
    hideTooltip() {
        if (this.currentTooltip) {
            this.tweens.add({
                targets: this.currentTooltip,
                alpha: 0,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                    // Add null check before destroying to prevent errors when rapidly switching skills
                    if (this.currentTooltip && !this.currentTooltip.destroyed) {
                        this.currentTooltip.destroy();
                    }
                    this.currentTooltip = null;
                }
            });
        }
    }
    
    collectSkill(skillGroup) {
        // Hide tooltip if visible
        this.hideTooltip();
        
        // Play collect sound if it exists
        try {
            if (this.cache.audio.exists('collect-sound')) {
                this.sound.play('collect-sound');
            } else {
                // Create a synthesized collect sound if file is missing
                this.createSynthSound(220, 440, 0.3);
            }
        } catch (e) {
            console.log('Collect sound not available');
            // Create a synthesized collect sound as fallback
            this.createSynthSound(220, 440, 0.3);
        }
        
        // Create an immediate visual reward
        this.createSkillCollectedEffect(skillGroup);
        
        // Flash effect on collection with improved animation
        this.tweens.add({
            targets: [skillGroup.hexagon, skillGroup.glow, skillGroup.innerCircle, skillGroup.icon, skillGroup.text],
            alpha: 0.8,
            scale: 1.8,
            duration: 200,
            yoyo: true,
            repeat: 2,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                // After flashing, start spectacular collection animation
                
                // Create a trail effect while the skill moves
                this.createSkillTrail(skillGroup);
                
                // Main animation for collection - more direct path to progress bar
                this.tweens.add({
                    targets: [skillGroup.hexagon, skillGroup.glow, skillGroup.innerCircle, skillGroup.icon, skillGroup.text],
                    x: this.cameras.main.width / 2,
                    y: 640,
                    scale: { from: 1, to: 0.3 },
                    ease: 'Back.easeOut',
                    duration: 1000,
                    onComplete: () => {
                        // Create particle burst at original position
                        this.createEnhancedCollectionParticles(skillGroup.data.x, skillGroup.data.y, skillGroup.data.color);
                        
                        // Update progress immediately for better feedback
                        this.collectedSkills++;
                        this.updateProgressBar();
                        
                        // Add visual feedback on the progress bar
                        this.createProgressBarEffect();
                        
                        // Make the skill disappear with a final effect
                        this.tweens.add({
                            targets: [skillGroup.hexagon, skillGroup.glow, skillGroup.innerCircle, skillGroup.icon, skillGroup.text],
                            alpha: 0,
                            scaleX: 0.1,
                            scaleY: 0.1,
                            duration: 300,
                            ease: 'Back.easeIn',
                            onComplete: () => {
                                // Display floating score/achievement text
                                this.createFloatingText(
                                    this.cameras.main.width/2,
                                    640,
                                    `+1 Skill: ${skillGroup.data.name}`,
                                    skillGroup.data.color
                                );
                                
                                // Check if all skills are collected
                                if (this.collectedSkills === this.skills.length) {
                                    this.showCompletionMessage();
                                } else if (this.collectedSkills % 5 === 0) {
                                    // Special effect every 5 skills
                                    this.createMilestoneEffect();
                                }
                                
                                // Hide the clickArea as well to prevent phantom interactions
                                skillGroup.clickArea.setAlpha(0);
                                skillGroup.clickArea.disableInteractive();
                            }
                        });
                    }
                });
            }
        });
    }
    
    createSynthSound(startFreq, endFreq, duration) {
        // Create a synthesized sound effect if audio file is missing
        if (!this.sys.game.device.audio.webAudio) return;
        
        try {
            const audioContext = this.sound.context;
            if (!audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.log('Web Audio API error:', e);
        }
    }
    
    createSkillCollectedEffect(skillGroup) {
        // Create a bright flash behind the skill
        const flash = this.add.circle(
            skillGroup.data.x,
            skillGroup.data.y,
            60,
            0xffffff,
            0.8
        );
        
        // Animate the flash
        this.tweens.add({
            targets: flash,
            alpha: 0,
            scale: 2,
            duration: 300,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                flash.destroy();
            }
        });
        
        // Create ripple effect
        for (let i = 0; i < 3; i++) {
            const ripple = this.add.circle(
                skillGroup.data.x,
                skillGroup.data.y,
                70,
                skillGroup.data.color,
                0.5 - (i * 0.15)
            );
            ripple.setStrokeStyle(2, 0xffffff, 0.8);
            
            this.tweens.add({
                targets: ripple,
                scale: 2 + (i * 0.5),
                alpha: 0,
                duration: 500 + (i * 200),
                delay: i * 150,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    ripple.destroy();
                }
            });
        }
    }
    
    createSkillTrail(skillGroup) {
        // Create a trail of particles that follow the skill during collection animation
        const trailEmitter = this.time.addEvent({
            delay: 30,
            callback: () => {
                // Check if the skill is still visible
                if (skillGroup.hexagon.alpha <= 0) {
                    trailEmitter.remove();
                    return;
                }
                
                // Create trail particle
                const particle = this.add.circle(
                    skillGroup.hexagon.x + (Math.random() * 20 - 10),
                    skillGroup.hexagon.y + (Math.random() * 20 - 10),
                    Math.random() * 5 + 3,
                    skillGroup.data.color,
                    0.7
                );
                
                // Animate trail particle
                this.tweens.add({
                    targets: particle,
                    scale: 0.1,
                    alpha: 0,
                    duration: 400,
                    ease: 'Quad.easeOut',
                    onComplete: () => {
                        particle.destroy();
                    }
                });
            },
            callbackScope: this,
            repeat: 30
        });
    }
    
    createEnhancedCollectionParticles(x, y, color) {
        // Create an enhanced particle burst effect when skill is collected
        const particleTypes = ['circle', 'star', 'triangle', 'rect'];
        
        // Add a bright flash
        const flash = this.add.circle(x, y, 80, 0xffffff, 0.8);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            scale: 2,
            duration: 500,
            ease: 'Quad.easeOut',
            onComplete: () => {
                flash.destroy();
            }
        });
        
        // Create varied particle types for visual interest
        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 100 + Math.random() * 300;
            const distance = 50 + Math.random() * 150;
            const size = 3 + Math.random() * 8;
            const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
            
            let particle;
            const particleColor = i % 3 === 0 ? 0xffffff : color;
            
            // Create different shaped particles for visual diversity
            switch (particleType) {
                case 'circle':
                    particle = this.add.circle(x, y, size, particleColor, 0.8);
                    break;
                case 'star':
                    particle = this.createStar(x, y, size, particleColor);
                    break;
                case 'triangle':
                    particle = this.add.triangle(
                        x, y,
                        0, -size,
                        size, size,
                        -size, size,
                        particleColor, 0.8
                    ).setOrigin(0.5);
                    break;
                case 'rect':
                    particle = this.add.rectangle(x, y, size, size, particleColor, 0.8);
                    break;
            }
            
            // Calculate target position with randomness
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;
            
            // Add rotation for some particles
            if (Math.random() > 0.5) {
                this.tweens.add({
                    targets: particle,
                    angle: Math.random() * 360,
                    duration: 1000 + Math.random() * 500
                });
            }
            
            // Animate particle explosion
            this.tweens.add({
                targets: particle,
                x: targetX,
                y: targetY,
                alpha: 0,
                scale: 0.1,
                duration: 800 + Math.random() * 600,
                ease: i % 2 === 0 ? 'Back.easeOut' : 'Cubic.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
    
    createStar(x, y, size, color) {
        // Create a star-shaped particle
        const points = [];
        const outerRadius = size;
        const innerRadius = size / 2;
        
        for (let i = 0; i < 10; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i / 10) * Math.PI * 2;
            points.push({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius
            });
        }
        
        return this.add.polygon(0, 0, points, color, 0.8).setOrigin(0);
    }
    
    createProgressBarEffect() {
        // Add visual effect to the progress bar when updated
        const progressFlash = this.add.rectangle(
            this.progressBar.x + this.progressBar.width,
            this.progressBar.y,
            20,
            this.progressBar.height,
            0xffffff,
            0.8
        ).setOrigin(0, 0.5);
        
        this.tweens.add({
            targets: progressFlash,
            alpha: 0,
            scaleX: 3,
            duration: 300,
            ease: 'Quad.easeOut',
            onComplete: () => {
                progressFlash.destroy();
            }
        });
    }
    
    createFloatingText(x, y, message, color) {
        // Create floating text that appears when a skill is collected
        const textColor = this.getContrastColor(color);
        
        const floatingText = this.add.text(
            x,
            y,
            message,
            {
                font: 'bold 24px Arial',
                fill: '#' + textColor.toString(16).padStart(6, '0'),
                stroke: '#000000',
                strokeThickness: 3,
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#000000',
                    blur: 2,
                    stroke: true,
                    fill: true
                }
            }
        ).setOrigin(0.5).setScale(0);
        
        // Scale up and float upward animation
        this.tweens.add({
            targets: floatingText,
            y: y - 80,
            scaleX: 1,
            scaleY: 1,
            alpha: { from: 0, to: 1, duration: 300 },
            ease: 'Back.easeOut',
            duration: 800,
            onComplete: () => {
                // Fade out
                this.tweens.add({
                    targets: floatingText,
                    y: y - 120,
                    alpha: 0,
                    duration: 500,
                    delay: 500,
                    ease: 'Quad.easeIn',
                    onComplete: () => {
                        floatingText.destroy();
                    }
                });
            }
        });
    }
    
    getContrastColor(hexColor) {
        // Calculate a contrasting text color for better readability
        const r = (hexColor >> 16) & 0xFF;
        const g = (hexColor >> 8) & 0xFF;
        const b = hexColor & 0xFF;
        
        // Calculate luminance using standard formula
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Return white for dark colors, black for light colors
        return luminance < 128 ? 0xFFFFFF : 0x000000;
    }
    
    createMilestoneEffect() {
        // Create a special effect when collecting milestone skills (every 5)
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Create milestone text announcement
        const milestoneText = this.add.text(
            centerX,
            centerY - 50,
            `MILESTONE: ${this.collectedSkills} SKILLS!`,
            {
                font: 'bold 40px Arial',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6,
                shadow: {
                    offsetX: 3,
                    offsetY: 3,
                    color: '#000000',
                    blur: 5,
                    stroke: true,
                    fill: true
                }
            }
        ).setOrigin(0.5).setAlpha(0);
        
        // Add fancy animation
        this.tweens.add({
            targets: milestoneText,
            alpha: 1,
            scaleX: { from: 0.5, to: 1 },
            scaleY: { from: 0.5, to: 1 },
            duration: 500,
            ease: 'Back.easeOut',
            onComplete: () => {
                // Create burst effect
                this.createBurstEffect(centerX, centerY);
                
                // Hold text for a moment then fade out
                this.tweens.add({
                    targets: milestoneText,
                    alpha: 0,
                    y: centerY - 100,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    delay: 1500,
                    duration: 500,
                    ease: 'Back.easeIn',
                    onComplete: () => {
                        milestoneText.destroy();
                    }
                });
            }
        });
    }
    
    createBurstEffect(x, y) {
        // Create radial burst effect for milestone achievements
        const colors = [0xe76f00, 0x6db33f, 0xdd0031, 0x0faaff, 0x0089d6];
        
        // Create lines radiating outward
        for (let i = 0; i < 36; i++) {
            const angle = (i / 36) * Math.PI * 2;
            const color = colors[i % colors.length];
            
            const line = this.add.line(
                x, y,
                0, 0,
                Math.cos(angle) * 10, Math.sin(angle) * 10,
                color, 0.8
            ).setLineWidth(3).setOrigin(0.5);
            
            this.tweens.add({
                targets: line,
                x2: Math.cos(angle) * 300,
                y2: Math.sin(angle) * 300,
                alpha: 0,
                duration: 700,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    line.destroy();
                }
            });
        }
        
        // Add circular flash
        const flash = this.add.circle(x, y, 10, 0xffffff, 1);
        this.tweens.add({
            targets: flash,
            radius: 250,
            alpha: 0,
            duration: 600,
            ease: 'Quad.easeOut',
            onComplete: () => {
                flash.destroy();
            }
        });
    }
    
    createCollectionParticles(x, y, color) {
        // This method now replaced by createEnhancedCollectionParticles
        this.createEnhancedCollectionParticles(x, y, color);
    }
    
    createNavigationBar() {
        const barHeight = 60;
        const barY = 30;
        
        // Background for navigation bar
        const navBar = this.add.rectangle(
            0,
            0,
            this.cameras.main.width,
            barHeight,
            0x000000,
            0.6
        ).setOrigin(0, 0);
        
        // Create navigation buttons
        this.createNavButton(100, barY, 'Menu', 'MenuScene');
        this.createNavButton(this.cameras.main.width - 250, barY, 'Experience', 'ExperienceScene');
        this.createNavButton(this.cameras.main.width - 100, barY, 'Projects', 'ProjectsScene');
    }
    
    createNavButton(x, y, label, targetScene) {
        // Create stylized navigation button
        const button = this.add.text(
            x,
            y,
            label,
            { 
                font: 'bold 20px Arial',
                fill: '#ffffff',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Add underline that appears on hover
        const underline = this.add.rectangle(
            x,
            y + 15,
            0,
            2,
            0x4a6fa5,
            1
        ).setOrigin(0.5, 0);
        
        // Button hover and click effects
        button.on('pointerover', () => {
            button.setStyle({ fill: '#4a6fa5' });
            
            // Animate underline appearing
            this.tweens.add({
                targets: underline,
                width: button.width,
                duration: 200,
                ease: 'Power2'
            });
        });
        
        button.on('pointerout', () => {
            button.setStyle({ fill: '#ffffff' });
            
            // Animate underline disappearing
            this.tweens.add({
                targets: underline,
                width: 0,
                duration: 200,
                ease: 'Power2'
            });
        });
        
        button.on('pointerdown', () => {
            // Transition effect
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start(targetScene);
            });
        });
        
        return button;
    }
    
    showCompletionMessage() {
        // Add overlay for completion message with animated gradient
        const overlay = this.add.rectangle(
            0, 0,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000, 0.7
        ).setOrigin(0);
        
        // Add animated gradient to overlay
        this.tweens.add({
            targets: overlay,
            fillColor: { from: 0x000000, to: 0x1a0e35 },
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        
        // Add a reveal animation for the overlay
        overlay.setAlpha(0);
        this.tweens.add({
            targets: overlay,
            alpha: 0.8,
            duration: 800,
            ease: 'Cubic.easeOut'
        });
        
        // Create completion panel with glass-like effect
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Create shimmering background for the panel
        this.createShimmeringBackground(centerX, centerY, 650, 400);
        
        const messageBox = this.add.rectangle(
            centerX,
            centerY,
            600,
            350,
            0x4a6fa5,
            0.3
        ).setOrigin(0.5).setStrokeStyle(3, 0x4a6fa5, 1);
        
        // Inner panel
        const innerBox = this.add.rectangle(
            centerX,
            centerY,
            580,
            330,
            0x000000,
            0.5
        ).setOrigin(0.5).setStrokeStyle(2, 0xffffff, 0.3);
        
        // Success icon with animated effects
        const successIcon = this.add.text(
            centerX,
            centerY - 100,
            '🏆',
            { fontSize: '80px' }
        ).setOrigin(0.5);
        
        // Add glow to trophy
        this.createIconGlow(successIcon);
        
        // Add animated rotation to trophy
        this.tweens.add({
            targets: successIcon,
            angle: { from: -5, to: 5 },
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Add floating stars around trophy
        this.createFloatingStars(centerX, centerY - 100);
        
        // Congratulations text with enhanced glow effect
        const congratsText = this.add.text(
            centerX,
            centerY - 30,
            'All Skills Collected!',
            { 
                font: 'bold 40px Arial',
                fill: '#ffffff',
                stroke: '#4a6fa5',
                strokeThickness: 6
            }
        ).setOrigin(0.5);
        
        // Create shimmering effect on text
        this.createTextShimmer(congratsText);
        
        // Add pulsing animation to congratulations text
        this.tweens.add({
            targets: congratsText,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Description with dynamic typing effect
        const descText = this.add.text(
            centerX,
            centerY + 30,
            '',
            { 
                font: '22px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
        
        // Type out the description text with a typewriter effect
        const descMessage = 'You have discovered all of my technical skills.\nLet\'s continue to my professional experience!';
        this.typewriteText(descText, descMessage, 30);
        
        // Create stylized continue button with enhanced effects
        const continueButton = this.add.rectangle(
            centerX,
            centerY + 100,
            220,
            60,
            0x4a6fa5,
            1
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Add a subtle shadow
        const buttonShadow = this.add.rectangle(
            centerX + 5,
            centerY + 105,
            220,
            60,
            0x000000,
            0.5
        ).setOrigin(0.5);
        
        const continueText = this.add.text(
            centerX,
            centerY + 100,
            'Continue',
            { 
                font: 'bold 24px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Create sparkling effects on the button
        this.createButtonSparkles(continueButton);
        
        // Button hover effects with more creative animations
        continueButton.on('pointerover', () => {
            continueButton.fillColor = 0x3a5a8a;
            
            // Scale effect
            this.tweens.add({
                targets: [continueButton, continueText],
                scaleX: 1.08,
                scaleY: 1.08,
                duration: 200,
                ease: 'Back.easeOut'
            });
            
            // Move shadow
            this.tweens.add({
                targets: buttonShadow,
                x: centerX + 3,
                y: centerY + 103,
                duration: 200
            });
            
            // Glow effect
            continueButton.setStrokeStyle(3, 0x6db33f, 1);
        });
        
        continueButton.on('pointerout', () => {
            continueButton.fillColor = 0x4a6fa5;
            
            this.tweens.add({
                targets: [continueButton, continueText],
                scaleX: 1,
                scaleY: 1,
                duration: 200,
                ease: 'Back.easeOut'
            });
            
            // Reset shadow
            this.tweens.add({
                targets: buttonShadow,
                x: centerX + 5,
                y: centerY + 105,
                duration: 200
            });
            
            // Remove glow
            continueButton.setStrokeStyle(0);
        });
        
        // Click animation
        continueButton.on('pointerdown', () => {
            // Press down animation
            this.tweens.add({
                targets: [continueButton, continueText],
                y: '+=5',
                duration: 100
            });
            
            // Move shadow
            this.tweens.add({
                targets: buttonShadow,
                y: centerY + 108,
                alpha: 0.3,
                duration: 100
            });
        });
        
        // Button release/click with impressive transition effect
        continueButton.on('pointerup', () => {
            // Release animation
            this.tweens.add({
                targets: [continueButton, continueText],
                y: centerY + 100,
                duration: 100
            });
            
            // Create spectacular particle effects
            this.createSuccessParticles();
            
            // Create a camera flash
            this.cameras.main.flash(800, 255, 255, 255, 0.5);
            
            // Add spatial audio transition sound
            this.createTransitionSound();
            
            // Create a transition effect that sweeps across the screen
            this.createTransitionSweep();
            
            // Fade transition to next scene with delay
            this.time.delayedCall(1200, () => {
                this.scene.start('ExperienceScene');
            });
        });
        
        // Group all elements for entry animations
        this.completionElements = [
            messageBox, innerBox, successIcon, congratsText, 
            descText, continueButton, continueText, buttonShadow
        ];
        
        // Create staggered entry animations
        this.tweens.add({
            targets: [messageBox, innerBox],
            scaleX: { from: 0, to: 1 },
            scaleY: { from: 0, to: 1 },
            duration: 800,
            ease: 'Back.easeOut'
        });
        
        this.tweens.add({
            targets: [successIcon],
            alpha: { from: 0, to: 1 },
            scale: { from: 0.5, to: 1 },
            duration: 700,
            delay: 400,
            ease: 'Back.easeOut'
        });
        
        this.tweens.add({
            targets: [congratsText],
            alpha: { from: 0, to: 1 },
            scale: { from: 0.5, to: 1 },
            duration: 700,
            delay: 600,
            ease: 'Back.easeOut'
        });
        
        this.tweens.add({
            targets: [buttonShadow, continueButton, continueText],
            alpha: { from: 0, to: 1 },
            scale: { from: 0.5, to: 1 },
            duration: 700,
            delay: 1000,
            ease: 'Back.easeOut'
        });
    }
    
    createShimmeringBackground(x, y, width, height) {
        // Create a shimmering background effect - fixed version without gradient
        const shimmerGraphics = this.add.graphics();
        
        // Array of colors to cycle through
        const colors = [0x4a6fa5, 0x6db33f, 0xe76f00, 0x4a6fa5];
        let colorIndex = 0;
        
        // Draw animated background with color transitions instead of gradient
        this.time.addEvent({
            delay: 50,
            callback: () => {
                shimmerGraphics.clear();
                
                // Use the current color from our array
                const currentColor = colors[Math.floor(colorIndex)];
                
                // Slowly cycle through colors
                colorIndex = (colorIndex + 0.01) % colors.length;
                
                // Draw background with current color
                shimmerGraphics.fillStyle(currentColor, 0.2);
                shimmerGraphics.fillRoundedRect(
                    x - width/2 - 10, 
                    y - height/2 - 10, 
                    width + 20, 
                    height + 20, 
                    20
                );
                
                // Add some decorative elements to simulate gradient effect
                for (let i = 0; i < 5; i++) {
                    const decorColor = colors[(Math.floor(colorIndex) + i) % colors.length];
                    const posX = x - width/2 + (Math.sin(this.time.now * 0.001 + i) * 0.5 + 0.5) * width;
                    const posY = y - height/2 + (Math.cos(this.time.now * 0.001 + i) * 0.5 + 0.5) * height;
                    
                    shimmerGraphics.fillStyle(decorColor, 0.1);
                    shimmerGraphics.fillCircle(posX, posY, 30 + Math.sin(this.time.now * 0.002 + i) * 10);
                }
            },
            callbackScope: this,
            repeat: -1
        });
    }
    
    createIconGlow(icon) {
        // Create a pulsing glow effect around an icon
        const glow = this.add.circle(
            icon.x,
            icon.y,
            50,
            0xffff00,
            0.3
        ).setOrigin(0.5);
        
        glow.setBlendMode(Phaser.BlendModes.ADD);
        
        // Make the glow pulse
        this.tweens.add({
            targets: glow,
            alpha: 0.1,
            scale: 1.3,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createFloatingStars(x, y) {
        // Create floating stars around a point
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const distance = 70;
            
            const star = this.add.text(
                x + Math.cos(angle) * distance,
                y + Math.sin(angle) * distance,
                '✨',
                { fontSize: '20px' }
            ).setOrigin(0.5).setAlpha(0.9);
            
            // Create orbital animation for each star
            this.tweens.add({
                targets: star,
                x: x + Math.cos(angle + Math.PI * 2) * distance,
                y: y + Math.sin(angle + Math.PI * 2) * distance,
                duration: 10000,
                repeat: -1,
                ease: 'Linear'
            });
            
            // Add pulsing effect
            this.tweens.add({
                targets: star,
                alpha: 0.5,
                scale: 0.8,
                duration: 1000 + (i * 200),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
    
    createTextShimmer(textObject) {
        // Create a shimmering effect on text
        const originalFill = '#ffffff';
        const shimmerColors = ['#ffffcc', '#ffffff', '#f0f8ff', '#ffffff'];
        let colorIndex = 0;
        
        this.time.addEvent({
            delay: 100,
            callback: () => {
                textObject.setFill(shimmerColors[colorIndex]);
                colorIndex = (colorIndex + 1) % shimmerColors.length;
            },
            callbackScope: this,
            repeat: -1
        });
    }
    
    createButtonSparkles(button) {
        // Create occasional sparkles on the button
        this.time.addEvent({
            delay: 500,
            callback: () => {
                // Random position on the button
                const x = button.x - 80 + Math.random() * 160;
                const y = button.y - 20 + Math.random() * 40;
                
                // Create sparkle
                const sparkle = this.add.text(
                    x, y,
                    '✨',
                    { fontSize: '20px' }
                ).setOrigin(0.5).setAlpha(0);
                
                // Animate sparkle
                this.tweens.add({
                    targets: sparkle,
                    alpha: { from: 0, to: 0.8 },
                    scale: { from: 0.5, to: 1 },
                    y: y - 10,
                    duration: 700,
                    ease: 'Quad.easeOut',
                    onComplete: () => {
                        sparkle.destroy();
                    }
                });
            },
            callbackScope: this,
            repeat: -1
        });
    }
    
    createTransitionSound() {
        // Create a synthesized transition sound if audio file is missing
        try {
            if (this.cache.audio.exists('collect-sound')) {
                const sound = this.sound.play('collect-sound');
                if (sound) {
                    sound.setDetune(600); // Shift pitch up
                    sound.setVolume(0.6);
                }
            } else {
                // Synthesize a more complex sound
                this.createSynthSound(220, 880, 0.8);
                this.time.delayedCall(150, () => {
                    this.createSynthSound(330, 990, 0.6);
                });
                this.time.delayedCall(300, () => {
                    this.createSynthSound(440, 1320, 0.5);
                });
            }
        } catch (e) {
            console.log('Error playing transition sound');
        }
    }
    
    createTransitionSweep() {
        // Create a visual sweep effect for transition
        const sweep = this.add.rectangle(
            -100,
            this.cameras.main.height / 2,
            100,
            this.cameras.main.height,
            0xffffff,
            0.6
        ).setOrigin(0.5);
        
        sweep.setBlendMode(Phaser.BlendModes.ADD);
        
        this.tweens.add({
            targets: sweep,
            x: this.cameras.main.width + 100,
            duration: 1000,
            ease: 'Quad.easeInOut',
            onComplete: () => {
                sweep.destroy();
            }
        });
    }
    
    typewriteText(textObject, text, delay = 30) {
        const length = text.length;
        let i = 0;
        
        this.time.addEvent({
            callback: () => {
                textObject.text += text[i];
                i++;
            },
            repeat: length - 1,
            delay: delay
        });
        
        return textObject;
    }
    
    createSuccessParticles() {
        // Create celebration particles with improved visuals
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        const colors = [0xe76f00, 0x6db33f, 0xdd0031, 0x0faaff, 0x4a6fa5, 0xf7b731];
        
        // Create confetti particles
        for (let i = 0; i < 120; i++) {
            // Random position at top of screen for confetti effect
            const x = Math.random() * this.cameras.main.width;
            const y = -20;
            const size = 4 + Math.random() * 6;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Randomize particle shape for confetti effect
            let particle;
            if (Math.random() > 0.5) {
                particle = this.add.rectangle(
                    x, y,
                    size, size * 2,
                    color,
                    0.8
                ).setOrigin(0.5);
                
                // Random rotation
                particle.angle = Math.random() * 360;
            } else {
                particle = this.add.circle(
                    x, y,
                    size / 2,
                    color,
                    0.8
                ).setOrigin(0.5);
            }
            
            // Add gravity effect to particles
            const targetX = x + (Math.random() * 200 - 100);
            const targetY = this.cameras.main.height + 50;
            
            // Add random swaying motion
            const duration = 2000 + Math.random() * 2000;
            const delay = Math.random() * 2000;
            
            // Create falling animation
            this.tweens.add({
                targets: particle,
                x: {
                    value: targetX,
                    duration: duration,
                    ease: 'Sine.easeInOut',
                    yoyo: false
                },
                y: {
                    value: targetY,
                    duration: duration,
                    ease: 'Quad.easeIn',
                    yoyo: false
                },
                angle: particle.angle + (Math.random() > 0.5 ? 180 : -180),
                alpha: 0,
                delay: delay,
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
        
        // Add bursting particles from button
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 250;
            const size = 3 + Math.random() * 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const particle = this.add.circle(
                centerX,
                centerY + 100,
                size,
                color,
                0.8
            );
            
            // Burst outward
            this.tweens.add({
                targets: particle,
                x: centerX + Math.cos(angle) * distance,
                y: (centerY + 100) + Math.sin(angle) * distance,
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
} 