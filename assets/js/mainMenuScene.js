let mainMenuScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function mainMenuScene() {
            Phaser.Scene.call(this, { key: "mainMenuScene"});
        },

    preload: function() {
        this.load.image('menu-background', 'assets/media/main-menu-background.jpg');
    },
    
    create: function () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        backgroundImage = this.add.image(320,256,'menu-background');
        backgroundImage.displayWidth = this.sys.canvas.width;
        backgroundImage.displayHeight = 800;

        const title = "Orcs & Cannons";
        const textColor= '#FFE77AFF';
        const brownColor= '#4A2619';
        const goldColor = '#F39C12';
        
        let titleText = this.add.text(screenCenterX, 120, title, {fontSize: "60px Calibri",fill: textColor}).setOrigin(0.5);
        titleText;

        class Button {
            constructor(x, y, label, scene, callback, paddingWidth, paddingHeight) {
                const button = scene.add.text(x, y, label)
                    .setOrigin(0.5)
                    .setPadding(paddingWidth, paddingHeight)
                    .setStyle({ backgroundColor: brownColor, fontSize: '25px', })
                    .setColor(textColor)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => callback())
                    .on('pointerover', () => button.setStyle({ fill: brownColor, backgroundColor: goldColor}))
                    .on('pointerout', () => button.setStyle({ fill: textColor, backgroundColor: brownColor}));
            }
        }

        let buttonGame = new Button(screenCenterX, 300, 'Play Game', this, () => { this.scene.start('gameScene'); this.scene.start("UIScene")}, 50, 10);
        let buttonLogIn = new Button(screenCenterX, 375, 'Log In', this, () => console.log('clicked on login'), 72, 10);
        let buttonInstructions = new Button(screenCenterX, 450, 'Instructions', this, () => {this.scene.start('instructionsScene')}, 27, 10);

        buttonGame, buttonLogIn, buttonInstructions;
    }

});