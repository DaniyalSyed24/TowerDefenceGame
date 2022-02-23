let mainMenuScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function mainMenuScene() {
            Phaser.Scene.call(this, { key: "mainMenuScene"});
        },

    preload: function() {
        
    },
    
    create: function () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let title = "Tower Defence";
        let optionsFont = "25px Arial";
        
        let loadingText = this.add.text(screenCenterX, 100, title, {font: "50px Arial",fill: 'white'}).setOrigin(0.5);
        loadingText;

        let playText = this.add.text(screenCenterX, 250, "Play Game", {font: optionsFont}).setOrigin(0.5);
        playText.setInteractive();
        playText.on('pointerdown', () => { this.scene.start('gameScene'); this.scene.start("UIScene") });

        let loginText = this.add.text(screenCenterX, 300, "Log In", {font: optionsFont}).setOrigin(0.5);
        loginText;
        
        let instructionsText = this.add.text(screenCenterX, 350, "Instructions", {font: optionsFont}).setOrigin(0.5);
        instructionsText.setInteractive();
        instructionsText.on('pointerdown', () => {this.scene.start('instructionsScene')});
    },
});