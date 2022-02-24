let loginScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function loginScene() {
            Phaser.Scene.call(this, { key: "loginScene"});
        },

    preload: function() {
        this.load.image('login-background', 'assets/media/menuBackground.jpg');
    },
    
    create: function () {
        backgroundImage = this.add.image(320, 256, 'login-background');
        backgroundImage.displayWidth = this.sys.canvas.width;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        let title = this.add.text(screenCenterX, 120, "Log In", {fontSize: "60px", fill: 'white'}).setOrigin(0.5);
        title.setShadow(2, 2, "#333333", 2, false, true);
       
        let returnButton = new Button(screenCenterX, 500, 'Return to Main Menu', this, () => {
            this.scene.start('mainMenuScene')
        }, 50, 10);

        returnButton;
    },

});