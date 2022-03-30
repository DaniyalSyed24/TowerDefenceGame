let badgeScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function badgeScene() {
            Phaser.Scene.call(this, { key: "badgeScene", /*active: true*/});
        },

    preload: function() {
        this.load.image('badges-background', 'assets/media/menuBackground.jpg')
    },

    create: function () {
        backgroundImage = this.add.image(420, 256, 'badges-background');
        backgroundImage.displayWidth = this.sys.canvas.width;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        let title = this.add.text(screenCenterX, 120, "My Badges", {fontSize: "60px", fill: 'white'}).setOrigin(0.5);
        title.setShadow(2, 2, "#333333", 2, false, true);

        let returnButton = new Button(screenCenterX, 500, 'Return to Main Menu', this, () => {
            this.scene.start('mainMenuScene')

            let element = document.getElementById('badges-form')
            if (element && element.style.display != 'none') {
              element.style.display = 'none'
            }
            let logoutButton = document.getElementById('logout-button')
            if (logoutButton && logoutButton.style.display === 'none') {
                logoutButton.style.display = 'block'
            }

        }, 50, 10);

        returnButton;
    }
});