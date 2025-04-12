// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the game
    const game = new Phaser.Game(config);

    // Game audio state
    let audioMuted = false;

    // Audio control
    const muteButton = document.getElementById('mute-button');

    // Audio control functionality
    muteButton.addEventListener('click', function() {
        audioMuted = !audioMuted;

        // Update button text
        muteButton.textContent = audioMuted ? '🔇' : '🔊';

        // If we have access to the game's sound manager, mute/unmute it
        if (game.sound && game.sound.mute !== undefined) {
            game.sound.mute = audioMuted;
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        game.scale.refresh();
    });
});