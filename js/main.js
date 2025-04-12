// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the game
    const game = new Phaser.Game(config);

    // Game audio state
    let audioMuted = false;

    // Skip menu functionality
    const skipButton = document.getElementById('skip-button');
    const resumeSections = document.getElementById('resume-sections');
    const sectionButtons = document.querySelectorAll('#resume-sections button');

    // Audio control
    const muteButton = document.getElementById('mute-button');

    skipButton.addEventListener('click', function() {
        if (resumeSections.classList.contains('hidden')) {
            resumeSections.classList.remove('hidden');
        } else {
            resumeSections.classList.add('hidden');
        }
    });

    // Handle section navigation
    sectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Navigate to the appropriate scene
            switch(section) {
                case 'intro':
                    game.scene.start('IntroScene');
                    break;
                case 'skills':
                    game.scene.start('SkillsScene');
                    break;
                case 'experience':
                    game.scene.start('ExperienceScene');
                    break;
                case 'projects':
                    game.scene.start('ProjectsScene');
                    break;
                case 'contact':
                    game.scene.start('ContactScene');
                    break;
            }
            
            // Hide the menu after selection
            resumeSections.classList.add('hidden');
        });
    });

    // Audio control
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