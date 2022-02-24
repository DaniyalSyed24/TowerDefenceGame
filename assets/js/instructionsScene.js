let instructionsScene = Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function instructionsScene() {
            Phaser.Scene.call(this, { key: "instructionsScene", /*active: true*/});
        },

    preload: function() {
        this.load.image('instructions-background', 'assets/media/menuBackground.jpg')
        mainMenuScene;
    },
    
    create: function () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        backgroundImage = this.add.image(320, 256, 'instructions-background');
        backgroundImage.displayWidth = this.sys.canvas.width;

        const title = "Instructions";

        let titleText = this.add.text(screenCenterX, 120, title, {fontSize: "60px", fill: 'white'}).setOrigin(0.5);
        titleText.setShadow(2, 2, "#333333", 2, false, true);

        let instructions = [
            '- Place turrets to kill the enemies!\n',
            '- Click on the turrets to upgrade or sell\n',
            '- lorem\n'
        ];

        let instructionsText = this.add.text(80, 250, instructions, {fontSize: 20});
        instructionsText.setColor("white");

        let returnButton = new Button(screenCenterX, 500, 'Return to Main Menu', this, () => { this.scene.start('mainMenuScene')}, 50, 10);
        returnButton;
    }
});