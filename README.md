# Interactive Resume Game for Saif Chtourou

A 2D game-based interactive resume that showcases the professional journey, skills, and experience of Saif Chtourou in a unique and engaging way.

## Overview

This project presents Saif's resume as an interactive 2D game with different levels representing various sections of his professional background:

- **Introduction Level**: Basic information about Saif
- **Skills Level**: Interactive collection of technical skills
- **Experience Level**: Journey through professional experiences at SAP Labs France
- **Projects Level**: Details about the "For Her" mobile app project
- **Contact Level**: Contact information with an interactive "boss level" challenge

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Phaser 3 (JavaScript game framework)

## How to Run

1. Clone this repository to your local machine
2. There are several ways to run the project:

### Option 1: Using the included Node.js server (Recommended)

If you have Node.js installed:

```bash
# Run the included server script
node server.js
```

Then open your browser and navigate to `http://localhost:3000`

### Option 2: Using a local web server

If you have Node.js installed:

```bash
# Install a simple HTTP server
npm install -g http-server

# Run the server from the project directory
http-server
```

Then open your browser and navigate to `http://localhost:8080`

### Option 3: Using Python's built-in HTTP server

```bash
# For Python 3
python -m http.server

# For Python 2
python -m SimpleHTTPServer
```

Then open your browser and navigate to `http://localhost:8000`

### Option 4: Using VS Code Live Server extension

If you're using Visual Studio Code, you can install the "Live Server" extension and click "Go Live" in the bottom right corner of the editor.

## Important Note

You **must** use a web server to run this game. Opening the HTML file directly in a browser will cause CORS errors when loading assets.

## Game Controls

- Use the mouse to interact with UI elements
- Click on buttons to navigate between scenes
- Collect skills by clicking on them in the Skills level
- Navigate through experiences with the Previous/Next buttons
- Try the "Boss Level" challenge in the Contact section

## Credits

- Developed by: [Your Name]
- Resume Content: Saif Chtourou
- Framework: Phaser 3

## Note about Assets

This is a mockup version that uses placeholder graphics. To run the complete version with all visual assets, you would need to:

1. Create or obtain appropriate sprite sheets and image assets
2. Place them in the `assets` directory according to the path structure
3. Ensure audio files are in the correct format and location

## License

This project is created as a personal portfolio piece and is not licensed for distribution.