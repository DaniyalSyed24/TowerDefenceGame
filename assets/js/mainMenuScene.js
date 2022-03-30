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

        function removeLogoutButton(){
            let logoutButton = document.getElementById('logout-button')
            if (logoutButton && logoutButton.style.display != 'none') {
                logoutButton.style.display = 'none'
            }
        }

        let buttonGame = new Button(screenCenterX, 250, 'Play Game', this, () => {
            this.scene.start('gameScene'); this.scene.start("UIScene")
            removeLogoutButton();
        }, 50, 10);

        let buttonRegister = new Button(screenCenterX, 325, 'Register', this,() => {
            this.scene.start('registerScene');

            let element = document.getElementById('input-box-register')
            if (element && element.style.display === 'none') {
              element.style.display = 'block'
            }
            removeLogoutButton();
        }, 57, 10);

        let buttonLogIn = new Button(screenCenterX, 400, 'Log In', this,() => {
            this.scene.start('loginScene');

            let element = document.getElementById('input-box-login')
            if (element && element.style.display === 'none') {
              element.style.display = 'block'
            }
            removeLogoutButton();
        }, 72, 10);

        let buttonBadges = new Button(screenCenterX, 475, 'My Badges', this, () => {
            this.scene.start('badgeScene')
            let element = document.getElementById('badges-form')
            if (element && element.style.display === 'none') {
              element.style.display = 'block'
            }
            removeLogoutButton();
        }, 49, 10);

        buttonGame, buttonRegister, buttonLogIn, buttonBadges;
    }
});