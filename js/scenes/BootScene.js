class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create a placeholder loading background if the image is not available
        try {
            this.load.image('loading-background', 'assets/images/loading-background.png');
        } catch (error) {
            console.log('Loading background image not found, using placeholder');
            // Continue without the image
        }
        
        // Display loading text
        const loadingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Loading...',
            {
                font: '32px Arial',
                fill: '#ffffff'
            }
        );
        loadingText.setOrigin(0.5, 0.5);
        
        // Add notice about missing assets
        const noticeText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 50,
            'Note: This is a prototype. Some assets may be missing.',
            {
                font: '16px Arial',
                fill: '#cccccc'
            }
        );
        noticeText.setOrigin(0.5, 0.5);
    }

    create() {
        // Go to the preload scene once boot is complete
        this.scene.start('PreloadScene');
    }
} 