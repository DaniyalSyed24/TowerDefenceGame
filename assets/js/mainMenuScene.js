let mainMenuScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function mainMenuScene() {
            Phaser.Scene.call(this, { key: "mainMenuScene"});
        },

    preload: function() {
        this.load.image('menu-background', 'assets/media/menuBackground.jpg');
    },
    
    create: function () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        backgroundImage = this.add.image(320,256,'menu-background');
        backgroundImage.displayWidth = this.sys.canvas.width;
        // backgroundImage.displayHeight = 800;

        const title = "Tower Game";
        
        let titleText = this.add.text(screenCenterX, 120, title, {fontSize: "60px",fill: "white"}).setOrigin(0.5);
        titleText.setShadow(2, 2, "#333333", 2, false, true);

        

        let buttonGame = new Button(screenCenterX, 300, 'Play Game', this, () => { this.scene.start('gameScene'); this.scene.start("UIScene")}, 50, 10);
        let buttonLogIn = new Button(screenCenterX, 375, 'Log In', this, () => console.log('clicked on login'), 72, 10);
        let buttonInstructions = new Button(screenCenterX, 450, 'Instructions', this, () => {this.scene.start('instructionsScene')}, 27, 10);

        buttonGame, buttonLogIn, buttonInstructions;
    }

});