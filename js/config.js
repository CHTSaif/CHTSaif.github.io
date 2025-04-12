const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 675,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [
        BootScene,
        PreloadScene,
        MenuScene,
        IntroScene,
        SkillsScene,
        ExperienceScene,
        ProjectsScene,
        SAPProjectScene,
        ContactScene
    ],
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    canvasCreated: function(canvas) {
        // Set willReadFrequently attribute to optimize canvas operations
        canvas.setAttribute('willReadFrequently', 'true');
    }
}; 