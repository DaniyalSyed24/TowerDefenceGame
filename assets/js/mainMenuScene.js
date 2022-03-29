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
        backgroundImage = this.add.image(420,256,'menu-background');
        backgroundImage.displayWidth = this.sys.canvas.width;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        let title = this.add.text(screenCenterX, 120, "Tower Game", {fontSize: "60px",fill: textColor}).setOrigin(0.5);
        title.setShadow(2, 2, "#333333", 2, false, true);

        let buttonGame = new Button(screenCenterX, 300, 'Play Game', this, () => {
            this.scene.start('gameScene'); this.scene.start("UIScene")

            // TEMPPPP
            let elementTemp = document.getElementById('logout-button')
            if (elementTemp && elementTemp.style.display != 'none') {
                elementTemp.style.display = 'none'
            }
        }, 50, 10);

        let buttonRegister = new Button(screenCenterX, 375, 'Register', this,() => {
            this.scene.start('registerScene');

            let element = document.getElementById('input-box-register')
            if (element && element.style.display === 'none') {
              element.style.display = 'block'
            }
            // TEMPPPP
            let elementTemp = document.getElementById('logout-button')
            if (elementTemp && elementTemp.style.display != 'none') {
                elementTemp.style.display = 'none'
            }

        }, 57, 10);

        let buttonLogIn = new Button(screenCenterX, 450, 'Log In', this,() => {
            this.scene.start('loginScene');

            let element = document.getElementById('input-box-login')
            if (element && element.style.display === 'none') {
              element.style.display = 'block'
            }

            // TEMPPPP
            let elementTemp = document.getElementById('logout-button')
            if (elementTemp && elementTemp.style.display != 'none') {
                elementTemp.style.display = 'none'
            }
        }, 72, 10);

        let buttonInstructions = new Button(screenCenterX, 525, 'Instructions', this, () => {
            this.scene.start('instructionsScene')

            // TEMPPPP
            let elementTemp = document.getElementById('logout-button')
            if (elementTemp && elementTemp.style.display != 'none') {
                elementTemp.style.display = 'none'
            }
        }, 27, 10);

        buttonGame, buttonRegister, buttonLogIn, buttonInstructions;
    }
});