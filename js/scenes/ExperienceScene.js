class ExperienceScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExperienceScene' });
        
        // Experience data
        this.experiences = [
            {
                title: 'Java Developer',
                company: 'SAP Labs France',
                period: 'September 2021 - Present',
                description: 'Developing Spring Boot applications on the Azure Cloud platform.\nImplemented resilience tests with Resilience4j, integrated Kafka for data flow,\nand set up monitoring with Grafana & Kibana.',
                x: this.cameras ? this.cameras.main.width / 2 : 600,
                y: 280,
                color: 0x0faaff
            },
            {
                title: 'Intern',
                company: 'Make IT Happen',
                period: 'February 2021 - May 2021',
                description: 'Contributed to the development of the "For Her" mobile app,\nwhich safeguards users by sending real-time location updates\ntriggered by a safe word.',
                x: this.cameras ? this.cameras.main.width / 2 : 600,
                y: 500,
                color: 0x6db33f
            }
        ];
        
        this.currentExperience = 0;
    }

    create() {
        // Background - futuristic corporate environment
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x0a192f).setOrigin(0, 0);
        
        // Add some floating particles for a tech feel
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * this.cameras.main.width;
            const y = Math.random() * this.cameras.main.height;
            const size = Math.random() * 3 + 1;
            
            const particle = this.add.circle(x, y, size, 0x64ffda, 0.5);
            
            // Animate particles
            this.tweens.add({
                targets: particle,
                x: x + (Math.random() * 100 - 50),
                y: y + (Math.random() * 100 - 50),
                alpha: Math.random() * 0.5 + 0.1,
                duration: 3000 + Math.random() * 5000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        }
        
        // Title
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            80,
            'Professional Experience',
            { 
                font: 'bold 48px Arial',
                fill: '#ffffff',
                stroke: '#4a6fa5',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        // Create a building silhouette for the background
        for (let i = 0; i < 8; i++) {
            const buildingWidth = 80 + Math.random() * 40;
            const buildingHeight = 100 + Math.random() * 200;
            const x = i * 150 + 50;
            
            this.add.rectangle(
                x,
                this.cameras.main.height,
                buildingWidth,
                buildingHeight,
                0x172a45,
                0.8
            ).setOrigin(0.5, 1);
            
            // Add some windows
            for (let j = 0; j < 5; j++) {
                for (let k = 0; k < 3; k++) {
                    this.add.rectangle(
                        x - buildingWidth/3 + k * (buildingWidth/3),
                        this.cameras.main.height - buildingHeight + 30 + j * 40,
                        10,
                        15,
                        0x64ffda,
                        0.5
                    ).setOrigin(0.5);
                }
            }
        }
        
        // Display the experiences
        this.experienceContainers = [];
        this.experiences.forEach((exp, index) => {
            // Update coordinates now that this.cameras is defined
            exp.x = this.cameras.main.width / 2;
            
            // Create the experience display
            const container = this.add.container(exp.x, exp.y);
            
            // Background panel
            const panel = this.add.rectangle(
                0,
                0,
                800,
                180,
                0x172a45,
                0.8
            ).setOrigin(0.5);
            
            // Title and company
            const titleText = this.add.text(
                -380,
                -70,
                exp.title + ' at ' + exp.company,
                { 
                    font: 'bold 28px Arial',
                    fill: '#64ffda' 
                }
            );
            
            // Period
            const periodText = this.add.text(
                -380,
                -35,
                exp.period,
                { 
                    font: '20px Arial',
                    fill: '#8892b0' 
                }
            );
            
            // Description
            const descText = this.add.text(
                -380,
                0,
                exp.description,
                { 
                    font: '20px Arial',
                    fill: '#ffffff',
                    wordWrap: { width: 760 }
                }
            );
            
            // Add everything to the container
            container.add([panel, titleText, periodText, descText]);
            
            // Make it interactive
            panel.setInteractive({ useHandCursor: true });
            
            // Hover effect
            panel.on('pointerover', () => {
                this.tweens.add({
                    targets: panel,
                    scaleX: 1.02,
                    scaleY: 1.02,
                    duration: 200,
                    ease: 'Sine.easeOut'
                });
            });
            
            panel.on('pointerout', () => {
                this.tweens.add({
                    targets: panel,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200,
                    ease: 'Sine.easeOut'
                });
            });
            
            // Initially hide if not the first experience
            if (index !== 0) {
                container.setVisible(false);
            }
            
            this.experienceContainers.push(container);
        });
        
        // Previous button
        this.prevButton = this.add.text(
            200,
            this.cameras.main.height - 50,
            '◀ Previous',
            { 
                font: 'bold 22px Arial',
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
        
        // Initially disable previous button
        this.prevButton.setAlpha(0.5);
        this.prevButton.disableInteractive();
        
        // Next button
        this.nextButton = this.add.text(
            this.cameras.main.width - 200,
            this.cameras.main.height - 50,
            'Next ▶',
            { 
                font: 'bold 22px Arial',
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
        
        // Button hover effects
        this.prevButton.on('pointerover', () => {
            if (this.currentExperience > 0) {
                this.prevButton.setStyle({ backgroundColor: '#3a5a8a' });
            }
        });
        
        this.prevButton.on('pointerout', () => {
            if (this.currentExperience > 0) {
                this.prevButton.setStyle({ backgroundColor: '#4a6fa5' });
            }
        });
        
        this.nextButton.on('pointerover', () => {
            this.nextButton.setStyle({ backgroundColor: '#3a5a8a' });
        });
        
        this.nextButton.on('pointerout', () => {
            this.nextButton.setStyle({ backgroundColor: '#4a6fa5' });
        });
        
        // Button click events
        this.prevButton.on('pointerdown', () => {
            if (this.currentExperience > 0) {
                this.navigateExperience(-1);
            }
        });
        
        this.nextButton.on('pointerdown', () => {
            if (this.currentExperience < this.experiences.length - 1) {
                this.navigateExperience(1);
            } else {
                // If on the last experience, go to the next scene
                this.scene.start('ProjectsScene');
            }
        });
        
        // Back to menu button
        const menuButton = this.add.text(
            100,
            30,
            'Menu',
            { 
                font: '20px Arial',
                fill: '#ffffff' 
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        menuButton.on('pointerover', () => {
            menuButton.setStyle({ fill: '#4a6fa5' });
        });
        
        menuButton.on('pointerout', () => {
            menuButton.setStyle({ fill: '#ffffff' });
        });
        
        menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
        
        // Navigation buttons
        this.createNavButton(300, 30, 'Skills', 'SkillsScene');
        this.createNavButton(500, 30, 'Projects', 'ProjectsScene');
        this.createNavButton(700, 30, 'Contact', 'ContactScene');
    }
    
    navigateExperience(direction) {
        // Hide current experience
        this.experienceContainers[this.currentExperience].setVisible(false);
        
        // Update index
        this.currentExperience += direction;
        
        // Show new experience
        this.experienceContainers[this.currentExperience].setVisible(true);
        
        // Update button states
        if (this.currentExperience > 0) {
            this.prevButton.setAlpha(1);
            this.prevButton.setInteractive({ useHandCursor: true });
        } else {
            this.prevButton.setAlpha(0.5);
            this.prevButton.disableInteractive();
        }
        
        if (this.currentExperience === this.experiences.length - 1) {
            this.nextButton.setText('Next Scene ▶');
        } else {
            this.nextButton.setText('Next ▶');
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